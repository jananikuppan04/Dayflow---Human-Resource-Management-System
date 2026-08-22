import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import PageBackground from '../components/auth/PageBackground'
import { useToast, ToastContainer } from '../components/auth/Toast'

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

function computeLoginId(company: string, firstName: string, lastName: string, year: string) {
  const code = company.replace(/\s+/g, '').toUpperCase().slice(0, 5) || 'COMP'
  const fn   = firstName.replace(/\s+/g, '').toUpperCase().slice(0, 2) || 'XX'
  const ln   = lastName.replace(/\s+/g, '').toUpperCase().slice(0, 2) || 'XX'
  const yr   = year || new Date().getFullYear().toString()
  return `${code}${fn}${ln}${yr}0001`
}

function generatePassword() {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$'
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export default function SignupPage() {
  const navigate = useNavigate()
  const { toasts, addToast } = useToast()
  const fileRef = useRef<HTMLInputElement>(null)

  const [drag, setDrag] = useState(false)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const [company, setCompany]     = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName]   = useState('')
  const [email, setEmail]         = useState('')
  const [phone, setPhone]         = useState('')
  const [year, setYear]           = useState('')

  const [password]    = useState(generatePassword)
  const [showPw, setShowPw]       = useState(false)
  const [showCPw, setShowCPw]     = useState(false)

  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState(false)

  const loginId = computeLoginId(company, firstName, lastName, year)

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i)

  function handleFile(file: File) {
    if (!file.type.match(/image\/(png|jpeg|jpg)/)) { addToast('Please upload PNG or JPG only.', 'error'); return }
    if (file.size > 2 * 1024 * 1024) { addToast('File size must be under 2MB.', 'error'); return }
    setLogoFile(file)
    const reader = new FileReader()
    reader.onload = e => setLogoPreview(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!company) { addToast('Company name is required.', 'error'); return }
    if (!firstName || !lastName) { addToast('Employee name is required.', 'error'); return }
    if (!email.includes('@')) { addToast('Enter a valid email address.', 'error'); return }
    if (!phone) { addToast('Phone number is required.', 'error'); return }
    if (!year) { addToast('Year of joining is required.', 'error'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 2000))
    setLoading(false)
    setSuccess(true)
    addToast(`Account created! Login ID: ${loginId}`, 'success')
    setTimeout(() => navigate('/login'), 2500)
  }

  return (
    <PageBackground>
      <ToastContainer toasts={toasts} />

      {/* Top bar */}
      <div className="signup-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => navigate('/login')}>
          <div className="nav-logo-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div className="nav-logo-text">
            <span className="nav-logo-title">Dayflow</span>
            <span className="nav-logo-sub">HRM System</span>
          </div>
        </div>
        <button className="signup-back-btn" onClick={() => navigate('/login')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Back to Sign In
        </button>
      </div>

      <div className="signup-content">
        {/* Hero */}
        <div className="hero" style={{ marginBottom: 32 }}>
          <h1 className="hero-title" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>
            Build your team on <span className="gradient-text">Dayflow.</span>
          </h1>
          <p className="hero-subtitle">
            Create a secure employee account and get your workforce connected.
          </p>
        </div>

        {/* Card */}
        <div className="signup-card">
          <div className="card-header" style={{ marginBottom: 24 }}>
            <div className="card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
              </svg>
            </div>
            <h2 className="card-title">Create Employee Account</h2>
            <p className="card-subtitle">Enter employee details to create a secure Dayflow account.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Company Info */}
            <p className="section-label">Company Information</p>

            <div className="form-group">
              <label className="form-label" htmlFor="companyName">
                Company Name <span className="required">*</span>
              </label>
              <input
                id="companyName" type="text" className="form-input no-icon"
                placeholder="Enter company name"
                value={company} onChange={e => setCompany(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Upload Company Logo</label>
              <div
                className={`upload-area${drag ? ' drag-over' : ''}`}
                onDragOver={e => { e.preventDefault(); setDrag(true) }}
                onDragLeave={() => setDrag(false)}
                onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
                onClick={() => fileRef.current?.click()}
              >
                <input
                  ref={fileRef} type="file" accept="image/png,image/jpeg"
                  onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
                  style={{ display: 'none' }}
                />
                {logoPreview ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <img src={logoPreview} alt="Logo preview" style={{ height: 56, objectFit: 'contain', borderRadius: 8 }} />
                    <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{logoFile?.name}</span>
                  </div>
                ) : (
                  <>
                    <div className="upload-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
                        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
                      </svg>
                    </div>
                    <p className="upload-title">Drop your logo here</p>
                    <p className="upload-sub">or <span>browse from your computer</span></p>
                    <p className="upload-sub" style={{ marginTop: 4 }}>PNG, JPG · Max 2MB</p>
                  </>
                )}
              </div>
            </div>

            <div className="card-divider" />

            {/* Employee Info */}
            <p className="section-label">Employee Information</p>

            <div className="form-grid" style={{ marginBottom: 14 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="firstName">First Name <span className="required">*</span></label>
                <input id="firstName" type="text" className="form-input no-icon" placeholder="First name"
                  value={firstName} onChange={e => setFirstName(e.target.value)} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="lastName">Last Name <span className="required">*</span></label>
                <input id="lastName" type="text" className="form-input no-icon" placeholder="Last name"
                  value={lastName} onChange={e => setLastName(e.target.value)} />
              </div>
            </div>

            <div className="form-grid" style={{ marginBottom: 14 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="empEmail">Email <span className="required">*</span></label>
                <div className="input-wrap">
                  <span className="input-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </span>
                  <input id="empEmail" type="email" className="form-input" placeholder="Email address"
                    value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="empPhone">Phone <span className="required">*</span></label>
                <div className="input-wrap">
                  <span className="input-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8 8.09a16 16 0 0 0 7.91 7.91l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </span>
                  <input id="empPhone" type="tel" className="form-input" placeholder="Phone number"
                    value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="yearJoining">Year of Joining <span className="required">*</span></label>
              <select id="yearJoining" className="form-select" value={year} onChange={e => setYear(e.target.value)}>
                <option value="">Select year</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            <div className="card-divider" />

            {/* Credentials */}
            <p className="section-label">Credentials</p>

            <div className="form-grid" style={{ marginBottom: 14 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Password</label>
                <div className="input-wrap">
                  <input type={showPw ? 'text' : 'password'} className="form-input no-icon has-action"
                    value={password} readOnly style={{ color: 'var(--gray-400)', fontStyle: 'italic', background: 'var(--gray-50)', cursor: 'default' }} />
                  <button type="button" className="input-action" onClick={() => setShowPw(v => !v)}>
                    <EyeIcon open={showPw} />
                  </button>
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Confirm Password</label>
                <div className="input-wrap">
                  <input type={showCPw ? 'text' : 'password'} className="form-input no-icon has-action"
                    value={password} readOnly style={{ color: 'var(--gray-400)', fontStyle: 'italic', background: 'var(--gray-50)', cursor: 'default' }} />
                  <button type="button" className="input-action" onClick={() => setShowCPw(v => !v)}>
                    <EyeIcon open={showCPw} />
                  </button>
                </div>
              </div>
            </div>

            {/* Login ID panel */}
            <div className="loginid-panel">
              <p className="loginid-panel-title">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Your Login ID is generated automatically
              </p>
              <div className="loginid-formula">
                {[
                  { label: 'Company Code', value: company.replace(/\s+/g,'').toUpperCase().slice(0,5) || 'COMP' },
                  null,
                  { label: 'First 2 of First', value: firstName.slice(0,2).toUpperCase() || 'XX' },
                  null,
                  { label: 'First 2 of Last', value: lastName.slice(0,2).toUpperCase() || 'XX' },
                  null,
                  { label: 'Year of Joining', value: year || new Date().getFullYear().toString() },
                  null,
                  { label: 'Serial No.', value: '0001' },
                ].map((item, i) =>
                  item === null ? (
                    <span key={i} className="formula-plus">+</span>
                  ) : (
                    <div key={i} className="formula-chip">
                      <div className="formula-chip-label">{item.label}</div>
                      <div className="formula-chip-value">{item.value}</div>
                    </div>
                  )
                )}
              </div>
              <div className="formula-example">
                {loginId}
                <div className="formula-example-sub">Example Login ID · Updates live as you type</div>
              </div>
            </div>

            {/* Password info */}
            <div className="password-info" style={{ marginTop: 14 }}>
              <div className="pw-info-row">
                <div className="pw-info-item">
                  <div className="pw-info-badge">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    Auto-generated
                  </div>
                  <div className="pw-info-title">Secure temporary password</div>
                  <div className="pw-info-desc">System generates the initial password for the employee's first login.</div>
                </div>
                <div className="pw-info-item">
                  <div className="pw-info-badge">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                    </svg>
                    First Login
                  </div>
                  <div className="pw-info-title">Change password after first login</div>
                  <div className="pw-info-desc">Employee can change the generated password after logging in for the first time.</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 24 }}>
              <button id="create-account-btn" type="submit" className="btn-primary" disabled={loading || success}>
                {loading ? (
                  <><span className="spinner" /> Creating Account…</>
                ) : success ? (
                  <>✓ Account Created!</>
                ) : (
                  <>Create Employee Account <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></>
                )}
              </button>
            </div>
          </form>

          <div className="card-divider" />
          <div className="card-footer">
            <p>Already have an account?{' '}
              <a id="goto-signin" onClick={() => navigate('/login')} role="button">Sign In →</a>
            </p>
          </div>
        </div>

        <div style={{ height: 48 }} />
      </div>
    </PageBackground>
  )
}
