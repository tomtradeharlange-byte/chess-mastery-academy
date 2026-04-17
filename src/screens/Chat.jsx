import { useState, useRef, useEffect } from 'react'

const initialConversations = [
  {
    id: 1,
    name: 'GM Anatoly Fischer',
    sub: 'Discussion: La Partie Immortelle',
    avatar: '👴',
    unread: 2,
    time: '14:32',
    messages: [
      { from: 'them', text: "Avez-vous étudié la variante avec 12...Fg4 dans notre dernière session ?" },
      { from: 'me',   text: "Oui, j'ai passé 2 heures à analyser avec le moteur. La position est très dynamique." },
      { from: 'them', text: "Excellent. Ce soir nous analyserons comment Kasparov l'a traitée en 1986. Le coup 14.h3 est fondamental." },
      { from: 'them', text: "Préparez-vous aussi à la fin de partie qui s'ensuit après l'échange des tours." },
    ],
  },
  {
    id: 2,
    name: "Atelier d'Analyse",
    sub: '3 membres · Ouvertures 1.d4',
    avatar: '♟',
    unread: 0,
    time: 'Hier',
    messages: [
      { from: 'them', text: "Pour notre prochain tournoi, concentrons-nous sur la structure de pions après 1.d4 d5 2.c4 e6." },
      { from: 'me',   text: "Je suggère aussi de regarder le Gambit de la Dame Accepté pour les parties rapides." },
    ],
  },
]

