import React, {Component} from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import './DefaultHome.css';
import NavList from '../../Components/NavList/NavList'
import banner from '../../Images/banner-img.png';
import WhoWeAre from './DefaultHomeParts/WhoWeAre';
import WhyHummingbird from './DefaultHomeParts/WhyHummingbird';
import Subjects from './DefaultHomeParts/Subjects';
import Locations from './DefaultHomeParts/Locations';

class DefaultHome extends Component{
    componentDidMount(){
        this.props.onNavChange(0);
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
                            <NavList />
                        </div>
                        <div className="col-9">
                            <div className="inner-present home-page">
                                {subpage}
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <div className="container">
                        <span> Hummingbird Tutoring &copy; 2018</span>
                    </div>
                </footer>
            </div>
        );
    }
}

export default DefaultHome;