import React, {Component} from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import banner from '../../Images/banner-img.png';
import AccountType from '../../Components/Register/AccountType';

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedAccType: 0
        };
      }

    accountTypeChange = (val) => {
        this.setState({selectedAccType : val})
        console.log(this.state.selectedAccType);
    }
    render(){
        return (
            <div className="container">
                <img src={banner} alt="banner" width='100%'/>
                <NavBar activeBtn={["","","","","active"]}/>
                <div className="fg-hum">
                   <div className="inner-present login-page">
                        <h3 align="center"> Register </h3>
                        <div className="entry-prompt">
                            <label for="email">E-mail Address:</label>
                            <input type="text" class="form-control" id="email" />
                        </div>
                        <div className="entry-prompt">
                            <label for="username">Username:</label>
                            <input type="text" class="form-control" id="username" />
                        </div>
                        <div className="entry-prompt">
                            <label for="password">Password:</label>
                            <input type="text" class="form-control" id="password"/>
                        </div>
                        <div className="entry-prompt">
                            <label for="repeat-password">Repeat Password:</label>
                            <input type="text" class="form-control" id="repeat-password"/>
                            <a>I want to be a: </a>
                            <AccountType change={this.accountTypeChange} accType={this.state.selectedAccType} />
                            <a className="btn btn-orange btn-signin" href="#" role="button">Register</a>
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