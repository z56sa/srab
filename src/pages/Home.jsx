import { Link } from 'react-router-dom'

const DOWNLOAD_URL = 'https://github.com/z56sa/mode/releases/latest'
const DISCORD_URL = 'https://discord.gg/uXEpd8wc9T'

const features = [
  { icon: '🎮', title: 'تثبيت بضغطة واحدة', desc: 'حمّل وثبّت التعريب مباشرة دون أي خطوات معقدة.' },
  { icon: '🔄', title: 'تحديثات تلقائية', desc: 'يتحقق من تحديثات التعريب ويُنبّهك فوراً عند وجود إصدار جديد.' },
  { icon: '🛡️', title: 'تجميد / إلغاء تجميد', desc: 'احمِ التعريب من التحديثات التلقائية للعبة.' },
  { icon: '🔍', title: 'كشف اللعبة تلقائياً', desc: 'يكتشف مسار اللعبة على Steam وEpic Games تلقائياً.' },
  { icon: '🧰', title: 'إصلاح التعريب', desc: 'استعادة كاملة لملفات التعريب في حال تلفها أو حذفها.' },
  { icon: '🌙', title: 'واجهة عربية أصيلة', desc: 'مصمم من الأساس للمستخدم العربي بواجهة أنيقة.' },
]

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-badge">🎮 منصة التعريبات العربية</div>
        <h1>العب بالعربي<br /><span>مع سراب</span></h1>
        <p>منصة مجانية تُتيح لك تثبيت تعريبات الألعاب وإدارتها بكل سهولة، دون تعقيد.</p>
        <div className="hero-btns">
          <a href={DOWNLOAD_URL} target="_blank" rel="noreferrer" className="btn-primary">
            ⬇ تحميل مجاني
          </a>
          <Link to="/library" className="btn-secondary">
            🎮 مكتبة الألعاب
          </Link>
        </div>
        <div className="stats">
          <div className="stat-item">
            <div className="stat-num">+20</div>
            <div className="stat-label">لعبة معرّبة</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">مجاني</div>
            <div className="stat-label">بالكامل</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">Windows</div>
            <div className="stat-label">متوافق مع</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <div className="section">
        <h2 className="section-title">لماذا سراب؟</h2>
        <p className="section-sub">كل ما تحتاجه لتجربة الألعاب بالعربية في مكان واحد</p>
        <div className="features-grid">
          {features.map(f => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* DISCORD */}
      <div className="discord-section">
        <h2>انضم لمجتمع سراب 🎮</h2>
        <p>
          سيرفر ديسكورد متخصص في التعريبات العربية.<br />
          شارك، اقترح، وكن أول من يعرف عن التعريبات الجديدة.
        </p>
        <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="btn-discord">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.082.11 18.1.128 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
          </svg>
          انضم للسيرفر
        </a>
      </div>

      <footer>
        <p>© {new Date().getFullYear()} سراب — جميع الحقوق محفوظة</p>
      </footer>
    </>
  )
}
