import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavList from '../../Components/NavList/NavList';
import StudAccountInfo from './StudMyAccountParts/StudAccountInfo';
import StudAccountSettings from './StudMyAccountParts/StudAccountSettings';
import BecomingATutor from './StudMyAccountParts/BecomingATutor';
import TutorApply from './StudMyAccountParts/TutorApply';

class StudMyAccount extends Component{
    constructor(){  
        super();
    }

    render() {
        let subpage;
        if (this.props.subpage === 'myinfo'){
            subpage=<StudAccountInfo />
        } else if (this.props.subpage === 'settings'){
            subpage=<StudAccountSettings />
        } else if (this.props.subpage === 'becomeatutor') {
            subpage=<BecomingATutor />
        } else if (this.props.subpage === 'tutorapply') {
            subpage=<TutorApply email={this.props.email}/>
        }
        return (
            <div> 
                 <div className="fg-hum">
                    <div className="row">
                        <div className="col-3">
                            <NavList btnSet="account"/>
                        </div>
                        <div className="col-9">
                            <div className="inner-present home-page">
                                {subpage}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StudMyAccount;

