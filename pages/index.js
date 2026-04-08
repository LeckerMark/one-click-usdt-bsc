import React, { useState } from "react";
import "@fontsource/orbitron/700.css";

const BINANCE_YELLOW = "#F0B90B";
const DARK_BG = "#171717";
const GRAY = "#23272F";
const GREEN = "#00FFA3";
const RED = "#FF433E";

const scanSteps = [
  { label: "Connecting", emoji: "🔌" },
  { label: "Scanning", emoji: "🛰️" },
  { label: "Analyzing", emoji: "🧐" },
  { label: "Protecting", emoji: "🛡️" },
];

export default function Home() {
  const [step, setStep] = useState(-1);
  const [scanComplete, setScanComplete] = useState(false);

  const startScan = () => {
    setStep(0);
    setScanComplete(false);
    scanSteps.forEach((_, idx) => {
      setTimeout(() => setStep(idx), idx * 1200);
    });
    setTimeout(() => setScanComplete(true), scanSteps.length * 1200 + 400);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: DARK_BG,
      color: "#fff",
      fontFamily: "'Orbitron', 'Segoe UI', Arial, sans-serif",
      position: "relative",
      overflow: "hidden"
    }}>
      <CyberGridBG />
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.5rem 2.5rem", background: GRAY, borderBottom: `2px solid ${BINANCE_YELLOW}`,
        zIndex: 2, position: "relative"
      }}>
        <span style={{
          fontSize: "1.8rem", fontWeight: 900, letterSpacing: 2,
          color: BINANCE_YELLOW, textShadow: "0 0 12px #fff2",
        }}>
          <span style={{ verticalAlign: "middle", marginRight: 12 }}>
            <svg height={36} width={36}><circle cx={18} cy={18} r={16} fill={BINANCE_YELLOW} opacity={0.1}/><circle cx={18} cy={18} r={11} fill={BINANCE_YELLOW} opacity={0.22}/><circle cx={18} cy={18} r={6} fill={BINANCE_YELLOW}/></svg>
          </span>
          Binance Risk Analyzer
        </span>
        <SecurityBadge text="SECURITY VERIFIED" status="safe" />
      </header>
      <main style={{maxWidth: 500, margin: "0 auto", zIndex: 2, position:'relative', paddingTop:50}}>
        {!scanComplete && step===-1 && (
          <div
            style={{
              background: "#fff1",
              border: `1.5px solid ${BINANCE_YELLOW}`,
              borderRadius: 18,
              padding: "2.2rem 1.7rem",
              textAlign: "center",
              marginTop: 22,
              marginBottom: 32,
              boxShadow: "0 2px 18px #000a"
            }}>
            <div style={{ fontSize: 28, fontWeight: "bold", color: BINANCE_YELLOW, textShadow:"0 1px 8px #0004"}}>
              Warning: Potential Malicious Script Detected!
            </div>
            <div style={{ fontSize: 18, margin: "18px 0 10px", color: "#eee" }}>
              Suspicious "Flash USDT" tokens & exploitable contracts found in your wallet.
            </div>
            <div style={{
              color: "#ddd", fontSize: 14, marginBottom: 20
            }}>
              Unprotected wallets are at high risk of immediate asset compromise.
            </div>
            <button
              onClick={startScan}
              style={{
                background: BINANCE_YELLOW,
                color: DARK_BG,
                fontWeight: 700,
                fontSize: 22,
                border: "none",
                outline: "none",
                borderRadius: 13,
                padding: "0.7em 2.5em",
                boxShadow: "0 2px 20px #FDB41744",
                cursor: "pointer",
                marginTop: 16
              }}
            >
              🚨 Scan Now
            </button>
            <div style={{marginTop: 15, color:"#fff8", fontSize: 13, fontFamily:"monospace"}}>
              Assets protected by <b>Binance Vault</b>
            </div>
          </div>
        )}
        {step >= 0 && !scanComplete && (
          <ScanStepper step={step} />
        )}
        {scanComplete && (
          <div style={{marginTop: 15}}>
              <section style={{
                background: "#222d", border: `1px solid ${RED}`,
                borderRadius: 16, padding: "1.7rem 1.4rem", marginBottom: 18, boxShadow: "0 0 10px #fd999911"
              }}>
                <div style={{ display:"flex", alignItems:"center" }}>
                 <span style={{fontSize: 32, fontWeight:900, color:BINANCE_YELLOW}}>⚡ Flash USDT Detected</span>
                  <span style={{marginLeft: "auto"}}>
                    <SecurityBadge text="HIGH RISK" status="danger" />
                  </span>
                </div>
                <div style={{margin: "15px 0", color:"#ffd"}}>
                  <b>Flash USDT</b> is a temporary, synthetic token highly vulnerable to rapid exploits and contract attacks.
                </div>
                <div style={{fontSize:15, color:'#ffe', background:"#fdba0833", border:"1px dashed #FDB417", borderRadius:10, padding:11}}>
                  Immediate action required! Initiating cleansing operation to neutralize "Flash USDT" and protect your funds.
                </div>
              </section>
              <section style={{
                background: "#1D2B32", border: `1.5px solid ${BINANCE_YELLOW}`,
                borderRadius: 19, padding: "1.6rem 1.5rem", marginBottom: 20, boxShadow:'0 0 8px #FFC80044',
                textAlign: "center"
              }}>
                <span style={{fontWeight:900, fontSize:22, letterSpacing:1, color:BINANCE_YELLOW}}>Cleansing Vault</span>
                <div style={{marginTop:7, marginBottom:18, color:"#ccf"}}>
                  All at-risk assets are being auto-neutralized and transferred to your <b>Binance Vault</b>.
                </div>
                <TransactionStatus />
              </section>
              <section style={{
                background: "#14f37e18", border: `1.5px solid ${GREEN}`,
                borderRadius: 19, padding: "1.6rem 1.5rem", marginBottom: 18, textAlign:'center', boxShadow:"0 2px 10px #16f37e33"
              }}>
                <div style={{fontSize: 21, fontWeight:"bold", color:GREEN, marginBottom:7}}>✔ Threats Neutralized</div>
                <SecurityBadge text="NEUTRALIZED" status="safe" />
                <div style={{margin:"12px 0 10px", color:"#EEF", fontSize:15}}>Your wallet is <span style={{fontWeight:700}}>protected</span> from flash USDT exploits.</div>
                <div style={{color:"#fff8", fontSize: 13}}>Cleansing complete &nbsp;|&nbsp; All assets secured in vault</div>
              </section>
          </div>
        )}
      </main>
    </div>
  );
}

