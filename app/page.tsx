'use client'

import Link from 'next/link'

export default function Page() {
  return (
    <main style={mainStyle}>
      <section style={heroSection}>
        <div style={overlay} />

        <div style={contentWrapper}>
          <div style={logoRow}>
            <div style={logoBox}>
  <svg
    width="40"
    height="40"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Contour lines */}
    <path
      d="M10 60 Q30 40, 50 60 T90 60"
      stroke="#4FC3F7"
      strokeWidth="2"
      opacity="0.7"
    />
    <path
      d="M10 45 Q30 25, 50 45 T90 45"
      stroke="#4FC3F7"
      strokeWidth="2"
      opacity="0.5"
    />
    <path
      d="M10 75 Q30 55, 50 75 T90 75"
      stroke="#4FC3F7"
      strokeWidth="2"
      opacity="0.4"
    />

    {/* Location pin */}
    <circle cx="50" cy="40" r="6" fill="#ff0000" />
    <path
      d="M50 46 L50 60"
      stroke="#ffffff"
      strokeWidth="4"
    />
  </svg>
</div>

            <div>
              <h1 style={titleStyle}>TOPO FALAISE</h1>

              <p style={subtitleStyle}>
                Geospatial Data Management Portal
              </p>
            </div>
          </div>

          <p style={descriptionStyle}>
            Welcome to the internal portal of Topo Falaise. This platform is
            designed for secure access to geospatial datasets, survey
            coordinates, mapping resources, and analytical reporting.
          </p>

          <div style={buttonRow}>
            <Link href="/login">
              <button style={primaryButton}>Login</button>
            </Link>

            <Link href="/login">
              <button style={secondaryButton}>Dashboard</button>
            </Link>
          </div>

          <div style={cardGrid}>
            <div style={cardStyle}>
              <h3 style={cardTitle}>Secure Access</h3>
              <p style={cardText}>
                Protected login and controlled visibility of internal
                geospatial data.
              </p>
            </div>

            <div style={cardStyle}>
              <h3 style={cardTitle}>Data Storage</h3>
              <p style={cardText}>
                Centralized storage for survey datasets, coordinates, GeoJSON
                files, and field records.
              </p>
            </div>

            <div style={cardStyle}>
              <h3 style={cardTitle}>Mapping & Analysis</h3>
              <p style={cardText}>
                Inspect datasets, generate maps, and export geospatial reports
                for decision making.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

const mainStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #081726 0%, #0B1F3A 45%, #102B46 100%)',
  color: '#FFFFFF',
  fontFamily: 'Arial, sans-serif',
}

const heroSection = {
  minHeight: '100vh',
  position: 'relative' as const,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 20px',
}

const overlay = {
  position: 'absolute' as const,
  inset: 0,
  background: `
    radial-gradient(circle at top right, rgba(79,195,247,0.12), transparent 30%),
    radial-gradient(circle at bottom left, rgba(46,125,50,0.14), transparent 28%)
  `,
}

const contentWrapper = {
  position: 'relative' as const,
  zIndex: 1,
  maxWidth: '1150px',
  width: '100%',
}

const logoRow = {
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  flexWrap: 'wrap' as const,
  marginBottom: '24px',
}

const logoBox = {
  width: '74px',
  height: '74px',
  border: '2px solid rgba(79,195,247,0.55)',
  borderRadius: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(79,195,247,0.08)',
  boxShadow: '0 0 18px rgba(79,195,247,0.10)',
}

const mapPin = {
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  background: '#2E7D32',
  position: 'relative' as const,
  boxShadow: '0 0 10px rgba(46,125,50,0.45)',
}

const titleStyle = {
  margin: 0,
  fontSize: 'clamp(2.3rem, 6vw, 5rem)',
  fontWeight: 800,
  letterSpacing: '0.04em',
  color: '#FFFFFF',
  textShadow: '0 2px 18px rgba(79,195,247,0.10)',
}

const subtitleStyle = {
  marginTop: '8px',
  marginBottom: 0,
  color: '#4FC3F7',
  fontSize: '1.1rem',
  letterSpacing: '0.04em',
  fontWeight: 600,
}

const descriptionStyle = {
  maxWidth: '820px',
  color: '#D7CCC8',
  fontSize: '1.08rem',
  lineHeight: 1.8,
  marginBottom: '32px',
}

const buttonRow = {
  display: 'flex',
  gap: '14px',
  flexWrap: 'wrap' as const,
  marginBottom: '40px',
}

const primaryButton = {
  padding: '12px 22px',
  borderRadius: '10px',
  border: 'none',
  cursor: 'pointer',
  background: '#2E7D32',
  color: '#FFFFFF',
  fontWeight: 700,
  fontSize: '1rem',
  boxShadow: '0 8px 18px rgba(46,125,50,0.25)',
}

const secondaryButton = {
  padding: '12px 22px',
  borderRadius: '10px',
  border: '1px solid #4FC3F7',
  cursor: 'pointer',
  background: 'rgba(255,255,255,0.02)',
  color: '#4FC3F7',
  fontWeight: 600,
  fontSize: '1rem',
}

const cardGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '18px',
}

const cardStyle = {
  background: 'rgba(255,255,255,0.035)',
  border: '1px solid rgba(79,195,247,0.22)',
  borderRadius: '16px',
  padding: '22px',
  boxShadow: '0 0 20px rgba(0,0,0,0.22)',
  backdropFilter: 'blur(4px)',
}

const cardTitle = {
  marginTop: 0,
  marginBottom: '12px',
  color: '#FFFFFF',
  fontSize: '1.1rem',
}

const cardText = {
  margin: 0,
  color: '#D7CCC8',
  lineHeight: 1.6,
}