'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

type Tab = 'email' | 'phone'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [tab, setTab] = useState<Tab>('email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) setError(error.message)
    setLoading(false)
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else router.push('/dashboard')
    setLoading(false)
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const formatted = phone.startsWith('+') ? phone : `+91${phone}`
    const { error } = await supabase.auth.signInWithOtp({ phone: formatted })
    if (error) setError(error.message)
    else { setOtpSent(true); setMessage(`OTP sent to ${formatted}`) }
    setLoading(false)
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const formatted = phone.startsWith('+') ? phone : `+91${phone}`
    const { error } = await supabase.auth.verifyOtp({ phone: formatted, token: otp, type: 'sms' })
    if (error) setError(error.message)
    else router.push('/dashboard')
    setLoading(false)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          background: #080808;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Ambient background blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.12;
          pointer-events: none;
        }
        .blob-1 { width: 600px; height: 600px; background: #6c47ff; top: -200px; left: -200px; }
        .blob-2 { width: 400px; height: 400px; background: #00d2ff; bottom: -100px; right: -100px; }
        .blob-3 { width: 300px; height: 300px; background: #ff6b6b; top: 40%; left: 30%; }

        /* Grid overlay */
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* Left panel */
        .left-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px;
          position: relative;
          z-index: 1;
        }

        .brand {
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #6c47ff;
          margin-bottom: 60px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .brand-dot {
          width: 6px;
          height: 6px;
          background: #6c47ff;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .hero-text {
          font-family: 'Syne', sans-serif;
          font-size: clamp(36px, 4vw, 56px);
          font-weight: 800;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 20px;
        }

        .hero-text span {
          background: linear-gradient(135deg, #6c47ff, #00d2ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          color: #666;
          font-size: 16px;
          line-height: 1.7;
          max-width: 360px;
          margin-bottom: 48px;
        }

        .stats {
          display: flex;
          gap: 40px;
        }

        .stat-item {}
        .stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #fff;
        }
        .stat-label {
          font-size: 12px;
          color: #444;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 2px;
        }

        /* Right panel */
        .right-panel {
          width: 480px;
          min-height: 100vh;
          background: #0f0f0f;
          border-left: 1px solid #1a1a1a;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 48px;
          position: relative;
          z-index: 1;
        }

        .form-title {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 6px;
        }

        .form-sub {
          color: #555;
          font-size: 14px;
          margin-bottom: 32px;
        }

        /* Google button */
        .google-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #fff;
          color: #111;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          padding: 13px 20px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 24px;
        }
        .google-btn:hover { background: #f0f0f0; transform: translateY(-1px); }
        .google-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        /* Divider */
        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }
        .divider-line { flex: 1; height: 1px; background: #1e1e1e; }
        .divider-text { color: #333; font-size: 12px; white-space: nowrap; }

        /* Tabs */
        .tabs {
          display: flex;
          background: #161616;
          border-radius: 8px;
          padding: 4px;
          margin-bottom: 24px;
          border: 1px solid #1e1e1e;
        }
        .tab-btn {
          flex: 1;
          padding: 8px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: #444;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab-btn.active {
          background: #6c47ff;
          color: #fff;
        }

        /* Error / Success */
        .alert {
          padding: 12px 14px;
          border-radius: 8px;
          font-size: 13px;
          margin-bottom: 16px;
        }
        .alert-error { background: rgba(255,80,80,0.08); border: 1px solid rgba(255,80,80,0.2); color: #ff6b6b; }
        .alert-success { background: rgba(0,210,100,0.08); border: 1px solid rgba(0,210,100,0.2); color: #00d264; }

        /* Form fields */
        .field { margin-bottom: 16px; }
        .field-label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: #444;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 8px;
        }
        .field-input {
          width: 100%;
          background: #161616;
          border: 1px solid #1e1e1e;
          border-radius: 10px;
          padding: 13px 16px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }
        .field-input::placeholder { color: #333; }
        .field-input:focus { border-color: #6c47ff; }

        .field-input-wrap { position: relative; }
        .field-input-wrap .field-input { padding-right: 48px; }
        .eye-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #444;
          cursor: pointer;
          padding: 4px;
          line-height: 1;
        }
        .eye-btn:hover { color: #888; }

        .phone-wrap { display: flex; gap: 8px; }
        .phone-prefix {
          background: #161616;
          border: 1px solid #1e1e1e;
          border-radius: 10px;
          padding: 13px 14px;
          color: #555;
          font-size: 14px;
          white-space: nowrap;
        }

        /* Submit button */
        .submit-btn {
          width: 100%;
          background: #6c47ff;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 14px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.02em;
          margin-top: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .submit-btn:hover:not(:disabled) { background: #5c38e8; transform: translateY(-1px); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        /* OTP input */
        .otp-input {
          text-align: center;
          font-size: 24px;
          letter-spacing: 0.3em;
          font-family: 'Syne', sans-serif;
        }

        /* Back link */
        .back-link {
          background: none;
          border: none;
          color: #444;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          cursor: pointer;
          text-align: center;
          width: 100%;
          margin-top: 10px;
          padding: 8px;
          transition: color 0.2s;
        }
        .back-link:hover { color: #888; }

        /* Footer */
        .form-footer {
          text-align: center;
          color: #333;
          font-size: 13px;
          margin-top: 24px;
        }
        .form-footer a {
          color: #6c47ff;
          text-decoration: none;
          font-weight: 500;
        }
        .form-footer a:hover { color: #8b6bff; }

        /* Loading spinner */
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Responsive */
        @media (max-width: 900px) {
          .left-panel { display: none; }
          .right-panel { width: 100%; border-left: none; padding: 40px 24px; }
        }
      `}</style>

      <div className="login-root">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="grid-overlay" />

        {/* Left Panel */}
        <div className="left-panel">
          <div className="brand">
            <div className="brand-dot" />
            DutyFree
          </div>

          <h1 className="hero-text">
            Work smarter.<br />
            Get paid <span>faster.</span>
          </h1>

          <p className="hero-sub">
            India's AI-powered freelance platform. Connect with verified clients,
            close deals, and receive payments — all in one place.
          </p>

          <div className="stats">
            <div className="stat-item">
              <div className="stat-num">10K+</div>
              <div className="stat-label">Freelancers</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">₹2Cr+</div>
              <div className="stat-label">Paid Out</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">4.9★</div>
              <div className="stat-label">Rating</div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <h2 className="form-title">Welcome back</h2>
          <p className="form-sub">Sign in to your DutyFree account</p>

          {/* Google */}
          <button className="google-btn" onClick={handleGoogleLogin} disabled={loading}>
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>

          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">or continue with</span>
            <div className="divider-line" />
          </div>

          {/* Tabs */}
          <div className="tabs">
            <button className={`tab-btn ${tab === 'email' ? 'active' : ''}`}
              onClick={() => { setTab('email'); setError(''); setMessage('') }}>
              Email
            </button>
            <button className={`tab-btn ${tab === 'phone' ? 'active' : ''}`}
              onClick={() => { setTab('phone'); setError(''); setMessage('') }}>
              Phone OTP
            </button>
          </div>

          {error && <div className="alert alert-error">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}

          {/* Email Form */}
          {tab === 'email' && (
            <form onSubmit={handleEmailLogin}>
              <div className="field">
                <label className="field-label">Email address</label>
                <input className="field-input" type="email" placeholder="you@example.com"
                  value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="field">
                <label className="field-label">Password</label>
                <div className="field-input-wrap">
                  <input className="field-input" type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••" value={password}
                    onChange={e => setPassword(e.target.value)} required />
                  <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? <div className="spinner" /> : 'Sign In →'}
              </button>
            </form>
          )}

          {/* Phone OTP */}
          {tab === 'phone' && !otpSent && (
            <form onSubmit={handleSendOtp}>
              <div className="field">
                <label className="field-label">Phone Number</label>
                <div className="phone-wrap">
                  <span className="phone-prefix">+91</span>
                  <input className="field-input" type="tel" placeholder="9876543210"
                    value={phone} onChange={e => setPhone(e.target.value)}
                    required maxLength={10} style={{flex:1}} />
                </div>
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? <div className="spinner" /> : 'Send OTP →'}
              </button>
            </form>
          )}

          {tab === 'phone' && otpSent && (
            <form onSubmit={handleVerifyOtp}>
              <div className="field">
                <label className="field-label">Enter OTP</label>
                <input className="field-input otp-input" type="text" placeholder="——————"
                  value={otp} onChange={e => setOtp(e.target.value)} required maxLength={6} />
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? <div className="spinner" /> : 'Verify OTP →'}
              </button>
              <button type="button" className="back-link"
                onClick={() => { setOtpSent(false); setOtp(''); setMessage('') }}>
                ← Change number
              </button>
            </form>
          )}

          <div className="form-footer">
            Don't have an account?{' '}
            <Link href="/signup">Create one free</Link>
          </div>
        </div>
      </div>
    </>
  )
}
