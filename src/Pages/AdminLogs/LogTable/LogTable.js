import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import "./LogTable.css"

class LogTable extends Component {
    constructor(){
        super();
        this.state = {
            tutors: [],
            page: 0,
            selectedItems: [],
            lastInd: "",
            toUser: false,
            userID: -1
        }
    }

    // Set the state data for the list of tutors upon mounting the component, must pad the tutor list to fill out the table to an equal size 
    // for each page. 
    componentDidMount(){
        let tLength = (this.props.logs.length<12) ? 12 : Math.ceil(this.props.logs.length/12)*12;
        let initTutors = this.padLogs()
        this.setState({
            tutors: initTutors,
            page: 0,
            selectedItems: this.displaySetup(0,initTutors),
            lastInd: 12})
    }
    
    // Pads the tutors array to a multiple of 12
    padLogs(){
        let mod = (this.props.logs.length<12) ? (12-this.props.logs.length): (12-this.props.logs.length%12);
        let buildArr = []
        if (mod !== 0){
            for (let i = 0;i<mod;i++){
                buildArr = buildArr.concat({
                    firstname: "",
                    lastname: "",
                    email: "",
                    subjects: ""
                })
            }
            buildArr = this.props.logs.concat(buildArr);
        }
        return buildArr;
    }

    // Grab 12 elements at a time
    displaySetup(page,list){
        const end = ( (page*12+12<list.length)?(page*12+12) : list.length )
        this.setState({lastInd: end});
        return(list.slice((page*12), end));
    }

    //Jump up 12 spots in the array
    pageUp = () => {
        const currPage = this.state.page;
        this.setState({page: (currPage+1), });
        this.setState({selectedItems: this.displaySetup(currPage+1,this.state.tutors)});
    }

    //Jump down 12 spots in the array
    pageDown = () => {
        const currPage = this.state.page;
        this.setState({page: (currPage-1) });
        this.setState({selectedItems: this.displaySetup(currPage-1,this.state.tutors)});
    }

    getSubjList = (subjects) =>{
        let subjList = []
        for (let i =0; i< subjects.length;i++){
            subjList.push(<div>
                {subjects[i].subject} - {subjects[i].level}
            </div>)
        }
        return subjList;
    }

    setSelection = (id) =>{
        if (this.state.selectedPost === id){
            this.setState({
                selectedPost: ""
            })
        }
        else{
            this.setState({
                selectedPost: id
            })
        }
    }

    render(){
        return(
            <div>
                <div>
                <table className="job-table">
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Hours</th>
                        <th>Date</th>
                        </tr>
                    </thead>
                    {this.props.logs.length > 0 && this.state.selectedItems.map((item,id)=>{
                        return (<tr className={(item.firstname!=="")?"member":""} /*onClick={()=>this.props.userRedirect(item.id)}*/>
                            <td>{item.firstname} {item.lastname}<br/></td>
                            <td>{item.hours}</td>
                            <td>{item.date}</td>
                        </tr>)
                    })}
                </table>
                <div className="control row">
                    <div className="col-6">
                      {(this.state.page > 0 )?<a className="btn btn-tableswitch" href="#" role="button" onClick={this.pageDown}>&#x25C4;</a>:"E"}
                    </div>
                    <div className="col-6">
                      {(this.state.lastInd<this.state.tutors.length)?<a className="btn btn-tableswitch right " href="#" role="button" onClick={this.pageUp}>&#x25BA;</a>:"E"}
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default LogTable;



    // this.state = {
    //     tutors: [],
    //     page: 0,
    //     selectedItems: this.displaySetup(0,this.state.tutors),
    //     lastInd: ((tutors.length >= 12)?7:tutors.length)
    // }