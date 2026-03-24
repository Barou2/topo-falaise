'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'

export default function InvitePage() {

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function sendInvite(e: React.FormEvent) {
    e.preventDefault()

    setLoading(true)
    setMessage('')

    const res = await fetch('/api/invite-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })

    const data = await res.json()
    
    if (!res.ok) {
      setMessage(data.error || 'Something went wrong')
      setLoading(false)
      return
    }

    setMessage('Invitation email sent successfully.')
    setEmail('')
    setLoading(false)
  }

  return (
    <main style={mainStyle}>

      <div style={cardStyle}>

        <h1>Invite New User</h1>

        <form onSubmit={sendInvite}>

          <input
            type="email"
            placeholder="User email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            style={inputStyle}
            required
          />

          <button
            type="submit"
            style={buttonStyle}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Invitation'}
          </button>

        </form>

        {message && (
          <p style={{marginTop:'15px'}}>{message}</p>
        )}

      </div>

    </main>
  )
}

const mainStyle = {
  minHeight:'100vh',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#0b0f19',
  color:'white'
}

const cardStyle = {
  background:'#111827',
  padding:'40px',
  borderRadius:'12px',
  width:'360px',
  border:'1px solid #334155'
}

const inputStyle = {
  width:'100%',
  padding:'12px',
  marginTop:'15px',
  borderRadius:'6px',
  border:'1px solid #475569',
  background:'#0b0f19',
  color:'white'
}

const buttonStyle = {
  width:'100%',
  padding:'12px',
  marginTop:'15px',
  borderRadius:'8px',
  border:'none',
  background:'#2563eb',
  color:'white',
  cursor:'pointer'
}