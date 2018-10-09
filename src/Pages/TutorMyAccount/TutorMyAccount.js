import React, {Component} from 'react';
import NavList from '../../Components/NavList/NavList';
import TutorAccountInfo from './TutorMyAccountParts/TutorAccountInfo';
import TutorAccountSettings from './TutorMyAccountParts/TutorAccountSettings';
class TutorMyAccount extends Component{
    constructor(){  
        super();
    }

    render() {
        let subpage;
        if (this.props.subpage === 'myinfo'){
            subpage = <TutorAccountInfo />
        }
        else if (this.props.subpage === 'settings'){
            subpage = <TutorAccountSettings />
        } 
        return (
            <div> 
                 <div className="fg-hum">
                    <div className="row">
                        <div className="col-3">
                            <NavList btnSet="tutor"/>
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

export default TutorMyAccount;