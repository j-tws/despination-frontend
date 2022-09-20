import React from 'react';
import axios from 'axios';
import './DestinationPage.css'
import { Route, HashRouter as Router, Link } from 'react-router-dom'
import AddRemoveEventForm from './AddRemoveEventForm';


const BASE_URL = 'http://localhost:3000'

class DestinationPage extends React.Component {

  state = {
    destination: {},

    historicalAttractions: [],
    natureAttractions: [],
    eateryAttractions: [],
    allEvents: [],

    loading: true,
    error: null,

    addRemoveEventResponse: '',
    addRemoveEventError: '',

  }

  getAttractions = (id) => {
    axios.get(`${BASE_URL}/destinations/${id}`)
    .then( res => {
      // console.log('destination data:', res.data);
      // console.log('destinations details:', res.data.destination);
      // console.log('attraction categories:', res.data.attraction_categories);
      // console.log('historical categories:', res.data.attraction_categories.Historical);
      this.setState({
        destination: res.data.destination,
        historicalAttractions: res.data.attraction_categories.Historical,
        natureAttractions: res.data.attraction_categories.Nature,
        eateryAttractions: res.data.attraction_categories.Eatery,
        allEvents: res.data.destination.events,
      })
      
    })
    .catch( err => {
      console.error(`Fail to load API data:`, err);
    })
  }

  componentDidMount(){
    this.getAttractions(this.props.match.params.id)
  }

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
    // try {

    //   const res = await axios.post(`${BASE_URL}/planners/${plannerId}/remove_event/${eventId}`)

    // }


  } // deleteEvent

  render(){

    return (
      <div className="destination-page">
        <img src={this.state.destination.image} alt={`${this.state.destination.name}`} className="main-image"/>
        <h1>{this.state.destination.name}</h1>
        <p>{this.state.destination.description}</p>

        <h2>Attractions</h2>
        <h3>Historical and Cultural</h3>
        <ul>
          {
            this.state.historicalAttractions.map( (attraction) => (
              
              <Link to={`/attractions/${attraction.id}`}>
                <li className="attraction-list">
                  <img className="attraction-img" src={attraction.image} alt={attraction.name} />
                  <p>{attraction.name}</p>
                </li>
              </Link>
            ))
          }
        </ul>

        <h3>Landscape and Nature</h3>
        <ul>
          {
            this.state.natureAttractions.map( (attraction) => (
              
              <Link to={`/attractions/${attraction.id}`}>
                <li className="attraction-list">
                  <img className="attraction-img" src={attraction.image} alt={attraction.name} />
                  <p>{attraction.name}</p>
                </li>
              </Link>
            ))
          }
        </ul>

        <h3>Eateries</h3>
        <ul>
          {
            this.state.eateryAttractions.map( (attraction) => (
              
              <Link to={`/attractions/${attraction.id}`}>
                <li className="attraction-list">
                  <img className="attraction-img" src={attraction.image} alt={attraction.name} />
                  <p>{attraction.name}</p>
                </li>
              </Link>
            ))
          }
        </ul>

        <h2>All events happening in this city</h2>
          <div className="destination-event-grid">
            {
              this.state.allEvents.map( (event) => (
                <div className="destination-event-box">
                  <img src={event.image} alt={event.name} />
                  <h3>{event.name}</h3>
                  <p><strong>{event.time}</strong></p>
                  <p>{event.description}</p>

                  <AddRemoveEventForm 
                    userPlanners={this.props.user.planners}
                    eventId = {event.id}
                    addEvent={this.postEvent}
                    removeEvent={this.deleteEvent}
                
                  />
                  <p>{this.state.addRemoveEventResponse}</p>

                </div>
              ))
            }
          </div>
      </div>
      )

  }

}

export default DestinationPage