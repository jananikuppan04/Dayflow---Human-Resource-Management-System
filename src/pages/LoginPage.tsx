import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageBackground from '../components/PageBackground'
import Navbar from '../components/Navbar'
import { useToast, ToastContainer } from '../components/Toast'

import { useAuth } from '../store/AuthContext'
import { mockApi } from '../services/mockApi'

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { toasts, addToast } = useToast()
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!loginId.trim()) { addToast('Please enter your login ID or email.', 'error'); return }
    if (!password)        { addToast('Please enter your password.', 'error'); return }
    setLoading(true)
    try {
      const user = await mockApi.login(loginId.trim(), password)
      login(user)
      addToast('Welcome back to Dayflow!', 'success')
      setTimeout(() => navigate('/dashboard'), 800)
    } catch (err: any) {
      addToast(err.message || 'Login failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageBackground>
      <div className="page-wrapper">
        <Navbar />
        <ToastContainer toasts={toasts} />

        <main className="main-content">
          {/* Hero */}
          <div className="hero">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Enterprise HR Platform
            </div>
            <h1 className="hero-title">
              Every workday,<br />
              <span className="gradient-text">perfectly</span> aligned.
            </h1>
            <p className="hero-subtitle">
              A smarter way to manage your people, attendance,<br />leave, and HR operations.
            </p>
          </div>

          {/* Card */}
          <div className="auth-card">
            <div className="card-header">
              <div className="card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h2 className="card-title">Welcome back</h2>
              <p className="card-subtitle">Sign in to continue to your Dayflow account</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="loginId">Login ID / Email</label>
                <div className="input-wrap">
                  <span className="input-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </span>
                  <input
                    id="loginId" type="text" className="form-input has-action"
                    placeholder="Enter your login ID or email"
                    value={loginId} onChange={e => setLoginId(e.target.value)}
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <div className="input-wrap">
                  <span className="input-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </span>
                  <input
                    id="password" type={showPw ? 'text' : 'password'}
                    className="form-input has-action"
                    placeholder="Enter your password"
                    value={password} onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <button type="button" className="input-action" onClick={() => setShowPw(v => !v)} aria-label="Toggle password">
                    <EyeIcon open={showPw} />
                  </button>
                </div>
              </div>

              <div className="form-row">
                <label className="checkbox-label">
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                  Remember me
                </label>
                <a href="#" className="forgot-link" onClick={e => { e.preventDefault(); addToast('Password reset email sent.', 'success') }}>
                  Forgot Password?
                </a>
              </div>

              <button id="signin-btn" type="submit" className="btn-primary" disabled={loading}>
                {loading ? <span className="spinner" /> : <>Sign In <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></>}
              </button>
            </form>

            <div className="card-divider" />

            <div className="card-footer">
              <p>Don't have an account?{' '}
                <a id="goto-signup" onClick={() => navigate('/signup')} role="button">Sign Up →</a>
              </p>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="trust-indicators">
            {[
              { icon: '🔒', label: 'Secure Authentication' },
              { icon: '🛡️', label: 'Role-Based Access' },
              { icon: '🏢', label: 'Enterprise Ready' },
            ].map(({ icon, label }) => (
              <div key={label} className="trust-item">
                <span className="trust-icon">{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </main>
      </div>
    </PageBackground>
  )
}
