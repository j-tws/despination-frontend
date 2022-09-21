import React, { useState } from "react";
import Heart from "react-animated-heart"
// import Heart from 'react-animated-heart';

class LikeButton extends React.Component {

  render() {


    return (

    <div className="App">
      <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
        

    </div>
    )

  }

}

export default LikeButton