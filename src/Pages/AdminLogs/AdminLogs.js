import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
// import WeekReport from '../../../Components/WeekReport/WeekReport';
import LogTable from './LogTable/LogTable'

var ld = require('lodash');

// Displays information on becoming a tutor
const initState = {
    verif_logs: [],
    toUser: false,
    id: -1
};
class AdminLogs extends Component{
    constructor(){
        super();
        this.state = initState;
    }

    componentDidMount(){
        fetch("http://localhost:3000/getallverifiedsessions",{
            method: 'get',
            headers: {'Content-Type' : 'application/json'},
        }).then(response=>
                response.json()
            ).then(ret => {
                console.log(ret)
                this.setState({
                    verif_logs: ret
                })
            })
    }

    userRedirect = (val) =>{
        this.setState({
            toUser: true,
            id: val
        })
    }



    render(){
        return (
            <div>
                {
                    (this.props.signedIn && (this.props.memberType==='admin')) ?
                <div>
                    {
                    (this.state.toUser)?
                    <Redirect to={"tutorlogs/"+this.state.id}/>:
                    <div className="fg-hum">
                        <div className="session-history session-block">
                        <div className="page-title"><h2 align="center">Logged Sessions</h2></div>
                            {this.state.verif_logs.length > 0 && <LogTable logs={this.state.verif_logs} userRedirect={this.userRedirect}/>}
                        </div>
                    </div>
                    }
                </div>: 
                 <Redirect to="/" />
                }
            </div>
        );
    }
}

export default AdminLogs;