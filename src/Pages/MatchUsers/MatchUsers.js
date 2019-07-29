import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

const initState = {
    student_id: "",
    tutor_id: "",
    invalidStudent: "",
    invalidTutor: ""    
};

class MatchUsers extends Component{
    constructor(){
        super();
        this.state = initState;
    }
    
    
    onSetStudent = (event) => {
        this.setState({
            student_id: event.target.value
        })
    }
    
    onSetTutor = (event) => {
        this.setState({
            tutor_id: event.target.value
        })
    }

    onMatchClick = () => {
        let valid = true;
        if (this.state.student_id === ""){
            this.setState({
                invalidStudent: "active"
            })  
            valid = false;
        } else if (this.state.invalidStudent === "active"){
            this.setState({
                invalidStudent: ""
            })
        }
        
        if (this.state.tutor_id === ""){
            this.setState({
                invalidTutor: "active"
            })
            valid = false;  
        } else if (this.state.invalidTutor === "active"){
            this.setState({
                invalidTutor: ""
            })
        }
        if (valid){
            fetch("http://localhost:3000/registermatch",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                tutor_id: this.state.tutor_id,
                student_id: this.state.student_id,
            })
            }).then(response => 
                response.json()).then(ret => {
                    if (ret === "invalid"){
                        this.setState({invalidRegInfo: "active"})
                    }
                });
        }

    }

    render(){
        return (
            <div>
                {
                (this.props.signedIn && (this.props.memberType==='admin')) ?
                <div>
                    <div className="fg-hum">
                        <div className="page-title"><h2 align="center">Match Users</h2>
                            <div className="row">
                                    <div className="col-6 matchentry">
                                            <label htmlFor="student">Student ID:</label>
                                            <input type="text" className="form-control" id="student" onChange={this.onSetStudent} />
                                            <div className={"invalid-entry "+this.state.invalidStudent}>Please enter a valid Student ID!</div>
                                        </div>
                                    <div className="col-6 matchentry">
                                            <label htmlFor="tutor">Tutor ID:</label>
                                            <input type="text" className="form-control" id="tutor" onChange={this.onSetTutor} />
                                            <div className={"invalid-entry "+this.state.invalidTutor}>Please enter a valid Tutor ID!</div>
                                    </div>
                            </div>
                            <a className="btn btn-orange btn-block" href="#" role="button" onClick={this.onMatchClick}>Register</a><br/>
                            <div className={"invalid-entry " + this.state.invalidRegInfo}>Invalid Registration Info. Please try a different email!</div>
                        </div>
                    </div>
                </div>:
                <Redirect to="/" />
                }
            </div>
        )
    }
}

export default MatchUsers;
