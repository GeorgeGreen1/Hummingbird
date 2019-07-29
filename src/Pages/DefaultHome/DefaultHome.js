import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar';
import './DefaultHome.css';
import NavList from '../../Components/NavList/NavList'
import banner from '../../Images/banner-img.png';
import WhoWeAre from './DefaultHomeParts/WhoWeAre';
import WhyTakeAction from './DefaultHomeParts/WhyTakeAction';
import Subjects from './DefaultHomeParts/Subjects';
import Locations from './DefaultHomeParts/Locations';

// What the user sees by default upon loading the web page, basic information can be accessed here

class DefaultHome extends Component{
    render(){
        const currsubpage = this.props.subpage;
        let subpage;
        if (currsubpage == 'who-we-are'){
            subpage = <WhoWeAre />
        } else if (currsubpage == 'why-take-action'){
            subpage = <WhyTakeAction />
        } else if (currsubpage == 'subjects') {
            subpage = <Subjects />
        } else if (currsubpage == 'locations') {
            subpage = <Locations />
        }
        return (
            <div>
                {
                (!this.props.signedIn) ?
                <div>
                <div className="fg-hum">
                    <div className="page-title"><h2 align="center">Welcome!</h2></div>
                    <div className="row">
                        <div className="col-3">
                            <NavList btnSet="home"/>
                        </div>
                        <div className="col-9">
                            <div className="inner-present home-page">
                                {subpage}
                            </div>
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

export default DefaultHome;