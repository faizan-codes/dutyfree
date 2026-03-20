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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // ── Google OAuth ──────────────────────────────────────────
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

  // ── Email + Password ──────────────────────────────────────
  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords match nahi kar rahe!')
      return
    }
    if (password.length < 6) {
      setError('Password kam se kam 6 characters ka hona chahiye')
      return
    }

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
      // Update profile with role
      await supabase
        .from('profiles')
        .update({ full_name: fullName, role })
        .eq('id', data.user.id)

      setSuccess(true)
    }
    setLoading(false)
  }

  // ── Success Screen ────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Email bheja gaya!</h2>
          <p className="text-gray-400 mb-1">
            <span className="text-white font-medium">{email}</span> pe confirmation link bheja gaya hai.
          </p>
          <p className="text-gray-500 text-sm mb-6">Email check karo aur link pe click karo — phir login ho jayega.</p>
          <Link
            href="/login"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-8 rounded-xl transition-all"
          >
            Login Page pe Jao
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">DutyFree</h1>
          <p className="text-gray-400 mt-2">Naya account banao</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">

          {/* Role Selection */}
          <div className="mb-6">
            <p className="text-gray-400 text-sm mb-3">Main hoon ek...</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setRole('client')}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  role === 'client'
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="text-2xl mb-1">💼</div>
                <div className="text-white font-medium text-sm">Client</div>
                <div className="text-gray-500 text-xs mt-0.5">Kaam deta hoon</div>
              </button>
              <button
                onClick={() => setRole('freelancer')}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  role === 'freelancer'
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="text-2xl mb-1">🧑‍💻</div>
                <div className="text-white font-medium text-sm">Freelancer</div>
                <div className="text-gray-500 text-xs mt-0.5">Kaam karta hoon</div>
              </button>
            </div>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold py-3 px-4 rounded-xl hover:bg-gray-100 transition-all duration-200 mb-6 disabled:opacity-50"
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Google se signup karo
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-700" />
            <span className="text-gray-500 text-sm">ya email se</span>
            <div className="flex-1 h-px bg-gray-700" />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}

          {/* Email Form */}
          <form onSubmit={handleEmailSignup} className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Poora Naam</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Faizan Ahmed"
                required
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors placeholder-gray-600"
              />
            </div>
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
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Password Confirm Karo</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
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
              {loading ? 'Account ban raha hai...' : 'Account Banao'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Pehle se account hai?{' '}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Login karo
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
