import { useState, useEffect } from 'react'

const CACHE_KEY = 'chess_com_stats'
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export function useChessStats(username = 'tomhiver') {
  const [stats, setStats]   = useState(() => {
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY))
      if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data
    } catch {}
    return null
  })
  const [loading, setLoading] = useState(!stats)
  const [error, setError]     = useState(null)

  useEffect(() => {
    // Si cache encore valide, pas besoin de refetch
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY))
      if (cached && Date.now() - cached.ts < CACHE_TTL) return
    } catch {}

    setLoading(true)
    fetch(`https://api.chess.com/pub/player/${username}/stats`)
      .then(r => r.json())
      .then(data => {
        const parsed = {
          rapid:   data.chess_rapid?.last?.rating  ?? null,
          blitz:   data.chess_blitz?.last?.rating  ?? null,
          daily:   data.chess_daily?.last?.rating  ?? null,
          tactics: data.tactics?.highest?.rating   ?? null,
          bestRapid: data.chess_rapid?.best?.rating ?? null,
          rapidWins:  data.chess_rapid?.record?.win  ?? 0,
          rapidLoss:  data.chess_rapid?.record?.loss ?? 0,
          rapidDraw:  data.chess_rapid?.record?.draw ?? 0,
          puzzleRush: data.puzzle_rush?.best?.score ?? null,
        }
        localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: parsed }))
        setStats(parsed)
        setLoading(false)
      })
      .catch(e => { setError(e); setLoading(false) })
  }, [username])

  return { stats, loading, error }
}
