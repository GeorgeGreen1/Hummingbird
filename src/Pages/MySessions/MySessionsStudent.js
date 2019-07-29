import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './MySessions.css'
import AllLogs from './AllLogs/AllLogs';


// const subjects = ["Biology","History","Mathematics","Physics","Sociology"];

const initState = {
    date: new Date(),
    subject: "",
    student_id: "",
    comments: "",
    course: "",
    hours: 0,
    past_sessions: []
};

class MySessionsStudent extends Component{
    constructor(){
        super();
        this.state = initState;
    }


    
    
    render(){
        return (
            <div>
                {
                (this.props.signedIn && (this.props.memberType==='student')) ?
                <div>
                    <div className="fg-hum">
                        <AllLogs id={this.props.id} member_type={this.props.memberType} />
                    </div>
                </div>:
                <Redirect to="/" />
                }
            </div>
        )
    }
}

export default MySessionsStudent;
