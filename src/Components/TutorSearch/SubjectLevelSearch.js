import React, {Component} from 'react';
import './TutorSearch.css';

// Search for Tutor by subject or level

const initState = {
    subjects: ["Harder","Better","Faster","Stronger"]
};

class SubjectLevelSearch extends Component{
    constructor(props){
        super(props);
        this.state = initState;
    }

    clicky = () => {
        console.log("OOH BARI");
    }

    render(){
        return (
            <div className="subj-level-search">
                    <div className="name-entry">
                        {/* <label htmlFor="name">Enter Tutor Name (First and/or Last):</label> */}
                        <span className="search-input search-dropdown">
                        <select className="subj-select" onChange={this.onAddSubjChange}>
                                <option value="">Select Subject...</option>
                                {this.state.subjects.map(item=>{
                                    return(<option>{item}</option>)
                                    })} 
                            </select>
                        </span>
                        <span className="search-input search-dropdown">
                        <select className="subj-select" onChange={this.onAddSubjChange}>
                                <option value="">Select Level...</option>
                                {this.state.subjects.map(item=>{
                                    return(<option>{item}</option>)
                                    })} 
                            </select>
                        </span>
                        <span className="name-input"><a className="btn btn-orange btn-search" href="#" role="button" onClick={this.clicky}>Search</a></span>
                        <br/>
                    </div>
            </div>
        );
    }
}

export default SubjectLevelSearch;