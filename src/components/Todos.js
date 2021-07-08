import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { useHistory } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import {
  withFirestore,
  isLoaded,
  isEmpty,
  useFirebase,
} from 'react-redux-firebase'
import TodoItem from './TodoItem'

const Todos = ({ firestore, data }) => {
  // const firebase = useFirebase()
  const auth = useSelector((state) => state.firebase.auth)

  return (
    <div>
      <button onClick={() => firestore.get(`test/${auth.uid}`)}>
        Get Todos
      </button>
      <button
        onClick={() =>
          firestore
            .collection('test')
            .doc(auth.uid)
            .set({ some: 'data2', evita: 'love' })
        }
      >
        Set Todos
      </button>
      {!isLoaded(data)
        ? 'Loading...'
        : isEmpty(data)
        ? 'Todo list is empty'
        : data.map((data) => <TodoItem key={data.id} data={data} />)}
    </div>
  )
}

export default compose(
  withFirestore,
  connect((state) => ({
    data: state.firestore.ordered.test,
  }))
)(Todos)
