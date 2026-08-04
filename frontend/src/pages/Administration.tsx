import MenuBackgroundWrapper from "../components/MenuBackgroundWrapper.tsx";
import SectionHeadline from "../components/SectionHeadline.tsx";
import BackButton from "../components/BackButton.tsx";
import BannedUsers from "../components/administration/BannedUsers.tsx";
import { useGeneralStates } from "../hooks/useGeneralStates.ts";
import useQuery from "../hooks/useQuery.ts";
import { Navigate } from "react-router-dom";
import ServerMessageInput from "../components/administration/ServerMessageInput.tsx";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/lotties/loading.json";
import axios from "axios";
import { useEffect, useState } from "react";

type StatEntry = { uri: string; count: number; bytes: number };

function AdminTrafficMonitor() {
    const [stats, setStats] = useState<StatEntry[]>([]);

    const fetchStats = () => {
        axios.get("/api/admin/traffic").then((res) => setStats(res.data)).catch(() => {});
    };

    useEffect(() => {
        fetchStats();
        const interval = setInterval(fetchStats, 5000); // Refresh every 5s
        return () => clearInterval(interval);
    }, []);

    const formatBytes = (bytes: number) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    };

    const handleClear = () => {
        axios.delete("/api/admin/traffic").then(() => setStats([])).catch(() => {});
    };

    return (
        <div
            style={{
                background: "rgba(12, 21, 16, 0.4)",
                border: "1px solid rgba(124, 124, 118, 0.4)",
                borderRadius: "6px",
                padding: "20px",
                color: "ghostwhite",
                boxShadow: "inset 5px 5px 30px 5px rgba(255, 255, 255, 0.05)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                    flexWrap: "wrap",
                    gap: "12px",
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        fontFamily: "League Spartan, sans-serif",
                        fontSize: "26px",
                        color: "var(--lobby-accent)",
                    }}
                >
                    📊 Real-Time Server Bandwidth & Traffic Monitor
                </h2>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button
                        onClick={fetchStats}
                        style={{
                            padding: "6px 14px",
                            background: "var(--blue-button-bg)",
                            color: "ghostwhite",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontFamily: "League Spartan, sans-serif",
                            fontSize: "15px",
                        }}
                    >
                        🔄 Refresh
                    </button>
                    <button
                        onClick={handleClear}
                        style={{
                            padding: "6px 14px",
                            background: "rgb(192,42,42)",
                            color: "ghostwhite",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontFamily: "League Spartan, sans-serif",
                            fontSize: "15px",
                        }}
                    >
                        🗑️ Reset Stats
                    </button>
                </div>
            </div>

            <div style={{ maxHeight: "350px", overflowY: "auto" }}>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        textAlign: "left",
                        fontFamily: "Cousine, monospace",
                    }}
                >
                    <thead>
                        <tr style={{ borderBottom: "2px solid rgba(124, 124, 118, 0.4)", color: "#60a5fa" }}>
                            <th style={{ padding: "10px" }}>Endpoint / File URI</th>
                            <th style={{ padding: "10px" }}>Request Count</th>
                            <th style={{ padding: "10px" }}>Total Bandwidth Used</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.length === 0 ? (
                            <tr>
                                <td colSpan={3} style={{ padding: "16px", textAlign: "center", opacity: 0.7 }}>
                                    No traffic recorded yet or backend server compiling...
                                </td>
                            </tr>
                        ) : (
                            stats.map((item) => (
                                <tr key={item.uri} style={{ borderBottom: "1px solid rgba(124, 124, 118, 0.2)" }}>
                                    <td style={{ padding: "8px 10px", color: "#38bdf8" }}>{item.uri}</td>
                                    <td style={{ padding: "8px 10px" }}>{item.count}</td>
                                    <td
                                        style={{
                                            padding: "8px 10px",
                                            fontWeight: "bold",
                                            color: item.bytes > 1000000 ? "crimson" : "rgb(53,197,147)",
                                        }}
                                    >
                                        {formatBytes(item.bytes)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function Administration() {
    const user = useGeneralStates((state) => state.user);
    const { data: admins, isFetching } = useQuery<string[]>("/api/admin/admins");

    if (!isFetching && admins && !admins.includes(user)) return <Navigate to="/" />;

    return (
        <MenuBackgroundWrapper>
            <div
                style={{
                    paddingTop: 20,
                    maxWidth: 1204,
                    minHeight: "100vh",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                }}
            >
                <SectionHeadline headline={"Administration"} rightElement={<BackButton />} />

                {isFetching ? (
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <Lottie animationData={loadingAnimation} loop={true} style={{ width: "50%" }} />
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                        <AdminTrafficMonitor />
                        <BannedUsers />
                        <ServerMessageInput />
                    </div>
                )}
            </div>
        </MenuBackgroundWrapper>
    );
}