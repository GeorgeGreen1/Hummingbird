import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import UserResults from '../../Components/UserResults/UserResults';
const initState = {
    firstname: "",
    lastname: "",
    search_id: -1,
    results: []
};

class AdminUserSearch extends Component{
    constructor(){
        super();
        this.state = initState;
    }

    onSearchButton = () => {
        this.setState({results:[]});
        fetch("http://localhost:3000/usersearch",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                id: this.state.search_id
            })
        }).then(response=>
                response.json()
        ).then(entries=>{
            this.setState({results:entries});
        })
    }

    onFirstNameChange = (event) => {
        this.setState({ firstname: event.target.value })
    }

    onLastNameChange = (event) => {
        this.setState({ lastname: event.target.value })
    }

    onIDChange = (event) => {
        this.setState({ search_id: (event.target.value !== "")?event.target.value:-1 })
    }

    render(){
        return (
            <div>
                <div className='subpage-content'>
                    <div className="inner-present home-page">
                        <h3>Search All Users</h3>
                        <div className="querybox">
                            <div className="row">
                                <div className="col-3">
                                    <label htmlFor="firstname">First Name:</label>
                                    <input type="text"  className="form-control" id="firstname" onChange={this.onFirstNameChange}/>
                                </div>
                                <div className="col-3">
                                    <label htmlFor="lastname">Last Name:</label>
                                    <input type="text" className="form-control" id="lastname" onChange={this.onLastNameChange}/>
                                </div>
                                <div className="col-3">
                                <label htmlFor="id">ID:</label>
                                <input type="text"  className="form-control" id="id" onChange={this.onIDChange}/>
                                </div>
                                <div className="col-3">
                                <br/>
                                <a className="btn btn-orange btn-search" href="#" role="button" onClick={this.onSearchButton} >Search</a><br/>
                                </div>
                            </div>
                        </div>
                        <div>
                            {this.state.results.length > 0 && <UserResults users={this.state.results}/>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminUserSearch;
