import { useEffect, useState } from 'react'
import { fetchTimezones } from '../services/timeApi'
import { useCity } from '../context/CityContext'

export default function CityForm() {
  const { addCity } = useCity()
  const [tzs, setTzs] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  //default values so i don’t have to type every time when testing
  const [name, setName] = useState('Stockholm')
  const [country, setCountry] = useState('Sweden')
  const [tz, setTz] = useState('Europe/Stockholm')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const list = await fetchTimezones()
        setTzs(list)
        //if stockholm isn’t there, just pick first tz
        if (!list.includes('Europe/Stockholm')) setTz(list[0] ?? '')
      } catch (e: any) {
        //store the error so we can show message instead of crashing
        setError(e?.message ?? "Couldn't load time zones right now")
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!tz) return
    //add new city to context state, saves in localStorage too
    addCity({ name, country, tz, imageUrl: imageUrl || undefined })
    //reset fields so it’s easier to add another one quickly
    setName('')
    setCountry('')
    setImageUrl('')
  }

  //if still loading show this first
  if (loading) return <p aria-live="polite">Loading time zones…</p>

  //if fetch fails show error + retry button
  if (error) {
    return (
      <div className="form" role="alert">
        <p className="error">Couldn't load time zones: {error}</p>
        <button
          type="button"
          onClick={() => {
            setError(null)
            setLoading(true)
            //try again if fetch failed before
            ;(async () => {
              try {
                const list = await fetchTimezones()
                setTzs(list)
                if (!list.includes('Europe/Stockholm')) setTz(list[0] ?? '')
              } catch (e: any) {
                setError(e?.message ?? "Couldn't load time zones right now")
              } finally {
                setLoading(false)
              }
            })()
          }}
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <fieldset>
        <legend>Add a city</legend>
        <div className="row">
          <label>
            City
            <input
              placeholder="e.g. Stockholm"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Country
            <input
              placeholder="e.g. Sweden"
              value={country}
              onChange={e => setCountry(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="row">
          <label>
            Time zone
            <select value={tz} onChange={e => setTz(e.target.value)} required>
              {tzs.map(z => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
          </label>
          <label>
            Image URL <span style={{ fontWeight: 400 }}>(optional)</span>
            <input
              placeholder="https://..."
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
            />
          </label>
        </div>

        {/*simple button no icons etc*/}
        <button type="submit">Add city</button>
      </fieldset>
    </form>
  )
}
