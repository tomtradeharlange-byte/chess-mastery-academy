// Simplified decorative chess board component
const INITIAL = [
  ['♜','♞','♝','♛','♚','♝','♞','♜'],
  ['♟','♟','♟','♟','♟','♟','♟','♟'],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','♙','','',''],
  ['','','','','','','',''],
  ['♙','♙','♙','♙','','♙','♙','♙'],
  ['♖','♘','♗','♕','♔','♗','♘','♖'],
]

// Stafford gambit position
const STAFFORD = [
  ['♜','','♝','♛','♚','♝','','♜'],
  ['♟','♟','♟','♟','','♟','♟','♟'],
  ['','','♞','','','♞','',''],
  ['','','','','♟','','',''],
  ['','','','','♙','','',''],
  ['','','♘','','','♘','',''],
  ['♙','♙','♙','♙','','♙','♙','♙'],
  ['♖','','♗','♕','♔','♗','','♖'],
]

const HIGHLIGHT_SQUARES = new Set(['f6', 'e5'])

export default function ChessBoard({ position = 'stafford', size = 280 }) {
  const board = position === 'stafford' ? STAFFORD : INITIAL
  const squareSize = size / 8

  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'grid',
        gridTemplateColumns: `repeat(8, 1fr)`,
        gridTemplateRows: `repeat(8, 1fr)`,
        borderRadius: '8px',
        overflow: 'hidden',
        border: '10px solid #e8e1de',
        boxShadow: '0 8px 32px rgba(53,37,24,0.12)',
      }}
    >
      {board.map((row, ri) =>
        row.map((piece, ci) => {
          const isLight = (ri + ci) % 2 === 0
          const file = String.fromCharCode(97 + ci)
          const rank = 8 - ri
          const sq = `${file}${rank}`
          const isHighlight = HIGHLIGHT_SQUARES.has(sq)

          return (
            <div
              key={sq}
              style={{
                background: isHighlight
                  ? 'rgba(192,240,173,0.55)'
                  : isLight ? '#ffffff' : '#e8e1de',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: squareSize * 0.65,
                userSelect: 'none',
                lineHeight: 1,
              }}
            >
              {piece}
            </div>
          )
        })
      )}
    </div>
  )
}
