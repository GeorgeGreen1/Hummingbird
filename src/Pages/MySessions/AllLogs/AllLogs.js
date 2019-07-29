import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import WeekReport from '../../../Components/WeekReport/WeekReport';
import LogTable from '../../../Components/LogTable/LogTable';
import PageTable from '../../../Components/PageTable/PageTable';

var ld = require('lodash');

// Displays information on becoming a tutor
class AllLogs extends Component{
    constructor(){
        super();
        this.state = {
            sessions: []
        };
    }

    // Retrieve the student's tutors upon mounting the component
    componentDidMount(){
        fetch("http://localhost:3000/getpastsessions",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                member_type: this.props.member_type,
                id: this.props.id
            })
        })
        .then(response=>
            response.json()
        ).then(ret => {
            console.log(ret);
            let sesh = [];
            ret.map(item=>{
                sesh.push({
                    date: item.date,
                    name: item.firstname + " " + item.lastname,
                    subject: item.subject,
                    email: item.email
                });
            })
            this.setState({sessions: sesh})
        }
        )
    }

    //Jump up 8 spots in the array
    pageUp = () => {
        const currPage = this.state.page;
        this.setState({page: (currPage+1), });
    }

    //Jump down 8 spots in the array
    pageDown = () => {
        const currPage = this.state.page;
        this.setState({page: (currPage-1) });
    }

    render(){
        return (
            <div>
                <div className="session-history session-block">
                    <h3>All Past Logs</h3>
                    {this.state.sessions.length > 0 && <PageTable redirectLvl="" interactType="none" tableCtgs={["Name","Email","Date"]} pageLength={10} entries={this.state.sessions} dispKeys={["name","email","date"]}/>}
                {/* {(this.state.page > 0 )?<a className="btn btn-tableswitch" href="#" role="button" onClick={this.pageDown}>&#x25C4;</a>:null}
                {(((this.state.page*10)+10)<this.state.all_weeks.length)?<a className="btn btn-tableswitch right " href="#" role="button" onClick={this.pageUp}>&#x25BA;</a>:null} */}
                </div>
            </div>
        );
    }
}

export default AllLogs;