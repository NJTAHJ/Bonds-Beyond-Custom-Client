import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toPng } from "html-to-image";
import { DeckType } from "../utils/types";

interface VisualDeckModalProps {
    deck: DeckType;
    open: boolean;
    onClose: () => void;
}

export const VisualDeckModal: React.FC<VisualDeckModalProps> = ({ deck, open, onClose }) => {
    const posterRef = useRef<HTMLDivElement>(null);
    const [downloading, setDownloading] = useState(false);

    if (!open || !deck) return null;

    // Helper: Group identical cards and count quantities (x4, x2, etc.)
    const groupCards = (cardList: any[]) => {
        const map = new Map<string, { card: any; count: number }>();
        cardList?.forEach((card) => {
            const key = card.uniqueCardNumber || card.cardNumber || card.name;
            if (map.has(key)) {
                map.get(key)!.count += 1;
            } else {
                map.set(key, { card, count: 1 });
            }
        });
        return Array.from(map.values());
    };

    const eggGroups = groupCards(deck.eggDeckList || []);
    const mainGroups = groupCards(deck.mainDeckList || []);

    const handleDownload = async () => {
        if (!posterRef.current) return;
        setDownloading(true);
        try {
            const dataUrl = await toPng(posterRef.current, { cacheBust: true, quality: 0.95 });
            const link = document.createElement("a");
            link.download = `${deck.name.replace(/\s+/g, "_")}_Deck.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error("Failed to generate deck image:", err);
        } finally {
            setDownloading(false);
        }
    };

    // Use React Portal to render directly under document.body at the top DOM layer
    return createPortal(
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.88)",
                zIndex: 999999, // High z-index on body level
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(8px)",
            }}
        >
            {/* Top Action Bar */}
            <div style={{ display: "flex", gap: "16px", marginBottom: "16px", zIndex: 1000000 }}>
                <button
                    onClick={handleDownload}
                    disabled={downloading}
                    style={{
                        padding: "10px 24px",
                        background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        cursor: "pointer",
                        boxShadow: "0 0 15px rgba(37, 99, 235, 0.5)",
                    }}
                >
                    {downloading ? "Generating Image..." : "Download Deck Image (.PNG)"}
                </button>
                <button
                    onClick={onClose}
                    style={{
                        padding: "10px 20px",
                        background: "#374151",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        cursor: "pointer",
                    }}
                >
                    Close ✕
                </button>
            </div>

            {/* Printable Deck Poster */}
            <div
                ref={posterRef}
                style={{
                    width: "920px",
                    maxWidth: "95vw",
                    maxHeight: "80vh",
                    overflowY: "auto",
                    background: "#0f172a",
                    border: "2px solid #3b82f6",
                    borderRadius: "12px",
                    padding: "24px",
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)",
                    color: "#f8fafc",
                    fontFamily: "'League Spartan', sans-serif",
                }}
            >
                {/* Header Info */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "2px solid #1e293b",
                        paddingBottom: "12px",
                        marginBottom: "20px",
                    }}
                >
                    <div>
                        <h1 style={{ margin: 0, fontSize: "2rem", color: "#60a5fa" }}>{deck.name}</h1>
                        <span style={{ fontSize: "0.9rem", color: "#94a3b8" }}>
                            Project Drasil |
                        </span>
                    </div>
                    <div style={{ textAlign: "right", fontSize: "0.95rem", color: "#cbd5e1" }}>
                        <div>Main Deck: <strong>{deck.mainDeckList?.length || 0} Cards</strong></div>
                        <div>Eggs: <strong>{deck.eggDeckList?.length || 0} Cards</strong></div>
                    </div>
                </div>

                {/* Egg Deck Grid */}
                {eggGroups.length > 0 && (
                    <div style={{ marginBottom: "20px" }}>
                        <h3 style={{ color: "#38bdf8", margin: "0 0 10px 0", fontSize: "1.1rem" }}>
                            Digi-Egg Deck
                        </h3>
                        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                            {eggGroups.map(({ card, count }) => (
                                <div key={card.uniqueCardNumber || card.cardNumber} style={{ width: "95px" }}>
                                    <CardBadge card={card} count={count} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Main Deck Grid */}
                <div>
                    <h3 style={{ color: "#38bdf8", margin: "0 0 10px 0", fontSize: "1.1rem" }}>
                        Main Deck
                    </h3>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(95px, 1fr))",
                            gap: "12px",
                        }}
                    >
                        {mainGroups.map(({ card, count }) => (
                            <CardBadge key={card.uniqueCardNumber || card.cardNumber} card={card} count={count} />
                        ))}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

function CardBadge({ card, count }: { card: any; count: number }) {
    return (
        <div style={{ position: "relative", width: "100%", aspectRatio: "5/7" }}>
            <img
                src={card.imgUrl}
                alt={card.name}
                style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "6px",
                    objectFit: "cover",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}
            />
            <span
                style={{
                    position: "absolute",
                    bottom: "4px",
                    right: "4px",
                    background: "rgba(15, 23, 42, 0.95)",
                    color: "#38bdf8",
                    border: "1px solid #38bdf8",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontSize: "0.82rem",
                    fontWeight: "bold",
                    boxShadow: "0 0 6px rgba(0,0,0,0.8)",
                }}
            >
                x{count}
            </span>
        </div>
    );
}