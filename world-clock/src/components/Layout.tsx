// Layout with header controls to switch clock settings.

import { Link } from 'react-router-dom'
import { useCity } from '../context/CityContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { state, updateSettings } = useCity()

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        {/* Logo / home link */}
        <Link to="/" className="logo">🌍 World Clock</Link>


        {/* Quick controls for the clocks */}
        <div className="controls">
          {/* Toggle seconds on/off */}
          <label>
            <input
              type="checkbox"
              checked={state.settings.showSeconds}
              onChange={e => updateSettings({ showSeconds: e.target.checked })}
            />
            {' '}Seconds
          </label>

          {/* Toggle 12h/24h */}
          <label>
            <input
              type="checkbox"
              checked={state.settings.hour12}
              onChange={e => updateSettings({ hour12: e.target.checked })}
            />
            {' '}12h
          </label>

          {/* Switch between digital / analog */}
          <select
            value={state.settings.mode}
            onChange={e => updateSettings({ mode: e.target.value as 'digital' | 'analog' })}
          >
            <option value="digital">Digital</option>
            <option value="analog">Analog</option>
          </select>
        </div>
      </header>

      {/* Main content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="footer">© {new Date().getFullYear()} World Clock</footer>
    </div>
  )
}
