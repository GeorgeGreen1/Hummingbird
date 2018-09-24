import React, {Component} from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import TutorTable from '../../Components/TutorTable/TutorTable';
import banner from '../../Images/banner-img.png';
import './StudentHome.css';

class StudentHome extends Component{
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
                            <TutorTable />
                        </div>
                        <div className="col-5">
                            <div className="inner-present hours-display">
                                <div className="hours-labela"><a>Number of hours remaining:</a></div>
                                <div className="hours-count"><a>{hours}</a></div>
                                <div className="hours-labelb"><a>To add more hours, click on "Subscriptions" on the navigation bar.</a></div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer class="footer">
                    <div className="container">
                        <span> Hummingbird Tutoring &copy; 2018</span>
                    </div>
                </footer>
            </div>
        );
    }
}

export default StudentHome;