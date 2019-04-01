import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './MySessions.css'
import NavList from '../../Components/NavList/NavList';
import LogSession from './LogSession/LogSession';
import UnverifiedLogs from './UnverifiedLogs/UnverifiedLogs';
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

class MySessions extends Component{
    constructor(){
        super();
        this.state = initState;
    }


    
    
    render(){
        return (
            <div>
                {
                (this.props.signedIn && (this.props.memberType==='tutor')) ?
                <div>
                    <div className="fg-hum">
                        <div className= "row">
                        <div className='col-3'>
                            <NavList btnSet="logs"/>
                        </div>
                        <div className='col-9'>
                        <div className='subpage-content'>
                            {/* <div className="f-hum"> */}
                                <div className="inner-present home-page">
                                    {(this.props.subpage==="logsession")?
                                    <LogSession tutor_id={this.props.tutor_id}/>:(
                                        (this.props.subpage==="unverifiedlogs")?
                                            <UnverifiedLogs />:<AllLogs />
                                    )}
                            </div>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>:
                <Redirect to="/" />
                }
            </div>
        )
    }
}

export default MySessions;
