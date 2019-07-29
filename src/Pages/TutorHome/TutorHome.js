import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar';
import PageTable from '../../Components/PageTable/PageTable';
import NotifTable from '../../Components/NotifTable/NotifTable';
import banner from '../../Images/banner-img.png';
// import './StudentHome.css';

// The homepage for a signed in student account

class TutorHome extends Component{

    constructor(){
        super();
        this.state = {
            students: []
        };
    }
    // Retrieve the tutor's students upon mounting the component
    componentDidMount(){
        fetch("http://localhost:3000/getmatchedstudents",{
            method: 'post',
            headers: {'Content-Type' : 'application/json',
                      'Authorization' : `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify({
                id: this.props.id
            })
        })
        .then(response=>
            response.json()
        ).then(ret => {
            console.log(ret);
            let stus = [];
            ret.map(item=>{
                stus.push({
                    name: item.firstname + " " + item.lastname,
                    email: item.email,
                    id: item.id 
                });
            })
            this.setState({students: stus})
        }
        )
    }
    render(){
        
        const hours = 20;

        return (
            <div>
                {
                (this.props.signedIn && (this.props.memberType==='tutor')) ?
                <div>
                    <div className="fg-hum">
                        <div className="page-title"><h2 align="center">Welcome, {this.props.userName}!</h2></div>
                        <div className="row">
                            <div className="col-7">
                                <h3> My Students </h3>
                                {this.state.students.length > 0 && <PageTable redirectLvl="" interactType="redirect" tableCtgs={["Name","Email"]} pageLength={12} entries={this.state.students} dispKeys={["name","email"]}/>}
                            </div>
                            <div className="col-5">
                                <NotifTable id={this.props.id}/>
                                {/* <div className="inner-present hours-display">
                                    <div className="hours-labela"><a>Number of Daquons remaining:</a></div>
                                    <div className="hours-count"><a>10</a></div>
                                    <div className="hours-labelb"><a>To add more hours, click on "Subscriptions" on the navigation bar.</a></div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>:
                <Redirect to="/" />
                }
            </div>
        );
    }
}

export default TutorHome;