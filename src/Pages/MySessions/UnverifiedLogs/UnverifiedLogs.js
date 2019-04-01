import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import WeekReport from '../../../Components/WeekReport/WeekReport';

var ld = require('lodash');

// Displays information on becoming a tutor
const initState = {
    unverif_logs: []
};
class UnverifiedLogs extends Component{
    constructor(){
        super();
        this.state = initState;
    }

    componentDidMount(){
        fetch("http://localhost:3000/getunverifiedsessions",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                id: this.props.tutor_id
            })
        }).then(response=>
                response.json()
            ).then(ret => {
                const group_wk = ld.groupBy(ret,'week_of');
                var sess_week = [];
                for (var key in group_wk) {
                    if (group_wk.hasOwnProperty(key)) {
                        sess_week.push(group_wk[key]);
                    }
                }
                this.setState({
                    unverif_logs: sess_week 
                })
            })
    }

    render(){
        return (
            <div className="session-history session-block">
                <h3>Unverified Logs</h3>
                {this.state.unverif_logs.slice(0,6).map(item=>{
                            return(<WeekReport info={item}/>)
                })}
            </div>
        );
    }
}

export default UnverifiedLogs;