'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function SetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      return
    }

    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Password created! Redirecting...')
      setTimeout(() => {
        router.push('/dashboard')
      }, 1200)
    }
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
      <form
        onSubmit={handleSubmit}
        style={{
          padding: '30px',
          border: '1px solid #d4af37',
          borderRadius: '12px',
          width: '350px',
        }}
      >
        <h2>Create your password</h2>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            background: '#d4af37',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Set Password
        </button>

        {message && <p style={{ marginTop: '10px' }}>{message}</p>}
      </form>
    </main>
  )
}