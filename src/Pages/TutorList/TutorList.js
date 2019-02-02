import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

// Displays information on becoming a tutor

const initState = {
    searchMode: "name",
    nameQuery: "",
    subjectQuery: "",
    levelQuery: "",
    subjects: ["Harder","Better","Faster","Stronger"]
};

class TutorList extends Component{
    constructor(props){
        super(props);
        this.state = initState;
    }

    componentDidMount(){
        fetch("http://localhost:3000/getalltutors",{
            method: 'get',
            headers: {'Content-Type' : 'application/json'},
        })
        .then(response=>
            response.json()
        ).then(ret => {
            let tuts = [];
            ret.map(item=>{
                tuts.push({
                    firstname: item.firstname,
                    lastname: item.lastname,
                    email: item.email
                });
            })
            this.setState({tutors: tuts})
        }
        )
    }
    render(){
        return (
            <div>
                Hi Frank
            </div>
        );
    }
}

export default TutorList;