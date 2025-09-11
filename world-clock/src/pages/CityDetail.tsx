import { useParams, Link } from 'react-router-dom'
import { useCity } from '../context/CityContext'
import ClockDigital from '../components/ClockDigital'
import ClockAnalog from '../components/ClockAnalog'

export default function CityDetail() {
  const { id } = useParams()
  const { state } = useCity()

  //find the city matching the id in the url
  const city = state.cities.find(c => c.id === id)

  //if no city found, show simple "not found" message
  if (!city) {
    return (
      <section className="city-detail not-found">
        <p>
          Oops, we couldn’t find that city.{' '}
          <Link to="/">Go back</Link>
        </p>
      </section>
    )
  }

  return (
    <section
      className="city-detail"
      //use city image as background if available
      style={{
        backgroundImage: city.imageUrl ? `url(${city.imageUrl})` : undefined
      }}
    >
      <div className="overlay">
        <header>
          {/*city name, country and timezone*/}
          <h1>{city.name}</h1>
          <p>{city.country} • {city.tz}</p>
        </header>

        {/*switch between digital and analog clock depending on settings*/}
        {state.settings.mode === 'digital'
          ? <ClockDigital tz={city.tz} settings={state.settings} />
          : <ClockAnalog tz={city.tz} settings={state.settings} />
        }

        {/*simple back link to homepage*/}
        <Link to="/" className="back">← Go back</Link>
      </div>
    </section>
  )
}
