import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

//render the whole app inside #root element
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/*wrap app in strict mode so react shows extra warnings in dev*/}
    <App />
  </React.StrictMode>
)
