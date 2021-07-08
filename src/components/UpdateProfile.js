import React from 'react'
import { useSelector } from 'react-redux'
import { useFirebase, isLoaded } from 'react-redux-firebase'
import './UpdateProfile.scss'

export default function UpdateProfile() {
  const firebase = useFirebase()
  const profile = useSelector((state) => state.firebase.profile)

  function updateUserProfile() {
    return firebase.updateProfile({ role: 'admin' })
  }

  return (
    <div className='profileContainer'>
      <h2>Update User Profile</h2>
      <span>Click the button to update profile to include role parameter</span>
      <button onClick={updateUserProfile}>Add Role To User</button>
      <div className='profileDetailsContainer'>
        <div className='profileDetails'>
          {isLoaded(profile) ? JSON.stringify(profile, null, 2) : 'Loading...'}
        </div>
      </div>
    </div>
  )
}
