import { useState, useEffect } from 'react'

const API_URL = '/games.json'

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
        setError('تعذّر جلب الألعاب')
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
    <div className="wrap" style={{ padding: '140px 0 80px' }}>
      <div className="section-title">
        <h1 className="h2 metal">مكتبة الألعاب.</h1>
        <p className="sub">استعرض وتعرف على الألعاب المعربة المتاحة في منصة سراب.</p>
      </div>

      <div style={{ display: 'flex', gap: '14px', maxWidth: '700px', margin: '0 auto 50px', flexWrap: 'wrap' }}>
        <input
          style={{
            flex: '1',
            minWidth: '240px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--edge)',
            borderRadius: '999px',
            padding: '12px 24px',
            color: '#fff',
            font: 'inherit',
            outline: 'none'
          }}
          placeholder="ابحث عن لعبة..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className={`btn btn-glass`} 
            style={{ height: '48px', padding: '0 20px', borderRadius: '999px', background: filter === 'all' ? 'rgba(255,255,255,0.15)' : undefined }}
            onClick={() => setFilter('all')}
          >
            الكل
          </button>
          <button 
            className={`btn btn-glass`} 
            style={{ height: '48px', padding: '0 20px', borderRadius: '999px', background: filter === 'available' ? 'rgba(255,255,255,0.15)' : undefined }}
            onClick={() => setFilter('available')}
          >
            معرب فقط
          </button>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--t2)' }}>
          جاري تحميل المكتبة...
        </div>
      )}

      {error && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#ff6b6b' }}>
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <p style={{ color: 'var(--t3)', fontSize: '14px', marginBottom: '24px' }}>
            {filtered.length} لعبة مسجلة
          </p>
          <div className="gallery-grid">
            {filtered.map(game => {
              const appId = getAppId(game)
              const thumb = appId 
                ? `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/capsule_616x353.jpg`
                : null
              const hasTranslation = game.translations && game.translations.length > 0
              const team = hasTranslation ? game.translations[0].teamName : null

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
                      <span className={`chip ${hasTranslation ? 'chip-ok' : ''}`}>
                        {hasTranslation ? '✓ معرب' : 'غير متوفر'}
                      </span>
                      {team && <span className="chip">{team}</span>}
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
