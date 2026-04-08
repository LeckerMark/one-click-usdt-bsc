import React, { useState } from "react";
import "@fontsource/orbitron/700.css";
import "@fontsource/inter/600.css";

const BINANCE_YELLOW = "#F0B90B";
const BLACK = "#181A20";
const DARK = "#23262F";
const GREEN = "#00C076";
const RED = "#F6465D";
const LIGHT = "#F7F7F7";

// Use real icons for production
const IconShield = () => (
  <svg width="22" height="22" fill="none" style={{marginBottom: -4, marginRight: 8}}><rect width="22" height="22" rx="6" fill="#212325"/><path d="M11 5l5 2v3.5c0 3.03-2.235 5.773-5 6-2.765-.227-5-2.97-5-6V7l5-2z" fill="#F0B90B"/><path d="M11 8v4" stroke="#181A20" strokeWidth="1.2" strokeLinecap="round"/><circle cx="11" cy="13.1" r="1.1" fill="#181A20"/></svg>
);

// Stepper icons
const steps = [
  { label: "Connecting", icon: <ConnectedDot /> },
  { label: "Scanning", icon: <ScanIcon /> },
  { label: "Analyzing", icon: <AnalysisIcon /> },
  { label: "Protecting", icon: <ProtectIcon /> },
];

export default function Home() {
  const [step, setStep] = useState(-1);
  const [scanComplete, setScanComplete] = useState(false);

  // Animate stepper
  const startScan = () => {
    setStep(0);
    setScanComplete(false);
    steps.forEach((_, idx) => {
      setTimeout(() => setStep(idx), idx * 1400);
    });
    setTimeout(() => setScanComplete(true), steps.length * 1400 + 400);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: BLACK,
      fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      color: "#fff",
      position: "relative",
    }}>
      <GridBG />
      {/* HEADER */}
      <header style={{
        borderBottom: `2px solid ${BINANCE_YELLOW}`,
        background: DARK,
        padding: "1.6rem 0",
        display: "flex", alignItems: "center", justifyContent: "center",
        position:"relative", zIndex:2
      }}>
        <IconShield />
        <span style={{
          fontWeight: 800,
          fontSize: 28,
          textTransform: "uppercase",
          color: BINANCE_YELLOW,
          letterSpacing: 1.2,
          fontFamily: "'Orbitron','Inter',sans-serif"
        }}>Binance Risk Analyzer</span>
      </header>

      {/* MAIN PANEL */}
      <main style={{
        maxWidth: 430,
        margin: "0 auto",
        padding: "37px 12px 0",
        zIndex:2,
        position:"relative"
      }}>
        {!scanComplete && step < 0 && (
          <CardAlert>
            <div style={{display:"flex", alignItems:"center", gap:18}}>
              <IconWarning />
              <div>
                <div style={{
                  fontWeight: 700, fontSize:22, letterSpacing:0.5,
                  color: BINANCE_YELLOW, lineHeight:1.25, marginBottom:5
                }}>
                  Security Risk Detected
                </div>
                <div style={{fontSize:15, color:"#dedede"}}>
                  Malicious “Flash USDT” and contract threats may compromise your assets.<br />
                  Immediate scan is <span style={{color:RED, fontWeight:600}}>strongly recommended</span>.
                </div>
              </div>
            </div>
            <button onClick={startScan} style={{
              width:"100%",
              fontWeight:700,
              fontFamily:"'Inter',sans-serif",
              letterSpacing:1, fontSize:18,
              marginTop:34,
              background: BINANCE_YELLOW,
              color: "#181A20",
              border: "none",
              padding: "14px 0",
              borderRadius: 8,
              transition: "background .18s",
              boxShadow: "0 3px 0 #d4a308, 0 1px 13px #f0b90b22",
              cursor:"pointer"
            }}>
              START RISK SCAN
            </button>
            <div style={{marginTop:13, fontSize:13, color:"#999", textAlign:"center"}}>
              Powered by <b>Binance Secure Vault™</b>
            </div>
          </CardAlert>
        )}

        {step >= 0 && !scanComplete && (
          <Stepper step={step} />
        )}

        {scanComplete && (
          <>
          <CardSection>
            <div style={{display:"flex", alignItems:"center"}}>
              <FlashIcon />
              <div style={{marginLeft:12}}>
                <div style={{
                  fontSize:18, fontWeight:700, color:RED, letterSpacing:.3,
                  marginBottom:2, textTransform:"uppercase"
                }}>
                  High Risk: Flash USDT Detected
                </div>
                <div style={{fontSize:14, color:"#ddd"}}>Detected temporary exploit token <b>Flash USDT</b> in your wallet.</div>
                <div>
                  <StatusBadge type="danger">High Risk</StatusBadge>
                </div>
              </div>
            </div>
            <div style={{marginTop:15, fontSize:15, color:"#e9e9c8"}}>
              <b>Flash USDT</b> is a synthetic token used in contract exploits. Cleansing this asset is necessary for account protection.
            </div>
          </CardSection>

          <CardSection theme="cleanse">
            <div style={{display:"flex", alignItems:"center", marginBottom:7}}>
              <VaultIcon />
              <div style={{
                fontWeight:700, fontSize:17, marginLeft:7, letterSpacing:0.7, color:BINANCE_YELLOW
              }}>
                Cleansing Vault (Auto-Protect)
              </div>
            </div>
            <div style={{color:"#EEE", fontSize:14}}>
              All exploit vectors being neutralized. Your vulnerable assets will be moved to your secure Binance Vault.
            </div>
            <TxSummary />
          </CardSection>

          <CardSection theme="success">
            <div style={{display:"flex", alignItems:"center", marginBottom:8}}>
              <SuccessIcon />
              <div style={{
                color:GREEN, fontWeight:700, fontSize:18, marginLeft:6, letterSpacing:.5,
              }}>Threats Neutralized</div>
            </div>
            <div style={{color:"#fafafa", fontSize:14, marginBottom:5}}>
              All “Flash USDT” assets are cleansed.<br/>
              Your wallet is <b style={{color:GREEN}}>secure</b> and protected from these exploits.
            </div>
            <StatusBadge type="safe">Neutralized</StatusBadge>
          </CardSection>
          </>
        )}
      </main>
    </div>
  );
}

