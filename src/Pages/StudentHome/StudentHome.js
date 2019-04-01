import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import TutorTableStudent from '../../Components/TutorTableStudent/TutorTableStudent';
import NotifTable from '../../Components/NotifTable/NotifTable';
import './StudentHome.css';

// The homepage for a signed in student account

class StudentHome extends Component{
    constructor(){
        super();
        this.state = {
            tutors: []
        };
    }
    // Retrieve the student's tutors upon mounting the component
    componentDidMount(){
        fetch("http://localhost:3000/gettutors",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                id: this.props.id
            })
        })
        .then(response=>
            response.json()
        ).then(ret => {
            let tuts = [];
            ret.map(item=>{
                tuts.push({
                    id: item.id,
                    name: item.firstname + " " + item.lastname,
                    email: item.email,
                    course: item.course
                });
            })
            this.setState({tutors: tuts})
        }
        )
    }

    render(){
        // Find out how to work with an array of objects in state
        const hours = 20;
        return (
            <div>
                {
                (this.props.signedIn && (this.props.memberType==='student')) ?
                <div>
                    <div className="fg-hum">
                        <div className="page-title"><h2 align="center">Welcome, {this.props.userName}!</h2></div>
                        <div className="row">
                            <div className="col-7">
                                <h3> My Tutors </h3>
                                {this.state.tutors.length > 0 && <TutorTableStudent tutors={this.state.tutors} />}
                            </div>
                            <div className="col-5">
                                <NotifTable id={this.props.id}/>
                                <div className="inner-present hours-display">
                                    <div className="head-display">Number of Hours Remaining:</div>
                                    <div className="hours-count"><a>{hours}</a></div>
                                    <div className="hours-labelb"><a>To add more hours, click on "Subscriptions" on the navigation bar.</a></div>
                                </div>
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

export default StudentHome;