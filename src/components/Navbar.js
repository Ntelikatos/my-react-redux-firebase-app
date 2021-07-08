import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Dashboard from './Dashboard'
import { PrivateRoute } from '../redux/store'
import './Navbar.scss'
import logo from '../resources/modi.svg'

const Navbar = () => {
  return (
    <Router>
      <div className='navbar'>
        <div className='navbar__logo'>
          <h1>LOGO</h1>
        </div>
        <div>
          <ul className='navbar__menu'>
            <li className='navbar__item'>
              <Link className='navbar__link' to='/home'>
                Home
              </Link>
            </li>
            <li className='navbar__item'>
              <Link className='navbar__link' to='/dashboard'>
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/home'>
          <Home />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <PrivateRoute path='/dashboard'>
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

export default Navbar
