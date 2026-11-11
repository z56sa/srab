import { useState, useEffect } from 'react'

const API_URL = 'https://polar-download-gateway.mdmrksad1ksa.workers.dev/api/content'

function getAppId(game) {
  for (const img of [game.thumbnailImage, game.bannerImage]) {
    const m = (img || '').match(/\/apps\/(\d+)\//)
    if (m) return m[1]
  }
  return null
}

function GameCard({ game }) {
  const appId = getAppId(game)
  const thumb = appId
    ? `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/capsule_616x353.jpg`
    : null
  const hasTranslation = game.translations && game.translations.length > 0
  const translationName = hasTranslation ? game.translations[0].teamName : null

  return (
    <div className="game-card">
      {thumb
        ? <img className="game-thumb" src={thumb} alt={game.title} loading="lazy" />
        : <div className="game-thumb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.2)', fontSize: '2rem' }}>🎮</div>
      }
      <div className="game-info">
        <div className="game-title">{game.title}</div>
        <span className={`game-badge ${hasTranslation ? 'badge-available' : 'badge-unavailable'}`}>
          {hasTranslation ? '✓ متوفر تعريب' : '✗ غير معرب'}
        </span>
        {translationName && (
          <div className="game-meta">فريق {translationName}</div>
        )}
        {game.category && (
          <div className="game-meta">{game.category}</div>
        )}
      </div>
    </div>
  )
}

export default function Library() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all') // all | available | unavailable

  useEffect(() => {
    fetch(API_URL)
      .then(r => r.json())
      .then(data => {
        setGames(data.games || [])
        setLoading(false)
      })
      .catch(() => {
        setError('تعذّر تحميل البيانات')
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
    <div className="library-section">
      <h2 className="section-title" style={{ marginBottom: '.5rem' }}>مكتبة الألعاب</h2>
      <p className="section-sub">جميع الألعاب المتاحة في منصة سراب</p>

      <div className="library-controls">
        <input
          className="search-box"
          placeholder="🔍 ابحث عن لعبة..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>الكل</button>
        <button className={`filter-btn ${filter === 'available' ? 'active' : ''}`} onClick={() => setFilter('available')}>متوفر تعريب</button>
        <button className={`filter-btn ${filter === 'unavailable' ? 'active' : ''}`} onClick={() => setFilter('unavailable')}>غير معرب</button>
      </div>

      {loading && <div className="loading"><div className="spinner" /></div>}
      {error && <p style={{ textAlign: 'center', color: '#f87171', padding: '3rem' }}>{error}</p>}
      {!loading && !error && (
        <>
          <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '.85rem', marginBottom: '1.25rem' }}>
            {filtered.length} لعبة
          </p>
          <div className="games-grid">
            {filtered.map(g => <GameCard key={g.id} game={g} />)}
          </div>
        </>
      )}
    </div>
  )
}
