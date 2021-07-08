import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'normalize.css'
import './index.scss'

ReactDOM.render(
  <React.StrictMode>
    <div className='mainIndexContainer'>
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
)
