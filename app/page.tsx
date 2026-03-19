"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [role, setRole] = useState<"client" | "freelancer" | null>(null);
  const [hoverBtn, setHoverBtn] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #060608; }
        .nav-btn:hover { background: rgba(255,255,255,0.08) !important; }
        .role-card:hover { border-color: rgba(255,255,255,0.25) !important; transform: translateY(-2px); }
        .step-card:hover { border-color: rgba(139,92,246,0.4) !important; background: rgba(139,92,246,0.05) !important; }
        .trust-card:hover { border-color: rgba(139,92,246,0.3) !important; transform: translateY(-3px); }
        .role-card, .step-card, .trust-card { transition: all 0.25s ease; }
        @keyframes float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
        @keyframes pulse-glow { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        .hero-content { animation: fadeInUp 0.8s ease forwards; }
        .glow-orb-1 { animation: float 6s ease-in-out infinite; }
        .glow-orb-2 { animation: float 8s ease-in-out infinite 2s; }
        .badge-pulse { animation: pulse-glow 2s ease-in-out infinite; }
      `}</style>

      <main style={{ fontFamily: "'Inter', sans-serif", background: "#060608", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>

        {/* BACKGROUND ORBS */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
          <div className="glow-orb-1" style={{ position: "absolute", top: "-20%", left: "20%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }} />
          <div className="glow-orb-2" style={{ position: "absolute", top: "30%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,138,0.08) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)" }} />
        </div>

        {/* NAVBAR */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0 48px", height: 64,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: scrolled ? "rgba(6,6,8,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)"
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              background: "linear-gradient(135deg, #8b5cf6 0%, #22d38a 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: 16, letterSpacing: "-1px", boxShadow: "0 0 20px rgba(139,92,246,0.4)"
            }}>D</div>
            <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.8px", color: "#fff" }}>DutyFree</span>
          </div>

          {/* Nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {["How it works", "For Clients", "For Freelancers", "Pricing"].map(link => (
              <a key={link} href="#" style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>{link}</a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <a href="/login" className="nav-btn" style={{
              padding: "8px 20px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)",
              background: "transparent", color: "rgba(255,255,255,0.7)", cursor: "pointer", fontSize: 14, fontWeight: 500,
              textDecoration: "none", display: "inline-block"
            }}>Log in</a>
            <a href="/signup" style={{
              padding: "8px 20px", borderRadius: 8, border: "none",
              background: "linear-gradient(135deg, #8b5cf6, #22d38a)",
              color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600,
              boxShadow: "0 0 20px rgba(139,92,246,0.3)",
              textDecoration: "none", display: "inline-block"
            }}>Get Started</a>
          </div>
        </nav>

        {/* HERO */}
        <section style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "100px 24px 60px" }}>

          {/* Badge */}
          <div className="badge-pulse" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "5px 14px", borderRadius: 100, marginBottom: 36,
            border: "1px solid rgba(139,92,246,0.35)",
            background: "rgba(139,92,246,0.08)",
            fontSize: 12, fontWeight: 600, color: "#a78bfa", letterSpacing: "0.3px"
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22d38a", display: "inline-block" }} />
            India's #1 AI-Powered Freelance Platform
          </div>

          {/* Heading */}
          <h1 style={{ fontSize: "clamp(42px, 5.5vw, 76px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-3px", marginBottom: 28, maxWidth: 860 }}>
            Hire the perfect freelancer
            <br />
            <span style={{
              background: "linear-gradient(90deg, #8b5cf6 0%, #06b6d4 50%, #22d38a 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              in under 10 minutes
            </span>
          </h1>

          {/* Subtext */}
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.4)", maxWidth: 520, lineHeight: 1.75, marginBottom: 52, fontWeight: 400 }}>
            AI matches you with verified freelancers instantly. Your payment stays in secure escrow until you're 100% satisfied.
          </p>

          {/* Role Cards */}
          <div style={{ display: "flex", gap: 14, marginBottom: 44, flexWrap: "wrap", justifyContent: "center" }}>
            <div className="role-card" onClick={() => setRole("client")} style={{
              padding: "20px 28px", borderRadius: 14, cursor: "pointer",
              border: `1px solid ${role === "client" ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.08)"}`,
              background: role === "client" ? "rgba(139,92,246,0.1)" : "rgba(255,255,255,0.02)",
              textAlign: "left", minWidth: 220,
              boxShadow: role === "client" ? "0 0 30px rgba(139,92,246,0.15)" : "none"
            }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>🏢</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>I'm a Client</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>I need work done</div>
            </div>
            <div className="role-card" onClick={() => setRole("freelancer")} style={{
              padding: "20px 28px", borderRadius: 14, cursor: "pointer",
              border: `1px solid ${role === "freelancer" ? "rgba(34,211,138,0.6)" : "rgba(255,255,255,0.08)"}`,
              background: role === "freelancer" ? "rgba(34,211,138,0.08)" : "rgba(255,255,255,0.02)",
              textAlign: "left", minWidth: 220,
              boxShadow: role === "freelancer" ? "0 0 30px rgba(34,211,138,0.12)" : "none"
            }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>💼</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>I'm a Freelancer</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>I want to find work</div>
            </div>
          </div>

          {/* CTA Button */}
          <button style={{
            padding: "15px 44px", borderRadius: 12, fontSize: 16, fontWeight: 700,
            border: "none", cursor: "pointer", letterSpacing: "-0.3px",
            background: role === "freelancer"
              ? "linear-gradient(135deg, #22d38a, #059669)"
              : "linear-gradient(135deg, #8b5cf6, #6d28d9)",
            color: "#fff",
            boxShadow: role === "freelancer"
              ? "0 8px 32px rgba(34,211,138,0.3)"
              : "0 8px 32px rgba(139,92,246,0.35)",
            transform: "translateY(0)",
            transition: "all 0.2s ease",
            opacity: role ? 1 : 0.5
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(139,92,246,0.45)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(139,92,246,0.35)"; }}
          >
            {role === "freelancer" ? "Create Free Profile →" : role === "client" ? "Post a Project Free →" : "Get Started Free →"}
          </button>

          {/* Trust line */}
          <p style={{ marginTop: 20, fontSize: 13, color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>
            No credit card required · Free to join · 50,000+ verified freelancers
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 0, marginTop: 72, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 40, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { num: "10 min", label: "Avg. match time" },
              { num: "50K+", label: "Verified freelancers" },
              { num: "₹0", label: "To post a project" },
              { num: "4.9 / 5", label: "Client satisfaction" },
            ].map((s, i) => (
              <div key={s.label} style={{ textAlign: "center", padding: "0 40px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-1.5px", background: "linear-gradient(135deg, #8b5cf6, #22d38a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.num}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 6, fontWeight: 500, letterSpacing: "0.3px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ position: "relative", zIndex: 1, padding: "120px 24px", maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#8b5cf6", letterSpacing: "2px", marginBottom: 16, textTransform: "uppercase" }}>Process</div>
            <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-2px", marginBottom: 16 }}>How DutyFree works</h2>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 16, maxWidth: 400, margin: "0 auto" }}>From posting a project to getting it done — 7 seamless steps</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 16 }}>
            {[
              { n: "01", icon: "◆", title: "Sign Up", desc: "Choose your role — Client or Freelancer. No subscription, always free." },
              { n: "02", icon: "📋", title: "Post a Project", desc: "Title, budget, deadline, skills. Done in under 2 minutes." },
              { n: "03", icon: "⚡", title: "AI Matches You", desc: "Our AI scans thousands of freelancers and finds your perfect match." },
              { n: "04", icon: "🔔", title: "Get Notified", desc: "Within 10 minutes — see profiles, ratings, portfolios, and AI quotes." },
              { n: "05", icon: "🤝", title: "Accept the Deal", desc: "Confirm scope, price, and deadline. Everything locked in one click." },
              { n: "06", icon: "🔐", title: "Secure Escrow", desc: "Pay into our secure vault. Freelancer gets paid only on your approval." },
              { n: "07", icon: "✅", title: "Approve & Release", desc: "Review the work. Happy? Release payment. Issue? AI mediates fairly." },
            ].map((item) => (
              <div className="step-card" key={item.n} style={{
                padding: "28px", borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
                position: "relative", overflow: "hidden"
              }}>
                <div style={{ position: "absolute", top: 20, right: 20, fontSize: 11, fontWeight: 800, color: "rgba(139,92,246,0.4)", letterSpacing: "1px" }}>{item.n}</div>
                <div style={{ fontSize: 24, marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.3px" }}>{item.title}</h3>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.38)", lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TRUST */}
        <section style={{ position: "relative", zIndex: 1, padding: "100px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#22d38a", letterSpacing: "2px", marginBottom: 16, textTransform: "uppercase" }}>Trust & Safety</div>
            <h2 style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-2px", marginBottom: 16 }}>Built for both sides</h2>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 16, marginBottom: 64, maxWidth: 460, margin: "0 auto 64px" }}>
              Every transaction, every identity, every dispute — fully protected.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 20 }}>
              {[
                { icon: "🔐", title: "Escrow Protection", desc: "Funds held securely. Released only when you approve the work.", color: "#8b5cf6" },
                { icon: "🪪", title: "KYC Verified", desc: "Every user verified via Aadhaar/PAN. Zero fake accounts.", color: "#22d38a" },
                { icon: "⚖️", title: "AI Dispute Resolution", desc: "Fair, evidence-based decisions delivered within 48 hours.", color: "#06b6d4" },
                { icon: "🛡️", title: "AES-256 Encryption", desc: "Military-grade encryption on all sensitive data. Always.", color: "#f59e0b" },
              ].map((item) => (
                <div className="trust-card" key={item.title} style={{
                  padding: "32px 24px", borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                  textAlign: "left"
                }}>
                  <div style={{ fontSize: 32, marginBottom: 18 }}>{item.icon}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, color: "#fff" }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{ position: "relative", zIndex: 1, padding: "120px 24px", textAlign: "center" }}>
          <div style={{
            maxWidth: 680, margin: "0 auto", padding: "72px 48px", borderRadius: 24,
            border: "1px solid rgba(139,92,246,0.2)",
            background: "linear-gradient(135deg, rgba(139,92,246,0.07) 0%, rgba(34,211,138,0.04) 100%)",
            boxShadow: "0 0 80px rgba(139,92,246,0.08)"
          }}>
            <h2 style={{ fontSize: 42, fontWeight: 900, letterSpacing: "-2px", marginBottom: 16 }}>Start for free today</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, marginBottom: 40, lineHeight: 1.7 }}>
              No subscription. No hidden fees.<br />Just results.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <button style={{
                padding: "14px 36px", borderRadius: 10, fontSize: 15, fontWeight: 700,
                border: "none", background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                color: "#fff", cursor: "pointer", boxShadow: "0 8px 24px rgba(139,92,246,0.35)"
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >Post a Project →</button>
              <button style={{
                padding: "14px 36px", borderRadius: 10, fontSize: 15, fontWeight: 700,
                border: "1px solid rgba(34,211,138,0.4)", background: "rgba(34,211,138,0.08)",
                color: "#22d38a", cursor: "pointer"
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(34,211,138,0.15)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(34,211,138,0.08)"}
              >Join as Freelancer →</button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{
          position: "relative", zIndex: 1,
          padding: "28px 48px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg, #8b5cf6, #22d38a)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12 }}>D</div>
            <span style={{ fontWeight: 600, fontSize: 14, color: "rgba(255,255,255,0.5)" }}>DutyFree</span>
          </div>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.2)" }}>© 2025 DutyFree. All rights reserved.</span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.2)" }}>Made with ❤️ in India</span>
        </footer>

      </main>
    </>
  );
}