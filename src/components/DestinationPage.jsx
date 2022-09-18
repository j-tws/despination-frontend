import React from 'react';
import axios from 'axios';
import './DestinationPages.css'


const BASE_URL = 'http://localhost:3000'

class DestinationPage extends React.Component {

    state = {
        destination: {},
        attractions: [],
        loading: true,
        error: null,
    }

    getAttractions = (id) => {
        axios.get(`${BASE_URL}/destinations/${id}`)
        .then( res => {
            console.log('destination data:', res.data);
            this.setState({destination: res.data})

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
            <div>
                <img src={this.state.destination.image} alt={`${this.state.destination.name}`} className="main-image"/>
                <h1>{this.state.destination.name}</h1>
                <p>{this.state.destination.description}</p>

            </div>
        )

    }

}

export default DestinationPage