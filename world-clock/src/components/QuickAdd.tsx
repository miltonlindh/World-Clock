import { PRESET_CITIES } from '../data/present'
import { useCity } from '../context/CityContext'

export default function QuickAdd() {
  const { addCity } = useCity()

  return (
    //simple preset list so it's faster to add common cities
    <div className="form" style={{ overflow: 'hidden' }}>
      <h3 style={{ margin: 0 }}>Add quickly</h3>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: 8
        }}
      >
        {/*loop through preset cities and add them instantly on click*/}
        {PRESET_CITIES.map(c => (
          <button
            key={c.name + c.tz} //use combo of name+tz as key since they're unique
            type="button"
            title={`${c.name} • ${c.tz}`} //tooltip shows name + tz
            onClick={() =>
              addCity({
                name: c.name,
                country: c.country,
                tz: c.tz,
                imageUrl: c.imageUrl
              })
            }
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  )
}
