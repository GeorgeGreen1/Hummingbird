import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import NavList from '../../Components/NavList/NavList';
import TutorAccountInfo from './TutorMyAccountParts/TutorAccountInfo';
import TutorAccountSettings from './TutorMyAccountParts/TutorAccountSettings';
import ChangePassword from '../ChangePassword/ChangePassword';
class TutorMyAccount extends Component{
    constructor(){  
        super();
    }

    render() {
        let subpage;
        if (this.props.subpage === 'myinfo'){
            subpage = <TutorAccountInfo id={this.props.id} member_type={this.props.member_type}/>
        }
        else if (this.props.subpage === 'settings'){
            subpage = <TutorAccountSettings id={this.props.id} member_type={this.props.member_type}/>
        } 
        else if (this.props.subpage === 'changepass'){
            subpage = <ChangePassword id={this.props.id}/>
        }
        return (
            <div>
                { 
                (this.props.signedIn && (this.props.member_type==='tutor')) ?
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
                </div>:
                <Redirect to="/" />
                }
            </div>
        )
    }
}

export default TutorMyAccount;