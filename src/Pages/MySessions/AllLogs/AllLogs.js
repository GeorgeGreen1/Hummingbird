import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import WeekReport from '../../../Components/WeekReport/WeekReport';

var ld = require('lodash');

// Displays information on becoming a tutor
const initState = {
    all_weeks: [],
    page: 0
};
class AllLogs extends Component{
    constructor(){
        super();
        this.state = initState;
    }

    componentDidMount(){
        fetch("http://localhost:3000/getallsessions",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                id: this.props.tutor_id
            })
        }).then(response=>
                response.json()
            ).then(ret => {
                const group_wk = ld.groupBy(ret,'week_of');
                var sess_week = [];
                for (var key in group_wk) {
                    if (group_wk.hasOwnProperty(key)) {
                        sess_week.push(group_wk[key]);
                    }
                }
                this.setState({
                    all_weeks: sess_week,
                    page: 0,
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

    render(){
        return (
            <div>
                <div className="session-history session-block">
                    <h3>All Past Logs</h3>
                    {this.state.all_weeks.slice(this.state.page*10,(this.state.page*10)+10).map(item=>{
                                return(<WeekReport info={item}/>)
                    })}
                {(this.state.page > 0 )?<a className="btn btn-tableswitch" href="#" role="button" onClick={this.pageDown}>&#x25C4;</a>:null}
                {(((this.state.page*10)+10)<this.state.all_weeks.length)?<a className="btn btn-tableswitch right " href="#" role="button" onClick={this.pageUp}>&#x25BA;</a>:null}
                </div>
            </div>
        );
    }
}

export default AllLogs;