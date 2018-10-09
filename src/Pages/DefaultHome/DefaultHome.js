import React, {Component} from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import './DefaultHome.css';
import NavList from '../../Components/NavList/NavList'
import banner from '../../Images/banner-img.png';
import WhoWeAre from './DefaultHomeParts/WhoWeAre';
import WhyHummingbird from './DefaultHomeParts/WhyHummingbird';
import Subjects from './DefaultHomeParts/Subjects';
import Locations from './DefaultHomeParts/Locations';

// What the user sees by default upon loading the web page, basic information can be accessed here

class DefaultHome extends Component{
    componentDidMount(){
    }
    render(){
        const currsubpage = this.props.subpage;
        let subpage;
        if (currsubpage == 'who-we-are'){
            subpage = <WhoWeAre />
        } else if (currsubpage == 'why-hummingbird'){
            subpage = <WhyHummingbird />
        } else if (currsubpage == 'subjects') {
            subpage = <Subjects />
        } else if (currsubpage == 'locations') {
            subpage = <Locations />
        }
        return (
            <div>
                <div className="fg-hum">
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
            </div>
        );
    }
}

export default DefaultHome;