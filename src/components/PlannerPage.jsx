import React from 'react'; 
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { Route, Link, HashRouter as Router } from 'react-router-dom';
import './PlannerPage.css'

const BASE_URL = 'http://localhost:3000'

class PlannerPage extends React.Component {

    state = {
         currentUser: {
            name: '',
            email: '',
            id: ''
        },
        planner: {}, 
        events: [],
        attractions: [],
        loading: true,
        error: null
    
    }

    componentDidMount(){
        this.fetchAttractions(this.props.match.params.id)

    }

    fetchAttractions = (id) => {
        const url = `${BASE_URL}/planners/${id}`
        console.log(url);
        axios.get(url)
        .then( res => {
            console.log('getting data from planner', res.data)
            console.log('getting data from attractions', res.data.attractions)
            console.log('getting data from events', res.data.events)
            this.setState({
                planner: res.data,
                attractions: res.data.attractions,
                events: res.data.events
            })

        }) 
        .catch ( err => {
            console.error(`Fail to load API data:`, err)
        })
    }


    render(){

        return (
            <div>
                <h2> Planner! </h2>
                <div>
                    <h2>Attractions</h2>
                        {this.state.attractions.map(attraction => { return(
                            <div key={attraction.id}>
                                <Link to= "/attraction">
                                <img src={attraction.image} className="show-page"/>
                                </Link>
                                <br />
                                <h3>{attraction.name}</h3>
                                <p>{attraction.address}</p>
                                <p>{attraction.description}</p>
                                
                            </div>

                        )})}
                </div>
                <div>
                    <h2> Events </h2>
                    {this.state.events.map(events => { return(
                        <div key={events.id}>
                            <Link to= "/events">
                            <img src={events.image} className="show-page"/>
                            </Link>
                            <br />
                            <h3>{events.name}</h3>
                            <p>{events.location}</p>
                            <p>{events.description}</p>
                            <p>{events.time}</p>
                            
                        </div>

                    )})}

                </div>


            </div>
        )


    }





}

export default PlannerPage