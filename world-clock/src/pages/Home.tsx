import CityList from '../components/CityList'
import CityForm from '../components/CityForm'
import QuickAdd from '../components/QuickAdd'

export default function Home() {
  return (
    <div className="stack gap">
      <CityList />
      <QuickAdd />
      <h2>Add city</h2>
      <CityForm />
    </div>
  )
}
