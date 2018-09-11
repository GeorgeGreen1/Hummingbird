import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './NavBar.css';
import humlogo from '../../Images/HummingbirdLogo-small.png';

class NavBar extends Component{
    render() {
        return (
            <nav className="navbar navbar-expand navbar-dark bg-orange">
                <div className="container">
                <img src={humlogo} alt='hum-logo' width={175} />
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample02">
                    <ul className="navbar-nav mr-auto">
                    <li className={"nav-item nav-main " + this.props.activeBtn[0]}>
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className={"nav-item nav-main " + this.props.activeBtn[1]}>
                        <Link className="nav-link" to="/pricing">Pricing</Link>
                    </li>
                    <li className={"nav-item nav-main " + this.props.activeBtn[2]}>
                        <Link className="nav-link" to="/tutor">Become A Tutor</Link>
                    </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                    <li className={"nav-item nav-acct "+ this.props.activeBtn[3]}>
                        <Link className="nav-link" to="/signin">Sign In</Link>
                    </li>
                    <li className={"nav-item nav-acct "+ this.props.activeBtn[4]}>
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                    </ul>

                </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;