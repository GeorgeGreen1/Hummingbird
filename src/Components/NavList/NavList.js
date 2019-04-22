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
        route: "/account/becomeatutor",
        btnName: "Becoming a Tutor"
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
        route: "/account/myinfo",
        btnName: "Alpha"
    }],
    [{
        route: "/mysessions/logsession",
        btnName: "Log Session"
    },
    {
        route: "/mysessions/all-logs",
        btnName: "All Logs"
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