import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const difficulties = ['Débutant', 'Intermédiaire', 'Avancé', 'Adaptatif']
const reminders     = ['07:00', '08:00', '09:00', '10:00', '18:00', '20:00']
const themes        = ['Classique Ivoire', 'Bois de Noyer', 'Ardoise & Marbre']

export default function Settings() {
  const navigate = useNavigate()

  const [toggles, setToggles]       = useState({ reminder: true, notifs: true, dark: false })
  const [difficulty, setDifficulty] = useState('Adaptatif')
  const [reminder, setReminder]     = useState('09:00')
  const [theme, setTheme]           = useState('Classique Ivoire')

  // modals
  const [modal, setModal] = useState(null) // 'difficulty' | 'reminder' | 'theme'
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    fetch('https://api.chess.com/pub/player/tomhiver')
      .then(r => r.json())
      .then(data => setProfile(data))
      .catch(() => {})
  }, [])

  function toggle(key) { setToggles(prev => ({ ...prev, [key]: !prev[key] })) }

  return (
    <div style={{ background: '#fff8f5', minHeight: '100dvh', paddingBottom: 96 }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 px-5 py-4"
        style={{ background: 'rgba(250,242,239,0.95)', backdropFilter: 'blur(16px)' }}
      >
        <h1 style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 22, color: '#352518', margin: 0, fontWeight: 600 }}>
          Paramètres
        </h1>
      </header>

      <div className="px-5 pt-4">
        {/* Profile card — cliquable → dashboard */}
        <button
          onClick={() => navigate('/')}
          className="w-full rounded-xl p-5 mb-6 flex items-center gap-4 text-left transition-all active:scale-98"
          style={{ background: '#faf2ef', border: 'none', cursor: 'pointer' }}
        >
          <div className="w-16 h-16 rounded-full flex-shrink-0 overflow-hidden" style={{ background: '#eee7e3' }}>
            {profile?.avatar
              ? <img src={profile.avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>♔</div>
            }
          </div>
          <div className="flex-1">
            <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: 20, color: '#352518', margin: '0 0 2px', fontWeight: 600 }}>{profile?.name || 'TomHiver'}</h3>
            <p style={{ fontSize: 12, color: '#073002', margin: '0 0 4px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Candidat Maître</p>
            <p style={{ fontSize: 12, color: '#80756d', margin: 0 }}>Elo 2140 · 42 leçons · 1 482 tactiques</p>
          </div>
          <span className="material-symbols-outlined" style={{ color: '#d2c4bb', fontSize: 18 }}>chevron_right</span>
        </button>

        {/* Section Étude */}
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#80756d', margin: '0 0 8px 4px' }}>Étude</p>
        <div className="rounded-xl overflow-hidden mb-6" style={{ background: '#faf2ef' }}>
          {/* Rappel */}
          <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: '1px solid rgba(210,196,187,0.2)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#eee7e3' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#352518' }}>schedule</span>
            </div>
            <div className="flex-1">
              <p style={{ fontSize: 14, fontWeight: 500, color: '#352518', margin: 0 }}>Rappel quotidien</p>
              <p style={{ fontSize: 11, color: '#80756d', margin: 0 }}>{toggles.reminder ? reminder : 'Désactivé'}</p>
            </div>
            <div className="flex items-center gap-2">
              {toggles.reminder && (
                <button
                  onClick={() => setModal('reminder')}
                  className="px-2 py-1 rounded-lg transition-all active:scale-90"
                  style={{ background: '#eee7e3', border: 'none', cursor: 'pointer', fontSize: 11, color: '#352518', fontWeight: 600 }}
                >
                  {reminder}
                </button>
              )}
              <Toggle on={toggles.reminder} onChange={() => toggle('reminder')} />
            </div>
          </div>
          {/* Difficulté */}
          <div
            className="flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all"
            style={{ borderBottom: '1px solid rgba(210,196,187,0.2)' }}
            onClick={() => setModal('difficulty')}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#eee7e3' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#352518' }}>self_improvement</span>
            </div>
            <div className="flex-1">
              <p style={{ fontSize: 14, fontWeight: 500, color: '#352518', margin: 0 }}>Difficulté des puzzles</p>
              <p style={{ fontSize: 11, color: '#80756d', margin: 0 }}>{difficulty}</p>
            </div>
            <span className="material-symbols-outlined" style={{ color: '#d2c4bb', fontSize: 18 }}>chevron_right</span>
          </div>
          {/* Notifications */}
          <div className="flex items-center gap-3 px-4 py-3.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#eee7e3' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#352518' }}>notifications</span>
            </div>
            <div className="flex-1">
              <p style={{ fontSize: 14, fontWeight: 500, color: '#352518', margin: 0 }}>Notifications</p>
              <p style={{ fontSize: 11, color: '#80756d', margin: 0 }}>{toggles.notifs ? 'Activées' : 'Désactivées'}</p>
            </div>
            <Toggle on={toggles.notifs} onChange={() => toggle('notifs')} />
          </div>
        </div>

        {/* Section Préférences */}
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#80756d', margin: '0 0 8px 4px' }}>Préférences</p>
        <div className="rounded-xl overflow-hidden mb-6" style={{ background: '#faf2ef' }}>
          {/* Thème échiquier */}
          <div
            className="flex items-center gap-3 px-4 py-3.5 cursor-pointer"
            style={{ borderBottom: '1px solid rgba(210,196,187,0.2)' }}
            onClick={() => setModal('theme')}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#eee7e3' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#352518' }}>palette</span>
            </div>
            <div className="flex-1">
              <p style={{ fontSize: 14, fontWeight: 500, color: '#352518', margin: 0 }}>Thème de l'échiquier</p>
              <p style={{ fontSize: 11, color: '#80756d', margin: 0 }}>{theme}</p>
            </div>
            <span className="material-symbols-outlined" style={{ color: '#d2c4bb', fontSize: 18 }}>chevron_right</span>
          </div>
          {/* Langue */}
          <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: '1px solid rgba(210,196,187,0.2)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#eee7e3' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#352518' }}>language</span>
            </div>
            <div className="flex-1">
              <p style={{ fontSize: 14, fontWeight: 500, color: '#352518', margin: 0 }}>Langue</p>
              <p style={{ fontSize: 11, color: '#80756d', margin: 0 }}>Français</p>
            </div>
            <span className="material-symbols-outlined" style={{ color: '#d2c4bb', fontSize: 18 }}>chevron_right</span>
          </div>
          {/* Mode sombre */}
          <div className="flex items-center gap-3 px-4 py-3.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#eee7e3' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#352518' }}>dark_mode</span>
            </div>
            <div className="flex-1">
              <p style={{ fontSize: 14, fontWeight: 500, color: '#352518', margin: 0 }}>Mode sombre</p>
              <p style={{ fontSize: 11, color: '#80756d', margin: 0 }}>{toggles.dark ? 'Activé' : 'Désactivé'}</p>
            </div>
            <Toggle on={toggles.dark} onChange={() => toggle('dark')} />
          </div>
        </div>

        {/* À propos */}
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#80756d', margin: '0 0 8px 4px' }}>À propos</p>
        <div className="rounded-xl overflow-hidden mb-6" style={{ background: '#faf2ef' }}>
          <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: '1px solid rgba(210,196,187,0.2)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#eee7e3' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#352518' }}>info</span>
            </div>
            <div className="flex-1">
              <p style={{ fontSize: 14, fontWeight: 500, color: '#352518', margin: 0 }}>Version</p>
              <p style={{ fontSize: 11, color: '#80756d', margin: 0 }}>1.0.0</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#eee7e3' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#352518' }}>mail</span>
            </div>
            <div className="flex-1">
              <p style={{ fontSize: 14, fontWeight: 500, color: '#352518', margin: 0 }}>Contacter</p>
              <p style={{ fontSize: 11, color: '#80756d', margin: 0 }}>thomas.mangle@gmail.com</p>
            </div>
            <span className="material-symbols-outlined" style={{ color: '#d2c4bb', fontSize: 18 }}>chevron_right</span>
          </div>
        </div>

        <button
          className="w-full py-3 rounded-xl transition-all active:scale-98"
          style={{ background: 'transparent', border: '1px solid rgba(186,26,26,0.3)', color: '#ba1a1a', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Se déconnecter
        </button>
      </div>

      {/* Modal overlay */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          style={{ background: 'rgba(53,37,24,0.4)', backdropFilter: 'blur(4px)' }}
          onClick={() => setModal(null)}
        >
          <div
            className="w-full max-w-[430px] rounded-t-2xl p-6"
            style={{ background: '#fff8f5' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ width: 32, height: 4, background: '#d2c4bb', borderRadius: 99, margin: '0 auto 20px' }} />

            {modal === 'difficulty' && (
              <>
                <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: 20, color: '#352518', margin: '0 0 16px', fontWeight: 600 }}>Difficulté des puzzles</h3>
                {difficulties.map(d => (
                  <button
                    key={d}
                    onClick={() => { setDifficulty(d); setModal(null) }}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl mb-2 transition-all active:scale-98"
                    style={{ background: difficulty === d ? '#352518' : '#faf2ef', border: 'none', cursor: 'pointer' }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 500, color: difficulty === d ? '#fff' : '#352518' }}>{d}</span>
                    {difficulty === d && <span className="material-symbols-outlined" style={{ color: '#c0f0ad', fontSize: 18 }}>check</span>}
                  </button>
                ))}
              </>
            )}

            {modal === 'reminder' && (
              <>
                <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: 20, color: '#352518', margin: '0 0 16px', fontWeight: 600 }}>Heure du rappel</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  {reminders.map(r => (
                    <button
                      key={r}
                      onClick={() => { setReminder(r); setModal(null) }}
                      className="py-3 rounded-xl transition-all active:scale-95"
                      style={{ background: reminder === r ? '#352518' : '#faf2ef', border: 'none', cursor: 'pointer', fontFamily: 'Newsreader, serif', fontSize: 16, fontWeight: 600, color: reminder === r ? '#fff' : '#352518' }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </>
            )}

            {modal === 'theme' && (
              <>
                <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: 20, color: '#352518', margin: '0 0 16px', fontWeight: 600 }}>Thème de l'échiquier</h3>
                {themes.map(t => (
                  <button
                    key={t}
                    onClick={() => { setTheme(t); setModal(null) }}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl mb-2 transition-all active:scale-98"
                    style={{ background: theme === t ? '#352518' : '#faf2ef', border: 'none', cursor: 'pointer' }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 500, color: theme === t ? '#fff' : '#352518' }}>{t}</span>
                    {theme === t && <span className="material-symbols-outlined" style={{ color: '#c0f0ad', fontSize: 18 }}>check</span>}
                  </button>
                ))}
              </>
            )}

            <button
              onClick={() => setModal(null)}
              className="w-full py-3 rounded-xl mt-3 transition-all active:scale-98"
              style={{ background: '#eee7e3', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#80756d', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={onChange}
      style={{
        position: 'relative',
        width: 40, height: 22,
        borderRadius: 99,
        background: on ? '#073002' : '#d2c4bb',
        border: 'none', cursor: 'pointer',
        transition: 'background 0.25s',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute',
        top: 2, left: 2,
        width: 18, height: 18,
        borderRadius: '50%',
        background: '#fff',
        transform: on ? 'translateX(18px)' : 'translateX(0)',
        transition: 'transform 0.25s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
      }} />
    </button>
  )
}
