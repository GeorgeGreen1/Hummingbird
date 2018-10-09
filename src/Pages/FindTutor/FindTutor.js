import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar';
import banner from '../../Images/banner-img.png';


// Displays information on becoming a tutor

class FindTutor extends Component{
    componentDidMount(){
    }
    render(){
        return (
            <div>
                {
                (this.props.signedIn) ?
                <div>
                    <div className="fg-hum">
                        <h2> Find A Tutor </h2>
                        <p> i think its hilarious u kids talking shit about harden. u wouldnt say this shit to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol</p>
                    </div>
                    <footer class="footer">
                        <div class="container">
                            <span> Hummingbird Tutoring &copy; 2018</span>
                        </div>
                    </footer>
                </div> :
                <Redirect to="/" />}
            </div>
        );
    }
}

export default FindTutor;