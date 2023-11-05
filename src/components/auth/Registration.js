import React, { Component } from 'react';
// import React from 'react'; // why it cant be this?
import axios from 'axios';
import './Registration.css';

let BASE_URL;
if( process.env.NODE_ENV === 'development'){
  BASE_URL = 'http://localhost:3000';
} else {
  BASE_URL = 'https://despination-api-sfv0.onrender.com';
}


export default class Registration extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            registrationErrors: null
        }
        // A placeholder for handleSubmit
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }





    handleChange(event) {
        this.setState({
            // getting the name from the input section below and set the value dynamically
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {

        console.log("Form submitted")
        // data has to be passed into as an object to be updated in the backend
        axios.post(`${BASE_URL}/users`, {
            user: {
                name: this.state.name,
                email: this.state.email.toLowerCase(),
                password: this.state.password
            }
        },
            // { withCredentials: true }
            // tell API that's ok to set that cookie on our client
            // or else it would look like the user is not logged in
        ).then(res => {
            console.log("registration response", res.data);
            this.props.history.push(`/login`)
        }).catch(error => {
            console.log("registration error", error);
            this.setState({registrationErrors: error.response.data.error})
        })


        // to prevent form  try to behave like a HTML form
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="registration-container">
                    <label>Sign Up Form</label>
                    <br />
                    <input
                        type="name"
                        name="name"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required //making sure field form is inserted
                    />
                    <br />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />
                    <br />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />
                    <br />

                    <p>{this.state.registrationErrors}</p>

                    <button type="submit"> Register </button>

                </form>
            </div>
        )
    }

}