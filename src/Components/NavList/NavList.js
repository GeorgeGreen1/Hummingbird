import React, {Component} from 'react';
import NavListBtn from './NavListBtn';
import {Link} from 'react-router-dom';
import './NavList.css';

class NavList extends Component {
    render() {
        return (
            <div className="navigation-list">
                <Link className="nav-link" to="/"><span className="sr-only">(current)</span><NavListBtn name="Who We Are" to="/"/></Link>
                <Link className="nav-link" to="/why-hummingbird"><span className="sr-only">(current)</span><NavListBtn name="Why Hummingbird?" to="/"/></Link>
                <Link className="nav-link" to="/subjects"><span className="sr-only">(current)</span><NavListBtn name="Subjects" to="/"/></Link>
                <Link className="nav-link" to="/locations"><span className="sr-only">(current)</span><NavListBtn name="Locations" to="/"/></Link>
            </div>
        );
    }
}

export default NavList;