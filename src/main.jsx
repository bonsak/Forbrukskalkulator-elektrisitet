import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App.jsx'
import './index.css'
// import 'frappe-gantt/dist/frappe-gantt.css'
import GlobalStyles from './components/GlobalStyles'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <>
    <App />
    <GlobalStyles />
  </>
  // </StrictMode>
)
