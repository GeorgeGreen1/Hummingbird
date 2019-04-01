import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import SelectStudent from '../SelectStudent';
import DatePicker from 'react-date-picker';

// Displays information on becoming a tutor


const subjects = ["Biology","History","Mathematics","Physics","Sociology"];

const initState = {
    date: new Date(),
    subject: "",
    student_id: "",
    comments: "",
    course: "",
    hours: 0
};

class LogSession extends Component{
    constructor(){
        super();
        this.state = initState;
    }

    componentDidMount(){
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
    
    render(){
        return (
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
        );
    }
}

export default LogSession;