export default function Chat() {
  const [conversations, setConversations] = useState(initialConversations)
  const [activeConv, setActiveConv]       = useState(null)
  const [messages, setMessages]           = useState([])
  const [input, setInput]                 = useState('')
  const [showNew, setShowNew]             = useState(false)
  const [newName, setNewName]             = useState('')
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  function openConv(i) {
    setConversations(prev => prev.map((c, idx) => idx === i ? { ...c, unread: 0 } : c))
    setMessages(conversations[i].messages)
    setActiveConv(i)
  }

  function sendMessage() {
    const text = input.trim()
    if (!text) return
    const newMsg = { from: 'me', text }
    setMessages(prev => [...prev, newMsg])
    setConversations(prev => prev.map((c, i) => i === activeConv ? { ...c, messages: [...c.messages, newMsg] } : c))
    setInput('')
  }

  function createConversation() {
    if (!newName.trim()) return
    const newConv = {
      id: Date.now(),
      name: newName.trim(),
      sub: 'Nouvelle conversation',
      avatar: '♙',
      unread: 0,
      time: 'maintenant',
      messages: [],
    }
    setConversations(prev => [newConv, ...prev])
    setNewName('')
    setShowNew(false)
    setMessages([])
    setActiveConv(0)
  }

  // ── Chat view ─────────────────────────────────────────────────────────────
  if (activeConv !== null) {
    const conv = conversations[activeConv]
    return (
      <div style={{ background: '#fff8f5', height: '100dvh', display: 'flex', flexDirection: 'column', paddingBottom: 64 }}>
        {/* Header */}
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 20px',
            background: 'rgba(250,242,239,0.95)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(210,196,187,0.2)',
            flexShrink: 0,
          }}
        >
          <button onClick={() => setActiveConv(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <span className="material-symbols-outlined" style={{ color: '#352518', fontSize: 22 }}>arrow_back</span>
          </button>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#eee7e3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
            {conv.avatar}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#352518', margin: 0 }}>{conv.name}</p>
            <p style={{ fontSize: 11, color: '#073002', margin: 0 }}>● En ligne</p>
          </div>
          <span className="material-symbols-outlined" style={{ color: '#80756d', fontSize: 20 }}>more_vert</span>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {messages.length === 0 && (
            <p style={{ textAlign: 'center', fontFamily: 'Newsreader, serif', fontStyle: 'italic', color: '#d2c4bb', marginTop: 40, fontSize: 14 }}>
              Commencez la conversation…
            </p>
          )}
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
              <div
                style={{
                  maxWidth: '78%',
                  padding: '10px 14px',
                  borderRadius: 14,
                  background: m.from === 'me'
                    ? 'linear-gradient(135deg, #352518 0%, #4d3b2c 100%)'
                    : '#faf2ef',
                  color: m.from === 'me' ? '#fff' : '#1e1b19',
                  fontSize: 13,
                  lineHeight: 1.5,
                  fontFamily: m.from === 'them' ? 'Newsreader, serif' : 'Manrope, sans-serif',
                  fontStyle: m.from === 'them' ? 'italic' : 'normal',
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input bar */}
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 16px',
            background: 'rgba(255,248,245,0.97)',
            borderTop: '1px solid rgba(210,196,187,0.2)',
            flexShrink: 0,
          }}
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Votre message…"
            style={{
              flex: 1, borderRadius: 12, padding: '10px 16px',
              background: '#faf2ef', fontSize: 14, color: '#1e1b19',
              border: 'none', outline: 'none',
            }}
            autoFocus
          />
          <button
            onClick={sendMessage}
            style={{
              width: 40, height: 40, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: input.trim() ? '#352518' : '#d2c4bb',
              border: 'none', cursor: 'pointer',
              transition: 'background 0.2s, transform 0.1s',
              flexShrink: 0,
            }}
          >
            <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: 18 }}>send</span>
          </button>
        </div>
      </div>
    )
  }

  // ── Conversation list ─────────────────────────────────────────────────────
  return (
    <div style={{ background: '#fff8f5', minHeight: '100dvh', paddingBottom: 80 }}>
      <div
        style={{
          position: 'sticky', top: 0, zIndex: 40,
          padding: '16px 20px',
          background: 'rgba(250,242,239,0.95)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 22, color: '#352518', margin: 0, fontWeight: 600 }}>
            L'Atelier de Discussion
          </h1>
          <button
            onClick={() => setShowNew(true)}
            style={{ width: 36, height: 36, borderRadius: 10, background: '#eee7e3', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <span className="material-symbols-outlined" style={{ color: '#352518', fontSize: 18 }}>edit</span>
          </button>
        </div>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 32, fontWeight: 500, color: '#352518', margin: '0 0 20px', fontStyle: 'italic', letterSpacing: '-0.01em' }}>
          Conversations
        </h2>

        {/* Conversation rows — wrapper div handles the separator, not the button */}
        {conversations.map((conv, i) => (
          <div
            key={conv.id}
            style={{ borderBottom: i < conversations.length - 1 ? '1px solid rgba(210,196,187,0.25)' : 'none' }}
          >
            <button
              onClick={() => openConv(i)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 0',
                background: 'none', border: 'none', cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div style={{ width: 46, height: 46, borderRadius: '50%', background: '#eee7e3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                {conv.avatar}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#352518', margin: 0 }}>{conv.name}</p>
                  <p style={{ fontSize: 11, color: '#80756d', margin: 0, flexShrink: 0 }}>{conv.time}</p>
                </div>
                <p style={{ fontSize: 12, color: '#4e453e', margin: 0, fontFamily: 'Newsreader, serif', fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {conv.sub}
                </p>
              </div>
              {conv.unread > 0 && (
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#073002', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>{conv.unread}</span>
                </div>
              )}
            </button>
          </div>
        ))}

        {/* Nouvelle conversation */}
        {!showNew ? (
          <div style={{ borderRadius: 14, padding: 20, marginTop: 20, background: '#faf2ef', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 14, color: '#4e453e', margin: '0 0 12px' }}>
              "Discutez avec d'autres étudiants ou votre professeur"
            </p>
            <button
              onClick={() => setShowNew(true)}
              style={{
                padding: '10px 24px', borderRadius: 12,
                background: 'linear-gradient(135deg, #352518 0%, #4d3b2c 100%)',
                color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', border: 'none', cursor: 'pointer',
              }}
            >
              + Nouvelle Conversation
            </button>
          </div>
        ) : (
          <div style={{ borderRadius: 14, padding: 20, marginTop: 20, background: '#faf2ef' }}>
            <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#352518', margin: '0 0 10px' }}>
              Nouvelle conversation
            </p>
            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && createConversation()}
              placeholder="Nom du contact ou groupe…"
              style={{
                width: '100%', borderRadius: 12, padding: '12px 16px',
                background: '#eee7e3', fontSize: 14, color: '#1e1b19',
                border: 'none', outline: 'none', marginBottom: 12,
                boxSizing: 'border-box',
              }}
              autoFocus
            />
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => { setShowNew(false); setNewName('') }}
                style={{ flex: 1, padding: '10px', borderRadius: 12, background: '#eee7e3', color: '#80756d', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
              >
                Annuler
              </button>
              <button
                onClick={createConversation}
                style={{
                  flex: 1, padding: '10px', borderRadius: 12,
                  background: newName.trim() ? '#352518' : '#d2c4bb',
                  color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', border: 'none',
                  cursor: newName.trim() ? 'pointer' : 'default',
                  transition: 'background 0.2s',
                }}
              >
                Créer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
