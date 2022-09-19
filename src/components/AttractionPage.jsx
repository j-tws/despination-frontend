import React from 'react';
import axios from 'axios';
import { Route, HashRouter as Router, Link } from 'react-router-dom'

const BASE_URL = 'http://localhost:3000'

class AttractionPage extends React.Component {

  state = {

  }

  componentDidMount(){

  }

  getAttractionDetails = async (id) => {
    
    try {
      const res = await axios.get
    }


  }

  render(){
      
    return(
        <div>testing123</div>
    )
  }

}

export default AttractionPage