import { useParams, Link } from 'react-router-dom'
import { useCity } from '../context/CityContext'
import ClockDigital from '../components/ClockDigital'
import ClockAnalog from '../components/ClockAnalog'

export default function CityDetail() {
  const { id } = useParams()
  const { state } = useCity()
  const city = state.cities.find(c => c.id === id)

  if (!city) return <p>City not found. <Link to="/">Back</Link></p>

  return (
    <div className="city-detail" style={{ backgroundImage: city.imageUrl ? `url(${city.imageUrl})` : undefined }}>
      <div className="overlay">
        <h1>{city.name}</h1>
        <p>{city.country} • {city.tz}</p>

        {state.settings.mode === 'digital'
          ? <ClockDigital tz={city.tz} settings={state.settings} />
          : <ClockAnalog tz={city.tz} settings={state.settings} />
        }

        <Link to="/" className="back">← Back</Link>
      </div>
    </div>
  )
}
