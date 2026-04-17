import { useState, useEffect, useCallback, useRef } from 'react'

const FILES = ['a','b','c','d','e','f','g','h']
const RANKS = ['1','2','3','4','5','6','7','8']
const ALL_SQUARES = FILES.flatMap(f => RANKS.map(r => f + r))

function getSquareName(row, col, orientation) {
  if (orientation === 'white') return FILES[col] + RANKS[7 - row]
  return FILES[7 - col] + RANKS[row]
}

function randomSquare(exclude) {
  let sq
  do { sq = ALL_SQUARES[Math.floor(Math.random() * 64)] } while (sq === exclude)
  return sq
}

function getChoices(correct) {
  const others = ALL_SQUARES.filter(s => s !== correct)
  const picks = []
  while (picks.length < 3) {
    const s = others[Math.floor(Math.random() * others.length)]
    if (!picks.includes(s)) picks.push(s)
  }
  return [correct, ...picks].sort(() => Math.random() - 0.5)
}

function Board({ orientation, mode, gameState, currentSquare, feedback, onSquareClick }) {
  const fileLabels = orientation === 'white' ? FILES : [...FILES].reverse()

  return (
    <div>
      <div style={{ display: 'flex', paddingLeft: 18, marginBottom: 2 }}>
        {fileLabels.map(f => (
          <div key={f} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: '#80756d', fontWeight: 700 }}>{f}</div>
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: 18 }}>
          {Array.from({ length: 8 }, (_, row) => (
            <div key={row} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#80756d', fontWeight: 700 }}>
              {orientation === 'white' ? RANKS[7 - row] : RANKS[row]}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', borderRadius: 8, overflow: 'hidden', border: '2px solid #b58863', aspectRatio: '1' }}>
          {Array.from({ length: 64 }, (_, i) => {
            const row = Math.floor(i / 8)
            const col = i % 8
            const sq = getSquareName(row, col, orientation)
            const light = (row + col) % 2 === 0
            let bg = light ? '#f0d9b5' : '#b58863'

            if (gameState === 'playing') {
              if (mode === 'name-to-square' && feedback) {
                if (sq === feedback.clicked) bg = feedback.isCorrect ? '#4caf50' : '#e53935'
                else if (!feedback.isCorrect && sq === currentSquare) bg = '#66bb6a99'
              } else if (mode === 'square-to-name') {
                if (sq === currentSquare) {
                  if (feedback) bg = feedback.isCorrect ? '#4caf50' : '#e53935'
                  else bg = '#ff9800'
                }
              }
            }

            return (
              <button
                key={sq}
                onClick={() => onSquareClick(sq)}
                style={{ background: bg, border: 'none', cursor: mode === 'name-to-square' && gameState === 'playing' && !feedback ? 'pointer' : 'default', transition: 'background 0.15s', aspectRatio: '1', padding: 0 }}
              />
            )
          })}
        </div>
      </div>
      <div style={{ display: 'flex', paddingLeft: 18, marginTop: 2 }}>
        {fileLabels.map(f => (
          <div key={f} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: '#80756d', fontWeight: 700 }}>{f}</div>
        ))}
      </div>
    </div>
  )
}

