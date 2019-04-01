import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import WeekReport from '../../Components/WeekReport/WeekReport';
import './TutorLogs.css';

var ld = require('lodash');

// Displays information on becoming a tutor
const initState = {
    all_weeks: [],
    page: 0,
    tutorName: "",
    redirect: false
};
class TutorLogs extends Component{
    constructor(){
        super();
        this.state = initState;
    }

    componentDidMount(){
        fetch("http://localhost:3000/getuserverifiedsessions",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                id: this.props.match.params.id
            })
        }).then(response=>
                response.json()
            ).then(ret => {
                const group_wk = ld.groupBy(ret.sessions,'week_of');
                var sess_week = [];
                for (var key in group_wk) {
                    if (group_wk.hasOwnProperty(key)) {
                        sess_week.push(group_wk[key]);
                    }
                }
                this.setState({
                    all_weeks: sess_week,
                    page: 0,
                    tutorName: ret.name
                })
            })
    }
    
    //Jump up 8 spots in the array
    pageUp = () => {
        const currPage = this.state.page;
        this.setState({page: (currPage+1), });
    }

    //Jump down 8 spots in the array
    pageDown = () => {
        const currPage = this.state.page;
        this.setState({page: (currPage-1) });
    }
    
    goToProfile = () => {
        this.setState({
            redirect: true
        })
    }

    render(){
        return (
                <div>
                    {
                    (this.props.signedIn && (this.props.memberType==='admin')) ?
                    <div>
                        { (this.state.redirect)?
                        <Redirect to={"../userprofile/"+this.props.match.params.id}/>
                        :
                        <div className="fg-hum">
                            <div>
                                <div className="session-history session-block">
                                <div className="page-title"><h2 align="center">{this.state.tutorName}</h2></div>
                                <div className="profile-link"><a className="btn btn-orange btn-account" href="#" role="button" onClick={this.goToProfile}>View Profile</a></div>
                                {this.state.all_weeks.slice(this.state.page*10,(this.state.page*10)+10).map(item=>{
                                                return(<WeekReport info={item}/>)
                                    })}
                                {(this.state.page > 0 )?<a className="btn btn-tableswitch" href="#" role="button" onClick={this.pageDown}>&#x25C4;</a>:null}
                                {(((this.state.page*10)+10)<this.state.all_weeks.length)?<a className="btn btn-tableswitch right " href="#" role="button" onClick={this.pageUp}>&#x25BA;</a>:null}
                                </div>
                            </div>
                        </div>
                    }
                    </div>:
                    <Redirect to="/" />
                    }
                </div>
        );
    }
}

export default TutorLogs;