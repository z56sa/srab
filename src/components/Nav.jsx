import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const { pathname } = useLocation()
  return (
    <nav>
      <Link to="/" className="nav-brand">
        <img src="/srab/logo.png" alt="Srab Logo" className="nav-logo-img" onError={(e) => { e.target.style.display = 'none' }} />
        <span className="nav-title">سراب</span>
      </Link>
      
      <div className="nav-links">
        <Link to="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>الرئيسية</Link>
        <Link to="/library" className={`nav-link ${pathname === '/library' ? 'active' : ''}`}>المكتبة</Link>
        <a href="https://discord.gg/uXEpd8wc9T" target="_blank" rel="noreferrer" className="nav-link">
          ديسكورد
        </a>
        <a
          href="https://github.com/z56sa/mode/releases/latest"
          target="_blank" 
          rel="noreferrer"
          className="nav-cta"
        >
          تحميل التطبيق
        </a>
      </div>
    </nav>
  )
}
