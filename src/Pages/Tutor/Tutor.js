import React, {Component} from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import banner from '../../Images/banner-img.png';

class Tutor extends Component{
    render(){
        return (
            <div className="container">
                <img src={banner} alt="banner" width='100%'/>
                <NavBar activeBtn={["","","active","",""]}/>
                <div className="fg-hum">
                    <h2> Become A Tutor </h2>
                    <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut animi aperiam dicta, sequi vel praesentium!
                         Voluptas dolore, dicta eveniet reprehenderit, culpa quas minus ad nostrum soluta voluptatem quidem 
                         consequuntur laudantium.</p>
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

export default Tutor;