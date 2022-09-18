import React from 'react';
import axios from 'axios';
import './DestinationPages.css'


const BASE_URL = 'http://localhost:3000'

class DestinationPage extends React.Component {

    state = {
        destination: {},
        attractions: [],
        allEvents: [],
        loading: true,
        error: null,
    }

    getAttractions = (id) => {
        axios.get(`${BASE_URL}/destinations/${id}`)
        .then( res => {
            // console.log('destination data:', res.data);
            console.log('destination attractions:', res.data.attractions);
            this.setState({destination: res.data})
            this.setState({attractions: res.data.attractions})
            this.setState({allEvents: res.data.events})

        })
        .catch( err => {
            console.error(`Fail to load API data:`, err);
        })
    }

    componentDidMount(){
        this.getAttractions(92)
    }

    render(){

        return (
            <div className="destination-page">
                <img src={this.state.destination.image} alt={`${this.state.destination.name}`} className="main-image"/>
                <h1>{this.state.destination.name}</h1>
                <p>{this.state.destination.description}</p>

                <h2>Attractions</h2>
                <ul>
                    {
                        this.state.attractions.map( (attraction) => (
                            <li>{attraction.name}</li>
                        ))
                    }

                </ul>

                <h2>What's happening here</h2>
                    {
                        this.state.attractions.forEach( (attraction) => (
                            this.state.allEvents.push(attraction.events)
                        ))
                    }
                    {
                        this.state.allEvents.map( (event) => (
                            <p>{event.name}</p>
                        ))
                    }
                    

            </div>
        )

    }

}

export default DestinationPage