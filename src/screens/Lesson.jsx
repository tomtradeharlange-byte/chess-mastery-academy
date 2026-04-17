import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ChessBoard from '../components/ChessBoard'
import { LESSONS } from '../data/lessons'

const tabs = ['Théorie', 'Analyse', 'Exercices']

export default function Lesson() {
  const navigate  = useNavigate()
  const location  = useLocation()

  const lessonId  = location.state?.lessonId || 'stafford'
  const lesson    = LESSONS[lessonId] || LESSONS.stafford

  const [activeTab, setActiveTab]     = useState(0)
  const [activeMove, setActiveMove]   = useState(1)
  const [done, setDone]               = useState(false)

  // État exercices
  const [exIndex, setExIndex]         = useState(0)   // exercice courant
  const [exSelected, setExSelected]   = useState(null) // réponse choisie
  const [exAnswered, setExAnswered]   = useState(false) // a répondu ?
  const [exDone, setExDone]           = useState([])   // indices complétés
  const [exFinished, setExFinished]   = useState(false) // série terminée

  const exercises = lesson.exercises || []
  const exercise  = exercises[exIndex]

  function handleAnswer(opt) {
    if (exAnswered) return
    setExSelected(opt)
    setExAnswered(true)
    if (!exDone.includes(exIndex)) setExDone(prev => [...prev, exIndex])
  }

  function nextExercise() {
    if (exIndex < exercises.length - 1) {
      setExIndex(i => i + 1)
      setExSelected(null)
      setExAnswered(false)
    }
  }

  function restartExercises() {
    setExIndex(0)
    setExSelected(null)
    setExAnswered(false)
    setExDone([])
    setExFinished(false)
  }

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
                <div key={m.num}>
                  <button
                    onClick={() => setActiveMove(activeMove === m.num ? null : m.num)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', padding: '12px 16px',
                      background: activeMove === m.num ? 'rgba(192,240,173,0.2)' : 'transparent',
                      outline: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none',
                      borderBottom: activeMove === m.num && m.comment ? 'none' : '1px solid rgba(210,196,187,0.2)',
                      cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <span style={{ width: 32, fontSize: 12, color: '#80756d', flexShrink: 0 }}>{m.num}.</span>
                    <span style={{ flex: 1, fontSize: 13, fontWeight: activeMove === m.num ? 700 : 400, color: '#352518', fontFamily: 'Newsreader, serif' }}>{m.w}</span>
                    <span style={{ flex: 1, fontSize: 13, color: '#352518', fontFamily: 'Newsreader, serif' }}>{m.b}</span>
                    {m.comment && (
                      <span className="material-symbols-outlined" style={{ fontSize: 14, color: activeMove === m.num ? '#073002' : '#c9c6bd', marginLeft: 4, flexShrink: 0, transition: 'color 0.2s' }}>
                        {activeMove === m.num ? 'expand_less' : 'expand_more'}
                      </span>
                    )}
                  </button>
                  {activeMove === m.num && m.comment && (
                    <div style={{
                      padding: '10px 16px 14px 48px',
                      background: 'rgba(192,240,173,0.12)',
                      borderBottom: '1px solid rgba(210,196,187,0.2)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#073002', flexShrink: 0, marginTop: 2 }}>lightbulb</span>
                        <p style={{ fontSize: 13, color: '#4e453e', margin: 0, lineHeight: 1.6, fontFamily: 'Newsreader, serif', fontStyle: 'italic' }}>
                          {m.comment}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
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
          <div style={{ paddingBottom: 16 }}>

            {/* Tous complétés */}
            {exFinished ? (
              <div>
                <div style={{ background: 'rgba(192,240,173,0.2)', borderRadius: 14, padding: 20, textAlign: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: 48, marginBottom: 8 }}>🏆</div>
                  <h4 style={{ fontFamily: 'Newsreader, serif', fontSize: 20, color: '#073002', margin: '0 0 6px', fontWeight: 600 }}>
                    Série complétée !
                  </h4>
                  <p style={{ fontSize: 13, color: '#4e453e', margin: '0 0 16px' }}>
                    {exDone.length}/{exercises.length} exercices réussis sur <em>{lesson.title}</em>
                  </p>
                  <button
                    onClick={restartExercises}
                    style={{ background: 'linear-gradient(135deg, #352518 0%, #4d3b2c 100%)', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: 12, padding: '10px 24px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}
                  >
                    Recommencer
                  </button>
                </div>

                {/* Récap des scores */}
                {exercises.map((ex, i) => (
                  <div key={ex.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < exercises.length - 1 ? '1px solid rgba(210,196,187,0.2)' : 'none' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(192,240,173,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#073002' }}>check</span>
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#352518', margin: 0 }}>Exercice {i + 1}</p>
                      <p style={{ fontSize: 11, color: '#80756d', margin: 0 }}>{ex.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : exercise ? (
              <div>
                {/* Barre de progression */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <div style={{ flex: 1, height: 2, background: 'rgba(210,196,187,0.35)', borderRadius: 99, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: -1, left: 0, height: 4, background: '#073002', borderRadius: 99, width: `${(exDone.length / exercises.length) * 100}%`, transition: 'width 0.4s' }} />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#073002', textTransform: 'uppercase', letterSpacing: '0.1em', flexShrink: 0 }}>
                    {exIndex + 1}/{exercises.length}
                  </span>
                </div>

                {/* Pastilles navigation exercices */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                  {exercises.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setExIndex(i); setExSelected(null); setExAnswered(false) }}
                      style={{
                        flex: 1, height: 4, borderRadius: 99, border: 'none', cursor: 'pointer',
                        background: i === exIndex ? '#352518' : exDone.includes(i) ? '#073002' : '#d2c4bb',
                        transition: 'background 0.2s',
                      }}
                    />
                  ))}
                </div>

                {/* Carte exercice */}
                <div style={{ background: '#faf2ef', borderRadius: 14, padding: 16, marginBottom: 14 }}>
                  <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#073002', margin: '0 0 4px' }}>
                    Exercice {exIndex + 1} — {lesson.tag}
                  </p>
                  <h4 style={{ fontFamily: 'Newsreader, serif', fontSize: 18, color: '#352518', margin: '0 0 8px', fontWeight: 600 }}>
                    {exercise.title}
                  </h4>
                  <p style={{ fontSize: 13, color: '#4e453e', margin: 0, lineHeight: 1.6, fontFamily: 'Newsreader, serif', fontStyle: 'italic' }}>
                    {exercise.question}
                  </p>
                </div>

                {/* Options de réponse */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                  {exercise.options.map((opt, i) => {
                    const isCorrect  = opt === exercise.correct
                    const isSelected = opt === exSelected
                    let bg    = '#faf2ef'
                    let color = '#352518'
                    let border = '1px solid rgba(210,196,187,0.3)'
                    if (exAnswered) {
                      if (isCorrect)                   { bg = 'rgba(192,240,173,0.35)'; color = '#073002'; border = '1px solid rgba(7,48,2,0.25)' }
                      else if (isSelected && !isCorrect) { bg = 'rgba(186,26,26,0.1)';  color = '#ba1a1a'; border = '1px solid rgba(186,26,26,0.25)' }
                      else                             { color = '#80756d' }
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(opt)}
                        style={{
                          background: bg, border, color,
                          borderRadius: 12, padding: '12px 16px',
                          display: 'flex', alignItems: 'center', gap: 12,
                          cursor: exAnswered ? 'default' : 'pointer',
                          textAlign: 'left', transition: 'all 0.2s',
                        }}
                      >
                        <span style={{ width: 22, height: 22, borderRadius: '50%', background: exAnswered && isCorrect ? '#073002' : exAnswered && isSelected && !isCorrect ? '#ba1a1a' : '#eee7e3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {exAnswered && isCorrect
                            ? <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#fff' }}>check</span>
                            : exAnswered && isSelected && !isCorrect
                            ? <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#fff' }}>close</span>
                            : <span style={{ fontSize: 11, fontWeight: 700, color: '#80756d' }}>{String.fromCharCode(65 + i)}</span>
                          }
                        </span>
                        <span style={{ fontSize: 13, fontWeight: isSelected || (exAnswered && isCorrect) ? 600 : 400, lineHeight: 1.4 }}>
                          {opt}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Explication après réponse */}
                {exAnswered && (
                  <div style={{ background: exSelected === exercise.correct ? 'rgba(192,240,173,0.2)' : 'rgba(186,26,26,0.06)', borderRadius: 14, padding: 14, marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 18, color: exSelected === exercise.correct ? '#073002' : '#ba1a1a' }}>
                        {exSelected === exercise.correct ? 'check_circle' : 'info'}
                      </span>
                      <span style={{ fontWeight: 700, fontSize: 13, color: exSelected === exercise.correct ? '#073002' : '#ba1a1a' }}>
                        {exSelected === exercise.correct ? 'Excellent ! +10 points' : 'Pas tout à fait…'}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: '#4e453e', margin: 0, fontFamily: 'Newsreader, serif', fontStyle: 'italic', lineHeight: 1.6 }}>
                      {exercise.explanation}
                    </p>
                  </div>
                )}

                {/* Bouton suivant */}
                {exAnswered && (
                  exIndex < exercises.length - 1 ? (
                    <button
                      onClick={nextExercise}
                      style={{ background: 'linear-gradient(135deg, #352518 0%, #4d3b2c 100%)', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: 12, padding: '12px 0', width: '100%', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}
                    >
                      Exercice Suivant →
                    </button>
                  ) : (
                    <button
                      onClick={() => setExFinished(true)}
                      style={{ background: 'linear-gradient(135deg, #073002 0%, #204716 100%)', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: 12, padding: '12px 0', width: '100%', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}
                    >
                      Terminer la Série ✓
                    </button>
                  )
                )}
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: '#80756d', padding: '32px 0', fontFamily: 'Newsreader, serif', fontStyle: 'italic' }}>
                Aucun exercice disponible pour cette leçon.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
