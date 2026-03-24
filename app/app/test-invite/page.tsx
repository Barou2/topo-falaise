'use client'

import { useState } from 'react'

export default function TestInvitePage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const sendInvite = async () => {
    setMessage('')

    const res = await fetch('/api/invite-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()

    if (!res.ok) {
      setMessage(data.error || 'Something went wrong')
      return
    }

    setMessage('Invitation sent successfully')
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#000',
        color: 'white',
      }}
    >
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <h1>Test Invite User</h1>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '12px',
            borderRadius: '8px',
          }}
        />

        <button
          onClick={sendInvite}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            background: '#d4af37',
            color: '#111',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Send Invite
        </button>

        {message && <p style={{ marginTop: '12px' }}>{message}</p>}
      </div>
    </main>
  )
}