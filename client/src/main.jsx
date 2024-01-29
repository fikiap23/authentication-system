import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import App from './App.jsx'
import './index.css'
import { SnackbarProvider } from 'notistack'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
)
