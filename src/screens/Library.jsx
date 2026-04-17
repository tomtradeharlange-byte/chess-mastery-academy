import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const categories = ['Tous', 'Ouvertures', 'Tactiques', 'Fins de partie', 'Grands Maîtres']

const openings = [
  {
    id: 1, cat: 'Ouvertures', badge: 'Agressif', color: '#073002',
    title: 'La Défense Sicilienne', sub: 'La réponse la plus populaire à 1.e4, créant des positions asymétriques complexes.',
    icon: '♛', moves: '1.e4 c5', path: '/lesson', lessonId: 'sicilienne',
  },
  {
    id: 2, cat: 'Ouvertures', badge: 'Positionnel', color: '#4e453e',
    title: 'Le Gambit de la Dame', sub: "L'une des ouvertures les plus prestigieuses — contrôle du centre.",
    icon: '♕', moves: '1.d4 d5 2.c4', path: '/lesson', lessonId: 'gambit_dame',
  },
  {
    id: 3, cat: 'Ouvertures', badge: 'Résilient', color: '#564334',
    title: 'La Défense Française', sub: 'Une structure solide pour les Noirs, favorisant le jeu de contre-attaque.',
    icon: '♞', moves: '1.e4 e6', path: '/lesson', lessonId: 'defense_francaise',
  },
  {
    id: 4, cat: 'Ouvertures', badge: 'Dynamique', color: '#073002',
    title: 'Gambit Stafford', sub: 'Un sacrifice de pion psychologique — pièges pour les adversaires imprudents.',
    icon: '♝', moves: '1.e4 e5 2.Cf3 Cf6', path: '/lesson', lessonId: 'stafford',
  },
  {
    id: 5, cat: 'Ouvertures', badge: 'Solide', color: '#4e453e',
    title: 'Système de Londres', sub: 'Développement fiable des pièces blanches, idéal pour un jeu calme.',
    icon: '♗', moves: '1.d4 d5 2.Cf3 Cf6 3.Ff4', path: '/lesson', lessonId: 'systeme_londres',
  },
  {
    id: 6, cat: 'Tactiques', badge: 'Intermédiaire', color: '#352518',
    title: 'Arsenal Tactique', sub: 'Clouage, fourchette, élimination du défenseur — les armes du maître.',
    icon: '⚡', moves: '', path: '/tactics', lessonId: null,
  },
  {
    id: 7, cat: 'Fins de partie', badge: 'Fondamental', color: '#073002',
    title: 'Finales de Pions', sub: 'La règle du carré, opposition et triangulation.',
    icon: '♙', moves: '', path: '/lesson', lessonId: 'finales_pions',
  },
  {
    id: 8, cat: 'Grands Maîtres', badge: 'Classique', color: '#352518',
    title: "L'Art de Capablanca", sub: 'La simplicité dans la victoire — leçons du 3e champion du monde.',
    icon: '♔', moves: '', path: '/lesson', lessonId: 'capablanca',
  },
]

export default function Library() {
  const [activeFilter, setActiveFilter] = useState('Tous')
  const navigate = useNavigate()

  const filtered = activeFilter === 'Tous' ? openings : openings.filter(o => o.cat === activeFilter)

  return (
    <div style={{ background: '#fff8f5', minHeight: '100dvh', paddingBottom: 80 }}>
      {/* Header */}
      <div
        style={{
          position: 'sticky', top: 0, zIndex: 40,
          padding: '16px 20px 12px',
          background: 'rgba(250,242,239,0.95)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <h1 style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 20, color: '#352518', margin: '0 0 12px', fontWeight: 600 }}>
          Bibliothèque des Ouvertures
        </h1>
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#eee7e3', borderRadius: 12, padding: '8px 12px', marginBottom: 12 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#80756d' }}>search</span>
          <span style={{ fontSize: 13, color: '#80756d' }}>Rechercher une ouverture…</span>
        </div>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActiveFilter(c)}
              style={{
                flexShrink: 0,
                padding: '4px 12px',
                borderRadius: 99,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: activeFilter === c ? '#352518' : '#f4ece9',
                color: activeFilter === c ? '#fff' : '#5f5f57',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s',
              }}
            >{c}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        {/* Hero */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 36, fontWeight: 600, color: '#352518', margin: 0, fontStyle: 'italic', lineHeight: 1.1, letterSpacing: '-0.01em' }}>
            Openings<br />Library
          </h2>
          <div style={{ width: 40, height: 1, background: 'rgba(53,37,24,0.2)', marginTop: 12 }} />
        </div>

        {/* List */}
        {filtered.map((o, i) => (
          <div
            key={o.id}
            style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(210,196,187,0.25)' : 'none' }}
          >
            <button
              onClick={() => navigate(o.path, o.lessonId ? { state: { lessonId: o.lessonId } } : undefined)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                padding: '18px 0',
                background: 'none', border: 'none', cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div style={{ flexShrink: 0, width: 60, height: 74, background: '#f4ece9', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, overflow: 'hidden' }}>
                {o.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                  <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: 17, color: '#352518', margin: 0, fontWeight: 600, lineHeight: 1.2 }}>{o.title}</h3>
                  <span
                    style={{
                      flexShrink: 0,
                      fontSize: 8, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                      padding: '2px 7px',
                      border: `1px solid ${o.color}`,
                      color: o.color,
                      borderRadius: 2,
                    }}
                  >{o.badge}</span>
                </div>
                <p style={{ fontSize: 12, color: '#4e453e', margin: 0, lineHeight: 1.4 }}>{o.sub}</p>
                {o.moves && (
                  <p style={{ fontSize: 10, fontFamily: 'Newsreader, serif', fontStyle: 'italic', color: '#80756d', margin: '4px 0 0' }}>{o.moves}</p>
                )}
              </div>
              <span className="material-symbols-outlined" style={{ color: '#d2c4bb', fontSize: 16, flexShrink: 0 }}>arrow_forward_ios</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
