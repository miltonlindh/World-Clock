import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CityDetail from './pages/CityDetail'
import { CityProvider } from './context/CityContext'

export default function App() {
  return (
    //enable routing for the entire app
    <BrowserRouter>

      {/* Provide global state (cities + settings) */}
      <CityProvider>

        {/* Shared layout for all pages */}
        <Layout>

          <Routes>
            {/* Home page: will show city list and add form */}
            <Route path="/" element={<Home />} />
            {/* Detail page: shows a single city's clock */}
            <Route path="/city/:id" element={<CityDetail />} />
            
          </Routes>
        </Layout>
      </CityProvider>
    </BrowserRouter>
  )
}
