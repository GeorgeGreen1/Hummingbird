import React, {Component} from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import banner from '../../Images/banner-img.png';
import AccountType from '../../Components/Register/AccountType';

const initState = {
    email: "",
    name: "",
    password: "",
    passwordRepeat: "",
    invalidEmail: "",
    invalidName: "",
    invalidPassword: "",
    invalidPassMatch: ""
};

class Register extends Component{
    constructor(props){
        super(props);
        this.state = initState;
      }

    componentDidMount(){
        this.props.onNavChange(6);
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    };    
    
    onNameChange = (event) => {
        this.setState({name: event.target.value})
    };

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    };

    onPasswordRepeatChange = (event) => {
        this.setState({passwordRepeat: event.target.value});
    };

    accountTypeChange = (val) => {
        if (val == 0){
            this.setState({selectedAccType : "student"});
        } else {
            this.setState({selectedAccType : "tutor"});
        }
    }

    onRegisterClick = (event) =>{
        let valid = true;
        // Email validity
        if (this.state.email == ""){
            this.setState({invalidEmail : "active"});
            valid = false;
        } else if (this.state.invalidEmail === "active"){
            this.setState({invalidEmail : ""});
        }
        // Name validity
        if (this.state.name == ""){
            this.setState({invalidName : "active"});
            valid = false;
        } else if (this.state.invalidName === "active"){
            this.setState({invalidName : ""});
        }
        // Password validity
        if (this.state.password == ""){
            this.setState({invalidPassword : "active"});
            valid = false;
        } else if (this.state.invalidPassword === "active"){
            this.setState({invalidPassword : ""});
        }
        // Password match validity
        if (this.state.password !== this.state.passwordRepeat){
            this.setState({invalidPassMatch : "active"});
            valid = false;
        } else if (this.state.InvalidPassMatch === "active"){
            this.setState({invalidPassMatch : ""});
        }
        console.log(this.state.name)
        // Send registration request to server
        if (valid){
            fetch("http://localhost:3000/register",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                username: this.state.name,
                password: this.state.password,
            })
            }).then(response => 
                response.json()).then(ret => console.log(ret));
        }
    }
    render(){
        return (
            <div>
                <div className="fg-hum">
                   <div className="inner-present login-page">
                        <h3 align="center"> Register </h3>
                        <div className="entry-prompt">
                            <label for="email">E-mail:</label>
                            <input type="text" class="form-control" id="email" onChange={this.onEmailChange} />
                            <div className={"invalid-entry " + this.state.invalidEmail}>Please enter a valid email address!</div>
                        </div>
                        <div className="entry-prompt">
                            <label for="fullname">Full name (First name Last name):</label>
                            <input type="text" class="form-control" id="fullname" onChange={this.onNameChange}/>
                            <div className={"invalid-entry " + this.state.invalidName}>Please enter a valid given name!</div>
                        </div>
                        <div className="entry-prompt">
                            <label for="password">Password:</label>
                            <input type="password" class="form-control" id="password" onChange={this.onPasswordChange}/>
                            <div className={"invalid-entry " + this.state.invalidPassword}>Please enter a valid password!</div>
                        </div>
                        <div className="entry-prompt">
                            <label for="repeat-password">Repeat Password:</label>
                            <input type="password" class="form-control" id="repeat-password" onChange={this.onPasswordRepeatChange}/>
                            <div className={"invalid-entry " + this.state.invalidPassMatch}>Please enter matching passwords!</div>
                            <a className="btn btn-orange btn-signin" href="#" role="button" onClick={this.onRegisterClick}>Register</a>
                        </div>
                    </div>
                </div>
                <footer class="footer">
                    <div class="container">
                        <span> Hummingbird Tutoring &copy; 2018</span>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Register;