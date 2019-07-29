import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import NavList from '../../Components/NavList/NavList';
import AdminUserSearch from './AdminUserSearch';
import AdminTutorSubject from './AdminTutorSubject';

const initState = {
    date: new Date(),
    subject: "",
    student_id: "",
    comments: "",
    course: "",
    hours: 0,
    past_sessions: []
};

class AdminSearch extends Component{
    constructor(){
        super();
        this.state = initState;
    }

    
    render(){
        return (
            <div>
                {
                (this.props.signedIn && (this.props.memberType==='admin')) ?
                <div>
                    <div className="fg-hum">
                        <div className="page-title"><h2 align="center">Search Users</h2></div>
                        <div className= "row">
                            <div className='col-3'>
                                <NavList btnSet="adminsearch"/>
                            </div>
                            <div className='col-9'>
                             {
                                 (this.props.subpage === "usersearch")?
                                    <AdminUserSearch />:
                                    <AdminTutorSubject />
                             }
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

export default AdminSearch;
