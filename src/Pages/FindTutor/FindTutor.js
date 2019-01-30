import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './TutorSearch.css';

// Displays information on becoming a tutor

const initState = {
    searchMode: "name",
    nameQuery: "",
    subjectQuery: "",
    levelQuery: "",
    subjects: ["Harder","Better","Faster","Stronger"]
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

    onAddSubjChange = (event) => {
        this.setState({subjectQuery: event.target.value})
    }

    onAddLvlChange = (event) => {
        this.setState({levelQuery: event.target.value})
    }

    onNameChange = (event) => {
        this.setState({nameQuery: event.target.value})
    }

    onSearchClick = (event) => {
        if ((this.state.levelQuery === "") || (this.state.subjectQuery === "") || (this.state.nameQuery === "")){
            fetch("http://localhost:3000/search",{
                method: 'post',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    lvl: this.state.levelQuery,
                    subject: this.state.subjectQuery,
                    name: this.state.nameQuery,
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
    }

    render(){
        return (
            <div>
                {
                (this.props.signedIn) ?
                <div>
                    <div className="fg-hum">
                        <div className="page-title"><h2 align="center"> Find A Tutor</h2></div>
                        <p>Here is where you can search for tutors to contact. You can enter a query using either a specific name or a subject and level.</p>
                        {/* <NameSearch nameChange={this.onNameChange}/> */}
                        <div className="search-input"><input type="text" className="form-control search-bar" id="name" onChange={this.onNameChange}/></div>
                        <div className="search-dropdowns">
                        <select className="subj-select" onChange={this.onAddSubjChange}>
                                <option value="">Select Subject...</option>
                                {this.state.subjects.map(item=>{
                                    return(<option>{item}</option>)
                                    })} 
                            </select>
                        <select className="subj-select right" onChange={this.onAddLvlChange}>
                                <option value="">Select Level...</option>
                                {this.state.subjects.map(item=>{
                                    return(<option>{item}</option>)
                                    })} 
                            </select>
                        </div>
                        {/* <SubjectLevelSearch onAddSubjChange={this.onAddSubjChange} onAddLvlChange={this.onAddLvlChange}/> */}
                        <div className="find-tutor-button"><a className="btn btn-orange btn-search" href="#" role="button" onClick={this.onSearchClick}>Search</a></div>
                    </div>
                </div> :
                <Redirect to="/" />}
            </div>
        );
    }
}

export default FindTutor;