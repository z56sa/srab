import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const DOWNLOAD_URL = 'https://github.com/z56sa/mode/releases/download/v1.0.0/default.exe'
const DISCORD_URL = 'https://discord.gg/uXEpd8wc9T'
const API_URL = '/games.json'

function getAppId(game) {
  for (const img of [game.thumbnailImage, game.bannerImage]) {
    const m = (img || '').match(/\/apps\/(\d+)\//)
    if (m) return m[1]
  }
  return null
}

export default function Home() {
  const [featuredGames, setFeaturedGames] = useState([])

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        if (data?.games) {
          const translated = data.games.filter(g => g.translations && g.translations.length > 0)
          setFeaturedGames(translated.slice(0, 8))
        }
      })
      .catch(() => {})
  }, [])

  return (
    <>
      {/* HERO SECTION */}
      <header className="hero">
        <div className="aura-glow"></div>
        <div className="wrap">
          <div className="pill">
            <b>جديد</b>
            <span>منصة سراب متوفرة الآن بنسختها الأحدث</span>
          </div>

          <h1>
            <span className="metal">ألعابك بالعربي.</span>
          </h1>

          <p className="lead">
            مكتبة تعريبات الألعاب العربية. تختار لعبتك، تضغط تثبيت، وتلعبها بالعربي،
            والتعريب يتحدّث ويتصلح من نفسه دون تعقيد.
          </p>

          <div className="cta">
            <a href={DOWNLOAD_URL} target="_blank" rel="noreferrer" className="btn btn-light">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>حمّل سراب مجاناً</span>
            </a>

            <Link to="/library" className="btn btn-glass">
              <span>استعرض الألعاب</span>
            </Link>
          </div>

          {/* APP STAGE PREVIEW */}
          <div className="hero-stage">
            <div className="hero-screen">
              <img 
                src="/app-preview.jpg" 
                alt="تطبيق سراب" 
                onError={(e) => { e.target.style.display = 'none' }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* CORE STATEMENT */}
      <section className="pad">
        <div className="wrap">
          <div className="statement-box">
            <p>
              بينك وبين لعبتك باللغة العربية ضغطة واحدة، وسراب يتكفل بالباقي عنك.
            </p>
          </div>

          <div className="trio-grid">
            <div className="trio-card">
              <div className="trio-num">01</div>
              <h3>تثبيت فوري دون ملفات</h3>
              <p>بدل ما تدور على ملفات التعريب وتنسخها بيدك في مجلدات اللعبة المعقدة، سراب يكتشف اللعبة ويثبتها عنك تلقائياً.</p>
            </div>

            <div className="trio-card">
              <div className="trio-num">02</div>
              <h3>تجميد وحماية التعريب</h3>
              <p>عزل كامل لملفات التعريب لمنع تحديثات Steam و Epic Games من مسح أو تعطيل الترجمة أثناء اللعب.</p>
            </div>

            <div className="trio-card">
              <div className="trio-num">03</div>
              <h3>إصلاح تلقائي بنقرة</h3>
              <p>لو صار أي خطأ أو خربت ملفات اللعبة، زر الإصلاح الذكي يفحص الملفات ويصلحها ويرجعها جديدة بثواني.</p>
            </div>
          </div>
        </div>
      </section>

      {/* GAMES LIBRARY PREVIEW */}
      {featuredGames.length > 0 && (
        <section className="pad" style={{ paddingTop: '0' }}>
          <div className="wrap">
            <div className="section-title">
              <h2 className="h2 metal">مكتبة تكبر كل ما طلبتوا.</h2>
              <p className="sub">
                رعب، أكشن، عالم مفتوح، ومغامرات. ألعاب كبيرة ومستقلة، كلها بتعريب جاهز ينتظر ضغطتك.
              </p>
            </div>

            <div className="gallery-grid">
              {featuredGames.map(game => {
                const appId = getAppId(game)
                const thumb = appId 
                  ? `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/capsule_616x353.jpg`
                  : null
                const team = game.translations?.[0]?.teamName || 'فريق التعريب'

                return (
                  <div key={game.id} className="game-item">
                    <div className="game-poster">
                      {thumb ? (
                        <img src={thumb} alt={game.title} loading="lazy" />
                      ) : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎮</div>
                      )}
                    </div>
                    <div className="game-details">
                      <div className="game-name">{game.title}</div>
                      <div className="game-chips">
                        <span className="chip chip-ok">✓ متوفر</span>
                        <span className="chip">{team}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <Link to="/library" className="btn btn-glass">
                <span>تصفح كل ألعاب المكتبة ({featuredGames.length}+) ←</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* DISCORD COMMUNITY */}
      <section className="pad" style={{ paddingTop: '20px' }}>
        <div className="wrap">
          <div className="statement-box" style={{ padding: '70px 40px' }}>
            <h2 className="h2 metal" style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: '16px' }}>
              انضم لمجتمع سراب على ديسكورد.
            </h2>
            <p style={{ fontSize: '18px', color: 'var(--t2)', marginBottom: '32px' }}>
              اطلب تعريب لعبتك، شارك تجاربك مع المترجمين، وكن أول من يعلم عن المشاريع الجديدة.
            </p>
            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="btn btn-glass" style={{ margin: '0 auto' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.082.11 18.1.128 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
              </svg>
              <span>دخول السيرفر</span>
            </a>
          </div>
        </div>
      </section>

      {/* VAULT DOWNLOAD SECTION (Direct from m3rab bottom vault) */}
      <section className="vault" id="download">
        <div className="wrap">
          <img 
            src="/logo.png" 
            alt="سراب" 
            className="mark-icon" 
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <h2 className="h2 metal">جاهز تلعب بالعربي؟</h2>
          <p className="sub">حمّل سراب الحين، واستمتع بألعابك بلغتك الأم.</p>

          <div className="cta">
            <a href={DOWNLOAD_URL} target="_blank" rel="noreferrer" className="btn btn-light" style={{ height: '64px', padding: '0 44px', fontSize: '18px' }}>
              <span>تحميل تطبيق سراب للويندوز</span>
            </a>
          </div>

          <div>
            <dl className="file-info">
              <dt>المنصة المدعومة</dt>
              <dd>Windows 10 / 11 (64-bit)</dd>
              <dt>الترخيص</dt>
              <dd>مجاني 100%</dd>
            </dl>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <p>© {new Date().getFullYear()} سراب — منصة تعريب الألعاب العربية. صُنع للاعبين العرب.</p>
        </div>
      </footer>
    </>
  )
}
