import { Link } from 'react-router-dom'
import type { City, ClockSettings } from '../types'
import ClockDigital from './ClockDigital'
import ClockAnalog from './ClockAnalog'

export default function CityCard({
  city,
  settings,
  onRemove
}: {
  city: City
  settings: ClockSettings
  onRemove: (id: string) => void
}) {
  return (
    <article className="card">
      {city.imageUrl && (
        <div
          className="thumb"
          //quick fix: inline style här
          style={{ backgroundImage: `url(${city.imageUrl})` }}
          aria-label={`${city.name} image`}
        />
      )}

      <div className="card-body">
        <div className="card-title">
          <h3>
            {/*kanske byta till uppercase senare */}
            <Link to={`/city/${city.id}`}>{city.name}</Link>
          </h3>
          <button
            className="ghost"
            onClick={() => onRemove(city.id)}
            aria-label={`Delete ${city.name}`}
            title={`Delete ${city.name}`}
          >
            Delete {/*ändrade från remove för variation*/}
          </button>
        </div>

        <p className="muted">
          {city.country} • { city.tz }
        </p>

        {settings.mode === 'digital'
          ? <ClockDigital tz={city.tz} settings={settings} />
          : <ClockAnalog tz={city.tz} settings={settings} />
        }
      </div>
    </article>
  )
}
