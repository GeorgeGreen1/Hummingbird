import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import SelectStudent from '../SelectStudent';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';

// Displays information on becoming a tutor

const initState = {
    date: new Date(),
    subject: "",
    email: "",
    start_time: '12:00',
    end_time: '13:00',
    connections: []
};

class LogSession extends Component{
    constructor(){
        super();
        this.state = initState;
    }

    componentDidMount(){
        fetch("http://localhost:3000/getmystudents",{
                method: 'post',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    id: this.props.tutor_id,
                })
            }).then(response=>
                response.json()
            )
            .then( ret => {
                console.log(ret);
                this.setState({
                    connections: ret
                });
            })
    }

    addToQueueButton = () => {
        fetch("http://localhost:3000/logsession",{
                method: 'post',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    date: this.state.date,
                    subject: this.state.subject,
                    email: this.state.email,
                    tutor_id: this.props.tutor_id,
                    start_time: this.state.start_time,
                    end_time: this.state.end_time,
                })
        }).then( () => {
            this.setState(
                initState);
        })
    }

    onDateChange = (date) => {
        this.setState({ date })
    }

    onStartTimeChange = (start_time) => {
        this.setState({ start_time })
    }

    onEndTimeChange = (end_time) => {
        this.setState({ end_time })
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value.split(" ")[0] })
    }
    onSubjChange = (event) => {
        this.setState({ subject: event.target.value })
    }
    
    render(){
        console.log(this.state.email);
        return (
                <div className="session-entry session-block">
                    <h3>Log New Session</h3>
                    <div className="session-input">
                        <datalist id="connections">
                            {
                                this.state.connections.map(item=>{
                                    return (<option value={item.email+" ("+item.firstname+" "+item.lastname+")"} />)
                                })
                            }
                        </datalist>
                        <label htmlFor="date">Date:</label>
                        <div id="date"> 
                        <DatePicker className="cal1" value={this.state.date} onChange={this.onDateChange}/>
                        </div>
                        <label htmlFor="start_time">Start Time:</label>
                        <div id="start_time"> 
                        <TimePicker
                            onChange={this.onStartTimeChange}
                            value={this.state.start_time}
                        />
                        </div>
                        <label htmlFor="end_time">End Time:</label>
                        <div id="end_time"> 
                        <TimePicker
                            onChange={this.onEndTimeChange}
                            value={this.state.end_time}
                        />
                        </div>
                        <label htmlFor="student-email">Student's Email:</label>
                        <input type="text" className="form-control log" id="student-email" list="connections" onChange={this.onEmailChange}/>
                        <label htmlFor="subject">Subject:</label>
                        <input type="text" className="form-control log" id="subject" onChange={this.onSubjChange}/>
                        <a className="btn btn-orange btn-add" href="#" role="button" onClick={this.addToQueueButton}>Log Session</a>
                    </div>
                </div>
        );
    }
}

export default LogSession;