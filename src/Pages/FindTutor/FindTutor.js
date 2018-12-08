import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import NameSearch from '../../Components/TutorSearch/NameSearch';
import SubjectLevelSearch from '../../Components/TutorSearch/SubjectLevelSearch';

// Displays information on becoming a tutor

const initState = {
    searchMode: "name",
    nameQuery: "",
    subjectQuery: "",
    levelQUery: ""
};

class FindTutor extends Component{
    constructor(props){
        super(props);
        this.state = initState;
    }

    componentDidMount(){
    }

    onNameClick = () => {
        this.setState({searchMode:"name"})
    }

    onSubjLvlClick = () => {
        this.setState({searchMode:"subj-lvl"})
    }

    onNameChange = (event) => {
        this.setState({nameQuery: event.target.value})
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
                        <div className="select-type">
                            <h4>Please select type of search:</h4>
                            <span className="type-bubble">
                            <input type="radio" name="searchtype" value="" onClick={this.onNameClick} />By Name<br />
                            </span>
                            <span className="type-bubble">
                            <input type="radio" name="searchtype" value="" onClick={this.onSubjLvlClick} />By Subject/Level<br />
                            </span>
                        </div>
                        {(this.state.searchMode === "name") ? <NameSearch nameChange={this.onNameChange}/> : <SubjectLevelSearch />}
                    </div>
                </div> :
                <Redirect to="/" />}
            </div>
        );
    }
}

export default FindTutor;