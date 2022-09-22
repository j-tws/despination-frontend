import React from 'react';
import axios from 'axios';
import { Route, HashRouter as Router, Link } from 'react-router-dom'
import './AttractionPage.css'
import AddRemoveAttractionForm from './AddRemoveAttractionForm';
import AddRemoveEventForm from './AddRemoveEventForm';
import LikeButton from './LikeButton';

const BASE_URL = 'http://localhost:3000'

class AttractionPage extends React.Component {

  state = {
    attraction: {},
    attractionEvents: [],

    currentUser: null,
    currentUserPlanners: [],

    loading: true,
    error: null,

    addRemoveAttractionResponse: '',
    addRemoveEventResponse: '',

   

  }

  componentDidMount(){

    let token = "Bearer " + localStorage.getItem("jwt")
      // console.log(token)
      // console.log('result token')
      axios.get(`${BASE_URL}/users/current`, {
          headers: {
              'Authorization': token
          }
      })
      .then(res => {
        // console.log(`data:`,res.data)
        console.log(`currentUserPlanners:`, res.data.planners)

        this.setState({currentUser: res.data}) 
        //call back function to be run after setState operation completes becasue setState is async
        this.setState({currentUserPlanners: res.data.planners})

      })
      .catch(err => console.warn(err))

    this.getAttractionDetails(this.props.match.params.id)
  } // componentDidMount

  getAttractionDetails = async (id) => {
    
    try {
      const res = await axios.get(`${BASE_URL}/attractions/${id}`)

      console.log('response data:', res.data );
      // console.log('attraction events:', res.data.events);
      const usersThatLikedAttraction = res.data.users.map(user => user.id)
      this.setState({
        attraction: res.data,
        attractionEvents: res.data.events,
      })
    

    } catch( err ){
      // console.error('Error loading data from API', err);
      this.setState({ error: err })
    }

  } // getAttractionDetails

  postAttraction = async (plannerId) => {

    try {
  
      const res = await axios.post(`${BASE_URL}/planners/${plannerId}/add_attraction/${this.props.match.params.id}`)
      // console.log(`Post response:`, res.data);

      this.setState({addRemoveAttractionResponse: res.data.response})
      
    } catch( err ){

      // console.log('error message:', err);
      // console.log('error message:', err.response.data.error);
      
      this.setState({addRemoveAttractionResponse: err.response.data.error})

    }

  } //postAttraction

  deleteAttraction = async (plannerId) => {

    // console.log(`info received:`, plannerId);
    try {
  
      const res = await axios.delete(`${BASE_URL}/planners/${plannerId}/remove_attraction/${this.props.match.params.id}`)
      // console.log(`Delete response:`, res.data);

      this.setState({addRemoveAttractionResponse: res.data.response})
      
    } catch( err ){

      // console.log('error message:', err);
      // console.log('error message:', err.response.data.error);
      
      this.setState({addRemoveAttractionResponse: err.response.data.error})

    }

  } //deleteAttraction

  postEvent = async (plannerId, eventId) => {

    // console.log(`info received:`, plannerId, eventId);
    try {

      const res = await axios.post(`${BASE_URL}/planners/${plannerId}/add_event/${eventId}`)
      // console.log(`Post response:`, res.data);

      this.setState({addRemoveEventResponse: res.data.response})

    } catch( err ){

      // console.log('error message:', err);
      this.setState({addRemoveEventResponse: err.response.data.error})

    }

  } // postEvent

  deleteEvent = async (plannerId, eventId) => {

    console.log(`info received:`, plannerId);
    try {

      const res = await axios.delete(`${BASE_URL}/planners/${plannerId}/remove_event/${eventId}`)
      // console.log(`Delete response:`, res.data);

      this.setState({addRemoveEventResponse: res.data.response})

    } catch( err ){
      // console.log('error message:', err);
      this.setState({addRemoveEventResponse: err.response.data.error})
    }

  } // deleteEvent

  render(){
      
    return(
      <div className="attraction-page">
        <h2>{this.state.attraction.name}</h2>

        <img 
          className="attraction-main-img" 
          src={this.state.attraction.image} 
          alt={this.state.attraction.name} 
        />
        <div>
          {/* this state.current user is async, while axios is processing, give me null until the data is loaded back then give me currentUser.id */}
          {this.state.attraction.id && this.state.currentUser
            // Waiting for attraction & currentUser details to be loaded before the LikeButton component is rendered
            ?
              <LikeButton 
                attractionId={this.props.match.params.id} 
                userId={this.state.currentUser.id}
                usersThatLiked={this.state.attraction.users}
              /> 
            :
              "Loading..." 
          }
          
        </div>

        <p className="attraction-description">{this.state.attraction.description}</p>

        <p><strong>Address:</strong>{this.state.attraction.address}</p>

        {
          this.state.currentUser !== null
            ?
            (
              <div>
                <AddRemoveAttractionForm 
                  userPlanners={this.state.currentUserPlanners} 
                  addAttraction={this.postAttraction} 
                  removeAttraction={this.deleteAttraction} 
                />
                <p>{this.state.addRemoveAttractionResponse}</p>
              </div>
            )
            :
            (
              <div></div>
            )
        }

        <div>
        {
          this.state.attractionEvents.length !== 0
            ?
            (
              <div>
                <h2>What's happening here?</h2>
                {
                this.state.attractionEvents.map( (event) => (
                  <div key={event.id} className="all-events">
                    <img src={event.image} alt={event.name} />
                    <h3>{event.name}</h3>
                    <p><strong>{event.time}</strong></p>
                    <p>{event.description}</p>

                    {
                    this.state.currentUser !== null
                      ?
                      (
                        <div>
                          <AddRemoveEventForm 
                            // userPlanners={this.props.user.planners}
                            userPlanners={this.state.currentUserPlanners} 
                            eventId = {event.id}
                            addEvent={this.postEvent}
                            removeEvent={this.deleteEvent}
                        
                          />
                          <p>{this.state.addRemoveEventResponse}</p>
                        </div>
                      )
                      :
                      (
                        <div></div>
                      )
                  }

                  </div>
                ))
                }
              </div>
        
            )
            :
            (
              <h2>No events planned for now.</h2>
            )
        }
        </div>

      </div>
    ) //return()
  } //render()

} //class

export default AttractionPage