export default function CoordVision() {
  const [mode, setMode]             = useState('name-to-square')
  const [orientation, setOrientation] = useState('white')
  const [duration, setDuration]     = useState(30)
  const [gameState, setGameState]   = useState('idle')
  const [timeLeft, setTimeLeft]     = useState(30)
  const [correct, setCorrect]       = useState(0)
  const [total, setTotal]           = useState(0)
  const [currentSquare, setCurrentSquare] = useState('')
  const [feedback, setFeedback]     = useState(null)
  const [choices, setChoices]       = useState([])
  const timerRef = useRef(null)
  const feedbackRef = useRef(false)

  const advance = useCallback((prev, currentMode) => {
    const sq = randomSquare(prev)
    setCurrentSquare(sq)
    setFeedback(null)
    feedbackRef.current = false
    if (currentMode === 'square-to-name') setChoices(getChoices(sq))
  }, [])

  const startGame = useCallback(() => {
    clearInterval(timerRef.current)
    setCorrect(0)
    setTotal(0)
    setTimeLeft(duration)
    setFeedback(null)
    feedbackRef.current = false
    const sq = randomSquare(null)
    setCurrentSquare(sq)
    if (mode === 'square-to-name') setChoices(getChoices(sq))
    setGameState('playing')
  }, [duration, mode])

  useEffect(() => {
    if (gameState !== 'playing') return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          setGameState('finished')
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [gameState])

  const handleAnswer = useCallback((isCorrect, clicked) => {
    if (feedbackRef.current) return
    feedbackRef.current = true
    setTotal(t => t + 1)
    if (isCorrect) setCorrect(c => c + 1)
    setFeedback({ clicked, isCorrect })
    setTimeout(() => {
      setCurrentSquare(prev => {
        const sq = randomSquare(prev)
        setFeedback(null)
        feedbackRef.current = false
        setChoices(getChoices(sq))
        return sq
      })
    }, 600)
  }, [])

  const handleSquareClick = (sq) => {
    if (gameState !== 'playing' || mode !== 'name-to-square') return
    handleAnswer(sq === currentSquare, sq)
  }

  const handleChoiceClick = (choice) => {
    if (gameState !== 'playing' || mode !== 'square-to-name') return
    handleAnswer(choice === currentSquare, choice)
  }

  if (gameState === 'finished') {
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0
    return (
      <div style={{ background: '#fff8f5', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px 96px' }}>
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#073002', margin: '0 0 8px' }}>Résultat</p>
        <p style={{ fontFamily: 'Newsreader, serif', fontSize: 80, color: '#352518', margin: 0, fontWeight: 600, lineHeight: 1 }}>{pct}%</p>
        <p style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 18, color: '#4e453e', marginTop: 8 }}>{correct} bonnes sur {total}</p>
        <button onClick={startGame} style={{ marginTop: 32, background: '#352518', color: '#faf2ef', border: 'none', borderRadius: 12, padding: '14px 48px', fontFamily: 'Newsreader, serif', fontSize: 18, cursor: 'pointer', fontWeight: 600 }}>
          Rejouer
        </button>
        <button onClick={() => setGameState('idle')} style={{ marginTop: 12, background: 'none', color: '#80756d', border: 'none', fontSize: 13, cursor: 'pointer' }}>
          Changer les réglages
        </button>
      </div>
    )
  }

  return (
    <div style={{ background: '#fff8f5', minHeight: '100dvh', paddingBottom: 80 }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'rgba(250,242,239,0.95)', backdropFilter: 'blur(16px)' }}>
        <h1 style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 20, color: '#352518', margin: 0, fontWeight: 600 }}>Vision</h1>
        {gameState === 'playing' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: 'Newsreader, serif', fontSize: 22, color: timeLeft <= 10 ? '#e53935' : '#352518', fontWeight: 600, transition: 'color 0.3s' }}>{timeLeft}s</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#073002', letterSpacing: '0.05em' }}>✓ {correct}/{total}</span>
          </div>
        )}
      </header>

      <div style={{ padding: '12px 16px 0' }}>
        {gameState === 'idle' && (
          <>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#80756d', margin: '0 0 8px' }}>Mode</p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              {[['name-to-square', 'Nom → Case'], ['square-to-name', 'Case → Nom']].map(([v, l]) => (
                <button key={v} onClick={() => setMode(v)} style={{ flex: 1, padding: '11px 0', borderRadius: 10, border: 'none', background: mode === v ? '#352518' : '#eee7e3', color: mode === v ? '#faf2ef' : '#352518', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>{l}</button>
              ))}
            </div>

            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#80756d', margin: '0 0 8px' }}>Orientation</p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              {[['white', '♔ Blancs'], ['black', '♚ Noirs']].map(([v, l]) => (
                <button key={v} onClick={() => setOrientation(v)} style={{ flex: 1, padding: '11px 0', borderRadius: 10, border: 'none', background: orientation === v ? '#352518' : '#eee7e3', color: orientation === v ? '#faf2ef' : '#352518', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>{l}</button>
              ))}
            </div>

            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#80756d', margin: '0 0 8px' }}>Durée</p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
              {[[30, '30 secondes'], [60, '60 secondes']].map(([v, l]) => (
                <button key={v} onClick={() => setDuration(v)} style={{ flex: 1, padding: '11px 0', borderRadius: 10, border: 'none', background: duration === v ? '#352518' : '#eee7e3', color: duration === v ? '#faf2ef' : '#352518', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>{l}</button>
              ))}
            </div>

            <button onClick={startGame} style={{ width: '100%', background: '#352518', color: '#faf2ef', border: 'none', borderRadius: 14, padding: '18px 0', fontFamily: 'Newsreader, serif', fontSize: 20, cursor: 'pointer', fontWeight: 600 }}>
              Démarrer
            </button>
          </>
        )}

        {gameState === 'playing' && (
          <>
            <div style={{ height: 4, background: '#eee7e3', borderRadius: 99, marginBottom: 16, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(timeLeft / duration) * 100}%`, background: timeLeft <= 10 ? '#e53935' : '#073002', borderRadius: 99, transition: 'width 1s linear, background 0.3s' }} />
            </div>

            {mode === 'name-to-square' && (
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#80756d', margin: '0 0 4px' }}>Trouvez la case</p>
                <p style={{ fontFamily: 'Newsreader, serif', fontSize: 72, color: '#352518', margin: 0, fontWeight: 600, lineHeight: 1 }}>{currentSquare}</p>
              </div>
            )}

            {mode === 'square-to-name' && (
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#80756d', margin: '0 0 12px', textAlign: 'center' }}>Quelle est cette case ?</p>
            )}

            <Board
              orientation={orientation}
              mode={mode}
              gameState={gameState}
              currentSquare={currentSquare}
              feedback={feedback}
              onSquareClick={handleSquareClick}
            />

            {mode === 'square-to-name' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
                {choices.map(c => {
                  let bg = '#faf2ef'
                  let color = '#352518'
                  if (feedback) {
                    if (c === currentSquare) { bg = '#4caf50'; color = '#fff' }
                    else if (c === feedback.clicked && !feedback.isCorrect) { bg = '#e53935'; color = '#fff' }
                  }
                  return (
                    <button
                      key={c}
                      onClick={() => handleChoiceClick(c)}
                      style={{ padding: '18px 0', borderRadius: 12, border: '1px solid rgba(210,196,187,0.4)', background: bg, color, fontFamily: 'Newsreader, serif', fontSize: 28, fontWeight: 600, cursor: feedback ? 'default' : 'pointer', transition: 'background 0.15s' }}
                    >
                      {c}
                    </button>
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
