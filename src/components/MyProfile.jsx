import React from 'react'
import axios from 'axios'
import { Route, Link, HashRouter as Router } from 'react-router-dom';
import './MyProfile.css';



const BASE_URL = 'http://localhost:3000'

// Component to show details about the user.

class MyProfile extends React.Component {
  state = {
    currentUser: {
      name: '',
      email: '',
      id: ''
    },
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
        planners: res.data.planners,
      })
      // console.log('res.data results',res.data )

    } catch (err){
      console.error('Error loading from API', err)
    }
  }


  render() {

    return (
      <div>
        <h1>Welcome back, {this.state.currentUser.name}!</h1>
        {/* <h3>Your email is {this.state.currentUser.email}</h3> */}
        <button className="planner-create">Make new planner</button>

          <ul className='planner-list'>
            {this.state.planners.map(planner => { return(
              <div className="planner-box">
                <li key={planner.id}>
                  <Link to= {`/planners/${planner.id}`}>
                    <img src={planner.image} className="profile-img" alt={planner.name} />
                    <h3 class="planner-name">{planner.name}</h3>
                
                  </Link>
                    
                </li>

                <div className="planner-edit-delete">
                  <button>Edit</button>
                  <button>Delete</button>
                </div>

              </div>

            )})}
          </ul>

      </div>

    )

  }

}

export default MyProfile