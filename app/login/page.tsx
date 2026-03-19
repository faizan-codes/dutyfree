"use client";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #060608; }
        .input-field {
          width: 100%; padding: 14px 16px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: #fff; font-size: 15px; font-family: 'Inter', sans-serif;
          outline: none; transition: border-color 0.2s;
        }
        .input-field:focus { border-color: rgba(139,92,246,0.6); background: rgba(139,92,246,0.05); }
        .input-field::placeholder { color: rgba(255,255,255,0.25); }
        .submit-btn { transition: all 0.2s ease; }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(139,92,246,0.5) !important; }
        .google-btn:hover { background: rgba(255,255,255,0.08) !important; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeIn 0.4s ease forwards; }
      `}</style>

      <main style={{ fontFamily: "'Inter', sans-serif", background: "#060608", color: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>

        {/* Background orbs */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-10%", right: "20%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "10%", left: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,138,0.07) 0%, transparent 70%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 440 }}>

          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #8b5cf6, #22d38a)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, boxShadow: "0 0 20px rgba(139,92,246,0.4)" }}>D</div>
              <span style={{ fontWeight: 700, fontSize: 20, color: "#fff", letterSpacing: "-0.5px" }}>DutyFree</span>
            </a>
          </div>

          {/* Card */}
          <div className="fade-in" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "40px", backdropFilter: "blur(20px)" }}>

            <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-1px", marginBottom: 8 }}>Welcome back</h1>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 32 }}>Log in to your DutyFree account</p>

            {/* Google Button */}
            <button className="google-btn" style={{
              width: "100%", padding: "13px", borderRadius: 10, fontSize: 14, fontWeight: 600,
              border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)",
              color: "#fff", cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", gap: 10, marginBottom: 24, transition: "background 0.2s"
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", fontWeight: 500 }}>or with email</span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
            </div>

            {/* Form */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 6 }}>Email Address</label>
                <input className="input-field" name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>Password</label>
                  <a href="/forgot-password" style={{ fontSize: 13, color: "#8b5cf6", textDecoration: "none", fontWeight: 500 }}>Forgot password?</a>
                </div>
                <div style={{ position: "relative" }}>
                  <input className="input-field" name="password" type={showPass ? "text" : "password"} placeholder="Enter your password" value={form.password} onChange={handleChange} style={{ paddingRight: 48 }} />
                  <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: 16 }}>
                    {showPass ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
            </div>

            {/* Login Button */}
            <button className="submit-btn" style={{
              width: "100%", padding: "14px", borderRadius: 12, fontSize: 15, fontWeight: 700,
              border: "none", cursor: "pointer", marginBottom: 24,
              background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
              color: "#fff", boxShadow: "0 8px 28px rgba(139,92,246,0.35)"
            }}>
              Log In →
            </button>

            {/* Divider */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24 }}>
              <p style={{ textAlign: "center", fontSize: 14, color: "rgba(255,255,255,0.3)" }}>
                Don't have an account?{" "}
                <a href="/signup" style={{ color: "#8b5cf6", textDecoration: "none", fontWeight: 600 }}>Sign up free</a>
              </p>
            </div>
          </div>

          {/* Trust line */}
          <p style={{ textAlign: "center", marginTop: 24, fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
            Protected by AES-256 encryption · Your data is safe
          </p>
        </div>
      </main>
    </>
  );
}