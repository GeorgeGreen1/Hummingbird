import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './JobTable.css';
import {Link} from 'react-router-dom';

class JobTable extends Component {
    constructor(){
        super();
        this.state = {
            postings: [],
            page: "",
            selectedItems: [],
            lastInd: "",
            selectedPost: ""
        }
    }

    // Set the state data for the list of postings upon mounting the component, must pad the tutor list to fill out the table to an equal size 
    // for each page. 
    componentDidMount(){
        let tLength = (this.props.postings.length<8) ? 8 : Math.ceil(this.props.postings.length/8)*8;
        let initPostings = this.padpostings()
        this.setState({
            postings: initPostings,
            page: 0,
            selectedItems: this.displaySetup(0,initPostings),
            lastInd: 8})
    }
    
    // Pads the postings array to a multiple of 8
    padpostings(){
        let mod = (this.props.postings.length<8) ? (8-this.props.postings.length): (8-this.props.postings.length%8);
        let buildArr = []
        if (mod !== 0){
            for (let i = 0;i<mod;i++){
                buildArr = buildArr.concat({
                    name: "",
                    course: "",
                    subject: "",
                    level: "",
                    school: "",
                    // comments: "",
                    date: ""
                })
            }
            buildArr = this.props.postings.concat(buildArr);
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
        this.setState({selectedItems: this.displaySetup(currPage+1,this.state.postings)});
    }

    //Jump down 8 spots in the array
    pageDown = () => {
        const currPage = this.state.page;
        this.setState({page: (currPage-1) });
        this.setState({selectedItems: this.displaySetup(currPage-1,this.state.postings)});
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
        // (this.props.postings.length > 0 && console.log('ror'));
        console.log(this.state.userID);
        return(
            <div>
                {
                    (this.state.toUser)?
                    <Redirect to={"userprofile/"+this.state.userID}/>:
                <div>
                <table className="job-table">
                    <thead>
                        <tr>
                        <th>Postings</th>
                        </tr>
                    </thead>
                    {this.props.postings.length > 0 && this.state.selectedItems.map((item,id)=>{
                        return (<tr className={(item.name!=="")?"member":""} onClick={(item.name==="")?null:()=>this.setSelection(id)}>
                                {(this.state.selectedPost !== id)?
                                <td >
                                    {item.name} <a className="post-date">{item.date}</a> <br/>
                                </td>:
                                <td>
                                    {item.name} <a className="post-date">{item.date}</a><br/>
                                    Course: {item.course} <br/>
                                    Subject: {item.subject} {item.level} <br/>
                                    School: {item.school} <br/>
                                    Comments: {item.comments} 
                                </td>}
                                </tr>)
                    })}
                </table>
                <div className="control">
                {(this.state.page > 0 )?<a className="btn btn-tableswitch" href="#" role="button" onClick={this.pageDown}>&#x25C4;</a>:null}
                {(this.state.lastInd<this.state.postings.length)?<a className="btn btn-tableswitch right " href="#" role="button" onClick={this.pageUp}>&#x25BA;</a>:null}
                </div>
                </div>
                }
            </div>
        )
    }
}

export default JobTable;



    // this.state = {
    //     postings: [],
    //     page: 0,
    //     selectedItems: this.displaySetup(0,this.state.postings),
    //     lastInd: ((postings.length >= 8)?7:postings.length)
    // }