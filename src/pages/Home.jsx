import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const DOWNLOAD_URL = 'https://github.com/z56sa/mode/releases/latest'
const DISCORD_URL = 'https://discord.gg/uXEpd8wc9T'
const API_URL = 'https://polar-download-gateway.mdmrksad1ksa.workers.dev/api/content'

function getAppId(game) {
  for (const img of [game.thumbnailImage, game.bannerImage]) {
    const m = (img || '').match(/\/apps\/(\d+)\//)
    if (m) return m[1]
  }
  return null
}

const features = [
  {
    icon: '⚡',
    title: 'تثبيت بضغطة زر',
    desc: 'بنقرة واحدة يتم تحميل وحقن ملفات التعريب داخل مسار اللعبة دون أي عناء أو ملفات يدوية.'
  },
  {
    icon: '🎯',
    title: 'كشف ذكي للمسارات',
    desc: 'سراب يكتشف مسارات ألعابك المثبتة تلقائياً عبر منصتي Steam و Epic Games.'
  },
  {
    icon: '🛡️',
    title: 'تجميد وحماية التعريب',
    desc: 'ميزة حصرية لعزل ملفات اللعبة ومنع تحديثات المنصات من تخريب أو مسح التعريب.'
  },
  {
    icon: '🔄',
    title: 'إصلاح وترميم الملفات',
    desc: 'زر إصلاح فوري يفحص ملفات التعريب ويعيد تنزيل التالف منها في ثوانٍ معدودة.'
  },
  {
    icon: '🎮',
    title: 'دعم ديسكورد التفاعلي',
    desc: 'حضور غني (Discord RPC) يعرض ألعابك الحالية ونشاطك داخل المنصة لأصدقائك مباشرة.'
  },
  {
    icon: '💎',
    title: 'مجاني تماماً وعربي 100%',
    desc: 'واجهة عربية مظلمة مصممة للاعبين لتقديم أفضل وأسلس تجربة تصفح ممكنة.'
  }
]

export default function Home() {
  const [featuredGames, setFeaturedGames] = useState([])

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        if (data?.games) {
          // جلب أبرز 8 ألعاب معربة
          const translated = data.games.filter(g => g.translations && g.translations.length > 0)
          setFeaturedGames(translated.slice(0, 8))
        }
      })
      .catch(() => {})
  }, [])

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-pill">
          <span>✨</span>
          <span>الإصدار الأحدث من منصة سراب متاح الآن</span>
        </div>

        <h1 className="hero-title">
          العب ألعابك المفضلة <br />
          <span className="hero-gradient-text">باللغة العربية الكاملة</span>
        </h1>

        <p className="hero-desc">
          المنصة العربية المتكاملة لتثبيت وإدارة تعريبات الألعاب بضغطة زر واحدة. 
          سرعة فائقة، اكتشاف تلقائي لمسارات التثبيت، وتحديثات مستمرة لأحدث العناوين.
        </p>

        <div className="hero-actions">
          <a href={DOWNLOAD_URL} target="_blank" rel="noreferrer" className="btn-main">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            تحميل سراب للويندوز
          </a>

          <Link to="/library" className="btn-outline">
            <span>🎮</span>
            استعراض مكتبة الألعاب
          </Link>
        </div>

        {/* SHOWCASE OF THE DESKTOP APP */}
        <div className="showcase-wrapper">
          <div className="showcase-glow"></div>
          <div className="showcase-frame">
            <img 
              src="/srab/app-preview.jpg" 
              alt="واجهة تطبيق سراب" 
              className="showcase-img"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          </div>
        </div>
      </section>

      {/* FEATURED TRANSLATIONS */}
      {featuredGames.length > 0 && (
        <section className="section">
          <div className="section-header">
            <div className="section-tag">أحدث التعريبات</div>
            <h2 className="section-title">ألعاب معربة وجاهزة للعب</h2>
          </div>

          <div className="games-grid">
            {featuredGames.map(game => {
              const appId = getAppId(game)
              const thumb = appId 
                ? `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/capsule_616x353.jpg`
                : null
              const team = game.translations?.[0]?.teamName || 'فريق التعريب'

              return (
                <div key={game.id} className="game-card">
                  <div className="game-card-img-wrap">
                    {thumb ? (
                      <img src={thumb} alt={game.title} className="game-card-img" loading="lazy" />
                    ) : (
                      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>🎮</div>
                    )}
                  </div>
                  <div className="game-card-content">
                    <div className="game-card-title">{game.title}</div>
                    <div className="game-card-badges">
                      <span className="badge-tag badge-green">✓ تعريب متوفر</span>
                      <span className="badge-tag badge-purple">{team}</span>
                    </div>
                    <div className="game-card-footer">
                      <span>{game.category || 'لعبة PC'}</span>
                      <span style={{ color: 'var(--brand-cyan)' }}>جاهز للتثبيت</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/library" className="btn-outline" style={{ display: 'inline-flex' }}>
              عرض كل التعريبات بالمكتبة ({featuredGames.length}+) ←
            </Link>
          </div>
        </section>
      )}

      {/* WHY SRAB FEATURES */}
      <section className="section">
        <div className="section-header">
          <div className="section-tag">مميزات المنصة</div>
          <h2 className="section-title">لماذا يختار مجتمع اللاعبين منصة سراب؟</h2>
        </div>

        <div className="features-container">
          {features.map((f, i) => (
            <div key={i} className="feature-box">
              <div className="feature-icon-circle">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DISCORD CALL TO ACTION */}
      <section className="section" style={{ paddingBottom: '20px' }}>
        <div className="discord-banner">
          <h2>انضم إلى مجتمع سراب على ديسكورد 🎮</h2>
          <p>
            تواصل مباشرة مع المترجمين، اطلب تعريب ألعابك المفضلة، 
            وكن أول من يتلقى التحديثات والتعريبات الجديدة قبل نشرها.
          </p>
          <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="btn-discord">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.082.11 18.1.128 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
            دخول سيرفر ديسكورد
          </a>
        </div>
      </section>

      <footer>
        <p>© {new Date().getFullYear()} سراب (Srab) — جميع حقوق التعريبات محفوظة لفرق ومطوري التعريب المستقلين.</p>
      </footer>
    </>
  )
}
