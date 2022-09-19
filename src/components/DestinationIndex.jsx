import React from 'react';
import axios from 'axios';
import { Route, HashRouter as Router, Link } from 'react-router-dom';
import './DestinationIndex.css'

const BASE_URL = 'http://localhost:3000'

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
            <h1> des<em>Pin</em>ation</h1>
            <h2> Major destinations to explore </h2>
          </div>
            {
              this.state.loading
              ?
              <p> Loading...</p>
              :
              <ul>
              { this.state.destinations.map( destination => { return(
                <li key={destination.id} className="destination-list"> 
                  <Link to={`/destinations/${destination.id}`}>
                    <img src={destination.image} className="destination-img"/>
                  </Link>
                  <h3>{destination.name}</h3>
                </li>
              ) })}
              </ul>
            }
          </div>
    )
  }


}

export default DestinationIndex