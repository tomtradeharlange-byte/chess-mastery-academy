import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { WEEKS, TOTAL_VIDEOS } from '../data/videoProgram'

function useWatched() {
  const [watched, setWatched] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('chess_videos_watched') || '[]')) }
    catch { return new Set() }
  })
  function toggle(id) {
    setWatched(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      localStorage.setItem('chess_videos_watched', JSON.stringify([...next]))
      return next
    })
  }
  return [watched, toggle]
}

export default function VideoProgram() {
  const navigate = useNavigate()
  const [watched, toggleWatched] = useWatched()
  const [openWeek, setOpenWeek]   = useState(null)
  const [openDay, setOpenDay]     = useState(null)

  const totalWatched = watched.size
  const overallPct   = Math.round((totalWatched / TOTAL_VIDEOS) * 100)

  // Trouver la semaine courante (première semaine non complète)
  const currentWeek = WEEKS.find(w =>
    w.days.some(d => d.videos.some(v => !watched.has(v.id)))
  )

  function weekWatched(w)    { return w.days.reduce((a, d) => a + d.videos.filter(v => watched.has(v.id)).length, 0) }
  function weekTotal(w)      { return w.days.reduce((a, d) => a + d.videos.length, 0) }
  function dayWatched(d)     { return d.videos.filter(v => watched.has(v.id)).length }
  function isWeekDone(w)     { return weekWatched(w) === weekTotal(w) }
  function isDayDone(d)      { return dayWatched(d) === d.videos.length }

  return (
    <div style={{ background: '#fff8f5', minHeight: '100dvh', paddingBottom: 96 }}>

      {/* Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 40, padding: '12px 20px', background: 'rgba(250,242,239,0.95)', backdropFilter: 'blur(16px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <span className="material-symbols-outlined" style={{ color: '#352518', fontSize: 22 }}>arrow_back</span>
          </button>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#073002', margin: 0 }}>Udemy · Kingscrusher</p>
            <h1 style={{ fontFamily: 'Newsreader, serif', fontSize: 16, color: '#352518', margin: 0, fontWeight: 600 }}>Programme Vidéo</h1>
          </div>
          <div style={{ background: '#eee7e3', borderRadius: 8, padding: '4px 10px', textAlign: 'center' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#352518', margin: 0 }}>{totalWatched}/{TOTAL_VIDEOS}</p>
            <p style={{ fontSize: 9, color: '#80756d', margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>vues</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 20px 0' }}>

        {/* Hero */}
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 34, fontWeight: 500, color: '#352518', margin: '0 0 4px', fontStyle: 'italic', lineHeight: 1.1 }}>
            6 Semaines<br /><em>de Formation</em>
          </h2>
          <p style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 13, color: '#4e453e', margin: '8px 0 0' }}>
            "The Complete Beginner's Guide to Chess"
          </p>
        </div>

        {/* Progression globale */}
        <div style={{ background: '#faf2ef', borderRadius: 16, padding: '16px 20px', marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#80756d', margin: 0 }}>Progression Globale</p>
              <p style={{ fontFamily: 'Newsreader, serif', fontSize: 22, color: '#352518', margin: '2px 0 0', fontWeight: 600 }}>
                {overallPct}% complété
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#073002', margin: 0 }}>{totalWatched} vidéos</p>
              <p style={{ fontSize: 10, color: '#80756d', margin: 0 }}>sur {TOTAL_VIDEOS} · 40h43</p>
            </div>
          </div>
          <div style={{ height: 2, background: 'rgba(210,196,187,0.4)', borderRadius: 99, position: 'relative' }}>
            <div style={{ position: 'absolute', top: -1, left: 0, height: 4, width: `${overallPct}%`, background: '#073002', borderRadius: 99, transition: 'width 0.4s' }} />
          </div>
          {currentWeek && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#073002' }}>play_circle</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#073002', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                En cours — Semaine {currentWeek.id} : {currentWeek.title}
              </span>
            </div>
          )}
        </div>

        {/* Semaines */}
        {WEEKS.map((week) => {
          const wWatched = weekWatched(week)
          const wTotal   = weekTotal(week)
          const wPct     = Math.round((wWatched / wTotal) * 100)
          const done     = isWeekDone(week)
          const isOpen   = openWeek === week.id

          return (
            <div key={week.id} style={{ marginBottom: 12, borderRadius: 16, overflow: 'hidden', background: '#faf2ef' }}>

              {/* En-tête semaine */}
              <button
                onClick={() => setOpenWeek(isOpen ? null : week.id)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: done ? week.color : '#eee7e3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                  {done ? <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: 24 }}>check_circle</span> : week.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                    <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: week.color, margin: 0 }}>Semaine {week.id}</p>
                    {done && <span style={{ fontSize: 8, fontWeight: 700, color: '#073002', background: 'rgba(192,240,173,0.4)', padding: '1px 6px', borderRadius: 99, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Complète</span>}
                  </div>
                  <p style={{ fontFamily: 'Newsreader, serif', fontSize: 16, color: '#352518', margin: '0 0 2px', fontWeight: 600, lineHeight: 1.2 }}>{week.title}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ flex: 1, height: 2, background: 'rgba(210,196,187,0.4)', borderRadius: 99, position: 'relative' }}>
                      <div style={{ position: 'absolute', top: -1, left: 0, height: 4, width: `${wPct}%`, background: week.color, borderRadius: 99, transition: 'width 0.4s' }} />
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: week.color, flexShrink: 0 }}>{wWatched}/{wTotal}</span>
                  </div>
                </div>
                <span className="material-symbols-outlined" style={{ color: '#c9c6bd', fontSize: 18, flexShrink: 0, transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
              </button>

              {/* Jours */}
              {isOpen && (
                <div style={{ borderTop: '1px solid rgba(210,196,187,0.25)' }}>
                  {week.days.map((day) => {
                    const dWatched = dayWatched(day)
                    const dDone    = isDayDone(day)
                    const isDOpen  = openDay === `${week.id}-${day.day}`

                    return (
                      <div key={day.day} style={{ borderBottom: '1px solid rgba(210,196,187,0.2)' }}>

                        {/* En-tête jour */}
                        <button
                          onClick={() => setOpenDay(isDOpen ? null : `${week.id}-${day.day}`)}
                          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                        >
                          <div style={{ width: 32, height: 32, borderRadius: '50%', background: dDone ? 'rgba(192,240,173,0.4)' : '#eee7e3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {dDone
                              ? <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#073002' }}>check</span>
                              : <span style={{ fontSize: 11, fontWeight: 700, color: '#80756d' }}>J{day.day}</span>
                            }
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: 13, fontWeight: 600, color: '#352518', margin: 0 }}>{day.title}</p>
                            <p style={{ fontSize: 11, color: '#80756d', margin: 0 }}>{dWatched}/{day.videos.length} vidéos</p>
                          </div>
                          <span className="material-symbols-outlined" style={{ color: '#c9c6bd', fontSize: 16, flexShrink: 0, transition: 'transform 0.2s', transform: isDOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                        </button>

                        {/* Vidéos */}
                        {isDOpen && (
                          <div style={{ padding: '4px 0 8px' }}>
                            {day.videos.map((vid, i) => {
                              const seen = watched.has(vid.id)
                              return (
                                <button
                                  key={vid.id}
                                  onClick={() => toggleWatched(vid.id)}
                                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px', background: seen ? 'rgba(192,240,173,0.1)' : 'none', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s' }}
                                >
                                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: seen ? '#073002' : 'transparent', border: seen ? 'none' : '1.5px solid #d2c4bb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                                    {seen
                                      ? <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#fff' }}>check</span>
                                      : <span style={{ fontSize: 10, color: '#80756d', fontWeight: 700 }}>{i + 1}</span>
                                    }
                                  </div>
                                  <p style={{ flex: 1, fontSize: 13, color: seen ? '#80756d' : '#352518', margin: 0, lineHeight: 1.4, textDecoration: seen ? 'line-through' : 'none', fontFamily: 'Newsreader, serif', fontStyle: seen ? 'italic' : 'normal' }}>
                                    {vid.title}
                                  </p>
                                  <span style={{ fontSize: 11, color: '#c9c6bd', fontFamily: 'Newsreader, serif', flexShrink: 0 }}>{vid.duration}</span>
                                </button>
                              )
                            })}
                            {/* Tout cocher dans le jour */}
                            <button
                              onClick={() => {
                                const allSeen = day.videos.every(v => watched.has(v.id))
                                day.videos.forEach(v => {
                                  if (allSeen ? watched.has(v.id) : !watched.has(v.id)) toggleWatched(v.id)
                                })
                              }}
                              style={{ margin: '8px 18px 4px', padding: '8px 16px', background: '#eee7e3', border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 10, fontWeight: 700, color: '#80756d', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                            >
                              {day.videos.every(v => watched.has(v.id)) ? '✕ Décocher toutes' : '✓ Toutes vues'}
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
