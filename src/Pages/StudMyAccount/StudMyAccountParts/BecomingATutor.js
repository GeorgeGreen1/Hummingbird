import React, {Component} from 'react';
import './StudMyAccountParts.css';
import {Link} from 'react-router-dom';

// The available locations

class BecomingATutor extends Component {
    render(){
        return (
            <div className='subpage-content'>
                <h3>Becoming A Tutor</h3>
                <div className="descrip">
                <a> If you're interested in becoming a tutor, you must fill out the application, providing all of the correct necessary information. 
                    We will review your application and contact you to inform you if we are interested in setting up an interview.
                </a>
                </div>
                <Link className="nav-link" to="/account/becomeatutor/apply"><span className="sr-only">(current)</span><a class="btn btn-orange applybutton" href="#" role="button" >Apply</a></Link>
            </div>
        );
    }
}

export default BecomingATutor;