import React from 'react'
import axios from 'axios'
import './Login.css';

let BASE_URL;
if( process.env.NODE_ENV === 'development'){
  BASE_URL = 'http://localhost:3000';
} else {
  BASE_URL = 'https://despination-api-sfv0.onrender.com';
}

console.log(`process.env.NODE_EMV:`, process.env.NODE_ENV);

class Login extends React.Component {

    // The state this time needs to hold the email and password we're going to submit
    state = {
        email: '',
        password: '',
        errorMessage:''
    }

    // handle typing in the form
    // This is a function to sett he state to be whatever is being typed in the form
    // The function if set up to take an argument of an event.
    // If we then make our form fields have a name of either 'password' or email' the switch case will be able to recognize which form is being typed in and set the correct state.
    // This saves us from making a handleInputEmail and handleInputPassword function
    handleInput = (ev) => {
        switch(ev.target.name){
            case 'email':
                this.setState({email: ev.target.value})
                break;
            case 'password':
                this.setState({password: ev.target.value})
                break;
            default:
            console.log("error?");
        }

    } // handleInput

    // handle the submit of the login
    // We need to do a post request to our server and ask it to validate our details.
    // For this I'm going to show you the code and explain it below
    handleSubmit = (ev) => {
        // create a request object we can pass through to knock
        const request = {'email': this.state.email, 'password': this.state.password}

        // do an axios post request where we can send through the user details to rails and login
        axios.post(`${BASE_URL}/user_token`, {auth: request})
        .then( result => {
            localStorage.setItem("jwt", result.data.jwt)
            this.props.setCurrentUser()
            this.props.history.push('/profile')

            // console.log(result.data);
            // console.log(result.data.jwt);
        })
        .catch( err => {
            console.warn(err)
            this.setState({errorMessage:err.message})
        })
        ev.preventDefault()
    }

    // So for the basics. We create an object called request and set it to have 2 keys, email and password.
    // Each key is set to its state.

    // We also take an argument as the event and prevent default behaviour of reloading the page.
    
    // Now our axios.post request goes to the url /user_token and send through a parameter of 'auth' with our request object as its value

    // This will send through our username and password to the backend

    // If it's succcessful then we
        // 1. Set our local storage to have a json web token validating our login.
        // Local storage persists even after we close the tab or the browser. In our rails server our 'jwt' tokens are valid for 1 day so our users only need to login once a day.

        // 2. Set axios default headers to have an authorization key.
        // This makes it so any further Axios request for the current session of this app automatically send through the token in a header, without us needing to explicitly set that header in each axios request. You'll notice we are explicitly sending them through anyway, this is to show both ways you can do this.

        // 3. Call the function setCurrentUser that was passed in as a prop so we can set the current user in App.js
        // 4. Redirect the URL of the page to /my_profile so we can load the MyProfile component.


    // All we need to render is a simple form taking an email password
    render() {

        return (
            <form onSubmit={this.handleSubmit} className="login-container" >
                <label>Login Form</label>
                <br />
                <input
                    onChange={this.handleInput}
                    name="email"
                    type="email"
                    placeholder='Enter Email'
                    required //making sure field form is inserted
                />
                <br />
                <input
                    onChange={this.handleInput}
                    name="password"
                    type="password"
                    placeholder='Enter password'
                    required //making sure field form is inserted
                />
                <br />
                <button>Login</button>
                { 
                this.state.errorMessage 
                    ?
                    (
                        <p className="error-message"> Uh-oh! Incorrect input! </p>
                    )
                    :
                    (   
                        <div> </div>
                    )
                
                }


            </form>
        ) // return

    } // render

} // class Login

export default Login