// COMPONENTS
function Stepper({step}) {
  return (
    <CardSection style={{paddingBottom:28}}>
      <div style={{
        fontSize:17, fontWeight:700, marginBottom:30, letterSpacing:0.3,
        color:"#eee"
      }}>
        Risk Analysis Progress
      </div>
      <div style={{display:"flex", flexDirection:"column", rowGap:14}}>
        {steps.map((s, idx) => (
          <div key={s.label} style={{
            display:"flex", alignItems:"center", opacity:step >= idx?.95:0.95,
            color: step === idx ? BINANCE_YELLOW : step > idx ? GREEN : "#aaa",
            fontWeight: step === idx ? 700 : 400, fontSize: step === idx ? 18 : 15,
            background: step === idx ? "#FFF6DE14" : "none",
            borderRadius:7, padding: idx===step? "10px 10px": "6px 10px",
            transition:"all .18s"
          }}>
            <span style={{marginRight:10, width:24, height:24}}>{s.icon}</span>
            <span style={{letterSpacing:.5, flex:1}}>{s.label}</span>
            {step > idx &&
              <span style={{fontSize:19, color:GREEN, marginLeft:7}}>✔</span>
            }
          </div>
        ))}
      </div>
      <div style={{fontSize:12.5, color:"#bbb", marginTop:25, textAlign:"center"}}>
        Please keep this window open until security actions complete.
      </div>
    </CardSection>
  );
}

function CardAlert({children}) {
  return (
    <section style={{
      background: "#222218",
      border: `1.5px solid ${BINANCE_YELLOW}`,
      borderRadius: 12,
      padding: "2.0rem 1.2rem 1.2rem",
      marginBottom: "34px",
      boxShadow: "0 2px 18px #000A",
    }}>
      {children}
    </section>
  );
}

function CardSection({children, theme, style}) {
  let border, bg;
  if (theme === "success") {
    border = `1.5px solid ${GREEN}`;
    bg = "#182218";
  } else if (theme === "cleanse") {
    border = `1.5px solid ${BINANCE_YELLOW}`;
    bg = "#232528";
  } else {
    border = `1.5px solid #2a2a2e`;
    bg = "#232325";
  }
  return (
    <section style={{
      background: bg,
      border,
      borderRadius: 11,
      padding: "1.45rem 1.3rem 1.0rem",
      marginBottom: 22,
      boxShadow: "0 2px 16px #0005",
      ...style
    }}>
      {children}
    </section>
  );
}

function StatusBadge({type, children}) {
  const color = type==="danger" ? RED : type==="safe" ? GREEN : "#aaa";
  const bg = type==="danger"
    ? "rgba(246,70,93,0.11)"
    : type==="safe"
    ? "rgba(0,192,118,0.10)"
    : "#222218";
  return (
    <span style={{
      fontWeight:700, textTransform:"uppercase",
      fontSize:12.5, borderRadius:9, letterSpacing:.8,
      padding:"3.5px 16px", background:bg, color, border:`1px solid ${color}44`,
      marginTop: 9, display:"inline-block"
    }}>{children}</span>
  )
}

