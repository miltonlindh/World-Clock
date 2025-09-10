import { useParams, Link } from 'react-router-dom'

export default function CityDetail() {
  const { id } = useParams()

  return (
    <div>
      <h2>City Detail View</h2>
      <p>City ID: {id}</p>
      <Link to="/">← Back to home</Link>
    </div>
  )
}
