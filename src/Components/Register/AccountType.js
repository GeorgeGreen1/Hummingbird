import React, {Component} from 'react';

class AccountType extends Component{
    render(){
        return (
            <div className="account-type-select">
                <a className={"btn student " + ((this.props.accType=="student") ? "active" : "")} role="button" onClick={() => this.props.change(0)}>Student</a>
                <a className={"btn tutor "+ ((this.props.accType=="tutor") ? "active" : "")} role="button" onClick={() => this.props.change(1)}>Tutor</a>
            </div>
        );
    }
}

export default AccountType;