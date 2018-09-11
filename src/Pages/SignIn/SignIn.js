import React, {Component} from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import banner from '../../Images/banner-img.png';

class SignIn extends Component{
    render(){
        return (
            <div className="container">
                <img src={banner} alt="banner" width='100%'/>
                <NavBar activeBtn={["","","","active",""]}/>
                <div className="fg-hum">
                    <div className="inner-present login-page">
                        <h3 align="center"> Sign In </h3>
                        <div className="entry-prompt">
                            <label for="username">Username:</label>
                            <input type="text" class="form-control" id="username" />
                        </div>
                        <div className="entry-prompt">
                            <label for="password">Password:</label>
                            <input type="text" class="form-control" id="password"/>
                            <a class="btn btn-orange btn-signin" href="#" role="button">Sign In</a>
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

export default SignIn;