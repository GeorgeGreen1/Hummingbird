import React, {Component} from 'react';
// The available locations

const initState = {
    oldPass: "",
    newPass: "",
    repeatNewPass: "",
    status: "",
    valid: true
};

class ChangePassword extends Component {
    constructor(props){
        super(props);
        this.state = initState;
    }

    componentDidMount() {
    }

    onOldPassChange = (event) => {
        this.setState({oldPass: event.target.value});
    }

    
    onNewPassChange = (event) => {
        this.setState({newPass: event.target.value});
    }

    
    onRepeatNewPassChange = (event) => {
        this.setState({repeatNewPass: event.target.value});
    }

    
    onResetClick = () => {
        this.setState({
            oldPass: "",
            newPass: "",
            repeatNewPass: ""});
    }

    onSubmitClick = () =>{
        if ((this.state.oldPass === "")||(this.state.newPass === "")||(this.state.repeatNewPass === "")){
            this.setState({status: "Please enter info in all fields."});
        }
        else if (this.state.newPass !== this.state.repeatNewPass){
            this.setState({status: "The new password fields do not match."});
        }
        else if (this.state.newPass === this.state.oldPass){
            this.setState({status: "You must enter a new password."});
        }
        else {   
            fetch("http://localhost:3000/changepass",{
                method: 'post',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    id: this.props.id,
                    newPass: this.state.newPass,
                    oldPass: this.state.oldPass
                })
            }).then(response => 
                response.json())
                .then(ret=>{
                    if (ret === "Invalid Password"){
                        this.setState({status: "Invalid password!"})
                    }
                    else {
                        this.setState({status: "Change complete!"})
                    }
                })
        }
    }
    render(){
        return (
            <div className='subpage-content'>
                <div className="heading">
                    <h3>Change Password</h3>
                </div>
                <div className="changepass-fields">
                    <div className="entry-prompt">
                        <label htmlFor="old-pass">Enter Current Password:</label>
                        <input type="password" value={this.state.oldPass} className="form-control" id="old-pass" onChange={this.onOldPassChange} />
                    </div>
                    
                    <div className="entry-prompt">
                        <label htmlFor="new-pass">Enter New Password:</label>
                        <input type="password" value={this.state.newPass} className="form-control" id="new-pass" onChange={this.onNewPassChange} />
                    </div>
                    
                    <div className="entry-prompt">
                        <label htmlFor="rep-new-pass">Re-Enter New Password:</label>
                        <input type="password" value={this.state.repeatNewPass} className="form-control" id="rep-new-pass" onChange={this.onRepeatNewPassChange} />
                    </div>
                    <a style={{color: ((this.state.status==="Change complete!")?"green":"red")}}>{this.state.status}</a>
                </div>
                <div className="account-btns">
                    <a className="btn btn-orange btn-account" href="#" role="button" onClick={this.onSubmitClick}>Submit</a><br/>
                    <a className="btn btn-orange btn-account" href="#" role="button" onClick={this.onResetClick}>Reset</a><br/>
                </div>
            </div>
        );
    }
}

export default ChangePassword;