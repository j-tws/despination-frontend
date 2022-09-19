import React from 'react'
import axios from 'axios'
import { Route, Link, HashRouter as Router } from 'react-router-dom';


const BASE_URL = 'http://localhost:3000'

// Component to show details about the user.

class MyProfile extends React.Component {
    state = {
        currentUser: {
            name: '',
            email: ''
        },
        planners: [],
        loading: true,
        error: null
    }

    componentDidMount(){
        let token = "Bearer " + localStorage.getItem("jwt")
        axios.get(`${BASE_URL}/users/current`, {
            headers: {
                'Authorization': token
            }
        })
        .then(res => {
            this.setState({currentUser: res.data})
        })
        .catch(err => console.warn(err))
        this.fetchUser()
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
                <h1>Helloo {this.state.currentUser.name}</h1>
                <h3>Your email is {this.state.currentUser.email}</h3>

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
                                <Link to= "/">
                                <img src={planner.image} />
                                </Link>
                                <br />
                                <h2>{planner.name}</h2>
                                
                            </div>

                        )})}
                    </div>
                }

            </div>



            </div>

        )

    }

}

export default MyProfile