// Layout.tsx
// Base layout for all pages (header, footer, main content)

import { Link } from 'react-router-dom'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      {/* Header section */}
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        {/* Logo */}
        <Link to="/" style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: 20, textDecoration: 'none' }}>
          🌍 World Clock
        </Link>
      </header>

      {/* Main content */}
      <main>{children}</main>

      {/* Footer */}
      <footer style={{ marginTop: 40, fontSize: 14, opacity: 0.7 }}>
        © {new Date().getFullYear()} World Clock — All rights reserved
      </footer>
    </div>
  )
}
