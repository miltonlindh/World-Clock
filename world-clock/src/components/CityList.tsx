import { useCity } from '../context/CityContext'
import CityCard from './CityCard'

export default function CityList() {
  const { state, removeCity } = useCity()

  if (!state.cities.length) {
    return <p>No cities yet — add one below.</p>
  }

  return (
    <div className="grid">
      {state.cities.map(c => (
        <CityCard key={c.id} city={c} settings={state.settings} onRemove={removeCity} />
      ))}
    </div>
  )
}
