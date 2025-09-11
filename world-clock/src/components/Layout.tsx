import { Link } from 'react-router-dom'
import { useCity } from '../context/CityContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { state, updateSettings } = useCity()

  return (
    <div className="container">
      {/*top header with logo + settings*/}
      <header className="header" role="banner">
        {/*logo links back to homepage*/}
        <Link to="/" className="logo" aria-label="Go to homepage">
          World Clock
        </Link>

        {/*clock settings user can change quickly*/}
        <nav className="controls" aria-label="Clock settings">
          {/*toggle seconds on/off*/}
          <label>
            <input
              type="checkbox"
              checked={state.settings.showSeconds}
              onChange={e => updateSettings({ showSeconds: e.target.checked })}
            />
            {' '}Show seconds
          </label>

          {/*switch between 24h and 12h format*/}
          <label>
            <input
              type="checkbox"
              checked={state.settings.hour12}
              onChange={e => updateSettings({ hour12: e.target.checked })}
            />
            {' '}12h format
          </label>

          {/*choose between digital or analog clock mode*/}
          <label>
            <span className="sr-only">Select clock mode</span>
            <select
              value={state.settings.mode}
              onChange={e => updateSettings({ mode: e.target.value as 'digital' | 'analog' })}
              aria-label="Switch clock display mode"
            >
              <option value="digital">Digital</option>
              <option value="analog">Analog</option>
            </select>
          </label>
        </nav>
      </header>

      {/*main content from pages*/}
      <main role="main">{children}</main>

      {/*simple footer, current year auto*/}
      <footer className="footer" role="contentinfo">
        © {new Date().getFullYear()} World Clock
      </footer>
    </div>
  )
}
