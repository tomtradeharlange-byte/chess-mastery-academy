import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChessBoard from '../components/ChessBoard'

const tabs = ['Théorie', 'Analyse', 'Exercices']

const moves = [
  { num: 1, w: 'e4',   b: 'e5'   },
  { num: 2, w: 'Cf3',  b: 'Cf6'  },
  { num: 3, w: 'Cxe5', b: 'd6'   },
  { num: 4, w: 'Cf3',  b: 'Cxe4' },
  { num: 5, w: 'd3',   b: '…'    },
]

const content = [
  {
    title: 'Principe fondamental',
    body: "Le Gambit Stafford commence par 1.e4 e5 2.Cf3 Cf6, offrant un pion pour un développement rapide et des pièges tactiques redoutables.",
  },
  {
    title: 'La psychologie du sacrifice',
    body: "Les Noirs créent des déséquilibres intentionnels. Le but n'est pas la récupération du pion, mais l'initiative et la confusion chez l'adversaire.",
  },
  {
    title: 'Variante principale',
    body: "Après 3.Cxe5 d6 4.Cf3 Cxe4, les Noirs récupèrent le pion avec un excellent développement. La partie s'oriente vers un milieu de jeu tactique.",
  },
]

export default function Lesson() {
  const [activeTab, setActiveTab]   = useState(0)
  const [activeMove, setActiveMove] = useState(1)
  const [done, setDone]             = useState(false)
  const navigate = useNavigate()

  const currentMove = moves[activeMove - 1]

  function goTo(n) { setActiveMove(Math.max(1, Math.min(moves.length, n))) }

  return (
    <div style={{ background: '#fff8f5', minHeight: '100dvh', paddingBottom: 96 }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 px-5 py-3 flex items-center gap-3"
        style={{ background: 'rgba(250,242,239,0.95)', backdropFilter: 'blur(16px)' }}
      >
        <button onClick={() => navigate(-1)} className="p-1">
          <span className="material-symbols-outlined" style={{ color: '#352518', fontSize: 22 }}>arrow_back</span>
        </button>
        <div className="flex-1">
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#073002', margin: 0 }}>Théorie Avancée · Vol. I</p>
          <h1 style={{ fontFamily: 'Newsreader, serif', fontSize: 17, color: '#352518', margin: 0, fontWeight: 600 }}>Leçon : Gambit Stafford</h1>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ background: '#eee7e3' }}>
          <span className="material-symbols-outlined" style={{ color: '#073002', fontSize: 14 }}>psychology</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#073002' }}>98.4%</span>
        </div>
      </header>

      {/* Chess board */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 20px 16px', position: 'relative' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <ChessBoard position="stafford" size={320} />
          {/* Floating evaluation — inside the board bounds */}
          <div
            style={{
              position: 'absolute',
              bottom: 10, right: 10,
              background: 'rgba(255,248,245,0.90)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(210,196,187,0.25)',
              boxShadow: '0 4px 20px rgba(53,37,24,0.10)',
              borderRadius: 10,
              padding: '8px 10px',
              maxWidth: 120,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 5 }}>
              <span className="material-symbols-outlined" style={{ color: '#073002', fontSize: 12 }}>flash_on</span>
              <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#352518' }}>Évaluation</span>
            </div>
            <div style={{ height: 3, background: 'rgba(210,196,187,0.35)', borderRadius: 99, marginBottom: 4 }}>
              <div style={{ height: 3, width: `${(activeMove / moves.length) * 100}%`, background: '#073002', borderRadius: 99, transition: 'width 0.3s' }} />
            </div>
            <p style={{ fontSize: 9, color: '#4e453e', margin: 0 }}>
              {activeMove < 3 ? 'Ouverture normale' : activeMove < 5 ? '+0.8 Avantage' : '+1.4 Piège Actif'}
            </p>
          </div>
        </div>
      </div>

      {/* Move controls */}
      <div className="flex justify-between items-center mx-5 mb-4 px-3 py-2 rounded-full" style={{ background: '#faf2ef' }}>
        <button
          onClick={() => goTo(1)}
          className="p-2 rounded-full transition-all active:scale-90"
          style={{ background: activeMove === 1 ? '#d2c4bb' : '#eee7e3', opacity: activeMove === 1 ? 0.4 : 1 }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#352518' }}>first_page</span>
        </button>
        <button
          onClick={() => goTo(activeMove - 1)}
          className="p-2 rounded-full transition-all active:scale-90"
          style={{ background: '#eee7e3', opacity: activeMove === 1 ? 0.4 : 1 }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#352518' }}>chevron_left</span>
        </button>
        <div className="px-4 py-1.5 rounded-full" style={{ background: '#352518' }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff' }}>
            Coup {currentMove.num} : {currentMove.w}
          </span>
        </div>
        <button
          onClick={() => goTo(activeMove + 1)}
          className="p-2 rounded-full transition-all active:scale-90"
          style={{ background: '#eee7e3', opacity: activeMove === moves.length ? 0.4 : 1 }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#352518' }}>chevron_right</span>
        </button>
        <button
          onClick={() => goTo(moves.length)}
          className="p-2 rounded-full transition-all active:scale-90"
          style={{ background: activeMove === moves.length ? '#d2c4bb' : '#eee7e3', opacity: activeMove === moves.length ? 0.4 : 1 }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#352518' }}>last_page</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mx-5 mb-4 rounded-xl overflow-hidden" style={{ background: '#f4ece9' }}>
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setActiveTab(i)}
            className="flex-1 py-2.5 transition-all"
            style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              background: activeTab === i ? '#352518' : 'transparent',
              color: activeTab === i ? '#fff' : '#80756d',
              border: 'none', cursor: 'pointer',
              borderRadius: activeTab === i ? 10 : 0,
            }}
          >{t}</button>
        ))}
      </div>

      <div className="px-5">
        {activeTab === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {content.map(c => (
              <div key={c.title} className="rounded-xl p-4" style={{ background: '#faf2ef' }}>
                <h4 style={{ fontFamily: 'Newsreader, serif', fontSize: 16, color: '#352518', margin: '0 0 6px', fontWeight: 600 }}>{c.title}</h4>
                <p style={{ fontSize: 13, color: '#4e453e', margin: 0, lineHeight: 1.6 }}>{c.body}</p>
              </div>
            ))}
            {done ? (
              <div className="rounded-xl p-4 flex items-center gap-3" style={{ background: 'rgba(192,240,173,0.25)' }}>
                <span className="material-symbols-outlined" style={{ color: '#073002', fontSize: 22 }}>check_circle</span>
                <div>
                  <p style={{ fontWeight: 700, color: '#073002', margin: 0, fontSize: 14 }}>Théorie complétée !</p>
                  <p style={{ fontSize: 12, color: '#4e453e', margin: 0 }}>Passez à l'Analyse ou aux Exercices</p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { setDone(true); setActiveTab(1) }}
                className="w-full py-3 rounded-xl mt-2 transition-all active:scale-98"
                style={{ background: 'linear-gradient(135deg, #352518 0%, #4d3b2c 100%)', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
              >
                Continuer la Leçon →
              </button>
            )}
          </div>
        )}

        {activeTab === 1 && (
          <div>
            <h4 style={{ fontFamily: 'Newsreader, serif', fontSize: 16, color: '#352518', margin: '0 0 12px', fontWeight: 600 }}>Notation des Coups</h4>
            <div className="rounded-xl overflow-hidden" style={{ background: '#faf2ef' }}>
              <div className="flex px-4 py-2" style={{ background: '#eee7e3' }}>
                <span style={{ width: 32, fontSize: 10, fontWeight: 700, color: '#80756d', textTransform: 'uppercase', letterSpacing: '0.1em' }}>#</span>
                <span style={{ flex: 1, fontSize: 10, fontWeight: 700, color: '#80756d', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Blancs</span>
                <span style={{ flex: 1, fontSize: 10, fontWeight: 700, color: '#80756d', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Noirs</span>
              </div>
              {moves.map(m => (
                <div
                  key={m.num}
                  className="flex px-4 py-3 cursor-pointer transition-all"
                  style={{
                    borderBottom: '1px solid rgba(210,196,187,0.2)',
                    background: activeMove === m.num ? 'rgba(192,240,173,0.2)' : 'transparent',
                  }}
                  onClick={() => setActiveMove(m.num)}
                >
                  <span style={{ width: 32, fontSize: 12, color: '#80756d' }}>{m.num}.</span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: activeMove === m.num ? 700 : 400, color: '#352518', fontFamily: 'Newsreader, serif' }}>{m.w}</span>
                  <span style={{ flex: 1, fontSize: 13, color: '#352518', fontFamily: 'Newsreader, serif' }}>{m.b}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setActiveTab(2)}
              className="w-full py-3 rounded-xl mt-4 transition-all active:scale-98"
              style={{ background: 'linear-gradient(135deg, #352518 0%, #4d3b2c 100%)', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
            >
              Passer aux Exercices →
            </button>
          </div>
        )}

        {activeTab === 2 && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">⚡</div>
            <h4 style={{ fontFamily: 'Newsreader, serif', fontSize: 20, color: '#352518', margin: '0 0 8px', fontWeight: 600 }}>
              3 Exercices disponibles
            </h4>
            <p style={{ fontSize: 13, color: '#4e453e', marginBottom: 20 }}>Mettez en pratique les concepts de ce Gambit</p>
            <button
              onClick={() => navigate('/tactics')}
              className="px-8 py-3 rounded-xl transition-all active:scale-95"
              style={{ background: 'linear-gradient(135deg, #352518 0%, #4d3b2c 100%)', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
            >
              Commencer les Exercices
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
