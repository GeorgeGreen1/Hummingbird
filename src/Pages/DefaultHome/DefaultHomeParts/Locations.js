import React, {Component} from 'react';
import './DefaultHomeParts.css';
import mplsstpaul from '../../../Images/mplsstpaul.png';

class Subjects extends Component {
    render(){
        return (
            <div className='subpage-content'>
                <h3> Locations </h3>
                <div className="subpage-center">
                    <img src={mplsstpaul} alt="skylines" height='212px'/>
                </div>
                Hummingbird is available in school districts all across the Minneapolis-St. Paul metropolitan area. If you wish to connect with a tutor remotely, please
                discuss with them your preferred means of communication and the resources needed for study material to be exchanged.
            </div>
        );
    }
}

export default Subjects;