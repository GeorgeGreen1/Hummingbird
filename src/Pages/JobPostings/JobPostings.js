import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import JobTable from '../../Components/JobTable/JobTable';

// Displays information on becoming a tutor

const initState = {
    searchMode: "name",
    nameQuery: "",
    subjectQuery: "",
    levelQuery: "",
    postings: []
};

class JobPostings extends Component{
    constructor(props){
        super(props);
        this.state = initState;
    }

    componentDidMount(){
        fetch("http://localhost:3000/getpostings",{
            method: 'get',
            headers: {'Content-Type' : 'application/json'},
        })
        .then(response=>
            response.json()
        ).then(ret => {
            let postings = [];
            ret.map(item=>{
                let dt = new Date(item.date)
                console.log(dt);
                postings.push({
                    id: item.user_id,
                    name: item.stud_name,
                    subject: item.subject + " - "+ item.level,
                    course: item.course,
                    school: item.school,
                    comments: item.comments,
                    date: (dt.getMonth()+1) + "-" + dt.getDate() + "-" + dt.getFullYear()
                });
            })
            this.setState({postings: postings})
        }
        )
    }
    render(){
        return (
            <div>
            { (this.props.signedIn && (this.props.memberType==='admin')) ?
            <div>
                <div className="fg-hum">
                    <div className="page-title"><h2 align="center">Job Postings</h2></div>
                    {this.state.postings.length > 0 && <JobTable postings={this.state.postings} />}
                </div>
            </div> : 
            <Redirect to="/" />}
            </div>
        );
    }
}

export default JobPostings;