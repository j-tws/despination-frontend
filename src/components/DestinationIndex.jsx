import React from 'react'
import axios from 'axios'
import { Route, Link, HashRouter as Router } from 'react-router-dom';

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
            <h1> des<em>Pin</em>ation</h1>
            <h3> Major destinations to explore </h3>
            {
              this.state.loading
              ?
              <p> Loading...</p>
              :
              <ul>
              { this.state.destinations.map( destination => { return(
                <li key={destination.id}> 
                  <img src={destination.image} className="index-page"/>
                    <br />
                  <h2>{destination.name}</h2>
                </li>
              ) })}
              </ul>
            }
          </div>
    )
  }


}

export default DestinationIndex