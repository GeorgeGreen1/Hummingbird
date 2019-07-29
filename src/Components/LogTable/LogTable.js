import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
class LogTable extends Component {
    constructor(){
        super();
        this.state = {
            sessions: [],
            page: "",
            selectedItems: [],
            lastInd: ""
        };
    }

    // Set the state data for the list of sessions upon mounting the component, must pad the tutor list to fill out the table to an equal size 
    // for each page. 
    componentDidMount(){
        let tLength = (this.props.sessions.length<8) ? 8 : Math.ceil(this.props.sessions.length/8)*8;
        let sessions = this.sessions()
        this.setState({
            sessions: sessions,
            page: 0,
            selectedItems: this.displaySetup(0,sessions),
            lastInd: 8})
    }
    
    // Pads the sessions array to a multiple of 8
    sessions(){
        let mod = (this.props.sessions.length<8) ? (8-this.props.sessions.length): (8-this.props.sessions.length%8);
        let buildArr = []
        if (mod !== 0){
            for (let i = 0;i<mod;i++){
                buildArr = buildArr.concat({
                    name: "",
                    subject: "",
                    email: "",
                    date: ""
                })
            }
            buildArr = this.props.sessions.concat(buildArr);
        }
        return buildArr;
    }

    // Grab 8 elements at a time
    displaySetup(page,list){
        const end = ( (page*8+8<list.length)?(page*8+8) : list.length )
        this.setState({lastInd: end});
        return(list.slice((page*8), end));
    }

    //Jump up 8 spots in the array
    pageUp = () => {
        const currPage = this.state.page;
        this.setState({page: (currPage+1), });
        this.setState({selectedItems: this.displaySetup(currPage+1,this.state.sessions)});
    }

    //Jump down 8 spots in the array
    pageDown = () => {
        const currPage = this.state.page;
        this.setState({page: (currPage-1) });
        this.setState({selectedItems: this.displaySetup(currPage-1,this.state.sessions)});
    }



    render(){
        return(
            <div>
                {
                (this.state.toUser)?
                <Redirect to={"userprofile/"+this.state.userID}/>:
                <div>
                <table>
                    <thead>
                        <tr>
                        <th>Tutor</th>
                        <th>Subject</th>
                        <th>Email</th>
                        <th>Date</th>
                        </tr>
                    </thead>
                    {this.props.sessions.length > 0 && this.state.selectedItems.map(item=>{
                        return (<tr className={(item.name!=="")?"member":""}>
                                <td><a>{(item.name==="")?<br/> : item.name}</a></td>
                                <td><a>{item.subject}</a></td>
                                <td><a>{item.email}</a></td>
                                <td><a>{item.date}</a></td>
                                </tr>)
                    })}
                </table>
                <div className="control row">
                <div className="col-6">
                    {(this.state.page > 0 )?<a className="btn btn-tableswitch" href="#" role="button" onClick={this.pageDown}>&#x25C4;</a>:null}
                </div>
                <div className="col-6">
                {(this.state.lastInd<this.state.sessions.length)?<a className="btn btn-tableswitch right " href="#" role="button" onClick={this.pageUp}>&#x25BA;</a>:null}
                </div>
                </div>
                </div>
                }
            </div>
        )
    }
}

export default LogTable;



    // this.state = {
    //     sessions: [],
    //     page: 0,
    //     selectedItems: this.displaySetup(0,this.state.sessions),
    //     lastInd: ((sessions.length >= 8)?7:sessions.length)
    // }