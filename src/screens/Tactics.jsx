import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChessBoard from '../components/ChessBoard'

const categories = [
  { icon: '🔗', name: 'Clouage',     count: 4,  color: '#352518', id: 'clouage'     },
  { icon: '⚔️',  name: 'Fourchette', count: 4,  color: '#073002', id: 'fourchette'  },
  { icon: '🛡️',  name: 'Élimination',count: 4,  color: '#4e453e', id: 'elimination' },
  { icon: '♟',  name: 'CCT',        count: 4,  color: '#564334', id: 'cct'         },
]

const puzzles = [
  {
    title: 'Le Sacrifice de Philidor',
    desc:  'Les Blancs jouent et gagnent en 3 coups. Trouvez le coup décisif.',
    options: ['Cd4', 'Fg5', 'Txe5', 'Dc3'],
    correct: 'Fg5',
    explanation: 'Fg5 est le coup décisif — il épingle le cavalier en f6 et menace simultanément la dame noire.',
  },
  {
    title: 'La Fourchette Royale',
    desc:  'Les Noirs jouent et gagnent du matériel. Trouvez la fourchette.',
    options: ['Ce4', 'Fd4', 'Cd3+', 'Txb2'],
    correct: 'Cd3+',
    explanation: 'Cd3+ est la fourchette royale — le cavalier attaque à la fois le roi et la dame blanche.',
  },
  {
    title: 'Le Clouage Décisif',
    desc:  'Blancs jouent. Identifiez le clouage qui gagne une pièce.',
    options: ['Ff6', 'Tb1', 'Fd5', 'Cg5'],
    correct: 'Ff6',
    explanation: 'Ff6 cloue le cavalier noir sur g7 contre le roi — la pièce est irrémédiablement perdue.',
  },
]

export default function Tactics() {
  const [activeCategory, setActiveCategory] = useState(null)
  const [puzzleIndex, setPuzzleIndex]       = useState(0)
  const [selected, setSelected]             = useState(null)
  const [answered, setAnswered]             = useState(false)
  const navigate = useNavigate()

  const puzzle = puzzles[puzzleIndex % puzzles.length]

  function handleSelect(opt) {
    if (answered) return
    setSelected(opt)
    setAnswered(true)
  }

  function nextPuzzle() {
    setPuzzleIndex(i => i + 1)
    setSelected(null)
    setAnswered(false)
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

  const progress = ((puzzleIndex % puzzles.length) + (answered ? 1 : 0)) / puzzles.length

  return (
    <div style={{ background: '#fff8f5', minHeight: '100dvh', paddingBottom: 96 }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 px-5 py-4"
        style={{ background: 'rgba(250,242,239,0.95)', backdropFilter: 'blur(16px)' }}
      >
        <div className="flex items-center justify-between mb-2">
          <h1 style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 22, color: '#352518', margin: 0, fontWeight: 600 }}>
            Atelier Tactique
          </h1>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: '#eee7e3' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#073002' }}>local_fire_department</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#073002' }}>7 jours</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div style={{ flex: 1, height: 2, background: 'rgba(210,196,187,0.35)', borderRadius: 99, position: 'relative' }}>
            <div style={{ position: 'absolute', top: -1, left: 0, height: 4, width: `${progress * 100}%`, background: '#073002', borderRadius: 99, transition: 'width 0.4s' }} />
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#073002', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Puzzle {(puzzleIndex % puzzles.length) + 1}/{puzzles.length}
          </span>
        </div>
      </header>

      <div className="px-5 pt-4">
        {/* Categories — cliquables */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-5">
          {categories.map(c => (
            <button
              key={c.name}
              onClick={() => navigate(`/tactics/${c.id}`)}
              className="flex-shrink-0 rounded-xl px-3 py-2 flex items-center gap-2 transition-all active:scale-95"
              style={{
                background: '#faf2ef',
                border: 'none', cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 16 }}>{c.icon}</span>
              <div>
                <p style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: c.color, margin: 0 }}>{c.name}</p>
                <p style={{ fontSize: 11, color: '#80756d', margin: 0 }}>{c.count} puzzles</p>
              </div>
            </button>
          ))}
        </div>

        {/* Puzzle card */}
        <div className="rounded-xl p-4 mb-4" style={{ background: '#faf2ef', border: '1px solid rgba(210,196,187,0.15)' }}>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#073002', margin: '0 0 4px' }}>
            {activeCategory ? `${activeCategory}` : "L'Énigme du Jour"}
          </p>
          <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 22, color: '#352518', margin: '0 0 4px', fontWeight: 600 }}>
            {puzzle.title}
          </h2>
          <p style={{ fontSize: 13, fontFamily: 'Newsreader, serif', fontStyle: 'italic', color: '#4e453e', margin: 0 }}>
            {puzzle.desc}
          </p>
        </div>

        {/* Board */}
        <div className="flex justify-center mb-5">
          <ChessBoard position="stafford" size={330} />
        </div>

        {/* Answer options */}
        <h4 style={{ fontFamily: 'Newsreader, serif', fontSize: 16, color: '#352518', margin: '0 0 10px', fontWeight: 600 }}>
          Quel est le meilleur coup ?
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          {puzzle.options.map(opt => (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className="rounded-xl py-4 flex items-center justify-center gap-2 transition-all active:scale-95"
              style={{
                background: getBg(opt),
                border: '1px solid rgba(210,196,187,0.3)',
                cursor: answered ? 'default' : 'pointer',
              }}
            >
              {answered && opt === puzzle.correct && (
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#073002' }}>check_circle</span>
              )}
              {answered && opt === selected && opt !== puzzle.correct && (
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#ba1a1a' }}>cancel</span>
              )}
              <span style={{ fontFamily: 'Newsreader, serif', fontSize: 18, fontWeight: 700, color: getColor(opt) }}>
                {opt}
              </span>
            </button>
          ))}
        </div>

        {answered && (
          <div
            className="rounded-xl p-4 mb-4"
            style={{ background: selected === puzzle.correct ? 'rgba(192,240,173,0.2)' : 'rgba(186,26,26,0.06)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined" style={{ color: selected === puzzle.correct ? '#073002' : '#ba1a1a', fontSize: 18 }}>
                {selected === puzzle.correct ? 'check_circle' : 'info'}
              </span>
              <span style={{ fontWeight: 700, color: selected === puzzle.correct ? '#073002' : '#ba1a1a', fontSize: 13 }}>
                {selected === puzzle.correct ? 'Excellent ! +15 Elo' : 'Presque… Réessayez.'}
              </span>
            </div>
            <p style={{ fontSize: 13, color: '#4e453e', margin: 0, fontFamily: 'Newsreader, serif', fontStyle: 'italic' }}>
              {puzzle.explanation}
            </p>
          </div>
        )}

        {answered && (
          <button
            className="w-full py-3 rounded-xl transition-all active:scale-98"
            style={{ background: 'linear-gradient(135deg, #352518 0%, #4d3b2c 100%)', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
            onClick={nextPuzzle}
          >
            Puzzle Suivant →
          </button>
        )}
      </div>
    </div>
  )
}
