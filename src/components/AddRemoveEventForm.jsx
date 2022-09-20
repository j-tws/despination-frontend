import React from 'react'
import axios from 'axios'

class AddRemoveEventForm extends React.Component {

  state = {
    selectedPlannerId: null,
  }

  handleChange = (ev) => {
    console.log('selected value:', ev.target.value);
    this.setState({selectedPlannerId: ev.target.value})
  }

  handleAddEventSubmit = (ev) => {
    console.log('button clicked!');
    console.log('planner selected:', this.state.selectedPlannerId);
    ev.preventDefault()
    this.props.addEvent(this.state.selectedPlannerId, this.props.eventId)
  }

  handleRemoveEventSubmit = (ev) => {
    console.log('button clicked!');
    console.log('planner selected:', this.state.selectedPlannerId);
    ev.preventDefault()
    this.props.removeEvent(this.state.selectedPlannerId, this.props.eventId)
  }

  render() {

    return (
      <div>
        <form>
          <label>Choose planner to add:</label>
          <select name="planners">
            <option selected disabled>Select planner</option>
            {
              this.props.userPlanners.map( (planner) => (
                <option value={planner.id} onClick={this.handleChange}>{planner.name}</option>
              ))
            }
          </select>

          <button onClick={this.handleAddEventSubmit}>Add Event</button>
          <button onClick={this.handleRemoveEventSubmit}>Remove Event</button>

        </form>
      </div>
    )

  }

}

export default AddRemoveEventForm