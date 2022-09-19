import React from 'react';
import axios from 'axios';
import './DestinationPages.css'
import { Route, HashRouter as Router, Link } from 'react-router-dom'


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
  }

  getAttractions = (id) => {
    axios.get(`${BASE_URL}/destinations/${id}`)
    .then( res => {
      // console.log('destination data:', res.data);
      // console.log('destinations details:', res.data.destination);
      // console.log('attraction categories:', res.data.attraction_categories);
      console.log('historical categories:', res.data.attraction_categories.Historical);
      this.setState({destination: res.data.destination})
      this.setState({historicalAttractions: res.data.attraction_categories.Historical})
      this.setState({natureAttractions: res.data.attraction_categories.Nature})
      this.setState({eateryAttractions: res.data.attraction_categories.Eatery})
      this.setState({allEvents: res.data.destination.events})
        

    })
    .catch( err => {
      console.error(`Fail to load API data:`, err);
    })
  }

  componentDidMount(){
    this.getAttractions(this.props.match.params.id)
  }

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

          <h2>What's happening here</h2>
            <ul>
              {
                this.state.allEvents.map( (event) => (
                  <li>{event.name}</li>
                ))
              }
            </ul>
              
        </div>
        )

    }

}

export default DestinationPage