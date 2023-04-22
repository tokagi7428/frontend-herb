import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import Store from './redux/Store'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={Store}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </Provider>

)
