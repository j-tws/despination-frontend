import React from "react";
// import Heart from "react-animated-heart"
import axios from "axios";
import './LikeButton.css'
const BASE_URL = 'http://localhost:3000'
class LikeButton extends React.Component {

  state = {
    likes: this.props.usersThatLiked.length,
    currentUserLiked: false
  }

  componentDidMount(){
    this.setState({
      // Check if current user has already liked it
      currentUserLiked: this.checkCurrentUserLiked(this.props.userId, this.props.usersThatLiked)
    })
  }

  handleLikeEvent = async () => {
    // console.log('like button clicked!')
    // console.log('attraction selected', this.props.attractionId)
    // console.log('userId selected', this.props.userId)
    
    try {
      const res = await axios.post(
        `${BASE_URL}/attractions/${this.props.attractionId}/likes`,
        {user_id:this.props.userId})
        console.log(res.data.users.length)
        this.setState({
          likes: res.data.users.length,
          currentUserLiked: this.checkCurrentUserLiked(this.props.userId, res.data.users)
        })
    } catch( err ){
      console.log(`LikeButton: `, err)
      this.setState({ error: err})
    }
  }
  
  // helper function
  checkCurrentUserLiked (userID, arrayOfUsersThatLiked) {
    const arrayOfUserIDs = arrayOfUsersThatLiked.map(user => user.id)
    // [{id: 123, name: Bob, email: ...}, {id: 124, name: Carl, email: ...}] =>
    // [123,124]
    return arrayOfUserIDs.includes(userID)
  }

  render() {



    return (
      <div>
        <button className="like-button" onClick={this.handleLikeEvent}>
          {this.state.currentUserLiked ? 
          <input type="image" className="like-button-image"src="https://res.cloudinary.com/dwmvmdhlu/image/upload/v1663822054/DesPination/grey_button_dzmbvr.png" alt="button to like"/>
          : 
          <input type="image" className="like-button" src="https://res.cloudinary.com/dwmvmdhlu/image/upload/v1663822054/DesPination/red_button_kr35z2.png" alt="button to remove like"/>}
        </button>

        <p>This attraction has been 
        <input type="image" className="like-button-status" src="https://res.cloudinary.com/dwmvmdhlu/image/upload/v1663822647/DesPination/like_bar_w4ew35.jpg" alt="like status"/>  
        {this.state.likes} times</p>

      </div>
    )

  }

}

export default LikeButton