import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './DestinationIndex.css'

let BASE_URL;
if( process.env.NODE_ENV === 'development'){
  BASE_URL = 'http://localhost:3000';
} else {
  BASE_URL = 'https://despination-api-sfv0.onrender.com';
}

class DestinationIndex extends React.Component{

    state = {
        // currentUser: undefined,
        destinations: [],
        loading: true,
        error: null
    }

    componentDidMount() {
    this.fetchDestinations()
    }

    fetchDestinations = async () => {
    try{
      const res = await axios.get(`${BASE_URL}/destinations`);
      // console.log('response:', res.data)
      
      console.log('destination data', res.data)
      this.setState({
        destinations: res.data,
        loading: false
      })


    } catch (err) {
      console.error('Error loading from API', err);
    }
  } // fetchDestinations()

  render(){
    return(
        <div>
          <div className="destination-heading">
          <h2>Destination List</h2>
          </div>
            {
              this.state.loading
              ?
              <p> Loading...</p>
              :
              <ul className="destination-container">
              { this.state.destinations.map( destination => { return(
                <li key={destination.id} className="destination-list"> 
                  <Link className="link-styles" to={`/destinations/${destination.id}`}>
                    <img 
                    src={destination.image} className="destination-img"
                    alt={destination.name}
                    />
                    <div className="destination-name">{destination.name}</div>
                  </Link>
                </li>
              ) })}
              </ul>
            }
          </div>
    )
  }


}

export default DestinationIndex