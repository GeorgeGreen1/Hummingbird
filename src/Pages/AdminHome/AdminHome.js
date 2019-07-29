import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import NotifTable from '../../Components/NotifTable/NotifTable';
import PageTable from '../../Components/PageTable/PageTable';
import './AdminHome.css';

// The homepage for a signed in student account

class AdminHome extends Component{
    constructor(){
        super();
        this.state = {
            tutors: []
        };
    }
    // Retrieve the student's tutors upon mounting the component
    componentDidMount(){
    }

    render(){
        // Find out how to work with an array of objects in state
        const hours = 20;
        return (
            <div>
                {
                (this.props.signedIn && (this.props.memberType==='admin')) ?
                <div>
                    <div className="fg-hum">
                        <div className="page-title"><h2 align="center">Welcome, {this.props.userName}!</h2></div>
                        <div className="row">
                            <div className="col-7">
                                <PageTable redirectLvl="" pageLength={12} tableCtgs={["A","B","C"]} entries={[{"alpha":1,"delta":2,"bravo":3}]} dispKeys={["alpha","delta","bravo"]}/>
                            </div>
                            <div className="col-5">
                                <NotifTable id={this.props.id}/>
                                <div className="inner-present hours-display">
                                    <div className="head-display">Number of sessions logged this week:</div>
                                    <div className="hours-count"><a>{hours}</a></div>
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

export default AdminHome;