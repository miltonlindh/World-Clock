import { Link } from 'react-router-dom'
import type { City, ClockSettings } from '../types'

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
      {city.imageUrl && (
        <div className="thumb" style={{ backgroundImage: `url(${city.imageUrl})` }} />
      )}

      <div className="card-body">
        <div className="card-title">

          {/*link to detail page*/}
          <h3><Link to={`/city/${city.id}`}>{city.name}</Link></h3>
          <button className="ghost" onClick={() => onRemove(city.id)}>Remove</button>
        </div>

        <p className="muted">
          {city.country} • {city.tz}
        </p>


      </div>
    </div>
  )
}
