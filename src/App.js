// import logo from './logo.svg';
import React from 'react';
import './App.css';
import axios from 'axios';
import { Route, Link, HashRouter as Router } from 'react-router-dom';
import Login from './components/Login';
import MyProfile from './components/MyProfile';
import DestinationPage from './components/DestinationPage';
import DestinationIndex from './components/DestinationIndex';

import AttractionPage from './components/AttractionPage';
import PlannerPage from './components/PlannerPage';
import Registration from './components/auth/Registration';
import ReactMap from './components/ReactMap';


// import Demo from './Demo';

let BASE_URL;
if( process.env.NODE_ENV === 'development'){
  BASE_URL = 'http://localhost:3000';
} else {
  BASE_URL = 'https://despination.herokuapp.com';
}

class App extends React.Component {

  // App state
  state = {
    currentUser: undefined,
    // destinations: [],

    loading: true,
    error: null,

  }

  // function to run on component mounting
  componentDidMount() {
    // this function will load once you load the website. We want to check if the user is logged in when we visit so we'll pass in the setCurrentUser function
    this.setCurrentUser()

  }

  // function to set the state to the current logged in user
  // This is the function to get the current user from your database if there is one.
  // We declare that there is a token which holds a json web token 'jwt' from your local storage.
  // We then do an axios request to the back end and ask it if we're logged in already. 
  // We pass through this token as an authenticator header which let our server validate us.
  // If our token is valid then we set the state to our current user. If not you'll see a warning in your console that you're unauthorized
  setCurrentUser = () => {
    console.log("localStorage.getItem('jwt'):", localStorage.getItem("jwt"));
    const jwtAvailable = localStorage.getItem("jwt")
    let token = "Bearer " + localStorage.getItem("jwt");

    if (jwtAvailable) {
      axios.defaults.headers.common['Authorization'] = token;
      axios.get(`${BASE_URL}/users/current`)
        .then(res => {
          console.log('setting currentuser');
          this.setState({ currentUser: res.data }, () => console.log('current user set'))
        })
        .catch(err => console.warn(err))
    } else {
      console.log('No token in local storage.')
    }
  }

  // function to log the user out
  // Three things we need to do here.
  // 1. Set our state of current user to undefined.
  // 2. Remove the jwt token from our local storage
  // 3. Set our axios default headers to undefined.

  // This will completely reset our logged in state
  handleLogout = () => {
    this.setState({ currentUser: undefined })
    localStorage.removeItem("jwt");
    axios.defaults.headers.common['Authorization'] = undefined;
  }

  // This is where all our HTML goes

  // This is something like to notify whether a user is logged in or not (mostly at the home page), or a display text saying "Welcome, username"

  render() {

    return (
      <div className="home-page">
        <Router>
          <header className="home-header">

            <h1><Link className="main-title" to='/'><em>des</em>Pin<em>ation</em></Link> </h1>

            <nav className="navbar">
              {/* Show one of two nav bars depending on if the user is logged in */}
              {
                this.state.currentUser
                  ?
                  (

                    <ul>
                      <li className="welcome-text">Welcome {this.state.currentUser.name}</li>
                      <li><Link className="link-font" to='/profile'>My Profile</Link></li>
                      <li><Link className="link-font" onClick={this.handleLogout} to='/'>Logout</Link></li>

                    </ul>
                  )
                  :
                  (
                    <ul>
                      <li><Link className="link-font" to='/login'>Login</Link></li>
                      <li><Link className="link-font" to='/registration'>Sign Up</Link></li>
                    </ul>
                  )
              }
            </nav>
          </header>

          <Route exact path='/' component={ReactMap} />

          <Route exact path='/' component={DestinationIndex} />

          <Route
            exact path='/login'
            render={(props) => <Login setCurrentUser={this.setCurrentUser} {...props} />} // function render props
          />

          {
            this.state.currentUser !== undefined
              ?
              (
                <Route
                  exact path='/profile'
                  render={(props) => <MyProfile user={this.state.currentUser} {...props} />}
                />
              )
              :
              (
                <p className="signup-message">Sign up / login now to access more features!</p>
              )
          }

          {/* <Route exact path='/destinations' component={DestinationIndex} /> */}

          <Route exact path='/registration' component={Registration} />

          {/* keep the route route. dont delete */}
          {/* <Route exact path='/destinations/:id'
          render={(props) => <DestinationPage user={this.state.currentUser} {...props} />}
        /> */}

          <Route exact path='/destinations/:id' component={DestinationPage} />

          <Route exact path='/attractions/:id' component={AttractionPage} />

          <Route exact path='/planners/:id' component={PlannerPage} />

          {/* <Route exact path='/demo' component={Demo} /> */}

          <hr />
          <footer>
            &copy; Too-Broke-To-Travel Pty Ltd.
          </footer>


        </Router>
      </div>
    )

  }

}


export default App;
