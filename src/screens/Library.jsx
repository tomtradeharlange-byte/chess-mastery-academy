import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const categories = ['Tous', 'Ouvertures', 'Tactiques', 'Fins de partie', 'Grands Maîtres']

const openings = [
  {
    id: 1, cat: 'Ouvertures', badge: 'Agressif', color: '#073002',
    title: 'La Défense Sicilienne', sub: 'La réponse la plus populaire à 1.e4, créant des positions asymétriques complexes.',
    icon: '♛', moves: '1.e4 c5',
  },
  {
    id: 2, cat: 'Ouvertures', badge: 'Positionnel', color: '#4e453e',
    title: 'Le Gambit de la Dame', sub: "L'une des ouvertures les plus prestigieuses — contrôle du centre.",
    icon: '♕', moves: '1.d4 d5 2.c4',
  },
  {
    id: 3, cat: 'Ouvertures', badge: 'Résilient', color: '#564334',
    title: 'La Défense Française', sub: 'Une structure solide pour les Noirs, favorisant le jeu de contre-attaque.',
    icon: '♞', moves: '1.e4 e6',
  },
  {
    id: 4, cat: 'Ouvertures', badge: 'Dynamique', color: '#073002',
    title: 'Gambit Stafford', sub: 'Un sacrifice de pion psychologique — pièges pour les adversaires imprudents.',
    icon: '♝', moves: '1.e4 e5 2.Cf3 Cf6',
  },
  {
    id: 5, cat: 'Ouvertures', badge: 'Solide', color: '#4e453e',
    title: 'Système de Londres', sub: 'Développement fiable des pièces blanches, idéal pour un jeu calme.',
    icon: '♗', moves: '1.d4 d5 2.Cf3 Cf6 3.Ff4',
  },
  {
    id: 6, cat: 'Tactiques', badge: 'Intermédiaire', color: '#352518',
    title: 'Arsenal Tactique', sub: 'Clouage, fourchette, élimination du défenseur — les armes du maître.',
    icon: '⚡', moves: '',
  },
  {
    id: 7, cat: 'Fins de partie', badge: 'Fondamental', color: '#073002',
    title: 'Finales de Pions', sub: 'La règle du carré, opposition et triangulation.',
    icon: '♙', moves: '',
  },
  {
    id: 8, cat: 'Grands Maîtres', badge: 'Classique', color: '#352518',
    title: "L'Art de Capablanca", sub: 'La simplicité dans la victoire — leçons du 3e champion du monde.',
    icon: '♔', moves: '',
  },
]

export default function Library() {
  const [activeFilter, setActiveFilter] = useState('Tous')
  const navigate = useNavigate()

  const filtered = activeFilter === 'Tous' ? openings : openings.filter(o => o.cat === activeFilter)

  return (
    <div style={{ background: '#fff8f5', minHeight: '100dvh', paddingBottom: 96 }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 px-5 pt-4 pb-3"
        style={{ background: 'rgba(250,242,239,0.95)', backdropFilter: 'blur(16px)' }}
      >
        <h1 style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 20, color: '#352518', margin: '0 0 12px', fontWeight: 600 }}>
          Bibliothèque des Ouvertures
        </h1>
        {/* Search */}
        <div className="flex items-center gap-2 rounded-xl px-3 py-2 mb-3" style={{ background: '#eee7e3' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#80756d' }}>search</span>
          <span style={{ fontSize: 13, color: '#80756d' }}>Rechercher une ouverture…</span>
        </div>
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
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
              }}
            >{c}</button>
          ))}
        </div>
      </header>

      <div className="px-5 pt-4">
        {/* Hero */}
        <div className="mb-6">
          <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 36, fontWeight: 600, color: '#352518', margin: 0, fontStyle: 'italic', lineHeight: 1.1, letterSpacing: '-0.01em' }}>
            Openings<br />Library
          </h2>
          <div style={{ width: 40, height: 1, background: 'rgba(53,37,24,0.2)', marginTop: 12 }} />
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {filtered.map((o, i) => (
            <div
              key={o.id}
              className="flex gap-4 items-center py-5 cursor-pointer"
              style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(210,196,187,0.25)' : 'none' }}
              onClick={() => navigate('/lesson')}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-xl"
                style={{ width: 60, height: 74, background: '#f4ece9', fontSize: 36, overflow: 'hidden' }}
              >
                {o.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: 17, color: '#352518', margin: 0, fontWeight: 600, lineHeight: 1.2 }}>{o.title}</h3>
                  <span
                    style={{
                      flexShrink: 0,
                      fontSize: 8,
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
