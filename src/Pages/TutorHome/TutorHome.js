import React, {Component} from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import TutorTable from '../../Components/TutorTable/TutorTable';
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
                <div className="fg-hum">
                    <h2> Welcome, {this.props.userName}! </h2>
                    <div className="row">
                        <div className="col-7">
                            <h3> My Students </h3>
                            <TutorTable />
                        </div>
                        <div className="col-5">
                            {/* <div className="inner-present hours-display">
                                <div className="hours-labela"><a>Number of Daquons remaining:</a></div>
                                <div className="hours-count"><a>10</a></div>
                                <div className="hours-labelb"><a>To add more hours, click on "Subscriptions" on the navigation bar.</a></div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TutorHome;