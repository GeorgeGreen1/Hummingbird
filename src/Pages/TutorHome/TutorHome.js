import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar';
import NotifTable from '../../Components/NotifTable/NotifTable';
import banner from '../../Images/banner-img.png';
// import './StudentHome.css';

// The homepage for a signed in student account

class TutorHome extends Component{
    componentDidMount(){
        this.props.onNavChange(0);
    }
    render(){
        
        const hours = 20;

        return (
            <div>
                {
                (this.props.signedIn && (this.props.memberType==='tutor')) ?
                <div>
                    <div className="fg-hum">
                        <div className="page-title"><h2 align="center">Welcome, {this.props.userName}!</h2></div>
                        <div className="row">
                            <div className="col-7">
                                <h3> My Students </h3>
                                {/* <TutorTable /> */}
                            </div>
                            <div className="col-5">
                                <NotifTable id={this.props.id}/>
                                {/* <div className="inner-present hours-display">
                                    <div className="hours-labela"><a>Number of Daquons remaining:</a></div>
                                    <div className="hours-count"><a>10</a></div>
                                    <div className="hours-labelb"><a>To add more hours, click on "Subscriptions" on the navigation bar.</a></div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>:
                <Redirect to="/" />
                }
            </div>
        );
    }
}

export default TutorHome;