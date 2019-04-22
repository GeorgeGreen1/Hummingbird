import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

// The user sign in page. Sends a request to a server to retrieve user data and approve access

const initState = {
    enter_email: "",
    enter_password: "",
    enter_invalidEmail: "",
    enter_invalidPassword: "",
    enter_invalidInfo: ""
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
            if (ret === "Invalid Entry"){
                this.setState({enter_invalidInfo:"active"})
            }else{
                this.props.onSign(true,ret.email,ret.firstname,ret.member_type,ret.id);
            }
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
                    <div className="page-title"><h2 align="center">Sign In</h2></div>
                    <div className="inner-present login-page">
                        <div className="entry-prompt">
                            <label htmlFor="email">Email:</label>
                            <input type="text" className="form-control" id="email" onChange={this.onUsernameChange}/>
                            <div className={"invalid-entry " + this.state.enter_invalidUsername}>Please enter a valid username!</div>
                        </div>
                        <div className="entry-prompt">
                            <label htmlFor="password">Password:</label>
                            <input type="password" className="form-control" id="password" onChange={this.onPasswordChange}/>
                            <div className={"invalid-entry " + this.state.enter_invalidPassword}>Please enter a valid password!</div>
                            <a className="btn btn-orange btn-block" href="#" role="button" onClick={this.onSignInButton}>Sign In</a> <br/>
                            <div className={"invalid-entry " + this.state.enter_invalidInfo}>Invalid credentials! Please check the info you entered.</div>
                        </div>
                    </div>
                </div>
                </div>
                </div> :
                <Redirect to="/" />
            }
            </div>
        );
    }
}

export default SignIn;