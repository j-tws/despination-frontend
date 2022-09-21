import React from 'react'
import axios from 'axios'
import { Route, Link, HashRouter as Router } from 'react-router-dom';
import './MyProfile.css';
import PlannerForm from './PlannerForm';
import Form from 'react-bootstrap';


const BASE_URL = 'http://localhost:3000'

// Component to show details about the user.

class MyProfile extends React.Component {
  state = {
    currentUser: {
      name: '',
      email: '',
      id: ''
    },

    plannerFormResponse: '',

    planners: [],
    loading: true,
    error: null
  }

  componentDidMount(){
    let token = "Bearer " + localStorage.getItem("jwt")
    console.log(token)
    console.log('result token')
    axios.get(`${BASE_URL}/users/current`, {
      headers: {
        'Authorization': token
      }
    })
    
    .then(res => {
      // console.log(`data:`,res.data)
      this.setState({currentUser: res.data}, () => this.fetchUser(this.state.currentUser.id)) 
      //call back function to be run after setState operation completes becasue setState is async
    })
    .catch(err => console.warn(err))
    
  }

  fetchUser = async (userID) => {
    console.log(userID);
    let token = "Bearer " + localStorage.getItem("jwt")
    try{
      const res = await axios.get(
        `${BASE_URL}/users/${userID}`, 
        {
          headers: {
            'Authorization': token
          }
        }
      );
      
      this.setState({
        loading: false,
        planners: res.data.planners.reverse(),
      })
      // console.log('res.data results',res.data )

    } catch (err){
      console.error('Error loading from API', err)
    }
  }

  postPlanner = async (name, img) => {
    console.log(`Form almost submit!`, name, img);
    
    try {
      const res = await axios.post(`${BASE_URL}/new_planner`, 
      {name: name, image: img, user_id: this.state.currentUser.id})
      console.log(`response:`, res.data.object);
      this.setState({
        plannerFormResponse: res.data.response,
        planners: [res.data.object, ...this.state.planners]
      
      })

    } catch( err ){
      console.error(err);
      this.setState({plannerFormResponse: err.response.data.error})
    }

  }

  deletePlanner = async (id) => {
    
    try {
      console.log(`Planner id:`, id);
      const res = await axios.delete(`${BASE_URL}/planners/${id}`)
      console.log(`response:`,res.data.object);
      
      const remainingPlanners = this.state.planners.filter( planner => planner.id != id)

      this.setState({planners: remainingPlanners})

    } catch( err ){
      console.log(err);

    }

  }

  

  render() {

    return (
      <div>
        <Router>

        <h1>Welcome back, {this.state.currentUser.name}!</h1>
        {/* <h3>Your email is {this.state.currentUser.email}</h3> */}

        <PlannerForm submitForm={this.postPlanner}/>
        <p>{this.state.plannerFormResponse}</p>

        {/* <Link to="/profile/create_planner">Create new Planner</Link>

        <Route
          exact path='/profile/create_planner'
          render={(props) => <PlannerForm user={this.state.currentUser} {...props} />}
        /> */}


        <h2>List of All Planners</h2>

          <ul className='planner-list'>
            {this.state.planners.map(planner => { return(
              <div className="planner-box">
                <li key={planner.id}>
                  <Link to= {`/planners/${planner.id}`}>
                    <img src={planner.image} className="profile-img" alt={planner.name} />
                    <h3 className="planner-name">{planner.name}</h3>
                
                  </Link>
  
                </li>

                <div className="planner-edit-delete">
                  <button>Edit</button>
                  <button onClick={() => this.deletePlanner(planner.id)}>Delete</button>
                </div>

              </div>

            )})}
          </ul>

        </Router>
      </div>

    )

  }

}

export default MyProfile