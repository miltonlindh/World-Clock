import CityList from '../components/CityList'
import CityForm from '../components/CityForm'
import QuickAdd from '../components/QuickAdd'

export default function Home() {
  return (
    //main layout for homepage, split into sections
    <main className="stack gap">
      {/*shows the user's saved cities*/}
      <section aria-labelledby="your-cities">
        <h2 id="your-cities">Your cities</h2>
        <CityList />
      </section>

      {/*quick add buttons for preset cities*/}
      <section aria-labelledby="quick-add">
        <h2 id="quick-add">Quick add</h2>
        <QuickAdd />
      </section>

      {/*form to manually add a new city*/}
      <section aria-labelledby="add-city">
        <h2 id="add-city">Add a new city</h2>
        <CityForm />
      </section>
    </main>
  )
}
