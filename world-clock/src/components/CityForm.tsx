import { useEffect, useState } from 'react'
import { fetchTimezones } from '../services/timeApi'
import { useCity } from '../context/CityContext'

export default function CityForm() {
  const { addCity } = useCity()
  const [tzs, setTzs] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  //local controlled inputs
  const [name, setName] = useState('Stockholm')
  const [country, setCountry] = useState('Sweden')
  const [tz, setTz] = useState('Europe/Stockholm')
  const [imageUrl, setImageUrl] = useState('')

  //load time zones on mount
  useEffect(() => {
    ;(async () => {
      try {
        const list = await fetchTimezones()
        setTzs(list)
        if (!list.includes('Europe/Stockholm')) setTz(list[0] ?? '')
      } catch (e: any) {
        setError(e?.message ?? 'Failed to load time zones')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  //handle submit
  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!tz) return
    addCity({ name, country, tz, imageUrl: imageUrl || undefined })
    //reset some fields after add
    setName('')
    setCountry('')
    setImageUrl('')
  }

  if (loading) return <p>Loading time zones…</p>

  if (error) {
    return (
      <div className="form">
        <p className="error">Could not load time zones: {error}</p>
        <button
          type="button"
          onClick={() => {
            setError(null)
            setLoading(true)
            ;(async () => {
              try {
                const list = await fetchTimezones()
                setTzs(list)
                if (!list.includes('Europe/Stockholm')) setTz(list[0] ?? '')
              } catch (e: any) {
                setError(e?.message ?? 'Failed to load time zones')
              } finally {
                setLoading(false)
              }
            })()
          }}
        >
          Try again
        </button>
        <p className="muted">Tip: a fallback list is used when offline.</p>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="row">
        <input
          placeholder="City"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          placeholder="Country"
          value={country}
          onChange={e => setCountry(e.target.value)}
          required
        />
      </div>
      <div className="row">
        <select value={tz} onChange={e => setTz(e.target.value)} required>
          {tzs.map(z => (
            <option key={z} value={z}>{z}</option>
          ))}
        </select>
        <input
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />
      </div>
      <button type="submit">Add city</button>
    </form>
  )
}
