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
    <div className="card">
      {/*optional image header */}
      {city.imageUrl && <div className="thumb" style={{ backgroundImage: `url(${city.imageUrl})` }} />}

      <div className="card-body">
        <div className="card-title">
          {/*clickable title → detail route */}
          <h3><Link to={`/city/${city.id}`}>{city.name}</Link></h3>
          <button className="ghost" onClick={() => onRemove(city.id)}>Remove</button>
        </div>

        <p className="muted">{city.country} • {city.tz}</p>

        {/*show the right clock for current mode */}
        {settings.mode === 'digital'
          ? <ClockDigital tz={city.tz} settings={settings} />
          : <ClockAnalog tz={city.tz} settings={settings} />
        }
      </div>
    </div>
  )
}
