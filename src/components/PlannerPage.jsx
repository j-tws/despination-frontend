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
                <div className="planning-heading">
                    <h2> {this.state.planner.name} </h2>
                    <p> last update: {this.state.planner.updated_at} </p>
                </div>
                <ul>
                    <h2>Attractions</h2>
                        {this.state.attractions.map(attraction => { return(
                            <li key={attraction.id} className="attracts-list">
                                <Link to={`/attractions/${attraction.id}`}>
                                <img src={attraction.image} className="attracts-events-img"/>
                                </Link>
                                <br />
                                <h3>{attraction.name}</h3>
                                <p>{attraction.address}</p>
                                
                            </li>

                        )})}
                </ul>
                
                <ul>
                    <h2> What's the buzz in town! </h2>
                        {this.state.events.map(events => { return(
                            <li key={events.id} className="events-list">
                                <img src={events.image} className="attracts-events-img"/>
                                <br />
                                <h3>{events.name}</h3>
                                <p>{events.location}</p>
                                <p>{events.description}</p>
                                <p>{events.time}</p>
                                
                            </li>

                        )})}
                </ul>
            


            </div>
        )


    }





}

export default PlannerPage