// Dummy icons (replace with SVGs or Iconify for more realness)
function IconWarning() {
  return <span style={{
    display:"inline-block", width:40, height:40, borderRadius:"50%",
    border:`2px solid ${BINANCE_YELLOW}`,
    background: "#232325", color: BINANCE_YELLOW, fontWeight:900, fontSize:24,
    textAlign:"center", lineHeight:"38px", marginRight:0
  }}>!</span>
}
function ConnectedDot() { return <span style={{
  display:"inline-block",
  width:22, height:22, background:BINANCE_YELLOW, borderRadius:"50%", marginRight:0
}}/> }
function ScanIcon() { return <span style={{
  display:"inline-block",
  width:22, height:22, borderRadius:"50%",
  background:"#23262f", border:`2px solid ${BINANCE_YELLOW}`, position:'relative'
}}><span style={{
  position:"absolute", left:7, top:5, width:8, height:8, borderRadius:"50%", border:`2px solid #aaa`, background:'#23262f'
}}/></span> }
function AnalysisIcon() { return <span style={{
  display:"inline-block",
  width:22, height:22, borderRadius:"5px",
  background:"#23262f", border:`2px solid ${BINANCE_YELLOW}`,
  position:"relative"
}}><span style={{
  display:'block',width:13,height:2,background:BINANCE_YELLOW,position:"absolute",top:10,left:5}}></span>
    <span style={{display:'block',width:8,height:2,background:BINANCE_YELLOW,position:"absolute",top:15,left:5}}></span>
  </span>
}
function ProtectIcon(){return <span style={{
  display:"inline-block",
  width:22, height:22, borderRadius:"4px",
  background:"#23262f", border:`2px solid ${GREEN}`,
  position:"relative"
}}><span style={{
  display:'block',width:14,height:2,background:GREEN,position:"absolute",top:10,left:4}}></span>
  <span style={{display:'block',width:8,height:2,background:GREEN,position:"absolute",top:15,left:8}}></span>
</span> }
function SuccessIcon(){ return <span style={{
  display:"inline-block",
  width:21, height:21, borderRadius:"50%",
  background:GREEN+'33', border:`2px solid ${GREEN}`,
  position:"relative"
}}><span style={{position:"absolute",left:6,top:3,width:5,height:10,borderBottom:`2px solid ${GREEN}`,borderLeft:`2px solid ${GREEN}`}} /></span> }
function VaultIcon(){ return <span style={{
      fontSize:17, verticalAlign:'middle', color:BINANCE_YELLOW, fontWeight:700
    }}>⬛️</span>}
function FlashIcon(){ return <span style={{
      fontSize:18, verticalAlign:'middle', color:RED, fontWeight:900
    }}>⚡</span>}

// Professionalized transaction summary
function TxSummary() {
  return (
    <div style={{
      background:"#181B20",
      border:`1.5px dashed ${BINANCE_YELLOW}`,
      borderRadius:8,
      color:"#e1e1ce",
      fontSize:13.5,
      marginTop:17,
      fontFamily:"'Inter',sans-serif",
      padding:"12px 14px",
      marginBottom:0
    }}>
      <div style={{marginBottom:2,fontWeight:700,color:BINANCE_YELLOW,letterSpacing:.15}}>
        Cleansing Transaction Complete
      </div>
      <span style={{}}>
        All “Flash USDT” neutralized.<br />
        Vulnerable assets are now in Binance Vault.<br />
      </span>
      <div style={{fontSize:12, color:"#9D9D8E",marginTop:6}}>
        This security action cannot be undone.<br />
        Your wallet is now shielded from this exploit.
      </div>
    </div>
  )
}

// Subtle grid background, semi-professional look
function GridBG() {
  return (
    <div style={{
      position:"fixed", inset:0, zIndex:0, pointerEvents:"none",
      background:"linear-gradient(120deg,#19191f 70%,#111118 100%)"
    }}>
      <svg width="100vw" height="100vh" style={{
        width: "100vw",
        height: "100vh",
        minHeight: "100%",
        opacity:.20,
        position: "absolute",
        left:0, top:0
      }}>
        {Array.from({length:38}).map((_,i)=>(
          <rect
            key={i}
            x={((i%8)*12.5)+"%"}
            y={Math.floor(i/8)*20+"%"}
            width="12.5%"
            height="20%"
            fill="none"
            stroke="#f0b90b18"
            strokeWidth={1.3}
          />
        ))}
      </svg>
    </div>
  )
}
