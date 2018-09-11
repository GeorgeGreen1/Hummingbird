import React, {Component} from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import './Home.css';
import NavList from '../../Components/NavList/NavList'
import banner from '../../Images/banner-img.png';
import WhoWeAre from './HomeParts/WhoWeAre';
import WhyHummingbird from './HomeParts/WhyHummingbird';
import Subjects from './HomeParts/Subjects';
import Locations from './HomeParts/Locations';

class Home extends Component{

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
            <div className="container">
                <img className="home-banner" src={banner} alt="banner" width='100%'/>
                <NavBar activeBtn={["active","","","",""]}/>
                <div className="fg-hum">
                    <div class="row">
                        <div class="col-3">
                            <NavList />
                        </div>
                        <div class="col-9">
                            <div class="inner-present home-page">
                                {subpage}
                            </div>
                        </div>
                    </div>
                </div>
                <footer class="footer">
                    <div class="container">
                        <span> Hummingbird Tutoring &copy; 2018</span>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Home;