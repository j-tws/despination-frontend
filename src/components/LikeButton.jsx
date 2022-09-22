import React from "react";
import { isCompositeComponent } from "react-dom/test-utils";
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
          {this.state.currentUserLiked ? "❤️🔻" : "❤️🔺"}
        </button>

        <p>This attraction has been ❤️ {this.state.likes} times</p>

      </div>
    )

  }

}

export default LikeButton