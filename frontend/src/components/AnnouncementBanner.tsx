import React, { useState } from 'react';

export const AnnouncementBanner: React.FC = () => {
  // ========================================================
  // EDIT YOUR ANNOUNCEMENT SETTINGS HERE
  // ========================================================
  const ANNOUNCEMENT_ID = "bb1_announcement_v3"; // Bump this ID (e.g. v4) when you post new news so closed banners reappear!
  const TAG_TEXT = "ANNOUNCEMENT";
  const TITLE = "Beyond the Bonds (BB1) V3 Live!";
  const MESSAGE = "New ST01 Nikari cards & custom set updates are now active.";
  const LINK_TEXT = "Join Discord / Patch Notes →";
  const LINK_URL = "https://discord.gg"; // Replace with your Discord or Doc link
  // ========================================================

  const [visible, setVisible] = useState<boolean>(() => {
    return localStorage.getItem("dismissed_announcement") !== ANNOUNCEMENT_ID;
  });

  const handleDismiss = () => {
    localStorage.setItem("dismissed_announcement", ANNOUNCEMENT_ID);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      background: 'linear-gradient(90deg, #1e1b4b 0%, #311042 50%, #1e1b4b 100%)',
      borderBottom: '2px solid #8b5cf6',
      boxShadow: '0 0 15px rgba(139, 92, 246, 0.4)',
      color: '#ffffff',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '0.88rem',
      zIndex: 1000,
      position: 'relative',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <span style={{ 
          background: '#8b5cf6', 
          color: '#ffffff', 
          padding: '2px 8px', 
          borderRadius: '4px', 
          fontWeight: 'bold',
          fontSize: '0.72rem',
          letterSpacing: '0.5px'
        }}>
          {TAG_TEXT}
        </span>
        <strong style={{ color: '#e0e7ff' }}>{TITLE}</strong>
        <span style={{ opacity: 0.9 }}>{MESSAGE}</span>
        {LINK_URL && (
          <a 
            href={LINK_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              color: '#38bdf8', 
              textDecoration: 'none', 
              fontWeight: 'bold',
              marginLeft: '4px'
            }}
          >
            {LINK_TEXT}
          </a>
        )}
      </div>
      <button 
        onClick={handleDismiss}
        title="Dismiss announcement"
        style={{
          background: 'transparent',
          border: 'none',
          color: '#a78bfa',
          cursor: 'pointer',
          fontSize: '1.2rem',
          padding: '0 4px',
          lineHeight: 1,
          marginLeft: '12px'
        }}
      >
        ✕
      </button>
    </div>
  );
};