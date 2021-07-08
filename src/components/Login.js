import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StyledFirebaseAuth } from 'react-firebaseui'
import { isLoaded, isEmpty, useFirebase } from 'react-redux-firebase'

const Login = () => {
  const firebase = useFirebase()
  const auth = useSelector((state) => state.firebase.auth)
  const history = useHistory()
  const location = useLocation()

  let { from } = location.state || { from: { pathname: '/' } }

  return (
    <div>
      {!isLoaded(auth) ? (
        <span>Loading...</span>
      ) : (
        isEmpty(auth) && (
          <>
            <h2>Authentication Page</h2>
            <StyledFirebaseAuth
              uiConfig={{
                signInFlow: 'popup',
                signInSuccessUrl: '/signedIn',
                signInOptions: [
                  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                  firebase.auth.EmailAuthProvider.PROVIDER_ID,
                ],
                callbacks: {
                  signInSuccessWithAuthResult: (authResult) => {
                    firebase.handleRedirectResult(authResult).then(() => {
                      history.push(from) //if you use react router to redirect
                    })
                    return false
                  },
                },
              }}
              firebaseAuth={firebase.auth()}
            />
          </>
        )
      )}
    </div>
  )
}

export default Login
