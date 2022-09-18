import logo from './logo.svg';
import React from 'react';
import './App.css';
import axios from 'axios';
import { Route, Link, HashRouter as Router } from 'react-router-dom';
import Login from './components/Login';
import MyProfile from './components/MyProfile';
import DestinationPage from './components/DestinationPage';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';

const BASE_URL = 'http://localhost:3000'

class App extends React.Component {

  // App state
  state = {
    currentUser: undefined,
    destinations: [],
    loading: true,
    error: null
  }

  // function to run on component mounting
  componentDidMount() {
    // this function will load once you load the website. We want to check if the user is logged in when we visit so we'll pass in the setCurrentUser function
    this.setCurrentUser()
    this.fetchDestinations()
  }

  // function to set the state to the current logged in user
  // This is the function to get the current user from your database if there is one.
  // We declare that there is a token which holds a json web token 'jwt' from your local storage.
  // We then do an axios request to the back end and ask it if we're logged in already. 
  // We pass through this token as an authenticator header which let our server validate us.
  // If our token is valid then we set the state to our current user. If not you'll see a warning in your console that you're unauthorized
  setCurrentUser = () => {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios.get(`${BASE_URL}/users/current`, {
      headers: {
        'Authorization': token
      }
    })
      .then(res => {
        this.setState({ currentUser: res.data })
      })
      .catch(err => console.warn(err))
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

  fetchDestinations = async () => {
    try{
      const res = await axios.get(`${BASE_URL}/destinations`);
      console.log('response:', res.data)
      
      this.setState({
        destinations: res.data,
        loading: false
      })


    } catch (err) {
      console.error('Error loading from API', err);
    }
  } // fetchDestinations()

  // This is where all our HTML goes

  // This is something like to notify whether a user is logged in or not (mostly at the home page), or a display text saying "Welcome, username"
  render() {

    return (
      <Router>
        <header>
          <nav>
            {/* Show one of two nav bars depending on if the user is logged in */}
            {
              this.state.currentUser !== undefined
                ?
                (
                  <ul>
                    <li>Welcome {this.state.currentUser.name} | </li>
                    <li><Link to='/my_profile'>My Profile</Link></li>
                    <li><Link onClick={this.handleLogout} to='/'>Logout</Link></li>
                  </ul>
                )
                :
                (
                  <ul>
                    <li><Link to='/login'>Login</Link></li>
                  </ul>
                )
            }

          </nav>


          <div>
            <h1> desPination</h1>
            <h3> Major destinations to explore </h3>
            {
              this.state.loading
              ?
              <p> Loading...</p>
              :
              <ul>
              { this.state.destinations.map( d => { return(
                <li key={d.id}> 
                  {d.name}
                  <img src={d.image}/>
                </li>
              ) })}
              </ul>
            }
          </div>



        </header>

        <Route exact path='/my_profile' component={MyProfile} />
        <Route exact path='/destinations/:id' component={DestinationPage} />

        <Route
          exact path='/login'
          render={(props) => <Login setCurrentUser={this.setCurrentUser}{...props} />} // Ask Luke & Kris what's this?
        />

      </Router>
    )

  }

}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
