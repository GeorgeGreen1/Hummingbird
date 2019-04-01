import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './FindTutor.css';

// Displays information on becoming a tutor

const subjects = ["Math","Science","History","English","Spanish","Calculus","Physics","Chemistry","Biology","Music","Art"];
const levels = ["Beginner","Intermediate","Expert"]

const initState = {
    searchMode: "name",
    nameQuery: "",
    subjectQuery: "",
    levelQuery: "",
    subjectRequest: "",
    levelRequest: "",
    commentsRequest: "",
    schoolRequest: "",
    courseRequest: ""
};

class FindTutor extends Component{
    constructor(props){
        super(props);
        this.state = initState;
    }

    // componentDidMount(){
    // }

    onNameClick = () => {
        this.setState({searchMode:"name"})
    }

    onSubjLvlClick = () => {
        this.setState({searchMode:"subj-lvl"})
    }

    onAddSubjSearchChange = (event) => {
        this.setState({subjectQuery: event.target.value})
    }

    onAddSubjRequestChange = (event) => {
        this.setState({subjectRequest: event.target.value})
    }

    onAddLvlSearchChange = (event) => {
        this.setState({levelQuery: event.target.value})
    }

    onAddLvlRequestChange = (event) => {
        this.setState({levelRequest: event.target.value})
    }

    onSchoolRequestChange = (event) =>{
        this.setState({schoolRequest: event.target.value})
    }

    onCourseRequestChange = (event) =>{
        this.setState({courseRequest: event.target.value})
    }

    onCommentsRequestChange = (event) =>{
        this.setState({commentsRequest: event.target.value})
    }

    onNameChange = (event) => {
        this.setState({nameQuery: event.target.value})
    }

    onSearchClick = (event) => {
        if ((this.state.levelQuery !== "") || (this.state.subjectQuery !== "") || (this.state.nameQuery !== "")){
            fetch("http://localhost:3000/search",{
                method: 'post',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    subject: this.state.subjectQuery,
                    lvl: this.state.levelQuery,
                    name: this.state.nameQuery,
                })
            }).then( () => {
                console.log("Search query sent!")
            })
        }
    }

    onSubmitReqClick = (event) => {
        if ((this.state.levelRequest !== "") && (this.state.subjectRequest !== "")){
            fetch("http://localhost:3000/jobpost",{
                method: 'post',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    id: this.props.id,
                    school: this.state.schoolRequest,
                    course: this.state.courseRequest,
                    subject: this.state.subjectRequest,
                    lvl: this.state.levelRequest,
                    comments: this.state.commentsRequest,
                })
            }).then( () => {
                console.log("Request sent!")
            })
        }
    }

    render(){
        return (
            <div>
                {
                (this.props.signedIn && (this.props.memberType==='student')) ?
                <div>
                    <div className="fg-hum">
                        <div className="page-title"><h2 align="center"> Find Tutoring Help</h2></div>
                        <p>Here you can either search for a tutor to contact, or post a request for one to respond to.</p>
                        {/* <NameSearch nameChange={this.onNameChange}/> */}
                        {/* <div classname="tutor-search">
                            <h3>Search</h3>
                            <div className="search-input"><input type="text" className="form-control search-bar" id="name" onChange={this.onNameChange}/></div>
                            <div className="search-dropdowns">
                            <select className="subj-select" onChange={this.onAddSubjSearchChange}>
                                    <option value="">Select Subject...</option>
                                    {this.state.subjects.map(item=>{
                                        return(<option>{item}</option>)
                                        })} 
                            </select>
                            <select className="subj-select right" onChange={this.onAddLvlSearchChange}>
                                    <option value="">Select Level...</option>
                                    {this.state.subjects.map(item=>{
                                        return(<option>{item}</option>)
                                        })} 
                            </select>
                            </div>
                            <SubjectLevelSearch onAddSubjSearchChange={this.onAddSubjSearchChange} onAddLvlSearchChange={this.onAddLvlSearchChange}/> 
                        <div className="find-tutor-button"><a className="btn btn-orange btn-search" href="#" role="button" onClick={this.onSearchClick}>Search</a></div>
                        </div> */}
                        <div className="tutor-request">
                            {/* <hr/> */}
                            <h3>Post a Request</h3>
                            <label htmlFor="school">School:</label>
                            <div className="search-input" id="school"><input type="text" className="form-control request-bar" id="name" onChange={this.onSchoolRequestChange}/></div>
                            <label htmlFor="course">Course:</label>
                            <div className="search-input" id="course"><input type="text" className="form-control request-bar" id="name" onChange={this.onCourseRequestChange}/></div>
                            <select className="subj-select" onChange={this.onAddSubjRequestChange}>
                                    <option value="">Select Subject...</option>
                                    {subjects.map(item=>{
                                        return(<option>{item}</option>)
                                        })} 
                            </select>
                            <select className="subj-select right" onChange={this.onAddLvlRequestChange}>
                                    <option value="">Select Level...</option>
                                    {levels.map(item=>{
                                        return(<option>{item}</option>)
                                        })} 
                            </select>
                            <label htmlFor="comments">Comments:</label>
                            <textarea id="comments" onChange={this.onCommentsRequestChange}/> 
                            <div className="find-tutor-button"><a className="btn btn-orange btn-search" href="#" role="button" onClick={this.onSubmitReqClick}>Submit</a></div>
                        </div>
                    </div>
                </div> :
                <Redirect to="/" />}
            </div>
        );
    }
}

export default FindTutor;