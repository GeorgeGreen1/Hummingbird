import React, {Component} from 'react';
import './MySessions.css'
import WeekReport from '../../Components/WeekReport/WeekReport';
import SelectStudent from './SelectStudent';
import DatePicker from 'react-date-picker';
var _ = require('lodash');

const subjects = ["Biology","History","Mathematics","Physics","Sociology"];

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

    componentDidMount(){
        fetch("http://localhost:3000/getsession",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                id: 2
            })
        }).then(response=>
                response.json()
            ).then(ret => {
                const group_wk = _.groupBy(ret,'week_of');
                var sess_week = [];
                for (var key in group_wk) {
                    if (group_wk.hasOwnProperty(key)) {
                        sess_week.push(group_wk[key]);
                    }
                }
                this.setState({
                    past_sessions: sess_week 
                })
            })
    }

    onDateChange = (date) => {
        this.setState({ date })
    }

    onStudChange = (event) => {
        this.setState({ student: parseInt(event.target.value.split(" ")[0]) })
    }
    onSubjChange = (event) => {
        this.setState({ subject: event.target.value })
    }

    onCourseChange = (event) => {
        this.setState({ course: event.target.value})
    }

    onHoursChange = (event) => {
        this.setState({ hours: event.target.value})
    }

    onCommentsChange = (event) => {
        this.setState({ comments: event.target.value })
    }

    addToQueueButton = () => {
        fetch("http://localhost:3000/addsession",{
                method: 'post',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    date: this.state.date,
                    subject: this.state.subject,
                    student_id: this.state.student,
                    tutor_id: this.props.tutor_id,
                    comments: this.state.comments,
                    course: this.state.course,
                    hours: this.state.hours,
                    verified: false
                })
        }).then( () => {
            this.setState({
                date: new Date(),
                subject: "",
                student_id: "",
                comments: "",
                course: "",
                hours: 0,
            });
        })
    }

    
    
    render(){
        return (
            <div>
                <div className='subpage-content'>
                    <div className="fg-hum">
                        <div className="page-title"><h2 align="center"> My Sessions </h2></div>
                        <div className="inner-present home-page">
                            <div className="session-entry session-block">
                                <h3>Log New Session</h3>
                                <div className="session-input">
                                    <label htmlFor="date">Date:</label>
                                    <div id="date"> 
                                    <DatePicker className="cal1" value={this.state.date} onChange={this.onDateChange}/>
                                    </div>
                                    <label htmlFor="subject">Subject:</label>
                                    <div id="subject">
                                        <select className="subject"  required="" onChange={this.onSubjChange}>
                                            <option value="">Select Subject...</option>
                                            {subjects.map(item=>{
                                            return(<option>{item}</option>)
                                            })}
                                        </select>
                                    </div>
                                    <label htmlFor="student">Student:</label>
                                    <SelectStudent id={this.props.tutor_id} onStudChange={this.onStudChange}/>
                                    <label htmlFor="course">Course:</label>
                                    <input type="text" className="form-control log" id="course" onChange={this.onCourseChange}/>
                                    <label htmlFor="hours">Hours:</label>
                                    <input type="number" className="form-control log" min="1" max="24" id="course" onChange={this.onHoursChange}/>
                                    <label htmlFor="comments">Comments:</label>
                                    <textarea id="comments" onChange={this.onCommentsChange}/> 
                                    <a className="btn btn-orange btn-add" href="#" role="button" onClick={this.addToQueueButton}>Add to Queue</a>
                                </div>
                            </div>
                            <hr/>
                            <div className="session-history session-block">
                                <h3>Past Weeks</h3>
                                {this.state.past_sessions.map(item=>{
                                            return(<WeekReport info={item}/>)
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MySessions;
