import React, {Component} from 'react';
import NavListBtn from './NavListBtn';
import {Link} from 'react-router-dom';
import './NavList.css';

// Allows a user to navigate to multiple sub-sections of a page
const btns =  
[
    [{
        route: "/",
        btnName: "Who We Are"
    },
    {
        route: "/why-take-action",
        btnName: "Why Take Action?"
    },
    {
        route: "/subjects",
        btnName: "Subjects"
    },
    {
        route: "/locations",
        btnName: "Locations"
    }],
    [{
        route: "/account/myinfo",
        btnName: "My Info"
    },
    {
        route: "/account/settings",
        btnName: "Settings"
    },
    {
        route: "/account/changepass",
        btnName: "Change Password"
    }],
    [{
        route: "/account/myinfo",
        btnName: "My Info"
    },
    {
        route: "/account/settings",
        btnName: "Settings"
    },
    {
        route: "/account/changepass",
        btnName: "Change Password"
    }],
    [{
        route: "/mysessions/logsession",
        btnName: "Log Session"
    },
    {
        route: "/mysessions/all-logs",
        btnName: "All Logs"
    }],
    [{
        route: "/adminsearch/adminalluserssearch",
        btnName: "Search All Users"
    },
    {
        route: "/adminsearch/admintutorsubject",
        btnName: "Find Tutors By Subject"
    }]
]
;
class NavList extends Component {
    render() {
        let btnList;
        if (this.props.btnSet === "home"){
            btnList = btns[0];
        }
        else if (this.props.btnSet === "account"){
            btnList = btns[1];
        }
        else if (this.props.btnSet === "tutor"){
            btnList = btns[2];
        }
        else if (this.props.btnSet === "logs"){
            btnList = btns[3];
        }
        else if (this.props.btnSet === "adminsearch"){
            btnList = btns[4];
        }

        return (
            <div className="navigation-list">
                {btnList.map(item=> {
                    return (<Link className="nav-link" to={item.route}><span className="sr-only">(current)</span><NavListBtn name={item.btnName} to="/"/></Link>)
                })}
            </div>
        );
    }
}

export default NavList;