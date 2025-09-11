import { PRESET_CITIES } from '../data/present'
import { useCity } from '../context/CityContext'

export default function QuickAdd() {
  const { addCity } = useCity()

  return (
    <div className="form" style={{ overflow: 'hidden' }}>
      <h3 style={{ margin: 0 }}>Quick add</h3>
      <p className="muted">Add a popular city with one click</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8 }}>
        {PRESET_CITIES.map(c => (
          <button
            key={c.name + c.tz}
            type="button"
            title={`${c.name} • ${c.tz}`}
            onClick={() => addCity({ name: c.name, country: c.country, tz: c.tz, imageUrl: c.imageUrl })}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  )
}
