import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './NavBar.css';
import humlogo from '../../Images/HummingbirdLogo.png';

class NavBar extends Component{
    render() {
        // Items displayed on the left side of the nav bar
        let barItems = [
            {
                title: "Home",
                listClass: "nav-item nav-main " + ((this.props.activeBtn===0)?"active":""),
                route: "/",
                id: 0
            },
            (this.props.signedIn)?(
                (this.props.member_type === 'tutor')?
                {
                    title: "My Sessions",
                    listClass: "nav-item nav-main " + ((this.props.activeBtn===1)?"active":""),
                    route: "/mysessions",
                    id: 1
                }
                :
                {
                    title: "Find a Tutor",
                    listClass: "nav-item nav-main " + ((this.props.activeBtn===1)?"active":""),
                    route: "/findtutor",
                    id: 1
                }):{
                        title: "Pricing",
                    listClass: "nav-item nav-main " + ((this.props.activeBtn===1)?"active":""),
                    route: "/pricing",
                    id: 1
                },
            (this.props.signedIn)?(
                (this.props.member_type === 'tutor')?
                // {
                //     title: "Log Hours",
                //     listClass: "nav-item nav-main " + ((this.props.activeBtn===3)?"active":""),
                //     route: "/findtutor"
                // }
                {
                    title: "",
                    listClass: "",
                    route: "",
                    id: 0
                }
                :
                {
                    title: "Add Tutoring Hours",
                    listClass: "nav-item nav-main " + ((this.props.activeBtn===2)?"active":""),
                    route: "/addhours",
                    id: 2
                }):{
                    title: "Become A Tutor ",
                    listClass: "nav-item nav-main " + ((this.props.activeBtn===2)?"active":""),
                    route: "/tutor",
                    id: 2
                },
        ].filter(item=>{return (item.route !== undefined)})
        // Items displayed on the right side of the nav bar
        let acctBarItems = [
            (this.props.signedIn)?
            {
                title: "My Account",
                listClass: "nav-item nav-acct " + ((this.props.activeBtn===3)?"active":""),
                route: "/account/myinfo",
                onClick: ()=>{this.props.onNavChange(3)}
            }:{
                title: "Sign In",
                listClass: "nav-item nav-acct " + ((this.props.activeBtn===3)?"active":""),
                route: "/signin",
                onClick: ()=>{
                    this.props.onNavChange(3)}
            },
            (this.props.signedIn)?
            {
                title: "Sign Out",
                listClass: "nav-item nav-acct",
                route: "/signin",
                onClick: ()=>{this.props.onSign(false,"","");
                                this.props.onNavChange(0)}
            }:{
                title: "Register",
                listClass: "nav-item nav-acct " + ((this.props.activeBtn===4)?"active":""),
                route: "/register",
                onClick: ()=>{this.props.onNavChange(4)}
            }
        ]
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
                                <Link className="nav-link" to={item.route} onClick={() => this.props.onNavChange(item.id)}>{item.title} <span className="sr-only">(current)</span></Link>
                              </li>)
                    })}
                    </ul>
                    <ul className="navbar-nav ml-auto">
                    {acctBarItems.map(item=>{

                        return((item.route!==undefined)?(<li className={item.listClass}>
                                 <Link className="nav-link" to={item.route} onClick={item.onClick} >{item.title} <span className="sr-only">(current)</span></Link>
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