import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import HomeTableStudent from '../../Components/HomeTable/HomeTableStudent';
import PageTable from '../../Components/PageTable/PageTable';
import NotifTable from '../../Components/NotifTable/NotifTable';
import HoursDisplay from '../../Components/HoursDisplay/HoursDisplay';

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
        fetch("http://localhost:3000/getmatchedtutors",{
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
                    name: item.firstname + " " + item.lastname,
                    email: item.email,
                    id: item.id
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
                                {/* {this.state.tutors.length > 0 && <HomeTableStudent tutors={this.state.tutors} />} */}
                                {this.state.tutors.length > 0 && <PageTable redirectLvl="" interactType="redirect" tableCtgs={["Name","Email"]} pageLength={12} entries={this.state.tutors} dispKeys={["name","email"]}/>}
                            </div>
                            <div className="col-5">
                                <NotifTable id={this.props.id}/>
                                <HoursDisplay id={this.props.id}/>
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