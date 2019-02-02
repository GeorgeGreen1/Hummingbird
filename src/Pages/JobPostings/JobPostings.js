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

class AdminLogs extends Component{
    constructor(props){
        super(props);
        this.state = initState;
    }
    render(){
        return (
            <div>
                Hi Peter
            </div>
        );
    }
}

export default AdminLogs;