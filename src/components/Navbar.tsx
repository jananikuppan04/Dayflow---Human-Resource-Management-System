export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-logo">
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

      <div className="nav-links">
        {['Home', 'Features', 'Solutions', 'About'].map(item => (
          <span key={item} className="nav-link">{item}</span>
        ))}
      </div>

      <div className="nav-actions">
        <span className="nav-contact">Contact HR</span>
        <button className="nav-cta">
          Get Started
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </nav>
  )
}
