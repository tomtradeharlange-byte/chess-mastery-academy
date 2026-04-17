import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameHistory } from '../hooks/useGameHistory'

const TIME_CLASS_LABEL = {
  bullet:      'Bullet',
  blitz:       'Blitz',
  rapid:       'Rapide',
  daily:       'Quotidien',
  classical:   'Classique',
  correspondence: 'Correspondance',
}

const TIME_CLASS_ICON = {
  bullet:   '⚡',
  blitz:    '🔥',
  rapid:    '⏱',
  daily:    '📅',
  classical:'♟',
}

function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  const now = new Date()
  const diff = now - d
  const mins = Math.floor(diff / 60000)
  const hrs  = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 60)  return `il y a ${mins}min`
  if (hrs  < 24)  return `il y a ${hrs}h`
  if (days < 7)   return `il y a ${days}j`
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

function ResultBadge({ result }) {
  const cfg = {
    win:  { bg: 'rgba(7,48,2,0.12)',   color: '#073002', label: 'Victoire' },
    loss: { bg: 'rgba(186,26,26,0.1)', color: '#ba1a1a', label: 'Défaite'  },
    draw: { bg: 'rgba(80,73,67,0.1)',  color: '#4e453e', label: 'Nulle'    },
  }
  const { bg, color, label } = cfg[result] || cfg.draw
  return (
    <span style={{ background: bg, color, borderRadius: 6, padding: '2px 8px', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
      {label}
    </span>
  )
}

function GameCard({ game }) {
  return (
    <div style={{ padding: '14px 0', borderBottom: '1px solid rgba(210,196,187,0.18)', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
      {/* Result indicator bar */}
      <div style={{
        width: 4, borderRadius: 99, alignSelf: 'stretch', minHeight: 52, flexShrink: 0,
        background: game.result === 'win' ? '#073002' : game.result === 'loss' ? '#ba1a1a' : '#d2c4bb',
      }} />

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Row 1: result + time class + date */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
          <ResultBadge result={game.result} />
          <span style={{ fontSize: 11, color: '#80756d' }}>
            {TIME_CLASS_ICON[game.timeClass]} {TIME_CLASS_LABEL[game.timeClass] || game.timeClass}
            {game.timeControl ? ` · ${game.timeControl}` : ''}
          </span>
          <span style={{ marginLeft: 'auto', fontSize: 10, color: '#c9c6bd', flexShrink: 0 }}>
            {formatDate(game.date)}
          </span>
        </div>

        {/* Row 2: opponent + ratings */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
          <span style={{ fontFamily: 'Newsreader, serif', fontSize: 16, fontWeight: 600, color: '#352518' }}>
            vs {game.opponent}
          </span>
          {game.oppRating && (
            <span style={{ fontSize: 11, color: '#80756d' }}>({game.oppRating})</span>
          )}
          {game.myRating && (
            <span style={{ fontSize: 10, color: '#c9c6bd', marginLeft: 2 }}>· moi {game.myRating}</span>
          )}
        </div>

        {/* Row 3: opening + moves */}
        {(game.opening || game.moves) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {game.opening && (
              <span style={{ fontSize: 11, fontStyle: 'italic', fontFamily: 'Newsreader, serif', color: '#5f5f57', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>
                {game.opening}
              </span>
            )}
            {game.moves && (
              <span style={{ fontSize: 10, color: '#c9c6bd', flexShrink: 0 }}>{game.opening ? '·' : ''} {game.moves} coups</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div style={{ padding: '14px 0', borderBottom: '1px solid rgba(210,196,187,0.18)', display: 'flex', gap: 14 }}>
      <div style={{ width: 4, borderRadius: 99, minHeight: 52, background: '#eee7e3' }} />
      <div style={{ flex: 1 }}>
        <div style={{ height: 18, width: 140, background: '#f4ece9', borderRadius: 6, marginBottom: 8 }} />
        <div style={{ height: 16, width: 200, background: '#f4ece9', borderRadius: 6, marginBottom: 6 }} />
        <div style={{ height: 12, width: 160, background: '#f4ece9', borderRadius: 6 }} />
      </div>
    </div>
  )
}

function StatBar({ games }) {
  if (!games || !games.length) return null
  const wins   = games.filter(g => g.result === 'win').length
  const losses = games.filter(g => g.result === 'loss').length
  const draws  = games.filter(g => g.result === 'draw').length
  const total  = games.length
  const winPct = Math.round((wins / total) * 100)

  return (
    <div style={{ background: '#faf2ef', borderRadius: 14, padding: '14px 16px', marginBottom: 20 }}>
      {/* Numbers */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        {[
          { label: 'Victoires', value: wins,   color: '#073002' },
          { label: 'Nulles',    value: draws,  color: '#4e453e' },
          { label: 'Défaites',  value: losses, color: '#ba1a1a' },
        ].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'Newsreader, serif', fontSize: 26, fontWeight: 700, color: s.color, margin: 0, lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#80756d', margin: '4px 0 0' }}>{s.label}</p>
          </div>
        ))}
      </div>
      {/* Bar */}
      <div style={{ height: 6, borderRadius: 99, background: '#eee7e3', overflow: 'hidden', display: 'flex' }}>
        <div style={{ width: `${(wins / total) * 100}%`, background: '#073002', transition: 'width 0.5s' }} />
        <div style={{ width: `${(draws / total) * 100}%`, background: '#d2c4bb' }} />
        <div style={{ width: `${(losses / total) * 100}%`, background: '#ba1a1a' }} />
      </div>
      <p style={{ fontSize: 10, color: '#80756d', margin: '8px 0 0', textAlign: 'right' }}>
        {winPct}% de victoires sur {total} parties
      </p>
    </div>
  )
}

export default function GameHistory() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('chesscom')

  const { ccGames, lcGames, ccLoading, lcLoading, ccError, lcError } = useGameHistory('tomhiver', 'tomhiver')

  const games   = tab === 'chesscom' ? ccGames   : lcGames
  const loading = tab === 'chesscom' ? ccLoading : lcLoading
  const error   = tab === 'chesscom' ? ccError   : lcError

  return (
    <div style={{ background: '#fff8f5', minHeight: '100dvh', paddingBottom: 96 }}>

      {/* Header */}
      <header
        className="sticky top-0 z-40 px-5 py-4"
        style={{ background: 'rgba(250,242,239,0.95)', backdropFilter: 'blur(16px)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h1 style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 22, color: '#352518', margin: 0, fontWeight: 600 }}>
            Mes Parties
          </h1>
          {/* Live indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: loading ? '#d2c4bb' : '#073002' }} />
            <span style={{ fontSize: 9, fontWeight: 700, color: loading ? '#80756d' : '#073002', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {loading ? 'Chargement…' : 'En direct'}
            </span>
          </div>
        </div>

        {/* Platform tabs */}
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { id: 'chesscom', label: 'Chess.com', emoji: '♛' },
            { id: 'lichess',  label: 'Lichess',   emoji: '♞' },
          ].map(p => (
            <button
              key={p.id}
              onClick={() => setTab(p.id)}
              style={{
                flex: 1, padding: '9px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
                background: tab === p.id ? '#352518' : '#eee7e3',
                color:      tab === p.id ? '#fff'    : '#80756d',
                fontSize: 12, fontWeight: 700, letterSpacing: '0.06em',
                transition: 'all 0.2s',
              }}
            >
              {p.emoji} {p.label}
            </button>
          ))}
        </div>
      </header>

      <div style={{ padding: '16px 20px 0' }}>

        {/* Stats summary */}
        {!loading && !error && games && <StatBar games={games} />}

        {/* Error state */}
        {error && !loading && (
          <div style={{ background: 'rgba(186,26,26,0.06)', borderRadius: 14, padding: '16px', textAlign: 'center', marginBottom: 20 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 32, color: '#ba1a1a', display: 'block', marginBottom: 8 }}>signal_wifi_off</span>
            <p style={{ fontFamily: 'Newsreader, serif', fontSize: 15, color: '#ba1a1a', margin: 0 }}>
              Impossible de charger les parties
            </p>
            <p style={{ fontSize: 12, color: '#80756d', margin: '6px 0 0', fontStyle: 'italic' }}>
              Compte introuvable ou connexion indisponible
            </p>
          </div>
        )}

        {/* Skeleton loading */}
        {loading && (
          <>
            <div style={{ background: '#faf2ef', borderRadius: 14, padding: '14px 16px', marginBottom: 20 }}>
              <div style={{ height: 26, width: 160, background: '#eee7e3', borderRadius: 6, marginBottom: 10 }} />
              <div style={{ height: 6, background: '#eee7e3', borderRadius: 99 }} />
            </div>
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </>
        )}

        {/* Games list */}
        {!loading && !error && games && games.length > 0 && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
              <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: 13, fontStyle: 'italic', color: '#80756d', margin: 0 }}>
                25 dernières parties
              </h3>
              <span style={{ fontSize: 9, fontWeight: 700, color: '#c9c6bd', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {tab === 'chesscom' ? 'tomhiver' : 'tomhiver'}
              </span>
            </div>
            {games.map(g => <GameCard key={g.id} game={g} />)}
          </>
        )}

        {/* Empty state */}
        {!loading && !error && games && games.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>♟</div>
            <p style={{ fontFamily: 'Newsreader, serif', fontSize: 18, color: '#352518', margin: '0 0 8px', fontWeight: 600 }}>
              Aucune partie trouvée
            </p>
            <p style={{ fontSize: 13, color: '#80756d', fontStyle: 'italic', fontFamily: 'Newsreader, serif' }}>
              Commencez à jouer sur {tab === 'chesscom' ? 'Chess.com' : 'Lichess'} !
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
