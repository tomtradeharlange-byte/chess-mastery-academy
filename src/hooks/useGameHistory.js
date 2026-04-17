import { useState, useEffect } from 'react'

const CACHE_KEY_CC  = 'chess_com_games'
const CACHE_KEY_LC  = 'lichess_games'
const CACHE_TTL     = 3 * 60 * 1000 // 3 minutes

// ── Chess.com ────────────────────────────────────────────────────────────────
async function fetchChessComGames(username) {
  // 1. Get archives list
  const archRes  = await fetch(`https://api.chess.com/pub/player/${username}/games/archives`)
  const archData = await archRes.json()
  const archives = archData.archives || []
  if (!archives.length) return []

  // Take last 2 months in case current month has < 25 games
  const urls = archives.slice(-2).reverse()
  let games = []
  for (const url of urls) {
    const r    = await fetch(url)
    const data = await r.json()
    games = [...(data.games || []).reverse(), ...games]
    if (games.length >= 25) break
  }

  return games.slice(0, 25).map(g => {
    const isWhite   = g.white.username.toLowerCase() === username.toLowerCase()
    const me        = isWhite ? g.white : g.black
    const opponent  = isWhite ? g.black : g.white
    const result    = me.result === 'win' ? 'win' : opponent.result === 'win' ? 'loss' : 'draw'
    const date      = new Date(g.end_time * 1000)

    // Extract opening from PGN ECOUrl header
    let opening = null
    const ecoMatch = (g.pgn || '').match(/\[ECOUrl ".*\/([^"]+)"\]/)
    if (ecoMatch) opening = ecoMatch[1].replace(/-/g, ' ')

    // Count moves (pairs like "1." in PGN)
    const moveMatch = (g.pgn || '').match(/\d+\.\s/g)
    const moves = moveMatch ? moveMatch.length : null

    return {
      id:          g.url,
      platform:    'chesscom',
      timeClass:   g.time_class,   // bullet / blitz / rapid / daily
      timeControl: g.time_control,
      result,
      myRating:    me.rating,
      opponent:    opponent.username,
      oppRating:   opponent.rating,
      date,
      opening,
      moves,
      url: g.url,
    }
  })
}

// ── Lichess ──────────────────────────────────────────────────────────────────
async function fetchLichessGames(username) {
  const res = await fetch(
    `https://lichess.org/api/games/user/${username}?max=25&opening=true&pgnInJson=true`,
    { headers: { Accept: 'application/x-ndjson' } }
  )
  if (!res.ok) throw new Error(`Lichess ${res.status}`)
  const text  = await res.text()
  const lines = text.trim().split('\n').filter(Boolean)

  return lines.map(line => {
    const g        = JSON.parse(line)
    const isWhite  = g.players?.white?.user?.name?.toLowerCase() === username.toLowerCase()
    const me       = isWhite ? g.players?.white : g.players?.black
    const opp      = isWhite ? g.players?.black : g.players?.white
    const status   = g.status
    const winner   = g.winner  // 'white' | 'black' | undefined

    let result = 'draw'
    if (winner === 'white')  result = isWhite ? 'win' : 'loss'
    else if (winner === 'black') result = isWhite ? 'loss' : 'win'
    else if (['resign','mate','timeout','outoftime'].includes(status)) result = 'draw'

    const tc      = g.clock ? `${g.clock.initial / 60}+${g.clock.increment}` : g.speed
    const date    = new Date(g.createdAt)
    const opening = g.opening?.name ?? null
    const moves   = g.moves ? Math.ceil(g.moves.split(' ').length / 2) : null

    return {
      id:          g.id,
      platform:    'lichess',
      timeClass:   g.speed,
      timeControl: tc,
      result,
      myRating:    me?.rating ?? null,
      opponent:    opp?.user?.name ?? 'Anonyme',
      oppRating:   opp?.rating ?? null,
      date,
      opening,
      moves,
      url: `https://lichess.org/${g.id}`,
    }
  })
}

// ── Hook ─────────────────────────────────────────────────────────────────────
export function useGameHistory(ccUsername = 'tomhiver', lcUsername = 'tomhiver') {
  const [ccGames,  setCcGames]  = useState(() => {
    try {
      const c = JSON.parse(localStorage.getItem(CACHE_KEY_CC))
      if (c && Date.now() - c.ts < CACHE_TTL) return c.data
    } catch {}
    return null
  })
  const [lcGames,  setLcGames]  = useState(() => {
    try {
      const c = JSON.parse(localStorage.getItem(CACHE_KEY_LC))
      if (c && Date.now() - c.ts < CACHE_TTL) return c.data
    } catch {}
    return null
  })
  const [ccLoading, setCcLoading] = useState(!ccGames)
  const [lcLoading, setLcLoading] = useState(!lcGames)
  const [ccError,   setCcError]   = useState(null)
  const [lcError,   setLcError]   = useState(null)

  useEffect(() => {
    try {
      const c = JSON.parse(localStorage.getItem(CACHE_KEY_CC))
      if (c && Date.now() - c.ts < CACHE_TTL) return
    } catch {}
    setCcLoading(true)
    fetchChessComGames(ccUsername)
      .then(games => {
        localStorage.setItem(CACHE_KEY_CC, JSON.stringify({ ts: Date.now(), data: games }))
        setCcGames(games)
        setCcLoading(false)
      })
      .catch(e => { setCcError(e); setCcLoading(false) })
  }, [ccUsername])

  useEffect(() => {
    try {
      const c = JSON.parse(localStorage.getItem(CACHE_KEY_LC))
      if (c && Date.now() - c.ts < CACHE_TTL) return
    } catch {}
    setLcLoading(true)
    fetchLichessGames(lcUsername)
      .then(games => {
        localStorage.setItem(CACHE_KEY_LC, JSON.stringify({ ts: Date.now(), data: games }))
        setLcGames(games)
        setLcLoading(false)
      })
      .catch(e => { setLcError(e); setLcLoading(false) })
  }, [lcUsername])

  return { ccGames, lcGames, ccLoading, lcLoading, ccError, lcError }
}
