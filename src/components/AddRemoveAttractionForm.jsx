import React from 'react'


class AddRemoveAttractionForm extends React.Component {

  state = {
    selectedPlannerId: null,
  }

  handleChange = (ev) => {
    console.log('selected value:', ev.target.value);
    this.setState({selectedPlannerId: ev.target.value})
  }

  handleAddAttractionSubmit = (ev) => {
    // console.log('button clicked!');
    // console.log('planner selected:', this.state.selectedPlannerId);
    ev.preventDefault()
    this.props.addAttraction(this.state.selectedPlannerId)
  }

  handleRemoveAttractionSubmit = (ev) => {
    // console.log('button clicked!');
    // console.log('planner selected:', this.state.selectedPlannerId);
    ev.preventDefault()
    this.props.removeAttraction(this.state.selectedPlannerId)
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

          <button onClick={this.handleAddAttractionSubmit}>Add attraction</button>
          <button onClick={this.handleRemoveAttractionSubmit}>Remove attraction</button>

        </form>
      </div>
    )

  }

}

export default AddRemoveAttractionForm