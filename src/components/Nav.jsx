import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const { pathname } = useLocation()
  return (
    <nav className="nav">
      <div className="bar">
        <Link to="/" className="brand">
          <img 
            src="/logo.png" 
            alt="شعار سراب" 
            className="brand-icon"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <span className="metal">سراب</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className={pathname === '/' ? 'active' : ''}>الرئيسية</Link>
          <Link to="/library" className={pathname === '/library' ? 'active' : ''}>المكتبة</Link>
          <a href="https://discord.gg/z4Cm2VAnQw" target="_blank" rel="noreferrer">ديسكورد</a>
        </div>

        <a 
          href="https://discord.gg/z4Cm2VAnQw" 
          target="_blank" 
          rel="noreferrer" 
          className="btn btn-light"
        >
          <span>انضم للديسكورد</span>
        </a>
      </div>
    </nav>
  )
}
