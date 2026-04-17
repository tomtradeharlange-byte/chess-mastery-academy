import { useLocation, useNavigate } from 'react-router-dom'

const tabs = [
  { path: '/',         icon: 'dashboard',  label: 'Dashboard' },
  { path: '/library',  icon: 'menu_book',  label: 'Library'   },
  { path: '/tactics',  icon: 'psychology', label: 'Tactics'   },
  { path: '/chat',     icon: 'forum',      label: 'Atelier'   },
  { path: '/settings', icon: 'settings',   label: 'Settings'  },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 flex justify-around items-center px-2 pb-safe h-20"
      style={{ background: 'rgba(255,248,245,0.88)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(210,196,187,0.2)' }}
    >
      {tabs.map(tab => {
        const active = location.pathname === tab.path
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl transition-all"
            style={{
              background: active ? '#faf2ef' : 'transparent',
              color: active ? '#352518' : '#80756d',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: '22px',
                fontVariationSettings: active ? "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24" : "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24"
              }}
            >{tab.icon}</span>
            <span style={{ fontSize: '9px', fontWeight: active ? 700 : 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
