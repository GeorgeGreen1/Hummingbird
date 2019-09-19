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
            sessions: []
        };
    }
    // Retrieve the student's tutors upon mounting the component
    componentDidMount(){
        fetch("http://localhost:3000/getrecentsessions",{
            method: 'get',
            headers: {'Content-Type' : 'application/json'},
        }).then(response=>
                response.json()
            ).then(ret => {
                this.setState({sessions: ret});
                console.log(this.state.sessions);
            })
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
                                {this.state.sessions.length && <PageTable redirectLvl="" pageLength={12} tableCtgs={["Name","Date"]} entries={this.state.sessions} dispKeys={["name","date"]}/>}
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