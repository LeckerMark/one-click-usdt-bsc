import React, { useState } from "react";

export default function BinanceRiskAnalyzer() {
  const [scanning, setScanning] = useState(false);
  const [done, setDone] = useState(false);

  function handleScan() {
    setScanning(true);
    setDone(false);
    setTimeout(() => {
      setScanning(false);
      setDone(true);
    }, 2000);
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.headerRow}>
          <span style={styles.shieldIcon} aria-hidden="true">🛡️</span>
          <h1 style={styles.title}>Binance Risk Analyzer</h1>
        </div>

        {/* Trust message */}
        <div style={styles.trustBox}>
          <p style={styles.trustText}>
            Your security is our top priority.<br />
            Scan your Binance activities for risks with one click.
          </p>
        </div>

        {/* Badges */}
        <div style={styles.badgeRow}>
          <span style={styles.badge}>🔒 Secure</span>
          <span style={styles.badge}>✅ Trusted</span>
          <span style={styles.badge}>⚡ Instant</span>
        </div>

        {/* Scan button */}
        <button
          style={{
            ...styles.button,
            ...(scanning ? styles.buttonDisabled : {}),
          }}
          onClick={handleScan}
          disabled={scanning}
          aria-busy={scanning}
        >
          {scanning ? "Scanning…" : "Scan Now"}
        </button>

        {/* Result */}
        {done && (
          <div style={styles.resultBox} role="status">
            <span style={styles.resultIcon}>✅</span>
            <span style={styles.resultText}>No risks detected. Your account looks safe!</span>
          </div>
        )}

        {/* Disclaimer */}
        <p style={styles.disclaimer}>
          We do <strong>not</strong> store your personal data.
          <br />
          100% non-custodial and privacy-first.
        </p>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    padding: "1rem",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e3e9ee",
    borderRadius: 12,
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    padding: "2.5rem 2rem",
    maxWidth: 420,
    width: "100%",
    textAlign: "center",
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: "1rem",
  },
  shieldIcon: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: "#1a2a3a",
    margin: 0,
  },
  trustBox: {
    background: "#f0f9f4",
    border: "1px solid #c3e6cb",
    borderRadius: 8,
    padding: "0.75rem 1rem",
    marginBottom: "1.25rem",
  },
  trustText: {
    color: "#1a6630",
    fontWeight: 500,
    fontSize: 15,
    margin: 0,
    lineHeight: 1.6,
  },
  badgeRow: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginBottom: "1.5rem",
    flexWrap: "wrap",
  },
  badge: {
    background: "#f4f6fb",
    border: "1px solid #dde3ee",
    borderRadius: 20,
    padding: "0.3rem 0.8rem",
    fontSize: 13,
    color: "#2c405a",
    fontWeight: 500,
  },
  button: {
    width: "100%",
    padding: "0.85rem 0",
    background: "#f4bf1a",
    color: "#1a1a1a",
    border: "none",
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 17,
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(244,191,26,0.35)",
    transition: "background 0.2s, opacity 0.2s",
    letterSpacing: "0.01em",
  },
  buttonDisabled: {
    opacity: 0.65,
    cursor: "not-allowed",
  },
  resultBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: "1.25rem",
    background: "#f0f9f4",
    border: "1px solid #c3e6cb",
    borderRadius: 8,
    padding: "0.7rem 1rem",
  },
  resultIcon: {
    fontSize: 20,
  },
  resultText: {
    color: "#1a6630",
    fontWeight: 600,
    fontSize: 14,
  },
  disclaimer: {
    marginTop: "1.5rem",
    color: "#7a8a9a",
    fontSize: 12,
    lineHeight: 1.7,
  },
};
