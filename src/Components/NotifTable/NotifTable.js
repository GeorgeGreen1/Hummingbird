import React, {Component} from 'react';
import './NotifTable.css';

const initState = {
    messages: []
}

const notify = [
    "You have one appointment next week",
    "Elway doesn't wanna rebuild",
    "Sony Michel omg so good "
];

class NotifTable extends Component{
    constructor(){
        super();
        this.state = initState;
    }

    componentDidMount(){
        fetch("http://localhost:3000/getnotif",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                id: this.props.id
            })
        })
        .then(response=>
            response.json()
        )
        .then(ret => {
            let mesgs = [];
            console.log(ret);
            ret.map(item=>{
                mesgs.push(item.mesg);
            })
            this.setState({
                messages: mesgs
            })
            }
        )   
    }

    removeMessage = (index) => {
        if (this.state.messages.length>1){
            this.setState({
                messages: this.state.messages.slice(0,index).concat(this.state.messages.slice(index+1,this.state.messages.length))
            })
        }else{
            this.setState({
                messages: []
            })
        }
    }

    render() {
        let n = notify;
        return (
            <div className="notifications">
                    <div className="inner-present notif">
                    <div className="head-display">Notifications:</div>
                        <div class="scrollbar" id="style-8">
                            <div class="force-overflow">
                                {this.state.messages.map(item=>{
                                    return (<div><a>{item}</a> <span className="notif-rm" onClick={()=>this.removeMessage(this.state.messages.indexOf(item))}><b>X</b></span>
                                            <hr/></div>)
                                })}
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}
export default NotifTable;