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

  // ── Google OAuth ──────────────────────────────────────────
  const handleGoogleLogin = async () => {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) setError(error.message)
    setLoading(false)
  }

  // ── Email + Password ──────────────────────────────────────
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }
    setLoading(false)
  }

  // ── Phone OTP — Send ──────────────────────────────────────
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const formatted = phone.startsWith('+') ? phone : `+91${phone}`
    const { error } = await supabase.auth.signInWithOtp({ phone: formatted })
    if (error) {
      setError(error.message)
    } else {
      setOtpSent(true)
      setMessage(`OTP bheja gaya: ${formatted}`)
    }
    setLoading(false)
  }

  // ── Phone OTP — Verify ────────────────────────────────────
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const formatted = phone.startsWith('+') ? phone : `+91${phone}`
    const { error } = await supabase.auth.verifyOtp({
      phone: formatted,
      token: otp,
      type: 'sms',
    })
    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">DutyFree</h1>
          <p className="text-gray-400 mt-2">Apne account mein login karo</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold py-3 px-4 rounded-xl hover:bg-gray-100 transition-all duration-200 mb-6 disabled:opacity-50"
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Google se login karo
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-700" />
            <span className="text-gray-500 text-sm">ya</span>
            <div className="flex-1 h-px bg-gray-700" />
          </div>

          {/* Tab Switch */}
          <div className="flex bg-gray-800 rounded-xl p-1 mb-6">
            <button
              onClick={() => { setTab('email'); setError(''); setMessage('') }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === 'email'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => { setTab('phone'); setError(''); setMessage('') }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === 'phone'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Phone OTP
            </button>
          </div>

          {/* Error / Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-xl px-4 py-3 mb-4">
              {message}
            </div>
          )}

          {/* Email Form */}
          {tab === 'email' && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="aapka@email.com"
                  required
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors placeholder-gray-600"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors placeholder-gray-600"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50 mt-2"
              >
                {loading ? 'Login ho raha hai...' : 'Login Karo'}
              </button>
            </form>
          )}

          {/* Phone OTP Form */}
          {tab === 'phone' && (
            <div className="space-y-4">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-1.5 block">Phone Number</label>
                    <div className="flex gap-2">
                      <div className="bg-gray-800 border border-gray-700 text-gray-400 rounded-xl px-3 py-3 text-sm flex items-center">
                        +91
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="9876543210"
                        required
                        maxLength={10}
                        className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors placeholder-gray-600"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50"
                  >
                    {loading ? 'OTP bhej rahe hain...' : 'OTP Bhejo'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-1.5 block">OTP Enter Karo</label>
                    <input
                      type="text"
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                      placeholder="6 digit OTP"
                      required
                      maxLength={6}
                      className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors placeholder-gray-600 text-center text-2xl tracking-widest"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50"
                  >
                    {loading ? 'Verify ho raha hai...' : 'Verify Karo'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setOtpSent(false); setOtp(''); setMessage('') }}
                    className="w-full text-gray-500 text-sm hover:text-gray-300 transition-colors"
                  >
                    Phone number badlo
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Signup Link */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Account nahi hai?{' '}
            <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Sign up karo
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
