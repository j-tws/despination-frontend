import React from 'react'
import axios from 'axios'
import { Route, Link, HashRouter as Router } from 'react-router-dom';

const BASE_URL = 'http://localhost:3000'

class UserPage extends React.Component{
    state = {
    currentUser: undefined,
    planners: [],
    loading: true,
    error: null
    }

    componentDidMount(){
        this.fetchUser(7)
    }

    fetchUser = async (userID) => {
        try{
            const res = await axios.get(`${BASE_URL}/users/${userID}`);
            console.log('response:', res.data)
            this.setState({
                loading: false,
                planners: res.data.planners
            })

        } catch (err){
            console.error('Error loading from API', err)
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.loading
                    ?
                    <p>
                    Loading.....
                    </p>
                    :
                    <div>
                        {this.state.planners.map(planner => { return(
                            <div key={planner.id}>
                                <Link to= "/planner">
                                <img src={planner.image} />
                                </Link>
                                <br />
                                <h2>{planner.name}</h2>
                                
                            </div>

                        )})}
                    </div>
                }



            </div>
        )
    }

    
}


export default UserPage