import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import { Provider } from 'react-redux'
// import { store } from './store/store.ts'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
)
