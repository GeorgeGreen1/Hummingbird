import React, {Component} from 'react';
import './WeekReport.css';

class WeekReport extends Component{
    constructor(){
        super();
        this.state = {
            verify_set: false
        }
    }


    //Week calculator, determine week of the year based on the date. 

    verify = () =>{
        const wk = new Date(this.props.info[0]['week_of'])
        fetch("http://localhost:3000/verify",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                week:  wk
            })
        }).then(response=>
            response.json()
        ).then(ret => {
            console.log(ret);
        })
    }

    verifyT = () =>{
        this.setState({verify_set: true});
    }

    verifyF = () =>{
        this.setState({verify_set: false});
    }

    render() {
        const week_date = new Date(this.props.info[0]['week_of']);
        const verf = this.props.info[0]['verified']
        console.log(verf);
        return (
            <div className="week-report">
                <h4>Week of {week_date.getMonth()+1}/{week_date.getDate()}/{week_date.getFullYear()}</h4>
                <table>
                <thead>
                    <tr>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Hours</th>
                    </tr>
                </thead>
                {this.props.info.map(item=>{
                    const sess_date = new Date(item.date)
                    return (
                        <tr>
                            <td>{item.lastname}, {item.firstname}</td>
                            <td>{item.course}</td>
                            <td>{item.subject}</td>
                            <td>{sess_date.getMonth()+1}/{sess_date.getDate()}/{sess_date.getFullYear()}</td>
                            <td>{item.hours}</td>
                        </tr>
                    )
                })}
            </table>
            {(this.state.verify_set && !verf) ? <div className="verf-label">Continue verifying?</div>:null}
            {(this.state.verify_set && !verf) ? <div className="desp"> <a className="btn btn-orange btn-verif verif-cc" href="#" role="button" onClick={this.verify}>Continue</a> <a className="btn btn-orange btn-verif verif-cc" href="#" role="button" onClick={this.verifyF}>Cancel</a></div>: null}
            {(!this.state.verify_set && !verf) ? <a className="btn btn-orange btn-verif" href="#" role="button" onClick={this.verifyT}>Verify</a>:null}
            </div>
        )
    }
}

export default WeekReport;