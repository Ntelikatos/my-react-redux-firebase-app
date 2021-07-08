import React from 'react'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import Navbar from './components/Navbar'
import { store, rrfProps, AuthIsLoaded } from './redux/store'
import './App.scss'

// Setup react-redux so that connect HOC can be used
export default function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthIsLoaded>
          <div className='mainContainer'>
            <Navbar />
          </div>
        </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}
