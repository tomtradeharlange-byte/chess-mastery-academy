import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ChessBoard from '../components/ChessBoard'
import { TACTICS_CATEGORIES } from '../data/tacticsCategories'

export default function TacticsCategory() {
  const { categoryId }  = useParams()
  const navigate        = useNavigate()
  const category        = TACTICS_CATEGORIES[categoryId]

  const [puzzleIndex, setPuzzleIndex] = useState(0)
  const [selected, setSelected]       = useState(null)
  const [answered, setAnswered]       = useState(false)
  const [scores, setScores]           = useState([])
  const [finished, setFinished]       = useState(false)

  if (!category) return null

  const puzzles = category.puzzles
  const puzzle  = puzzles[puzzleIndex]
  const correct = scores.filter(Boolean).length

  function handleSelect(opt) {
    if (answered) return
    const isCorrect = opt === puzzle.correct
    setSelected(opt)
    setAnswered(true)
    setScores(prev => [...prev, isCorrect])
  }

  function next() {
    if (puzzleIndex < puzzles.length - 1) {
      setPuzzleIndex(i => i + 1)
      setSelected(null)
      setAnswered(false)
    } else {
      setFinished(true)
    }
  }

  function restart() {
    setPuzzleIndex(0)
    setSelected(null)
    setAnswered(false)
    setScores([])
    setFinished(false)
  }

  function getBg(opt) {
    if (!answered) return '#faf2ef'
    if (opt === puzzle.correct) return 'rgba(192,240,173,0.4)'
    if (opt === selected && opt !== puzzle.correct) return 'rgba(186,26,26,0.12)'
    return '#faf2ef'
  }
  function getColor(opt) {
    if (!answered) return '#352518'
    if (opt === puzzle.correct) return '#073002'
    if (opt === selected && opt !== puzzle.correct) return '#ba1a1a'
    return '#80756d'
  }

  return (
    <div style={{ background: '#fff8f5', minHeight: '100dvh', paddingBottom: 96 }}>

      {/* Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 40, padding: '12px 20px', background: 'rgba(250,242,239,0.95)', backdropFilter: 'blur(16px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate('/tactics')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <span className="material-symbols-outlined" style={{ color: '#352518', fontSize: 22 }}>arrow_back</span>
          </button>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: category.color, margin: 0 }}>Tactiques</p>
            <h1 style={{ fontFamily: 'Newsreader, serif', fontSize: 17, color: '#352518', margin: 0, fontWeight: 600 }}>
              {category.icon} {category.name}
            </h1>
          </div>
          {!finished && (
            <div style={{ background: '#eee7e3', borderRadius: 8, padding: '4px 10px' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#352518', margin: 0 }}>{puzzleIndex + 1}/{puzzles.length}</p>
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '16px 20px 0' }}>

        {/* Description */}
        <div style={{ background: '#faf2ef', borderRadius: 14, padding: '14px 16px', marginBottom: 20 }}>
          <p style={{ fontSize: 13, color: '#4e453e', margin: '0 0 8px', lineHeight: 1.6, fontFamily: 'Newsreader, serif', fontStyle: 'italic' }}>
            {category.description}
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 14, color: category.color, flexShrink: 0, marginTop: 1 }}>lightbulb</span>
            <p style={{ fontSize: 11, color: category.color, margin: 0, fontWeight: 700, lineHeight: 1.5 }}>{category.tip}</p>
          </div>
        </div>

        {/* Barre de progression */}
        {!finished && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 2, background: 'rgba(210,196,187,0.35)', borderRadius: 99, position: 'relative' }}>
              <div style={{ position: 'absolute', top: -1, left: 0, height: 4, background: category.color, borderRadius: 99, width: `${(puzzleIndex / puzzles.length) * 100}%`, transition: 'width 0.4s' }} />
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {puzzles.map((_, i) => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i < scores.length ? (scores[i] ? '#073002' : '#ba1a1a') : i === puzzleIndex ? category.color : '#d2c4bb', transition: 'background 0.3s' }} />
              ))}
            </div>
          </div>
        )}

        {/* Écran de fin */}
        {finished ? (
          <div>
            <div style={{ background: correct === puzzles.length ? 'rgba(192,240,173,0.2)' : '#faf2ef', borderRadius: 16, padding: 24, textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 52, marginBottom: 8 }}>
                {correct === puzzles.length ? '🏆' : correct >= puzzles.length / 2 ? '⭐' : '📚'}
              </div>
              <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: 22, color: '#352518', margin: '0 0 6px', fontWeight: 600 }}>
                {correct === puzzles.length ? 'Parfait !' : correct >= puzzles.length / 2 ? 'Bien joué !' : 'Continuez à pratiquer'}
              </h3>
              <p style={{ fontSize: 32, fontFamily: 'Newsreader, serif', fontWeight: 700, color: category.color, margin: '8px 0' }}>
                {correct}/{puzzles.length}
              </p>
              <p style={{ fontSize: 13, color: '#4e453e', margin: 0, fontFamily: 'Newsreader, serif', fontStyle: 'italic' }}>
                puzzles réussis en {category.name}
              </p>
            </div>

            {/* Récap */}
            {puzzles.map((p, i) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < puzzles.length - 1 ? '1px solid rgba(210,196,187,0.2)' : 'none' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: scores[i] ? 'rgba(192,240,173,0.3)' : 'rgba(186,26,26,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: scores[i] ? '#073002' : '#ba1a1a' }}>
                    {scores[i] ? 'check' : 'close'}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#352518', margin: 0 }}>{p.title}</p>
                  <p style={{ fontSize: 11, color: '#80756d', margin: 0, fontFamily: 'Newsreader, serif', fontStyle: 'italic' }}>{p.correct}</p>
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button
                onClick={restart}
                style={{ flex: 1, padding: '13px 0', borderRadius: 12, background: 'linear-gradient(135deg, #352518 0%, #4d3b2c 100%)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}
              >
                Recommencer
              </button>
              <button
                onClick={() => navigate('/tactics')}
                style={{ flex: 1, padding: '13px 0', borderRadius: 12, background: '#eee7e3', color: '#352518', border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}
              >
                Retour
              </button>
            </div>
          </div>

        ) : (
          <div>
            {/* Carte puzzle */}
            <div style={{ background: '#faf2ef', borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: category.color, margin: '0 0 4px' }}>
                Puzzle {puzzleIndex + 1} — {category.name}
              </p>
              <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: 19, color: '#352518', margin: '0 0 6px', fontWeight: 600 }}>
                {puzzle.title}
              </h3>
              <p style={{ fontSize: 13, color: '#4e453e', margin: 0, fontFamily: 'Newsreader, serif', fontStyle: 'italic', lineHeight: 1.6 }}>
                {puzzle.desc}
              </p>
            </div>

            {/* Board */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <ChessBoard position={puzzle.boardPosition} size={320} />
            </div>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
              {puzzle.options.map((opt, i) => {
                const isCorrect  = opt === puzzle.correct
                const isSelected = opt === selected
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(opt)}
                    style={{
                      background: getBg(opt),
                      border: answered
                        ? isCorrect ? '1px solid rgba(7,48,2,0.25)' : isSelected ? '1px solid rgba(186,26,26,0.25)' : '1px solid rgba(210,196,187,0.3)'
                        : '1px solid rgba(210,196,187,0.3)',
                      borderRadius: 12, padding: '12px 16px',
                      display: 'flex', alignItems: 'center', gap: 12,
                      cursor: answered ? 'default' : 'pointer',
                      textAlign: 'left', transition: 'all 0.2s',
                    }}
                  >
                    <span style={{ width: 24, height: 24, borderRadius: '50%', background: answered && isCorrect ? '#073002' : answered && isSelected && !isCorrect ? '#ba1a1a' : '#eee7e3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {answered && isCorrect
                        ? <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#fff' }}>check</span>
                        : answered && isSelected && !isCorrect
                        ? <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#fff' }}>close</span>
                        : <span style={{ fontSize: 11, fontWeight: 700, color: '#80756d' }}>{String.fromCharCode(65 + i)}</span>
                      }
                    </span>
                    <span style={{ fontSize: 13, color: getColor(opt), fontWeight: isSelected || (answered && isCorrect) ? 700 : 400, lineHeight: 1.4 }}>
                      {opt}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Explication */}
            {answered && (
              <div style={{ background: selected === puzzle.correct ? 'rgba(192,240,173,0.2)' : 'rgba(186,26,26,0.06)', borderRadius: 14, padding: 14, marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: selected === puzzle.correct ? '#073002' : '#ba1a1a' }}>
                    {selected === puzzle.correct ? 'check_circle' : 'info'}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: 13, color: selected === puzzle.correct ? '#073002' : '#ba1a1a' }}>
                    {selected === puzzle.correct ? 'Excellent ! +15 Elo' : 'Pas tout à fait…'}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: '#4e453e', margin: 0, fontFamily: 'Newsreader, serif', fontStyle: 'italic', lineHeight: 1.6 }}>
                  {puzzle.explanation}
                </p>
              </div>
            )}

            {/* Bouton suivant */}
            {answered && (
              <button
                onClick={next}
                style={{ background: 'linear-gradient(135deg, #352518 0%, #4d3b2c 100%)', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: 12, padding: '13px 0', width: '100%', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}
              >
                {puzzleIndex < puzzles.length - 1 ? 'Puzzle Suivant →' : 'Voir les Résultats ✓'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
