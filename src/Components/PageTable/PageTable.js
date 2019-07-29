import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';

class PageTable extends Component {
    constructor(){
        super();
        this.state = {
            items: [],
            page: 0,
            selectedItems: [],
            lastInd: "",
            userRedirect: false,
            userRedirectID: -1
        }
    }

    // Set the state data for the list of tutors upon mounting the component, must pad the tutor list to fill out the table to an equal size 
    // for each page. 
    componentDidMount(){
        let tLength = (this.props.entries.length<this.props.pageLength) ? this.props.pageLength : Math.ceil(this.props.entries.length/this.props.pageLength)*this.props.pageLength;
        let initItems = this.padLogs()
        this.setState({
            items: initItems,
            page: 0,
            selectedItems: this.displaySetup(0,initItems),
            lastInd: this.props.pageLength})
    }
    
    // Pads the tutors array to a multiple of this.props.pageLength
    padLogs(){
        let mod = (this.props.entries.length<this.props.pageLength) ? (this.props.pageLength-this.props.entries.length): (this.props.pageLength-this.props.entries.length%this.props.pageLength);
        let buildArr = [];
        let padItem = {};
        Object.keys(this.props.entries[0]).map(key=>{
            padItem[key] = "";
        })
        console.log("Mod: " + mod);
        if (mod !== 0){
            for (let i = 0;i<mod;i++){
                buildArr = buildArr.concat(
                    padItem
                )
            }
            buildArr = this.props.entries.concat(buildArr);
        }
        console.log(buildArr);
        return buildArr;
    }

    // Grab this.props.pageLength elements at a time
    displaySetup(page,list){
        const end = ( (page*this.props.pageLength+this.props.pageLength<list.length)?(page*this.props.pageLength+this.props.pageLength) : list.length )
        this.setState({lastInd: end});
        return(list.slice((page*this.props.pageLength), end));
    }

    //Jump up this.props.pageLength spots in the array
    pageUp = () => {
        const currPage = this.state.page;
        this.setState({page: (currPage+1), });
        this.setState({selectedItems: this.displaySetup(currPage+1,this.state.items)});
    }

    //Jump down this.props.pageLength spots in the array
    pageDown = () => {
        const currPage = this.state.page;
        this.setState({page: (currPage-1) });
        this.setState({selectedItems: this.displaySetup(currPage-1,this.state.items)});
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
        console.log("E");
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
                {
                    (this.state.userRedirect)?
                    <Redirect to={this.props.redirectLvl+"userprofile/"+this.state.userRedirectID}/>:
                <div>
                <table>
                    <thead>
                        <tr>
                        {this.props.tableCtgs.map((ctg)=>{
                            return <th>{ctg}</th>
                        })}
                        </tr>
                    </thead>
                    {this.props.entries.length > 0 && this.state.selectedItems.map((item,id)=>{
                        return (<tr className={(item[this.props.dispKeys[0]]!=="")?"member":""} onClick={()=>{(this.props.interactType==="none")?null:((this.props.interactType==="redirect")?(this.setState({userRedirect: true, userRedirectID: item.id})):this.setSelection(id))}}>
                            {this.props.dispKeys.map(key =>{
                                return <td>{item[key]}<br/></td>
                            })}
                        </tr>)
                    })}
                </table>
                <div className="control row">
                    <div className="col-6">
                      {(this.state.page > 0 )?<a className="btn btn-tableswitch" href="#" role="button" onClick={this.pageDown}>&#x25C4;</a>:null}
                    </div>
                    <div className="col-6">
                      {(this.state.lastInd<this.state.items.length)?<a className="btn btn-tableswitch right " href="#" role="button" onClick={this.pageUp}>&#x25BA;</a>:null}
                    </div>
                </div>
                </div>
            }
            </div>
        )
    }
}

export default PageTable;



    // this.state = {
    //     tutors: [],
    //     page: 0,
    //     selectedItems: this.displaySetup(0,this.state.items),
    //     lastInd: ((tutors.length >= this.props.pageLength)?7:tutors.length)
    // }