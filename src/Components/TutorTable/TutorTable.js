import React, {Component} from 'react';
import './TutorTable.css';
class TutorTable extends Component {
    constructor(){
        super();
        this.state = {
            tutors: [],
            page: "",
            selectedItems: [],
            lastInd: ""
        }
    }

    // Set the state data for the list of tutors upon mounting the component, must pad the tutor list to fill out the table to an equal size 
    // for each page. 
    componentDidMount(){
        let tLength = (this.props.tutors.length<8) ? 8 : Math.ceil(this.props.tutors.length/8)*8;
        let initTutors = this.padTutors()
        this.setState({
            tutors: initTutors,
            page: 0,
            selectedItems: this.displaySetup(0,initTutors),
            lastInd: 8})
    }
    
    // Pads the tutors array to a multiple of 8
    padTutors(){
        let mod = (this.props.tutors.length<8) ? (8-this.props.tutors.length): (8-this.props.tutors.length%8);
        let buildArr = []
        if (mod !== 0){
            for (let i = 0;i<mod;i++){
                buildArr = buildArr.concat({
                    name: "",
                    email: "",
                    course: ""
                })
            }
            buildArr = this.props.tutors.concat(buildArr);
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
        this.setState({selectedItems: this.displaySetup(currPage+1,this.state.tutors)});
    }

    //Jump down 8 spots in the array
    pageDown = () => {
        const currPage = this.state.page;
        this.setState({page: (currPage-1) });
        this.setState({selectedItems: this.displaySetup(currPage-1,this.state.tutors)});
    }



    render(){
        // (this.props.tutors.length > 0 && console.log('ror'));
        return(
            <div>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Email</th>
                    </tr>
                </thead>
                {this.props.tutors.length > 0 && this.state.selectedItems.map(item=>{
                    return (<tr>
                            <td>{(item.name==="")?<br/> : item.name}</td>
                            <td>{item.course}</td>
                            <td>{item.email}</td>
                            </tr>)
                })}
            </table>
            <div className="control">
            {(this.state.page > 0 )?<a className="btn btn-tableswitch" href="#" role="button" onClick={this.pageDown}>&#x25C4;</a>:null}
            {(this.state.lastInd<this.state.tutors.length)?<a className="btn btn-tableswitch right " href="#" role="button" onClick={this.pageUp}>&#x25BA;</a>:null}
            </div>
            </div>
        )
    }
}

export default TutorTable;



    // this.state = {
    //     tutors: [],
    //     page: 0,
    //     selectedItems: this.displaySetup(0,this.state.tutors),
    //     lastInd: ((tutors.length >= 8)?7:tutors.length)
    // }