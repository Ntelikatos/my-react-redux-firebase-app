import { compose } from 'redux'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { withFirestore, useFirebase } from 'react-redux-firebase'
import { Switch, Route, Link } from 'react-router-dom'
import Todos from './Todos'
import UpdateProfile from './UpdateProfile'
import './Dashboard.scss'

const Dashboard = () => {
  const firebase = useFirebase()
  const auth = useSelector((state) => state.firebase.auth)
  const history = useHistory()
  let { path, url } = useRouteMatch()

  console.log(auth)

  return (
    <>
      <div className='dashboard'>
        <div className='dashboard__user'>
          <div className='dashboard__user-container'>
            <div className='dashboard__img'>
              <img width='100' height='100' src={auth.photoURL} alt='' />
            </div>
            <div className='dashboard__greeting'>
              <h1>Hello {auth.displayName}</h1>
              <h2>Today is {new Date().toDateString()}</h2>
            </div>
          </div>

          {/* <pre>{JSON.stringify(auth, null, 2)}</pre> */}

          <p className='dashboard__user-text'>
            <span className='dashboard__user-label'>Username:&nbsp;</span>
            {auth.displayName}
          </p>
          <p className='dashboard__user-text'>
            <span className='dashboard__user-label'>Email:&nbsp;</span>
            {auth.email}
          </p>

          <button
            className='dashboard__btn-logout'
            onClick={() =>
              firebase.logout().then(() => {
                history.push('/')
              })
            }
          >
            Log Out
          </button>
        </div>
        {/* <div className='navActionsContainer'>
          <h1>Actions</h1>
          <ul>
            <li>
              <Link className='titleDetails' to={`${url}/todos`}>
                Open Todos
              </Link>
            </li>
            <li>
              <Link className='titleDetails' to={`${url}/updateUser`}>
                Update User
              </Link>
            </li>
          </ul>

          <Switch>
            <Route exact path={path}>
              <h4>Please select an action.</h4>
            </Route>
            <Route path={`${url}/todos`}>
              <Todos />
            </Route>
            <Route path={`${url}/updateUser`}>
              <UpdateProfile />
            </Route>
          </Switch>
        </div> */}
      </div>
    </>
  )
}

export default compose(
  withFirestore,
  connect((state) => ({
    data: state.firestore.ordered.test,
  }))
)(Dashboard)
