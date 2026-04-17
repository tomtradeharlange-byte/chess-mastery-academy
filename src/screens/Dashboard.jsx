import { useNavigate } from 'react-router-dom'
import { WEEKS, TOTAL_VIDEOS } from '../data/videoProgram'
import { useChessStats } from '../hooks/useChessStats'

const lessons = [
  { tag: "Ouverture",      title: "Défense Sicilienne",    sub: "Volume IV : Najdorf",       path: "/lesson",  lessonId: "sicilienne"    },
  { tag: "Fin de partie",  title: "Finales de Pions",      sub: "La Règle du Carré",         path: "/lesson",  lessonId: "finales_pions" },
  { tag: "Grands Maîtres", title: "L'Art de Capablanca",   sub: "La Simplicité",             path: "/lesson",  lessonId: "capablanca"    },
  { tag: "Tactiques",      title: "Le Regard de l'Aigle",  sub: "Maîtriser les Fourchettes", path: "/tactics", lessonId: null            },
]

const icons = {
  "Ouverture":      "♛",
  "Fin de partie":  "♔",
  "Grands Maîtres": "♚",
  "Tactiques":      "⚡",
}

export default function Dashboard() {
  const navigate = useNavigate()

  const watched = (() => {
    try { return new Set(JSON.parse(localStorage.getItem('chess_videos_watched') || '[]')) }
    catch { return new Set() }
  })()
  const videoWatched = watched.size
  const videoPct = Math.round((videoWatched / TOTAL_VIDEOS) * 100)
  const currentWeek = WEEKS.find(w =>
    w.days.some(d => d.videos.some(v => !watched.has(v.id)))
  )

  return (
    <div style={{ background: '#fff8f5', minHeight: '100dvh', paddingBottom: 96 }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 flex justify-between items-center px-5 py-4"
        style={{ background: 'rgba(250,242,239,0.95)', backdropFilter: 'blur(16px)' }}
      >
        <h1 style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 20, color: '#352518', margin: 0, fontWeight: 600 }}>
          The Grandmaster's Atelier
        </h1>
        <button
          onClick={() => navigate('/settings')}
          className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden transition-all active:scale-90"
          style={{ background: '#e8e1de', border: 'none', cursor: 'pointer' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#352518' }}>person</span>
        </button>
      </header>

      <div className="px-5 pt-4">
        {/* Hero headline */}
        <div className="mb-6">
          <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 42, fontWeight: 500, color: '#352518', lineHeight: 1, margin: 0, letterSpacing: '-0.02em' }}>
            L'Atelier<br /><em>de Thomas</em>
          </h2>
          <p style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', color: '#4e453e', fontSize: 14, marginTop: 8 }}>
            "Chess is the gymnasium of the mind."
          </p>
        </div>

        {/* Level progress */}
        <div className="mb-6 rounded-xl p-4" style={{ background: '#faf2ef' }}>
          <div className="flex justify-between items-baseline mb-3">
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9c6bd', margin: 0 }}>Niveau d'Étude</p>
              <p style={{ fontFamily: 'Newsreader, serif', fontSize: 22, color: '#352518', margin: 0, fontWeight: 600 }}>Candidat Maître</p>
            </div>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#073002' }}>75% vers le suivant</p>
          </div>
          <div style={{ height: 2, background: 'rgba(210,196,187,0.4)', borderRadius: 99, position: 'relative' }}>
            <div style={{ position: 'absolute', top: -1, left: 0, height: 4, width: '75%', background: '#073002', borderRadius: 99 }} />
          </div>
        </div>

        {/* Daily puzzle */}
        <button
          className="w-full rounded-xl p-5 mb-6 flex gap-4 items-center text-left transition-all active:scale-98"
          style={{ background: '#faf2ef', border: '1px solid rgba(210,196,187,0.2)', cursor: 'pointer' }}
          onClick={() => navigate('/tactics')}
        >
          <div
            className="rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ width: 72, height: 72, background: '#eee7e3', fontSize: 44, lineHeight: 1 }}
          >
            ♞
          </div>
          <div className="flex-1">
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#073002', margin: 0 }}>L'Énigme du Jour</p>
            <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: 20, color: '#352518', margin: '2px 0 4px', fontWeight: 600 }}>Le Sacrifice de Philidor</h3>
            <p style={{ fontSize: 12, color: '#4e453e', margin: 0, fontStyle: 'italic', fontFamily: 'Newsreader, serif' }}>Les Blancs jouent et gagnent en 3 coups</p>
          </div>
          <span className="material-symbols-outlined" style={{ color: '#80756d', fontSize: 18 }}>arrow_forward_ios</span>
        </button>

        {/* Stats */}
        <div className="rounded-xl p-5 mb-6" style={{ background: '#eee7e3' }}>
          <h4 style={{ fontFamily: 'Newsreader, serif', fontSize: 18, color: '#352518', margin: '0 0 16px' }}>Statistiques</h4>
          <div>
            {[
              { label: 'Elo Classique',        value: '2 140' },
              { label: 'Tactiques Résolues',   value: '1 482' },
              { label: 'Leçons Complétées',    value: '42'    },
            ].map((s, i, arr) => (
              <div
                key={s.label}
                className="flex justify-between items-baseline"
                style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(210,196,187,0.3)' : 'none', paddingBottom: 10, marginBottom: i < arr.length - 1 ? 10 : 0 }}
              >
                <span style={{ fontSize: 13, color: '#5f5f57' }}>{s.label}</span>
                <span style={{ fontFamily: 'Newsreader, serif', fontSize: 22, color: '#352518', fontWeight: 600 }}>{s.value}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4" style={{ color: '#073002' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>trending_up</span>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>+12 Elo cette semaine</span>
          </div>
        </div>

        {/* Programme Vidéo */}
        <button
          onClick={() => navigate('/videos')}
          className="w-full rounded-xl p-5 mb-6 text-left transition-all active:scale-95"
          style={{ background: '#352518', border: 'none', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(192,240,173,0.8)', margin: 0 }}>Udemy · Kingscrusher</p>
              <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: 18, color: '#fff', margin: '2px 0 0', fontWeight: 600 }}>Programme Vidéo</h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: 'Newsreader, serif', fontSize: 28, color: '#c0f0ad', margin: 0, fontWeight: 600, lineHeight: 1 }}>{videoPct}%</p>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{videoWatched}/{TOTAL_VIDEOS} vues</p>
            </div>
          </div>
          <div style={{ height: 2, background: 'rgba(255,255,255,0.15)', borderRadius: 99, position: 'relative', marginBottom: 10 }}>
            <div style={{ position: 'absolute', top: -1, left: 0, height: 4, width: `${videoPct}%`, background: '#c0f0ad', borderRadius: 99, transition: 'width 0.4s' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: 0, fontFamily: 'Newsreader, serif', fontStyle: 'italic' }}>
              {currentWeek ? `Semaine ${currentWeek.id} · ${currentWeek.title}` : '🏆 Programme complété !'}
            </p>
            <span className="material-symbols-outlined" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16 }}>arrow_forward_ios</span>
          </div>
        </button>

        {/* Lessons in progress */}
        <div className="mb-2">
          <div className="flex justify-between items-end mb-4">
            <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: 24, color: '#352518', margin: 0, fontStyle: 'italic', fontWeight: 500 }}>Leçons en Cours</h3>
            <button
              onClick={() => navigate('/library')}
              style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#80756d', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Voir tout →
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {lessons.map(l => (
              <button
                key={l.title}
                className="flex-shrink-0 text-left transition-all active:scale-95"
                style={{ width: 140, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                onClick={() => navigate(l.path, l.lessonId ? { state: { lessonId: l.lessonId } } : undefined)}
              >
                <div
                  className="rounded-xl mb-2 flex items-center justify-center"
                  style={{ width: 140, height: 186, background: '#f4ece9', fontSize: 64, overflow: 'hidden' }}
                >
                  {icons[l.tag]}
                </div>
                <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#073002', margin: '0 0 2px' }}>{l.tag}</p>
                <p style={{ fontFamily: 'Newsreader, serif', fontSize: 15, color: '#352518', margin: 0, fontWeight: 600, lineHeight: 1.2 }}>{l.title}</p>
                <p style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 12, color: '#5f5f57', margin: '2px 0 0' }}>{l.sub}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
