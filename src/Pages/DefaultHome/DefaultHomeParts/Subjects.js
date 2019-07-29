import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './DefaultHomeParts.css';
import mathscience from '../../../Images/MathScience.png';
import historybook from '../../../Images/HistoryBook.png';
import paintbrush from '../../../Images/PaintBrush.png';

// Lists some of the available subjects from tutors

class Subjects extends Component {
    render(){
        return (
            <div>
            { (!this.props.signedIn) ?
            <div className='subpage-content'>
                <h3> Available Subjects </h3> <br/>
                <div className="scrollbar" id="style-8">
				<div className="force-overflow">
                <div className="row subpage-row">
                    <div className="col-9">
                    <h4><b>Math and Science</b></h4>
                    Math and science can be some of the trickiest courses. There are plenty of students who struggle with it and we have tutors that are ready to make the lives of these students easier.
                    </div>
                    <div className="col-3">
                    <img src={mathscience} alt="studypic1" width='125px'/>
                    </div>
                </div>
                <div className="row subpage-row">
                    <div className="col-9">
                    <h4><b>History</b></h4>
                    From the days of Cleopatra to the moon landing, our tutors have expertise on every era in human and natural history.
                    </div>
                    <div className="col-3">
                    <img src={historybook} alt="studypic2" width='125px'/>
                    </div>
                </div>
                <div className="row subpage-row">
                    <div className="col-9">
                    <h4><b>Art and Music</b></h4>
                    The tutors here will help you unleash your creative potential in the artistic fields!
                    </div>
                    <div className="col-3">
                    <img src={paintbrush} alt="studypic3" width='125px'/>
                    </div>
                </div>
                </div>
			</div>
            </div>:
            <Redirect to="/" />
            }
            </div> 
        );
    }
}

export default Subjects;