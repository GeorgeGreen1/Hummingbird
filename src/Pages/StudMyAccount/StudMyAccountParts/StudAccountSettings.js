import React, {Component} from 'react';
// The available locations

const initState = {
    notify_match: false,
    display_email: false,
    match_available: false,
    notify_match_loaded: false,
    display_email_loaded: false,
    match_available_loaded: false,
}

class TutorAccountSettings extends Component {
    constructor(props){
        super(props);
        this.state = initState;
    }
    componentDidMount(){
        console.log(this.props.id);
        fetch("http://localhost:3000/getsettings",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                id: this.props.id,
                member_type: this.props.member_type
            })
        })
        .then(response=>
            response.json()
        ).then(ret => {
            this.setState({
                notify_match: ret[0].notify_match,
                display_email: ret[0].display_email,
                match_available: ret[0].match_available,
                notify_match_loaded: ret[0].notify_match,
                display_email_loaded: ret[0].display_email,
                match_available_loaded: ret[0].match_available,
            })
        }
        )
    }
    onNotifyToggle = () =>{
        this.setState({notify_match: !(this.state.notify_match)});
    } 

    onDisplayEmailToggle = () =>{
        this.setState({display_email: !(this.state.display_email)});
    }

    onMatchAvailableToggle = () =>{
        this.setState({match_available: !(this.state.match_available)});
    }


    onSubmitClick = () =>{
            fetch("http://localhost:3000/updatesettings",{
                method: 'post',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    id: this.props.id,
                    notify_match: this.state.notify_match,
                    display_email: this.state.display_email,
                    match_available: this.state.match_available,
                    member_type: this.props.member_type
                })
            })
            .then(response=>
                response.json()
            ).then(ret => {
                this.setState({
                    notify_match: ret[0].notify_match,
                    display_email: ret[0].display_email,
                    match_available: ret[0].match_available,
                    notify_match_loaded: ret[0].notify_match,
                    display_email_loaded: ret[0].display_email,
                    match_available_loaded: ret[0].match_available,
                })
            }
            )
    }

    onResetClick = () =>{
        this.setState({
            notify_match: this.state.notify_match_loaded,
            display_email: this.state.display_email_loaded,
            match_available:  this.state.match_available_loaded
        })        
    }

    render(){
        return (
            <div className='subpage-content'>
                <h3>My Settings</h3>
                <div className="account-settings">
                    <div className="row">
                        <div className="col-5">
                            <h5>Get Notifications For Matches</h5>
                        </div>
                        <div className="col-4">
                            <label className="switch">
                                    <input type="checkbox" onClick={()=>this.onNotifyToggle()} checked={this.state.notify_match}/>
                                    <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <h5>Display as an Available Match</h5>
                        </div>
                        <div className="col-4">
                            <label className="switch">
                                    <input type="checkbox" onClick={()=>this.onMatchAvailableToggle()} checked={this.state.match_available}/>
                                    <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <h5>Display Email in User Profile</h5>
                        </div>
                        <div className="col-4">
                            <label className="switch">
                                    <input type="checkbox" onClick={()=>this.onDisplayEmailToggle()} checked={this.state.display_email}/>
                                    <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="account-btns">
                    <a className="btn btn-orange btn-account" href="#" role="button" onClick={this.onSubmitClick}>Submit</a><br/>
                    <a className="btn btn-orange btn-account" href="#" role="button" onClick={this.onResetClick}>Reset</a><br/>
                </div>
            </div>
        );
    }
}

export default TutorAccountSettings