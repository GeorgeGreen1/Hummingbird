import React, {Component} from 'react';
import './DefaultHomeParts.css';
import mathscience from '../../../Images/MathScience.png';
import historybook from '../../../Images/HistoryBook.png';
import paintbrush from '../../../Images/PaintBrush.png';

class Subjects extends Component {
    render(){
        return (
            <div className='subpage-content'>
                <h3> Available Subjects </h3> <br/>
                <div class="scrollbar" id="style-8">
				<div class="force-overflow">
                <div className="row subpage-row">
                    <div className="col-8">
                    <h4><b>Math and Science</b></h4>
                    Math and science can be some of the trickiest courses. There are plenty of students who struggle with it and we have tutors that are ready to make the lives of these students easier.
                    </div>
                    <div className="col-4">
                    <img src={mathscience} alt="studypic1" width='125px'/>
                    </div>
                </div>
                <div className="row subpage-row">
                    <div className="col-8">
                    <h4><b>History</b></h4>
                    From the days of Cleopatra to the moon landing, our tutors have expertise on every era in human and natural history.
                    </div>
                    <div className="col-4">
                    <img src={historybook} alt="studypic2" width='125px'/>
                    </div>
                </div>
                <div className="row subpage-row">
                    <div className="col-8">
                    <h4><b>Art and Music</b></h4>
                    The tutors here will help you unleash your creative potential in the artistic fields!
                    </div>
                    <div className="col-4">
                    <img src={paintbrush} alt="studypic3" width='125px'/>
                    </div>
                </div>
                </div>
			</div>
            </div> 
        );
    }
}

export default Subjects;