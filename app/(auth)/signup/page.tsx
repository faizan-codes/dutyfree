'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

type Role = 'client' | 'freelancer'

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()

  const [role, setRole] = useState<Role>('client')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleGoogleSignup = async () => {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?role=${role}`,
      },
    })
    if (error) setError(error.message)
    setLoading(false)
  }

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) { setError('Passwords do not match'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setError(error.message)
    } else if (data.user) {
      await supabase.from('profiles').update({ full_name: fullName, role }).eq('id', data.user.id)
      setSuccess(true)
    }
    setLoading(false)
  }

  if (success) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #080808; }
          .success-root {
            min-height: 100vh; background: #080808;
            display: flex; align-items: center; justify-content: center;
            font-family: 'DM Sans', sans-serif;
          }
          .success-card {
            text-align: center; max-width: 420px; padding: 0 24px;
          }
          .success-icon {
            width: 72px; height: 72px; background: rgba(0,210,100,0.1);
            border: 1px solid rgba(0,210,100,0.2); border-radius: 50%;
            display: flex; align-items: center; justify-content: center; margin: 0 auto 28px;
          }
          .success-title {
            font-family: 'Syne', sans-serif; font-size: 32px;
            font-weight: 700; color: #fff; margin-bottom: 12px;
          }
          .success-sub { color: #555; font-size: 15px; line-height: 1.7; margin-bottom: 8px; }
          .success-email { color: #fff; font-weight: 500; }
          .success-hint { color: #333; font-size: 13px; margin-bottom: 32px; }
          .success-btn {
            display: inline-block; background: #6c47ff; color: #fff;
            font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 600;
            padding: 14px 32px; border-radius: 10px; text-decoration: none;
            transition: background 0.2s;
          }
          .success-btn:hover { background: #5c38e8; }
        `}</style>
        <div className="success-root">
          <div className="success-card">
            <div className="success-icon">
              <svg width="32" height="32" fill="none" stroke="#00d264" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h2 className="success-title">Check your inbox</h2>
            <p className="success-sub">
              We sent a confirmation link to<br/>
              <span className="success-email">{email}</span>
            </p>
            <p className="success-hint">Click the link to activate your account. Check spam if you don't see it.</p>
            <Link href="/login" className="success-btn">Go to Sign In →</Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .signup-root {
          min-height: 100vh; background: #080808;
          display: flex; font-family: 'DM Sans', sans-serif;
          position: relative; overflow: hidden;
        }
        .blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.1; pointer-events: none; }
        .blob-1 { width: 500px; height: 500px; background: #6c47ff; top: -150px; right: 100px; }
        .blob-2 { width: 350px; height: 350px; background: #00d2ff; bottom: -100px; left: 200px; }
        .grid-overlay {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 60px 60px; pointer-events: none;
        }

        /* Left panel */
        .left-panel {
          flex: 1; display: flex; flex-direction: column; justify-content: center;
          padding: 60px; position: relative; z-index: 1;
        }
        .brand {
          font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: #6c47ff;
          margin-bottom: 60px; display: flex; align-items: center; gap: 8px;
        }
        .brand-dot { width: 6px; height: 6px; background: #6c47ff; border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }

        .hero-text {
          font-family: 'Syne', sans-serif; font-size: clamp(32px, 3.5vw, 50px);
          font-weight: 800; color: #fff; line-height: 1.1; margin-bottom: 20px;
        }
        .hero-text span { background: linear-gradient(135deg, #6c47ff, #00d2ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-sub { color: #555; font-size: 15px; line-height: 1.7; max-width: 340px; margin-bottom: 40px; }

        .perks { display: flex; flex-direction: column; gap: 16px; }
        .perk { display: flex; align-items: center; gap: 12px; }
        .perk-icon {
          width: 36px; height: 36px; border-radius: 8px; background: rgba(108,71,255,0.12);
          border: 1px solid rgba(108,71,255,0.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .perk-text { color: #666; font-size: 14px; }
        .perk-text strong { color: #aaa; font-weight: 500; }

        /* Right panel */
        .right-panel {
          width: 500px; min-height: 100vh; background: #0f0f0f;
          border-left: 1px solid #1a1a1a; display: flex; flex-direction: column;
          justify-content: center; padding: 48px; position: relative; z-index: 1; overflow-y: auto;
        }

        .form-title { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 700; color: #fff; margin-bottom: 4px; }
        .form-sub { color: #444; font-size: 14px; margin-bottom: 28px; }

        /* Role selector */
        .role-label { font-size: 11px; font-weight: 500; color: #444; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; }
        .role-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 24px; }
        .role-card {
          padding: 14px 16px; border-radius: 10px; border: 1.5px solid #1e1e1e;
          background: #141414; cursor: pointer; transition: all 0.2s; text-align: left;
        }
        .role-card:hover { border-color: #333; }
        .role-card.active { border-color: #6c47ff; background: rgba(108,71,255,0.08); }
        .role-emoji { font-size: 20px; margin-bottom: 6px; }
        .role-name { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 2px; }
        .role-desc { font-size: 11px; color: #444; }
        .role-card.active .role-desc { color: #6c7bff; }

        /* Google */
        .google-btn {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;
          background: #fff; color: #111; font-family: 'DM Sans', sans-serif; font-size: 14px;
          font-weight: 500; padding: 13px 20px; border-radius: 10px; border: none; cursor: pointer;
          transition: all 0.2s; margin-bottom: 20px;
        }
        .google-btn:hover { background: #f0f0f0; transform: translateY(-1px); }
        .google-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        /* Divider */
        .divider { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .divider-line { flex: 1; height: 1px; background: #1e1e1e; }
        .divider-text { color: #333; font-size: 12px; }

        /* Alert */
        .alert { padding: 11px 14px; border-radius: 8px; font-size: 13px; margin-bottom: 16px; }
        .alert-error { background: rgba(255,80,80,0.08); border: 1px solid rgba(255,80,80,0.2); color: #ff6b6b; }

        /* Fields */
        .field { margin-bottom: 14px; }
        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px; }
        .field-label { display: block; font-size: 11px; font-weight: 500; color: #444; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 7px; }
        .field-input {
          width: 100%; background: #161616; border: 1px solid #1e1e1e; border-radius: 10px;
          padding: 12px 16px; color: #fff; font-family: 'DM Sans', sans-serif; font-size: 14px;
          outline: none; transition: border-color 0.2s;
        }
        .field-input::placeholder { color: #2a2a2a; }
        .field-input:focus { border-color: #6c47ff; }
        .field-input-wrap { position: relative; }
        .field-input-wrap .field-input { padding-right: 44px; }
        .eye-btn { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #333; cursor: pointer; }
        .eye-btn:hover { color: #666; }

        /* Submit */
        .submit-btn {
          width: 100%; background: #6c47ff; color: #fff; font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 600; padding: 14px; border-radius: 10px; border: none;
          cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 4px;
        }
        .submit-btn:hover:not(:disabled) { background: #5c38e8; transform: translateY(-1px); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .form-footer { text-align: center; color: #333; font-size: 13px; margin-top: 20px; }
        .form-footer a { color: #6c47ff; text-decoration: none; font-weight: 500; }
        .form-footer a:hover { color: #8b6bff; }

        .terms { color: #2a2a2a; font-size: 12px; text-align: center; margin-top: 14px; line-height: 1.6; }
        .terms a { color: #444; text-decoration: underline; }

        @media (max-width: 900px) {
          .left-panel { display: none; }
          .right-panel { width: 100%; border-left: none; padding: 32px 20px; }
        }
      `}</style>

      <div className="signup-root">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="grid-overlay" />

        {/* Left Panel */}
        <div className="left-panel">
          <div className="brand">
            <div className="brand-dot" />
            DutyFree
          </div>
          <h1 className="hero-text">
            Your skills deserve<br />
            <span>better pay.</span>
          </h1>
          <p className="hero-sub">
            Join thousands of freelancers and clients building successful projects on India's smartest platform.
          </p>
          <div className="perks">
            <div className="perk">
              <div className="perk-icon">
                <svg width="16" height="16" fill="none" stroke="#6c47ff" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div className="perk-text"><strong>AI-powered matching</strong> — Get matched with the right people instantly</div>
            </div>
            <div className="perk">
              <div className="perk-icon">
                <svg width="16" height="16" fill="none" stroke="#6c47ff" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <div className="perk-text"><strong>Escrow payments</strong> — Your money is protected until work is done</div>
            </div>
            <div className="perk">
              <div className="perk-icon">
                <svg width="16" height="16" fill="none" stroke="#6c47ff" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <div className="perk-text"><strong>Fast onboarding</strong> — Get started in under 5 minutes, free forever</div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <h2 className="form-title">Create your account</h2>
          <p className="form-sub">Free forever. No credit card required.</p>

          {/* Role */}
          <p className="role-label">I am a...</p>
          <div className="role-grid">
            <button type="button" className={`role-card ${role === 'client' ? 'active' : ''}`} onClick={() => setRole('client')}>
              <div className="role-emoji">💼</div>
              <div className="role-name">Client</div>
              <div className="role-desc">I need work done</div>
            </button>
            <button type="button" className={`role-card ${role === 'freelancer' ? 'active' : ''}`} onClick={() => setRole('freelancer')}>
              <div className="role-emoji">🧑‍💻</div>
              <div className="role-name">Freelancer</div>
              <div className="role-desc">I offer services</div>
            </button>
          </div>

          {/* Google */}
          <button className="google-btn" onClick={handleGoogleSignup} disabled={loading}>
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
            <span className="divider-text">or sign up with email</span>
            <div className="divider-line" />
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleEmailSignup}>
            <div className="field">
              <label className="field-label">Full Name</label>
              <input className="field-input" type="text" placeholder="John Doe"
                value={fullName} onChange={e => setFullName(e.target.value)} required />
            </div>
            <div className="field">
              <label className="field-label">Email Address</label>
              <input className="field-input" type="email" placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="field-row">
              <div>
                <label className="field-label">Password</label>
                <div className="field-input-wrap">
                  <input className="field-input" type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                  <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <label className="field-label">Confirm Password</label>
                <input className="field-input" type="password" placeholder="••••••••"
                  value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
              </div>
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? <div className="spinner" /> : 'Create Account →'}
            </button>
          </form>

          <p className="terms">
            By signing up you agree to our{' '}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
          </p>

          <div className="form-footer">
            Already have an account?{' '}
            <Link href="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </>
  )
}
