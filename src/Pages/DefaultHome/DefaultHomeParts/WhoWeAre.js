import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import studypic from '../../../Images/qvmESjM.png';
import einstein from '../../../Images/Albert_Einstein_Head.jpg';
import './DefaultHomeParts.css';

// The aims and background of the company

class WhoWeAre extends Component {
    render(){
        return (
            <div>
            { (!this.props.signedIn) ?
            <div className='subpage-content'>
                <h3> Who We Are </h3>
                <div className="row">
                    <div className="col-sm">
                        <img src={studypic} alt="studying" width='400px'/>
                    </div>
                    <div className="col-sm-4">
                    <img src={einstein} alt="einstein" width='150px'/> <br/>
                    "I struggled in school too!"
                    </div>
                </div>
                <div>
                <b>Local Minneapolis / Saint Paul tutors:</b> 952-666-9153
                <br/>
                School can be a social battleground, and when you start slipping behind in school,
                it’s easy to just give up, but you don’t have to go at it alone. At Take Action Tutoring we hire local tutors that have 
                gone to your schools, taught your classes, and been in your shoes! Getting into the right school or just getting through 
                school has never been more competitive which is exactly why one-on-one help is needed for those of us who need more attention 
                then a large classroom can provide. <br/> <u>Call or text now to set up an appointment!</u>
                </div>
            </div> :
            <Redirect to="/" />
            }
            </div>
        );
    }
}

export default WhoWeAre;