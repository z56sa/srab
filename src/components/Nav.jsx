import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const { pathname } = useLocation()
  return (
    <nav>
      <Link to="/" className="nav-logo">سراب</Link>
      <div className="nav-links">
        <Link to="/" style={{ color: pathname === '/' ? '#fff' : undefined }}>الرئيسية</Link>
        <Link to="/library" style={{ color: pathname === '/library' ? '#fff' : undefined }}>مكتبة الألعاب</Link>
        <a href="https://discord.gg/uXEpd8wc9T" target="_blank" rel="noreferrer">ديسكورد</a>
        <a
          href="https://github.com/z56sa/mode/releases/latest"
          target="_blank" rel="noreferrer"
          className="nav-btn"
        >⬇ تحميل</a>
      </div>
    </nav>
  )
}
