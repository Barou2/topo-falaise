'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { supabase } from '@/lib/supabase/client'

const LocationsMap = dynamic(() => import('../components/LocationsMap'), {
  ssr: false,
})

type Location = {
  id: number
  name: string
  lat: number
  lng: number
  description: string | null
}

export default function Dashboard() {
  const router = useRouter()

  const [selectedTable, setSelectedTable] = useState('')
  const [currentData, setCurrentData] = useState<any[]>([])
  const [message, setMessage] = useState('')
  const [loadingData, setLoadingData] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [userRole, setUserRole] = useState('')
  const [locations, setLocations] = useState<Location[]>([])
  const [loadingMap, setLoadingMap] = useState(true)

  useEffect(() => {
    async function checkUser() {
      const { data: userData, error: userError } = await supabase.auth.getUser()

      if (userError || !userData.user) {
        router.replace('/login')
        return
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userData.user.id)
        .single()

      if (profileError) {
        console.log('PROFILE ERROR:', profileError)
        setUserRole('')
      } else {
        setUserRole(profileData?.role || '')
      }

      setCheckingAuth(false)
    }

    checkUser()
  }, [router])

  useEffect(() => {
    async function fetchLocations() {
      setLoadingMap(true)

      const { data, error } = await supabase
        .from('locations')
        .select('*')

      if (error) {
        console.error('Error loading locations:', error.message)
        setLocations([])
      } else {
        setLocations(data || [])
      }

      setLoadingMap(false)
    }

    fetchLocations()
  }, [])

  async function loadSelectedData() {
    if (!selectedTable) {
      setMessage('Please select a dataset first.')
      return
    }

    setLoadingData(true)
    setMessage('Loading data...')

    const { data, error } = await supabase
      .from(selectedTable)
      .select('*')

    if (error) {
      setMessage(`Error: ${error.message}`)
      setCurrentData([])
    } else {
      setMessage(`${selectedTable} loaded successfully.`)
      setCurrentData(data || [])
    }

    setLoadingData(false)
  }

  function downloadCSV() {
    if (!currentData.length) {
      setMessage('No data available to download.')
      return
    }

    const headers = Object.keys(currentData[0])
    const rows = currentData.map((row) =>
      headers.map((h) => JSON.stringify(row[h] ?? '')).join(',')
    )

    const csv = [headers.join(','), ...rows].join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `${selectedTable}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (checkingAuth) {
    return (
      <main style={mainStyle}>
        <h2>Checking authentication...</h2>
      </main>
    )
  }

  return (
    <main style={mainStyle}>
      <header style={headerStyle}>
        <div>
          <h1 style={{ margin: 0 }}>Data Dashboard</h1>
          <p style={{ marginTop: '8px', color: '#94a3b8' }}>
            Current role: {userRole || 'no role found'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {userRole === 'admin' && (
            <button
              onClick={() => router.push('app/dashboard/invite')}
              style={outlineButton}
            >
              Invite User
            </button>
          )}

          <button onClick={handleLogout} style={outlineButton}>
            Logout
          </button>
        </div>
      </header>

      <section style={mapSection}>
        <div style={sectionHeader}>
          <h2 style={{ margin: 0 }}>Geospatial Map</h2>
          <p style={sectionText}>
            Live points loaded from the <code>locations</code> table.
          </p>
        </div>

        {loadingMap ? (
          <p>Loading map...</p>
        ) : locations.length > 0 ? (
          <LocationsMap locations={locations} />
        ) : (
          <p>No locations found in Supabase.</p>
        )}
      </section>

      <div style={controlsStyle}>
        <select
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
          style={selectStyle}
        >
          <option value="">Select dataset</option>
          <option value="survey_projects">Survey Projects</option>
          <option value="survey_points">Survey Points</option>
          <option value="spatial_ref_sys">spatial_ref_sys</option>
          <option value="locations">Locations</option>
        </select>

        <button onClick={loadSelectedData} style={primaryButton}>
          {loadingData ? 'Loading...' : 'Load Data'}
        </button>

        <button onClick={downloadCSV} style={secondaryButton}>
          Download CSV
        </button>
      </div>

      {message && <p>{message}</p>}

      {currentData.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h2>{selectedTable}</h2>

          <table style={tableStyle}>
            <thead>
              <tr>
                {Object.keys(currentData[0]).map((key) => (
                  <th key={key} style={cellStyle}>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {currentData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i} style={cellStyle}>
                      {String(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}

const mainStyle = {
  minHeight: '100vh',
  backgroundColor: '#0B1F3A',
  color: 'white',
  padding: '40px',
  fontFamily: 'Arial',
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '30px',
  gap: '20px',
  flexWrap: 'wrap' as const,
}

const mapSection = {
  marginBottom: '36px',
  padding: '20px',
  border: '1px solid rgba(79,195,247,0.22)',
  borderRadius: '16px',
  background: 'rgba(255,255,255,0.03)',
}

const sectionHeader = {
  marginBottom: '16px',
}

const sectionText = {
  marginTop: '8px',
  color: '#D7CCC8',
}

const controlsStyle = {
  display: 'flex',
  gap: '12px',
  marginBottom: '20px',
  flexWrap: 'wrap' as const,
}

const selectStyle = {
  padding: '10px',
  borderRadius: '8px',
  backgroundColor: '#111827',
  color: 'white',
  border: '1px solid #475569',
}

const primaryButton = {
  padding: '10px 16px',
  backgroundColor: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
}

const secondaryButton = {
  padding: '10px 16px',
  backgroundColor: '#10b981',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
}

const outlineButton = {
  padding: '10px 16px',
  backgroundColor: 'transparent',
  color: 'white',
  border: '1px solid #475569',
  borderRadius: '8px',
  cursor: 'pointer',
}

const tableStyle = {
  borderCollapse: 'collapse' as const,
  width: '100%',
  marginTop: '20px',
}

const cellStyle = {
  border: '1px solid #475569',
  padding: '10px',
}