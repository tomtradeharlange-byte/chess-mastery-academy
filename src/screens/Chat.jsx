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
    // mark as read
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
      <div style={{ background: '#fff8f5', height: '100dvh', display: 'flex', flexDirection: 'column' }}>
        <header
          className="flex items-center gap-3 px-5 py-3 flex-shrink-0"
          style={{ background: 'rgba(250,242,239,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(210,196,187,0.2)' }}
        >
          <button onClick={() => setActiveConv(null)} className="p-1">
            <span className="material-symbols-outlined" style={{ color: '#352518', fontSize: 22 }}>arrow_back</span>
          </button>
          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#eee7e3', fontSize: 20 }}>
            {conv.avatar}
          </div>
          <div className="flex-1">
            <p style={{ fontSize: 14, fontWeight: 700, color: '#352518', margin: 0 }}>{conv.name}</p>
            <p style={{ fontSize: 11, color: '#073002', margin: 0 }}>● En ligne</p>
          </div>
          <span className="material-symbols-outlined" style={{ color: '#80756d', fontSize: 20 }}>more_vert</span>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {messages.length === 0 && (
            <p style={{ textAlign: 'center', fontFamily: 'Newsreader, serif', fontStyle: 'italic', color: '#d2c4bb', marginTop: 40, fontSize: 14 }}>
              Commencez la conversation…
            </p>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex mb-3 ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div
                className="rounded-xl px-4 py-3"
                style={{
                  maxWidth: '78%',
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

        {/* Input bar — above bottom nav */}
        <div
          className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
          style={{ background: 'rgba(255,248,245,0.97)', borderTop: '1px solid rgba(210,196,187,0.2)', paddingBottom: 100 }}
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Votre message…"
            className="flex-1 rounded-xl px-4 py-2.5 outline-none"
            style={{ background: '#faf2ef', fontSize: 14, color: '#1e1b19', border: 'none' }}
            autoFocus
          />
          <button
            onClick={sendMessage}
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all active:scale-90"
            style={{ background: input.trim() ? '#352518' : '#d2c4bb', border: 'none', cursor: 'pointer' }}
          >
            <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: 18 }}>send</span>
          </button>
        </div>
      </div>
    )
  }

  // ── Conversation list ─────────────────────────────────────────────────────
  return (
    <div style={{ background: '#fff8f5', minHeight: '100dvh', paddingBottom: 96 }}>
      <header
        className="sticky top-0 z-40 px-5 py-4"
        style={{ background: 'rgba(250,242,239,0.95)', backdropFilter: 'blur(16px)' }}
      >
        <div className="flex items-center justify-between">
          <h1 style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 22, color: '#352518', margin: 0, fontWeight: 600 }}>
            L'Atelier de Discussion
          </h1>
          <button
            onClick={() => setShowNew(true)}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90"
            style={{ background: '#eee7e3', border: 'none', cursor: 'pointer' }}
          >
            <span className="material-symbols-outlined" style={{ color: '#352518', fontSize: 18 }}>edit</span>
          </button>
        </div>
      </header>

      <div className="px-5 pt-4">
        <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 32, fontWeight: 500, color: '#352518', margin: '0 0 20px', fontStyle: 'italic', letterSpacing: '-0.01em' }}>
          Conversations
        </h2>

        <div>
          {conversations.map((conv, i) => (
            <button
              key={conv.id}
              className="w-full flex items-center gap-3 py-4 text-left transition-all active:bg-surface-container-low"
              style={{ borderBottom: i < conversations.length - 1 ? '1px solid rgba(210,196,187,0.25)' : 'none', background: 'none', border_bottom: undefined, cursor: 'pointer', paddingLeft: 0, paddingRight: 0 }}
              onClick={() => openConv(i)}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#eee7e3', fontSize: 24 }}>
                {conv.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#352518', margin: 0 }}>{conv.name}</p>
                  <p style={{ fontSize: 11, color: '#80756d', margin: 0, flexShrink: 0 }}>{conv.time}</p>
                </div>
                <p style={{ fontSize: 12, color: '#4e453e', margin: 0, fontFamily: 'Newsreader, serif', fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {conv.sub}
                </p>
              </div>
              {conv.unread > 0 && (
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#073002' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>{conv.unread}</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Nouvelle conversation CTA */}
        {!showNew ? (
          <div className="rounded-xl p-5 mt-5 text-center" style={{ background: '#faf2ef' }}>
            <p style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 14, color: '#4e453e', margin: '0 0 12px' }}>
              "Discutez avec d'autres étudiants ou votre professeur"
            </p>
            <button
              onClick={() => setShowNew(true)}
              className="px-6 py-2.5 rounded-xl transition-all active:scale-95"
              style={{ background: 'linear-gradient(135deg, #352518 0%, #4d3b2c 100%)', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
            >
              + Nouvelle Conversation
            </button>
          </div>
        ) : (
          <div className="rounded-xl p-5 mt-5" style={{ background: '#faf2ef' }}>
            <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#352518', margin: '0 0 10px' }}>
              Nouvelle conversation
            </p>
            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && createConversation()}
              placeholder="Nom du contact ou groupe…"
              className="w-full rounded-xl px-4 py-3 outline-none mb-3"
              style={{ background: '#eee7e3', fontSize: 14, color: '#1e1b19', border: 'none' }}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={() => { setShowNew(false); setNewName('') }}
                className="flex-1 py-2.5 rounded-xl"
                style={{ background: '#eee7e3', color: '#80756d', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
              >
                Annuler
              </button>
              <button
                onClick={createConversation}
                className="flex-1 py-2.5 rounded-xl transition-all active:scale-95"
                style={{ background: newName.trim() ? '#352518' : '#d2c4bb', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: newName.trim() ? 'pointer' : 'default' }}
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
