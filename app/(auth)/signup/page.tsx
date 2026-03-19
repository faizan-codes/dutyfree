"use client";
import { useState } from "react";

export default function SignUp() {
  const [role, setRole] = useState<"client" | "freelancer" | null>(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);

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
        .role-card { transition: all 0.2s ease; }
        .role-card:hover { border-color: rgba(255,255,255,0.2) !important; transform: translateY(-2px); }
        .submit-btn { transition: all 0.2s ease; }
        .submit-btn:hover { transform: translateY(-2px); }
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeIn 0.4s ease forwards; }
      `}</style>

      <main style={{ fontFamily: "'Inter', sans-serif", background: "#060608", color: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>

        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-10%", left: "30%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "0%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,138,0.07) 0%, transparent 70%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480 }}>

          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #8b5cf6, #22d38a)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, boxShadow: "0 0 20px rgba(139,92,246,0.4)" }}>D</div>
              <span style={{ fontWeight: 700, fontSize: 20, color: "#fff", letterSpacing: "-0.5px" }}>DutyFree</span>
            </a>
          </div>

          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "40px", backdropFilter: "blur(20px)" }}>

            {step === 1 && (
              <div className="fade-in">
                <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-1px", marginBottom: 8 }}>Join DutyFree</h1>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 32 }}>First, tell us who you are</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
                  <div className="role-card" onClick={() => setRole("client")} style={{
                    padding: "20px 24px", borderRadius: 14, cursor: "pointer",
                    border: `1px solid ${role === "client" ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.07)"}`,
                    background: role === "client" ? "rgba(139,92,246,0.1)" : "rgba(255,255,255,0.02)",
                    display: "flex", alignItems: "center", gap: 16,
                    boxShadow: role === "client" ? "0 0 24px rgba(139,92,246,0.15)" : "none"
                  }}>
                    <div style={{ fontSize: 32 }}>🏢</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 3 }}>I am a Client</div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.38)" }}>I want to hire freelancers for my projects</div>
                    </div>
                    <div style={{ marginLeft: "auto", width: 20, height: 20, borderRadius: "50%", border: `2px solid ${role === "client" ? "#8b5cf6" : "rgba(255,255,255,0.2)"}`, background: role === "client" ? "#8b5cf6" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>
                      {role === "client" && "✓"}
                    </div>
                  </div>

                  <div className="role-card" onClick={() => setRole("freelancer")} style={{
                    padding: "20px 24px", borderRadius: 14, cursor: "pointer",
                    border: `1px solid ${role === "freelancer" ? "rgba(34,211,138,0.6)" : "rgba(255,255,255,0.07)"}`,
                    background: role === "freelancer" ? "rgba(34,211,138,0.08)" : "rgba(255,255,255,0.02)",
                    display: "flex", alignItems: "center", gap: 16,
                    boxShadow: role === "freelancer" ? "0 0 24px rgba(34,211,138,0.12)" : "none"
                  }}>
                    <div style={{ fontSize: 32 }}>💼</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 3 }}>I am a Freelancer</div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.38)" }}>I want to find work and grow my career</div>
                    </div>
                    <div style={{ marginLeft: "auto", width: 20, height: 20, borderRadius: "50%", border: `2px solid ${role === "freelancer" ? "#22d38a" : "rgba(255,255,255,0.2)"}`, background: role === "freelancer" ? "#22d38a" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>
                      {role === "freelancer" && "✓"}
                    </div>
                  </div>
                </div>

                <button className="submit-btn" onClick={() => role && setStep(2)} style={{
                  width: "100%", padding: "14px", borderRadius: 12, fontSize: 15, fontWeight: 700,
                  border: "none", cursor: role ? "pointer" : "not-allowed",
                  background: role ? "linear-gradient(135deg, #8b5cf6, #6d28d9)" : "rgba(255,255,255,0.06)",
                  color: role ? "#fff" : "rgba(255,255,255,0.3)",
                  boxShadow: role ? "0 8px 28px rgba(139,92,246,0.35)" : "none"
                }}>
                  Continue →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="fade-in">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                  <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 18, padding: 0 }}>←</button>
                  <div style={{ padding: "4px 12px", borderRadius: 100, fontSize: 12, fontWeight: 600, background: role === "client" ? "rgba(139,92,246,0.15)" : "rgba(34,211,138,0.12)", color: role === "client" ? "#a78bfa" : "#22d38a", border: `1px solid ${role === "client" ? "rgba(139,92,246,0.3)" : "rgba(34,211,138,0.3)"}` }}>
                    {role === "client" ? "🏢 Client" : "💼 Freelancer"}
                  </div>
                </div>

                <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-1px", marginBottom: 8 }}>Create your account</h1>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 28 }}>Free forever. No credit card needed.</p>

                <button style={{
                  width: "100%", padding: "13px", borderRadius: 10, fontSize: 14, fontWeight: 600,
                  border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)",
                  color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 24
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Continue with Google
                </button>

                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", fontWeight: 500 }}>or with email</span>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 6 }}>Full Name</label>
                    <input className="input-field" name="name" type="text" placeholder="John Doe" value={form.name} onChange={handleChange} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 6 }}>Email Address</label>
                    <input className="input-field" name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 6 }}>Password</label>
                    <div style={{ position: "relative" }}>
                      <input className="input-field" name="password" type={showPass ? "text" : "password"} placeholder="Min. 8 characters" value={form.password} onChange={handleChange} style={{ paddingRight: 48 }} />
                      <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: 16 }}>
                        {showPass ? "🙈" : "👁️"}
                      </button>
                    </div>
                  </div>
                </div>

                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 24, cursor: "pointer" }}>
                  <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ marginTop: 3, accentColor: "#8b5cf6" }} />
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>
                    I agree to DutyFree's{" "}
                    <a href="#" style={{ color: "#8b5cf6", textDecoration: "none" }}>Terms of Service</a>
                    {" "}and{" "}
                    <a href="#" style={{ color: "#8b5cf6", textDecoration: "none" }}>Privacy Policy</a>
                  </span>
                </label>

                <button className="submit-btn" style={{
                  width: "100%", padding: "14px", borderRadius: 12, fontSize: 15, fontWeight: 700,
                  border: "none", cursor: "pointer",
                  background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                  color: "#fff", boxShadow: "0 8px 28px rgba(139,92,246,0.35)"
                }}>
                  Create Account →
                </button>
              </div>
            )}

            <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "rgba(255,255,255,0.3)" }}>
              Already have an account?{" "}
              <a href="/login" style={{ color: "#8b5cf6", textDecoration: "none", fontWeight: 600 }}>Log in</a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}