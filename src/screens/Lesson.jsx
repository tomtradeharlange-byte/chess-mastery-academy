import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ChessBoard from '../components/ChessBoard'
import { LESSONS } from '../data/lessons'

const tabs = ['Théorie', 'Analyse', 'Exercices']

export default function Lesson() {
  const navigate  = useNavigate()
  const location  = useLocation()

  // La leçon est passée via router state : navigate('/lesson', { state: { lessonId: 'sicilienne' } })
  // Fallback sur stafford si on arrive sans state
  const lessonId  = location.state?.lessonId || 'stafford'
  const lesson    = LESSONS[lessonId] || LESSONS.stafford

  const [activeTab, setActiveTab]   = useState(0)
  const [activeMove, setActiveMove] = useState(1)
  const [done, setDone]             = useState(false)

  const currentMove = lesson.moves[activeMove - 1]
  function goTo(n) { setActiveMove(Math.max(1, Math.min(lesson.moves.length, n))) }

  const progress = (activeMove / lesson.moves.length) * 100

  return (
    <div style={{ background: '#fff8f5', minHeight: '100dvh', paddingBottom: 80 }}>
      {/* Header */}
      <div
        style={{
          position: 'sticky', top: 0, zIndex: 40,
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 20px',
          background: 'rgba(250,242,239,0.95)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <span className="material-symbols-outlined" style={{ color: '#352518', fontSize: 22 }}>arrow_back</span>
        </button>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#073002', margin: 0 }}>
            {lesson.tag} · {lesson.subtitle}
          </p>
          <h1 style={{ fontFamily: 'Newsreader, serif', fontSize: 16, color: '#352518', margin: 0, fontWeight: 600 }}>
            {lesson.title}
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#eee7e3', borderRadius: 8, padding: '4px 8px' }}>
          <span className="material-symbols-outlined" style={{ color: '#073002', fontSize: 14 }}>psychology</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#073002' }}>{lesson.accuracy}</span>
        </div>
      </div>

      {/* Chess board */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 20px 16px' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <ChessBoard position={lesson.boardPosition} size={320} />
          {/* Floating evaluation */}
          <div
            style={{
              position: 'absolute', bottom: 10, right: 10,
              background: 'rgba(255,248,245,0.90)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(210,196,187,0.25)',
              boxShadow: '0 4px 20px rgba(53,37,24,0.10)',
              borderRadius: 10, padding: '8px 10px', maxWidth: 120,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 5 }}>
              <span className="material-symbols-outlined" style={{ color: '#073002', fontSize: 12 }}>flash_on</span>
              <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#352518' }}>Évaluation</span>
            </div>
            <div style={{ height: 3, background: 'rgba(210,196,187,0.35)', borderRadius: 99, marginBottom: 4 }}>
              <div style={{ height: 3, width: `${progress}%`, background: '#073002', borderRadius: 99, transition: 'width 0.3s' }} />
            </div>
            <p style={{ fontSize: 9, color: '#4e453e', margin: 0 }}>
              {activeMove < 2 ? 'Position initiale' : activeMove < 4 ? 'Égalité' : '+0.8 Blancs'}
            </p>
          </div>
        </div>
      </div>

      {/* Move controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 20px 16px', padding: '8px 12px', borderRadius: 99, background: '#faf2ef' }}>
        <button
          onClick={() => goTo(1)}
          style={{ background: '#eee7e3', border: 'none', cursor: 'pointer', padding: 8, borderRadius: '50%', opacity: activeMove === 1 ? 0.35 : 1, display: 'flex' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#352518' }}>first_page</span>
        </button>
        <button
          onClick={() => goTo(activeMove - 1)}
          style={{ background: '#eee7e3', border: 'none', cursor: 'pointer', padding: 8, borderRadius: '50%', opacity: activeMove === 1 ? 0.35 : 1, display: 'flex' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#352518' }}>chevron_left</span>
        </button>
        <div style={{ background: '#352518', borderRadius: 99, padding: '6px 16px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff' }}>
            Coup {currentMove.num} : {currentMove.w}
          </span>
        </div>
        <button
          onClick={() => goTo(activeMove + 1)}
          style={{ background: '#eee7e3', border: 'none', cursor: 'pointer', padding: 8, borderRadius: '50%', opacity: activeMove === lesson.moves.length ? 0.35 : 1, display: 'flex' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#352518' }}>chevron_right</span>
        </button>
        <button
          onClick={() => goTo(lesson.moves.length)}
          style={{ background: '#eee7e3', border: 'none', cursor: 'pointer', padding: 8, borderRadius: '50%', opacity: activeMove === lesson.moves.length ? 0.35 : 1, display: 'flex' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#352518' }}>last_page</span>
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', margin: '0 20px 16px', borderRadius: 12, overflow: 'hidden', background: '#f4ece9' }}>
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setActiveTab(i)}
            style={{
              flex: 1, padding: '10px 0',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              background: activeTab === i ? '#352518' : 'transparent',
              color: activeTab === i ? '#fff' : '#80756d',
              border: 'none', cursor: 'pointer',
              borderRadius: activeTab === i ? 10 : 0,
              transition: 'background 0.2s, color 0.2s',
            }}
          >{t}</button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ padding: '0 20px' }}>

        {/* ── Théorie ── */}
        {activeTab === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {lesson.content.map(c => (
              <div key={c.title} style={{ background: '#faf2ef', borderRadius: 14, padding: 16 }}>
                <h4 style={{ fontFamily: 'Newsreader, serif', fontSize: 16, color: '#352518', margin: '0 0 6px', fontWeight: 600 }}>{c.title}</h4>
                <p style={{ fontSize: 13, color: '#4e453e', margin: 0, lineHeight: 1.65 }}>{c.body}</p>
              </div>
            ))}
            {done ? (
              <div style={{ background: 'rgba(192,240,173,0.25)', borderRadius: 14, padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="material-symbols-outlined" style={{ color: '#073002', fontSize: 22 }}>check_circle</span>
                <div>
                  <p style={{ fontWeight: 700, color: '#073002', margin: 0, fontSize: 14 }}>Théorie complétée !</p>
                  <p style={{ fontSize: 12, color: '#4e453e', margin: 0 }}>Passez à l'Analyse ou aux Exercices</p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { setDone(true); setActiveTab(1) }}
                style={{ background: 'linear-gradient(135deg, #352518 0%, #4d3b2c 100%)', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: 12, padding: '12px 0', width: '100%', marginTop: 4, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}
              >
                Continuer la Leçon →
              </button>
            )}
          </div>
        )}

        {/* ── Analyse ── */}
        {activeTab === 1 && (
          <div>
            <h4 style={{ fontFamily: 'Newsreader, serif', fontSize: 16, color: '#352518', margin: '0 0 12px', fontWeight: 600 }}>Notation des Coups</h4>
            <div style={{ borderRadius: 14, overflow: 'hidden', background: '#faf2ef' }}>
              <div style={{ display: 'flex', padding: '8px 16px', background: '#eee7e3' }}>
                <span style={{ width: 32, fontSize: 10, fontWeight: 700, color: '#80756d', textTransform: 'uppercase', letterSpacing: '0.1em' }}>#</span>
                <span style={{ flex: 1, fontSize: 10, fontWeight: 700, color: '#80756d', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Blancs</span>
                <span style={{ flex: 1, fontSize: 10, fontWeight: 700, color: '#80756d', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Noirs</span>
              </div>
              {lesson.moves.map(m => (
                <button
                  key={m.num}
                  onClick={() => setActiveMove(m.num)}
                  style={{
                    width: '100%', display: 'flex', padding: '12px 16px',
                    borderBottom: '1px solid rgba(210,196,187,0.2)',
                    background: activeMove === m.num ? 'rgba(192,240,173,0.2)' : 'transparent',
                    border: 'none', borderBottom: '1px solid rgba(210,196,187,0.2)',
                    cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <span style={{ width: 32, fontSize: 12, color: '#80756d' }}>{m.num}.</span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: activeMove === m.num ? 700 : 400, color: '#352518', fontFamily: 'Newsreader, serif' }}>{m.w}</span>
                  <span style={{ flex: 1, fontSize: 13, color: '#352518', fontFamily: 'Newsreader, serif' }}>{m.b}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setActiveTab(2)}
              style={{ background: 'linear-gradient(135deg, #352518 0%, #4d3b2c 100%)', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: 12, padding: '12px 0', width: '100%', marginTop: 16, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}
            >
              Passer aux Exercices →
            </button>
          </div>
        )}

        {/* ── Exercices ── */}
        {activeTab === 2 && (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>⚡</div>
            <h4 style={{ fontFamily: 'Newsreader, serif', fontSize: 20, color: '#352518', margin: '0 0 8px', fontWeight: 600 }}>
              3 Exercices disponibles
            </h4>
            <p style={{ fontSize: 13, color: '#4e453e', margin: '0 0 24px' }}>
              Mettez en pratique les concepts de {lesson.title}
            </p>
            <button
              onClick={() => navigate('/tactics')}
              style={{ background: 'linear-gradient(135deg, #352518 0%, #4d3b2c 100%)', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: 12, padding: '12px 32px', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}
            >
              Commencer les Exercices
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