function CyberGridBG() {
  return (
    <div style={{
      position: "fixed", inset: 0,
      zIndex: 0, pointerEvents: "none", overflow: "hidden",
      background: "radial-gradient(circle, #222 55%, #111 100%)"
    }}>
      <svg width="100vw" height="100vh" style={{
        width: "100vw", height: "100vh", minHeight: "100%", position: "absolute",
        filter: "blur(0.5px)",
      }}>
        {Array.from({length:40}).map((_,i) => (
          <rect
            key={i}
            x={((i%10) * 10) + "%"}
            y={Math.floor(i/10)*25+"%"}
            width="10%"
            height="25%"
            fill="none"
            stroke="#f0b90b22"
            strokeWidth={1}
          />
        ))}
      </svg>
      <div style={{
        position: "absolute",
        inset: 0, background: `repeating-linear-gradient(90deg,
          transparent 0 22px, #FDB4170f 22px 24px)`,
        opacity: 0.3
      }}></div>
      <div style={{
        position: "absolute", inset: 0,
        background: "repeating-linear-gradient(0deg, transparent 0 28px, #FDB41712 28px 29px)", opacity: 0.23
      }}></div>
    </div>
  );
}

function ScanStepper({ step }) {
  return (
    <div style={{
      background: "#212f37dd", borderRadius: 22,
      border: `2px solid #FDB41722`, boxShadow: "0 0 8px #FDB41733",
      padding: "2rem 1.3rem", marginBottom: 28, textAlign:"center"
    }}>
      <div style={{ fontSize: 29, fontWeight: "bold", marginBottom: 21, color: "#fff" }}>
        Security Scan In Progress...
      </div>
      <div style={{display:"flex", flexDirection:"column", gap: 15, alignItems:"stretch"}}>
        {scanSteps.map((s, idx) => (
          <div key={s.label} style={{
            display:"flex", alignItems:"center", gap:12,
            background: idx === step ? "#fff1" : "transparent",
            borderRadius:12, padding: idx===step ? "9px 11px" : "8px 11px",
            fontWeight: idx<step ? 700 : 400,
            border: idx===step ? `2px solid ${BINANCE_YELLOW}` : "",
            color: idx<step ? "#16F37E" : idx===step ? BINANCE_YELLOW : "#fff8",
            position:"relative", fontSize: idx===step ? 21 : 17
          }}>
            <span>{s.emoji}</span>
            <span style={{
              fontWeight: idx===step ? 900 : 400,
              letterSpacing:0.5, 
              wordSpacing:1.5
            }}>
              {s.label}
            </span>
            {idx < step && (
              <span style={{
                fontWeight:900, color:GREEN, marginLeft:"auto", fontSize:18
              }}>✓</span>
            )}
          </div>
        ))}
      </div>
      <div style={{marginTop:25, color:BINANCE_YELLOW, fontSize: 14, letterSpacing:1}}>
        Do not disconnect – assets are being scanned.
      </div>
    </div>
  );
}

function SecurityBadge({ text, status }) {
  const bg = status === "safe" ? "#16F37E" : status === "danger" ? "#FF433E" : "#FFD900";
  const fg = status==="danger"?"#fff":status==="safe"?"#111":"#000";
  return (
    <span style={{
      display:"inline-block", fontWeight:900,
      padding: "3px 14px", borderRadius: 11, fontSize: 14,
      background: bg, color: fg, boxShadow:"0 2px 8px #2227",
      border: "1px solid #fff3", letterSpacing:1,
      textShadow: status==="danger"? "0 1px 5px #f003": undefined
    }}>
      {text}
    </span>
  );
}

function TransactionStatus() {
  return (
    <div style={{
      margin: "20px 0", background: "#FDB41718", border: "1px solid #FDB417",
      borderRadius:12, padding:"1em 0.5em", color:"#231",
      fontFamily:"monospace", fontWeight:600, fontSize:16
    }}>
      {'🔄 '} <b style={{color:"#FDB417"}}>Cleansing Transaction</b> completed. <br/>
      All "Flash USDT" neutralized, funds transferred to <b>Binance Vault</b>.<br/>
      <div style={{fontSize:13, marginTop:6, color:'#377'}}>
        Your wallet is now shielded from exploitation!
      </div>
    </div>
  );
}
