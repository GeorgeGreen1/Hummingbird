import React, {Component} from 'react';
import NavListBtn from './NavListBtn';
import {Link} from 'react-router-dom';
import './NavList.css';

class NavList extends Component {
    render() {
       let btns =  
        [{
            route: "/",
            btnName: "Who We Are"
        },
        {
            route: "/why-hummingbird",
            btnName: "Why Hummingbird?"
        },
        {
            route: "/subjects",
            btnName: "Subjects?"
        },
        {
            route: "/locations",
            btnName: "Locations"
        }];
        return (
            <div className="navigation-list">
                {btns.map(item=> {
                    return (<Link className="nav-link" to={item.route}><span className="sr-only">(current)</span><NavListBtn name={item.btnName} to="/"/></Link>)
                })}
            </div>
        );
    }
}

export default NavList;