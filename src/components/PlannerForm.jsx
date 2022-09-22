import React from 'react';

class PlannerForm extends React.Component{

  // uploadImage = (files) => {
  //   console.log(files[0]);
  //   const formData = new FormData()
  //   formData.append("file", files[0])
  //   formData.append("upload_preset", "ut7owp3k")
    
  //   axios.post("https://api.cloudinary.com/v1_1/dpu8e4ucu/image/upload", formData)
  //   .then( res => {
  //     console.log(`response:`, res);
  //   })
  //   .catch( err => {
  //     console.log(`error`, err);
  //   })
  // }

  state = {
    plannerName: '',
    plannerImg: '',
  }

  handleNameInput = (ev) => {

    this.setState({plannerName: ev.target.value})
  }
  
  handleImgInput = (ev) => {

    this.setState({plannerImg: ev.target.value})
  }

  handleSubmit = () => {
    console.log(`Form submitted:`, this.state.plannerName, this.state.plannerImg);
    this.props.submitForm(this.state.plannerName, this.state.plannerImg)
  }

  render(){

    return (
      <div className="planner-form">
        <h3>Create more holidays here!</h3>
        <form onSubmit={this.handleSubmit}>
          <p>Planner Name</p>
          <input type="text" onChange={this.handleNameInput} placeholder="Planner Name"/>
          <p>Image</p>
          <input type="text" onChange={this.handleImgInput} placeholder="Image URL"/>
          <br />
          
          <button>Make planner!</button>
        </form>

      </div>

    )

  }

}

export default PlannerForm