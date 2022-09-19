import React from 'react'
import axios from 'axios'

class AddAttractionForm extends React.Component {

  state = {
    selectedPlannerId: null,
  }

  handleChange = (ev) => {
    console.log('selected value:', ev.target.value);
    this.setState({selectedPlannerId: ev.target.value})
  }

  handleSubmit = (ev) => {
    console.log('button clicked!');
    console.log('planner selected:', this.state.selectedPlannerId);
    ev.preventDefault()
    this.props.receivePlannerId(this.state.selectedPlannerId, this.props.currentAttraction)
  }

  render(){

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

          <button onClick={this.handleSubmit}>Add attraction</button>

        </form>
      </div>
    )

  }

}

export default AddAttractionForm