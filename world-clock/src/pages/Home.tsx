import CityList from '../components/CityList'
import CityForm from '../components/CityForm'

export default function Home() {
  return (
    <div className="stack gap">
      <CityList />
      <h2>Add city</h2>
      <CityForm />
    </div>
  )
}
