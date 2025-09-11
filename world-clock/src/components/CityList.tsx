import { useCity } from '../context/CityContext'
import CityCard from './CityCard'

export default function CityList() {
  const { state, removeCity } = useCity()

  //if no cities saved yet show info text instead of empty grid
  if (!state.cities.length) {
    return (
      <section
        className="grid"
        aria-live="polite"
        style={{ textAlign: 'center', opacity: 0.8 }}
      >
        <p>No cities added yet</p>
      </section>
    )
  }

  return (
    //shows list of saved cities in a grid layout
    <section className="grid" aria-label="Your saved cities">
      {state.cities.map(city => (
        <CityCard
          key={city.id} //use city id for stable keys
          city={city}
          settings={state.settings} //pass down current clock settings
          onRemove={removeCity} //removes city when clicking delete button
        />
      ))}
    </section>
  )
}
