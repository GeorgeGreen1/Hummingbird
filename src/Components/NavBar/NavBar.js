import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './NavBar.css';
import humlogo from '../../Images/HummingbirdLogo-small.png';

class NavBar extends Component{
    render() {
        // Items displayed on the left side of the nav bar
        let barItems = [
            {
                title: "Home",
                listClass: "nav-item nav-main " + ((this.props.activeBtn===0)?"active":""),
                route: "/"
            },
            (this.props.signedIn)?
                {}:{
                    title: "Pricing",
                    listClass: "nav-item nav-main " + ((this.props.activeBtn===1)?"active":""),
                    route: "/pricing"
                },
            (this.props.signedIn)?
                {}:{
                    title: "Become A Tutor ",
                    listClass: "nav-item nav-main " + ((this.props.activeBtn===2)?"active":""),
                    route: "/tutor"
                },
            (this.props.signedIn)?
                {
                    title: "Find a Tutor",
                    listClass: "nav-item nav-main " + ((this.props.activeBtn===3)?"active":""),
                    route: "/tutor"
                }:{},
            (this.props.signedIn)?
                {
                    title: "Purchase Tutoring Hours",
                    listClass: "nav-item nav-main " + ((this.props.activeBtn===4)?"active":""),
                    route: "/purchasehours"
                }:{}
        ].filter(item=>{return (item.route !== undefined)})
        // Items displayed on the right side of the nav bar
        let acctBarItems = [
            (this.props.signedIn)?
            {}:{
                title: "Sign In",
                listClass: "nav-item nav-acct " + ((this.props.activeBtn===5)?"active":""),
                route: "/signin",
                onClick: {}
            },
            (this.props.signedIn)?
            {}:{
                title: "Register",
                listClass: "nav-item nav-acct " + ((this.props.activeBtn===6)?"active":""),
                route: "/register",
                onClick: {}
            },
            (this.props.signedIn)?
            {
                title: "My Account",
                listClass: "nav-item nav-acct " + ((this.props.activeBtn===7)?"active":""),
                route: "/",
                onClick: () => {}
            }:{},
            (this.props.signedIn)?
            {
                title: "Sign Out",
                listClass: "nav-item nav-acct",
                route: "/signin",
                onClick: () => this.props.onSignOut()
            }:{}
        ]
        // let displayItems = barItems.filter(item=>{return (item.route !== undefined)})
        return (
            <nav className="navbar navbar-expand navbar-dark bg-orange">
                <div className="container">
                <img src={humlogo} alt='hum-logo' width={175} />
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample02">
                    <ul className="navbar-nav mr-auto">
                    {barItems.map(item=>{
                        return(<li className={item.listClass}>
                                <Link className="nav-link" to={item.route}>{item.title} <span className="sr-only">(current)</span></Link>
                              </li>)
                    })}
                    </ul>
                    <ul className="navbar-nav ml-auto">
                    {acctBarItems.map(item=>{

                        return((item.route!==undefined)?(<li className={item.listClass}>
                                 <Link className="nav-link" to={item.route} onClick={item.onClick}>{item.title} <span className="sr-only">(current)</span></Link>
                              </li>) : null)
                    })}
                    </ul>

                </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;