import { useLocation, useNavigate } from 'react-router-dom'

const tabs = [
  { path: '/',         icon: 'dashboard',        label: 'Atelier'  },
  { path: '/history',  icon: 'sports_esports',   label: 'Parties'  },
  { path: '/tactics',  icon: 'psychology',       label: 'Tactique' },
  { path: '/chat',     icon: 'forum',            label: 'Chat'     },
  { path: '/settings', icon: 'settings',         label: 'Réglages' },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 430,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 64,
        background: 'rgba(255,248,245,0.92)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(210,196,187,0.2)',
      }}
    >
      {tabs.map(tab => {
        const active = location.pathname === tab.path
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              padding: '6px 12px',
              borderRadius: 12,
              background: active ? '#faf2ef' : 'transparent',
              color: active ? '#352518' : '#80756d',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s',
              minWidth: 56,
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: 22,
                fontVariationSettings: active
                  ? "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24"
                  : "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24",
              }}
            >{tab.icon}</span>
            <span style={{ fontSize: 9, fontWeight: active ? 700 : 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
