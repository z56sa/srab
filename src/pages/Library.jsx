import { useState, useEffect } from 'react'

const API_URL = 'https://polar-download-gateway.mdmrksad1ksa.workers.dev/api/content'

function getAppId(game) {
  for (const img of [game.thumbnailImage, game.bannerImage]) {
    const m = (img || '').match(/\/apps\/(\d+)\//)
    if (m) return m[1]
  }
  return null
}

export default function Library() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetch(API_URL)
      .then(r => r.json())
      .then(data => {
        setGames(data.games || [])
        setLoading(false)
      })
      .catch(() => {
        setError('تعذّر الاتصال بخادم سراب وجلب الألعاب')
        setLoading(false)
      })
  }, [])

  const filtered = games.filter(g => {
    const matchSearch = !search || g.title?.toLowerCase().includes(search.toLowerCase())
    const hasT = g.translations && g.translations.length > 0
    const matchFilter = filter === 'all' || (filter === 'available' ? hasT : !hasT)
    return matchSearch && matchFilter
  })

  return (
    <div style={{ padding: '120px 5% 60px', maxWidth: '1300px', margin: '0 auto' }}>
      <div className="section-header">
        <div className="section-tag">مكتبة سراب المفتوحة</div>
        <h1 className="section-title">دليل الألعاب والتعريبات المتاحة</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>
          تصفح قائمة الألعاب المتاحة وتحقق من حالة توفر التعريب الرسمي لكل عنوان
        </p>
      </div>

      <div className="search-container">
        <input
          className="search-input"
          placeholder="🔍 ابحث عن اسم اللعبة..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
            الكل ({games.length})
          </button>
          <button className={`filter-btn ${filter === 'available' ? 'active' : ''}`} onClick={() => setFilter('available')}>
            متوفر تعريب
          </button>
          <button className={`filter-btn ${filter === 'unavailable' ? 'active' : ''}`} onClick={() => setFilter('unavailable')}>
            قيد الانتظار
          </button>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <div style={{ 
            width: '45px', 
            height: '45px', 
            borderRadius: '50%', 
            border: '3px solid rgba(168,85,247,0.2)', 
            borderTopColor: 'var(--brand)', 
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 15px'
          }}></div>
          <p style={{ color: 'var(--text-muted)' }}>جاري تحميل مكتبة الألعاب...</p>
        </div>
      )}

      {error && (
        <div style={{ textAlign: 'center', color: '#f87171', padding: '60px 0' }}>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
            تم العثور على <strong>{filtered.length}</strong> لعبة
          </p>
          <div className="games-grid">
            {filtered.map(game => {
              const appId = getAppId(game)
              const thumb = appId 
                ? `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/capsule_616x353.jpg`
                : null
              const hasTranslation = game.translations && game.translations.length > 0
              const team = hasTranslation ? game.translations[0].teamName : null

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
                      <span className={`badge-tag ${hasTranslation ? 'badge-green' : 'badge-purple'}`}>
                        {hasTranslation ? '✓ تعريب متوفر' : '⏳ قريباً'}
                      </span>
                      {team && <span className="badge-tag badge-purple">{team}</span>}
                    </div>
                    <div className="game-card-footer">
                      <span>{game.category || 'PC'}</span>
                      <a 
                        href="https://github.com/z56sa/mode/releases/latest" 
                        target="_blank" 
                        rel="noreferrer"
                        style={{ color: 'var(--brand-cyan)', textDecoration: 'none', fontWeight: 'bold' }}
                      >
                        ثبّت عبر سراب ←
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
