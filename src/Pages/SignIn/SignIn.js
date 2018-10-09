import React, {Component} from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import banner from '../../Images/banner-img.png';
import './SignIn.css';
import {Redirect} from 'react-router-dom';

// The user sign in page. Sends a request to a server to retrieve user data and approve access

const initState = {
    enter_email: "",
    enter_password: "",
    enter_invalidEmail: "",
    enter_invalidPassword: ""
}

class SignIn extends Component{
    constructor(){
        super();
        this.state = initState
    }

    componentDidMount(){
    }

    // Changes the Username state 
    onUsernameChange = (event) => {
        this.setState({enter_username: event.target.value})
    };

    // Changes the Password state
    onPasswordChange = (event) => {
        this.setState({enter_password: event.target.value});
    };
    

    // First checks the validity of the user input, then sends a request to the database
    
    onSignInButton  = () => {
        let valid = true;
        // Username validity
        if (this.state.enter_username === ""){
            this.setState({enter_invalidUsername : "active"})
            valid = false;
        } else if (this.state.enter_invalidUsername === "active"){
            this.setState({enter_invalidUsername : ""})
        }
        // Password validity
        if (this.state.enter_password === ""){
            this.setState({enter_invalidPassword : "active"})
            valid = false;
        } else if (this.state.invalidPassword === "active"){
            this.setState({enter_invalidPassword : ""})
        }
        fetch("http://localhost:3000/signin",{
                method: 'post',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                  email: this.state.enter_username,
                  password: this.state.enter_password
                })
        }).then(res => res.json()).then(ret => {
            this.props.onSign(true,ret.email,ret.firstname,ret.member_type);
        }
        );
    }
    render(){
        return (
            <div>
            {   (!this.props.signedIn) ?
                <div>
                <div>
                <div className="fg-hum">
                    <div className="inner-present login-page">
                        <h3 align="center"> Sign In </h3>
                        <div className="entry-prompt">
                            <label for="email">Email:</label>
                            <input type="text" class="form-control" id="email" onChange={this.onUsernameChange}/>
                            <div className={"invalid-entry " + this.state.enter_invalidUsername}>Please enter a valid username!</div>
                        </div>
                        <div className="entry-prompt">
                            <label for="password">Password:</label>
                            <input type="password" class="form-control" id="password" onChange={this.onPasswordChange}/>
                            <div className={"invalid-entry " + this.state.enter_invalidPassword}>Please enter a valid password!</div>
                            <a class="btn btn-orange btn-signin" href="#" role="button" onClick={this.onSignInButton}>Sign In</a>
                        </div>
                    </div>
                </div>
                </div>
                <footer class="footer">
                    <div class="container">
                        <span> Hummingbird Tutoring &copy; 2018</span>
                    </div>
                </footer> </div> :
                <Redirect to="/" />
            }
            </div>
        );
    }
}

export default SignIn;