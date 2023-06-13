import './App.css'
import App from './App'

//theme
import 'primereact/resources/themes/lara-light-indigo/theme.css'

//core
import 'primereact/resources/primereact.min.css'

import 'primeicons/primeicons.css'

import { createRoot } from 'react-dom/client'

const container = document.getElementById('root')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
root.render(<App />)
