'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    setLoading(true)
    setErrorMessage('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setErrorMessage(error.message)
      setLoading(false)
      return
    }

    setEmail('')
    setPassword('')
    router.push('/dashboard')
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#0b0f19',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: '#111827',
          padding: '40px',
          borderRadius: '12px',
          width: '350px',
          border: '1px solid #334155'
        }}
      >
        <h1 style={{ marginBottom: '20px' }}>Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          type="submit"
          style={buttonStyle}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        {errorMessage && (
          <p style={{ color: '#ef4444', marginTop: '10px' }}>
            {errorMessage}
          </p>
        )}

      </form>
    </main>
  )
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '12px',
  borderRadius: '6px',
  border: '1px solid #475569',
  backgroundColor: '#0b0f19',
  color: 'white'
}

const buttonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#2563eb',
  border: 'none',
  borderRadius: '8px',
  color: 'white',
  cursor: 'pointer'
}