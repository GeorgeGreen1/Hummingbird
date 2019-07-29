import React, {Component} from 'react';
// The homepage for a signed in student account

class HoursDisplay extends Component{
    constructor(){
        super();
        this.state = {
            hours: 0
        };
    }
    // Retrieve the student's tutors upon mounting the component
    componentDidMount(){
        fetch("http://localhost:3000/getmyhours",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                id: this.props.id
            })
        })
        .then(response=>
            response.json()
        ).then(ret => {
            this.setState({hours: ret})
        }
        )
    }

    render(){
        // Find out how to work with an array of objects in state
        return (
            <div className="inner-present hours-display">
            <div className="head-display">Number of Hours Remaining:</div>
            <div className="hours-count"><a>{this.state.hours}</a></div>
            <div className="hours-labelb"><a>To add more hours, click on "Add Tutoring Hours" on the navigation bar.</a></div>
        </div>
        );
    }
}

export default HoursDisplay;