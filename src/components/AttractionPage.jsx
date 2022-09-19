import React from 'react';
import axios from 'axios';
import { Route, HashRouter as Router, Link } from 'react-router-dom'
import './AttractionPage.css'

const BASE_URL = 'http://localhost:3000'

class AttractionPage extends React.Component {

  state = {
    attraction: {},
    attractionEvents: [],
    currentUser: null,
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
        console.log(`data:`,res.data)
        this.setState({currentUser: res.data}) 
        //call back function to be run after setState operation completes becasue setState is async
      })
      .catch(err => console.warn(err))


    this.getAttractionDetails(this.props.match.params.id)
  }

  getAttractionDetails = async (id) => {
    
    try {
      const res = await axios.get(`${BASE_URL}/attractions/${id}`)

      console.log('response data:', res.data );
      console.log('attraction events:', res.data.events);
      this.setState({attraction: res.data})
      this.setState({attractionEvents: res.data.events})

    } catch( err ){
      console.error('Error loading data from API', err);
      this.setState({ error: err })
    }

  }

  render(){
      
    return(
      <div className="attraction-page">
        <h2>{this.state.attraction.name}</h2>

        <img className="attraction-main-img" src={this.state.attraction.image} alt={this.state.attraction.name} />

        <p className="attraction-description">{this.state.attraction.description}</p>

        <p><strong>Address:</strong>{this.state.attraction.address}</p>

        <div>
        {
          this.state.attractionEvents.length !== 0
            ?
            (
              <div>
                <h2>What's happening here?</h2>
                {
                this.state.attractionEvents.map( (event) => (
                  <div>
                    <h3>{event.name}</h3>
                    <p><strong>{event.time}</strong></p>
                    <p>{event.description}</p>
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
    )
  }

}

export default AttractionPage