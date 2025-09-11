import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CityDetail from './pages/CityDetail'
import { CityProvider } from './context/CityContext'

export default function App() {
  return (
    <BrowserRouter>
      <CityProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/city/:id" element={<CityDetail />} />
          </Routes>
        </Layout>
      </CityProvider>
    </BrowserRouter>
  )
}
