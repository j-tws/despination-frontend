import React from 'react'; 
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PlannerPage.css'
import EditNotes from './EditNotes';

let BASE_URL;
if( process.env.NODE_ENV === 'development'){
  BASE_URL = 'http://localhost:3000';
} else {
  BASE_URL = 'https://despination-api-sfv0.onrender.com';
}

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

    editNotes: false,

    loading: true,
    error: null
  
  }

  componentDidMount(){
    this.fetchAttractions(this.props.match.params.id)

  }

  fetchAttractions = (id) => {
    let token = "Bearer " + localStorage.getItem("jwt")
    const url = `${BASE_URL}/planners/${id}`
    console.log(url);
    axios.get(url,{
        headers: {
            'Authorization': token
        }
    })
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

  handleClick = () => {
    console.log(`Edit note button clicked`);
    this.setState({editNotes: true})
  }

  patchNotes = async (text) => {
    console.log(`patching through:`, text);
    this.setState({editNotes: false})
    try {
      const res = await axios.patch(`${BASE_URL}/planners/${this.props.match.params.id}`, {notes: text})
      console.log(`patch response:`, res.data);
      this.setState({planner: res.data})

    } catch( err ){
      console.error(`error message:`, err);
    }
  }


  render(){

    return (
      <div className='planner-page'>
        <div className="planning-heading">
          <h2> {this.state.planner.name} </h2>
          <p> last update: {this.state.planner.updated_at} </p>
        </div>
        <ul className="attractions-container">
          <h2>Attractions</h2>
            {this.state.attractions.map(attraction => { return(
              <li key={attraction.id} className="attracts-list">
                <Link to={`/attractions/${attraction.id}`}>
                <img 
                  src={attraction.image} className="attracts-events-img"
                  alt={attraction.name}
                />
                <div className="attracts-events-name">{attraction.name}</div>
                </Link>
                
                
              </li>

            )})}
        </ul>
        
          <h2> Upcoming events! </h2>
          <ul className="events-container">
              {this.state.events.map(events => { return(
                <li key={events.id} className="events-list">
                  <img 
                    src={events.image} className="attracts-events-img"
                    alt={events.name}
                  />
                  
                  <h3>{events.name}</h3>
                  <p>{events.location}</p>
                  <p>{events.description}</p>
                  <p>{events.time}</p>
                    
                </li>

              )})}
          </ul>

          {
            this.state.editNotes
            ?
            (
              <EditNotes plannerNotes={this.state.planner.notes} editNotes={this.patchNotes}/>
            )
            :
            (
            <div className="planner-notes">
              <h2>My notes</h2>
              <p>{this.state.planner.notes}</p>
              <button onClick={() => this.handleClick()}>Add / Edit notes</button>
            </div>
            )

          }
          


      </div>
    )

  }

}

export default PlannerPage