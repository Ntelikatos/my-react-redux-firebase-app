import React, { createContext, useEffect } from 'react'

// import firebaseConfig from './firebaseConfig'

import app from 'firebase/app'

import 'firebase/database'

import { useDispatch } from 'react-redux'

// import { todoActions } from '../state/todos'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

// we create a React Context, for this to be accessible

// from a component later

const FirebaseContext = createContext(null)

export { FirebaseContext }

export default ({ children }) => {
  let firebase = {
    app: null,

    database: null,
  }

  const dispatch = useDispatch()

  // check if firebase app has been initialized previously

  // if not, initialize with the config we saved earlier

  if (!app.apps.length) {
    app.initializeApp(firebaseConfig)

    firebase = {
      app: app,

      database: app.database(),

      api: {
        getData,
      },
    }
  }

  // function to query Todos from the database and

  // fire a Redux action to update the items in real-time

  function getData() {
    firebase.database.ref('myCollection').on('value', (snapshot) => {
      const vals = snapshot.val()

      let _records = []

      for (var key in vals) {
        _records.push({
          ...vals[key],

          id: key,
        })
      }

      // setTodos is a Redux action that would update the todo store

      // to the _records payload

      dispatch(setData(_records))
    })
  }

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  )
}
