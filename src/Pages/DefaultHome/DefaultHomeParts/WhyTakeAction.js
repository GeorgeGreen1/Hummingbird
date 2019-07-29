import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import tutoringpic1 from '../../../Images/9mzqcmd.png';
import tutoringpic2 from '../../../Images/2srpgf9.png';
import tutoringpic3 from '../../../Images/Yk2stzO.png';
import './DefaultHomeParts.css';

// Lists the advantages of being a Hummingbird customer

class WhyTakeAction extends Component {
    render(){
        return (
            <div>
                 { (!this.props.signedIn) ?
                <div className='subpage-content'>
                    <h3> Why Take Action? </h3> <br/>
                    <div className="scrollbar" id="style-8">
                        <div className="force-overflow">
                            <div className="row subpage-row">
                                <div className="col-9">
                                <h4><b>K-12 Tutoring</b></h4>
                                For those who have a hard time coloring in between the lines! We offer assistance in STEM course and much more.
                                </div>
                                <div className="col-3">
                                <img src={tutoringpic1} alt="studypic1" width='160px'/>
                                </div>
                            </div>
                            <div className="row subpage-row">
                                <div className="col-9">
                                <h4><b>College Tutoring</b></h4>
                                Big lectures can be almost as intimidating as the lines outside of TA offices. Our one-on-one tutors teach at your pace, through the same steps they learned the material!
                                </div>
                                <div className="col-3">
                                <img src={tutoringpic2} alt="studypic2" width='160px'/>
                                </div>
                            </div>
                            <div className="row subpage-row">
                                <div className="col-9">
                                <h4><b>Test Preparation</b></h4>
                                Practice test booklets are great at showing you where you’re at, but they don’t show you where you want to be. Our personalized tutors have all gotten exceptionally high scores and can teach you the skills you need to manage your time, your nerves and sharpen your skills!
                                </div>
                                <div className="col-3">
                                <img src={tutoringpic3} alt="studypic3" width='160px'/>
                                </div>
                        </div>
                        </div>
                    </div>
                </div> 
                :
                <Redirect to="/" />
                }
            </div>
        );
    }
}

export default WhyTakeAction;