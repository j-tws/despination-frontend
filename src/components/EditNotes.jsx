import React from 'react';
import './EditNotes.css'

class EditNotes extends React.Component {

  state = {
    notesText: ''
  }

  handleSubmit = () => {
    console.log(`Apply button clicked`);
    this.props.editNotes(this.state.notesText)
  }

  handleNotesChange = (ev) => {
    // console.log(ev.target.value);
    this.setState({notesText: ev.target.value})
  }

  render(){

    return (
      <div className="notes-form">
        <form onSubmit={this.handleSubmit}>
          <textarea 
            name="planner-notes" id="planner-notes" 
            cols="50" 
            rows="10"
            defaultValue={this.props.plannerNotes}
            onChange={this.handleNotesChange}
          />
          <br />

          <button>Apply</button>
        </form>
      </div>
    )
  }

}

export default EditNotes