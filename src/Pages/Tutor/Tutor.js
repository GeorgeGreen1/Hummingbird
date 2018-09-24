import React, {Component} from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import banner from '../../Images/banner-img.png';

class Tutor extends Component{
    componentDidMount(){
        this.props.onNavChange(2);
    }
    render(){
        return (
            <div>
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