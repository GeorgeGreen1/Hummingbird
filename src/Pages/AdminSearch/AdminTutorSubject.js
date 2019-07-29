import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import PageTable from '../../Components/PageTable/PageTable';

const levels = ["Elementary","Middle School","High School","College"]
const initState = {
    subject: "",
    level: -1,
    results: [],
    subjects: []
};

class AdminTutorSubject extends Component{
    constructor(){
        super();
        this.state = initState;
    }

    componentDidMount(){
        fetch("http://localhost:3000/getallsubj",{
            method: 'get',
            headers: {'Content-Type' : 'application/json'},
        })
        .then(response => 
            response.json()
        ).then(ret=>{
            const subjList = [];
            ret.map(item => {
                subjList.push(item.name)
            })
            this.setState({subjects: subjList})
        })
    }

    onSearchButton = () => {
        this.setState({results:[]});
        fetch("http://localhost:3000/admintutorsearch",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                subject: this.state.subject,
                level: this.state.level,
            })
        }).then(response=>
                response.json()
        ).then(entries=>{
            this.setState({results:entries});
        })
    }

    onSubjChange = (event) => {
        this.setState({ subject: event.target.value })
    }

    onLvlChange = (event) => {
        this.setState({
            level: levels.indexOf(event.target.value)
        });
    }
    
    render(){
        return (
            <div>
                <div className='subpage-content'>
                    <div className="inner-present home-page">
                        <h3>Tutor Search by Expertise</h3>
                        <div className="querybox">
                            <div className="row">
                                <div className="col-3">
                                    <label htmlFor="subject">Subject:</label>
                                    <select onChange={this.onSubjChange} id="subject">
                                        <option value="">Select Subject...</option>
                                        {this.state.subjects.map(item=>{
                                            return(<option>{item}</option>)
                                            })} 
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label htmlFor="level">Level:</label>
                                    <select onChange={this.onLvlChange} id="level">
                                        <option value="">Select Subject...</option>
                                        {levels.map(item=>{
                                            return(<option>{item}</option>)
                                            })} 
                                    </select>
                                </div>
                                <div className="col-3">
                                  <br/>
                                   <a id="search" className="btn btn-orange btn-search" href="#" role="button" onClick={this.onSearchButton} >Search</a><br/>
                                   </div>
                                </div>
                        </div>
                        <div>
                            {this.state.results.length > 0 && <PageTable redirectLvl="../" interactType="redirect" tableCtgs={["Name","Email"]} pageLength={12} entries={this.state.results} dispKeys={["name","email"]}/>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminTutorSubject;
