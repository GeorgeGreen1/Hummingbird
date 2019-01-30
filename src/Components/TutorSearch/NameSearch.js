import React, {Component} from 'react';
import './TutorSearch.css';

// Search for Tutor by name

class NameSearch extends Component{

    clicky = () => {
        console.log("OOH BARI");
    }

    render(){
        return (
            <div className="name-search">
                    <div className="name-entry">
                        {/* <label htmlFor="name">Enter Tutor Name (First and/or Last):</label> */}
                        <span className="search-input search-bar"><input type="text" className="form-control" id="name" onChange={this.props.nameChange}/></span>
                        {/* <span className="search-input"><a className="btn btn-orange btn-search" href="#" role="button" onClick={this.clicky}>Search</a></span> */}
                        <br/>
                    </div>
            </div>
        );
    }
}

export default NameSearch;