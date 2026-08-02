import React, { useEffect, useState } from "react";

interface TurnOverlayProps {
  isMyTurn: boolean;
  phase?: string; // Optional: "UNSUSPEND", "DRAW", "BREEDING", "MAIN", "END"
}

export const TurnOverlay: React.FC<TurnOverlayProps> = ({ isMyTurn, phase }) => {
  const [displayText, setDisplayText] = useState<string>("");
  const [bannerColor, setBannerColor] = useState<string>("#38bdf8"); // Blue default
  const [animationKey, setAnimationKey] = useState<number>(0);

  useEffect(() => {
    if (isMyTurn) {
      setDisplayText(phase ? `YOUR TURN - ${phase} PHASE` : "YOUR TURN!");
      setBannerColor("linear-gradient(90deg, rgba(14, 165, 233, 0) 0%, rgba(14, 165, 233, 0.85) 25%, rgba(14, 165, 233, 0.85) 75%, rgba(14, 165, 233, 0) 100%)");
    } else {
      setDisplayText(phase ? `OPPONENT'S TURN - ${phase} PHASE` : "OPPONENT'S TURN");
      setBannerColor("linear-gradient(90deg, rgba(225, 29, 72, 0) 0%, rgba(225, 29, 72, 0.85) 25%, rgba(225, 29, 72, 0.85) 75%, rgba(225, 29, 72, 0) 100%)");
    }
    // Re-trigger animation on change
    setAnimationKey((prev) => prev + 1);
  }, [isMyTurn, phase]);

  if (!displayText) return null;

  return (
    <>
      <style>{`
        @keyframes turnBannerFade {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.85);
            filter: blur(8px);
          }
          15% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
            filter: blur(0px);
          }
          80% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
            filter: blur(0px);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.1);
            filter: blur(6px);
          }
        }
      `}</style>
      <div
        key={animationKey}
        style={{
          position: "fixed",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100vw",
          padding: "18px 0",
          background: bannerColor,
          color: "#ffffff",
          textAlign: "center",
          fontFamily: "'League Spartan', 'Pixel Digivolve', sans-serif",
          fontSize: "2.5rem",
          fontWeight: 900,
          letterSpacing: "4px",
          textTransform: "uppercase",
          textShadow: "0 0 12px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.6)",
          boxShadow: "0 0 30px rgba(0,0,0,0.6)",
          zIndex: 9999,
          pointerEvents: "none", // ⚠️ Ensures cards behind the banner remain clickable!
          animation: "turnBannerFade 1.6s ease-in-out forwards",
        }}
      >
        {displayText}
      </div>
    </>
  );
};