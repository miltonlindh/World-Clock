
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CityDetail from './pages/CityDetail'

export default function App() {
  return (
    //browserRouter wraps the entire app to enable routing
    <BrowserRouter>
      <Layout>
        <Routes>
          {/*home page showing list of cities*/}
          <Route path="/" element={<Home />} />

          {/*detail view for a specific city*/}
          <Route path="/city/:id" element={<CityDetail />} />
          
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
