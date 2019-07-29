import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
class UserResults extends Component {
    constructor(){
        super();
        this.state = {
            users: [],
            page: 0,
            selectedItems: [],
            lastInd: null,
            toUser: false,
            userID: -1
        }
    }

    // Set the state data for the list of tutors upon mounting the component, must pad the tutor list to fill out the table to an equal size 
    // for each page. 
    componentDidMount(){
        console.log("mount");
        let tLength = (this.props.users.length<8) ? 8 : Math.ceil(this.props.users.length/8)*8;
        let initUsers = this.padUsers()
        this.setState({
            users: initUsers,
            page: 0,
            selectedItems: this.displaySetup(0,initUsers),
            lastInd: 8})
    }    
    
    // Pads the users array to a multiple of 8
    padUsers(){
        let mod = (this.props.users.length<8) ? (8-this.props.users.length): (8-this.props.users.length%8);
        let buildArr = []
        if (mod !== 0){
            for (let i = 0;i<mod;i++){
                buildArr = buildArr.concat({
                    firstname: "",
                    lastname: "",
                    email: "",
                    id: "",
                })
            }
            buildArr = this.props.users.concat(buildArr);
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
        this.setState({selectedItems: this.displaySetup(currPage+1,this.state.users)});
    }

    //Jump down 8 spots in the array
    pageDown = () => {
        const currPage = this.state.page;
        this.setState({page: (currPage-1) });
        this.setState({selectedItems: this.displaySetup(currPage-1,this.state.users)});
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

    render(){
        return(
            <div>
                {
                (this.state.toUser)?
                <Redirect to={"userprofile/"+this.state.userID}/>:
                <div>
                <table className="job-table">
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>ID</th>
                        </tr>
                    </thead>
                    {this.props.users.length > 0 && this.state.selectedItems.map(item=>{
                        return (<tr className={(item.firstname!=="")?"member":""} onClick={()=>this.setState({toUser: true, userID: item.id})}>
                                <td><a>{(item.firstname==="")?<br/> : item.firstname+" "+item.lastname}</a></td>
                                <td><a>{item["email"]}</a></td>
                                <td><a>{item.id}
                                </a></td>
                                </tr>)
                    })}
                </table>
                <div className="control row">
                <div className="col-6">
                    {(this.state.page > 0 )?<a className="btn btn-tableswitch" href="#" role="button" onClick={this.pageDown}>&#x25C4;</a>:null}
                </div>
                <div className="col-6">
                    {(this.state.lastInd<this.state.users.length)?<a className="btn btn-tableswitch right " href="#" role="button" onClick={this.pageUp}>&#x25BA;</a>:null}
                </div>
                </div>
                </div>
                }
            </div>
        )
    }
}

export default UserResults;



    // this.state = {
    //     tutors: [],
    //     page: 0,
    //     selectedItems: this.displaySetup(0,this.state.users),
    //     lastInd: ((tutors.length >= 8)?7:tutors.length)
    // }