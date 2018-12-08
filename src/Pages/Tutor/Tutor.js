import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar';
import tutorimage from '../../Images/people-woman-coffee-meeting.jpg';
import './Tutor.css';


// Displays information on becoming a tutor

class Tutor extends Component{
    componentDidMount(){
    }
    render(){
        return (
            <div>
            { (!this.props.signedIn) ?
            <div>
                <div className="fg-hum">
                    <div className="page-title"><h2 align="center">Become A Tutor</h2></div>
                    <div className="row">
                        <div className="col-7">
                            <p>If you wish to join our team of tutors, please follow the steps listed below:</p>
                            <div className="tutor-steps">
                            <p>1) Register an account. </p>
                            <p>2) Go to "My Account" and select "Becoming a Tutor". </p>
                            <p>3) Read the additional information and select "Apply Now". </p>
                            <p>4) Fill out and submit the application. </p>
                            </div><br/>
                            <p>Check your email in the coming days, we will contact you shortly after reviewing your application.</p>
                        </div>
                        <div className="col-5">
                          <img className="center-img" src={tutorimage} alt="tutor-image" width='420px'/>
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

export default Tutor;