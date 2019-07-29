import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar';
import banner from '../../Images/banner-img.png';
import AccountType from '../../Components/Register/AccountType';
const initState = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordRepeat: "",
    invalidEmail: "",
    invalidFirstName: "",
    invalidPassword: "",
    invalidPassMatch: "",
    invalidRegInfo: "",
    month: "",
    day: "",
    year: "",
    meetAddress: "",
    billAddress: "",
    city: "",
    zip: "",
    states:"",
    phone:"",
    member_type: "student",
    invalidDOB: "",
    invalidMeetAddress: "",
    invalidBillAddress: "",
    invalidCity: "",
    invalidZip: "",
    invalidStates:"",
    invalidPhone:""
};
const months = ["January","February","March","April","May","June","July",
                "August","September","October","November","December"];
    const states = ["AL","AK","AZ","AR","CA","CO","CT","DC","DE","FL","GA","GU","HI",
                    "ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI",
                    "MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC",
                    "ND","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX",
                    "UT","VT","VA","VI","WA","WV","WI","WY"]                
class Register extends Component{
    constructor(props){
        super(props);
        this.state = initState;
      }

    componentDidMount(){
    }

    onMemberTypeChange = (num) =>{
        if (num === 0){
            this.setState({member_type: "student"})
        }
        else {
            this.setState({member_type: "tutor"})
        }
    }
    // Changes the Email state
    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    };    
    // Changes the First name state
    onFirstNameChange = (event) => {
        this.setState({firstName: event.target.value})
};
    // Changes the Last name state
    onLastNameChange = (event) => {
        this.setState({lastName: event.target.value})
    };
    // Changes the Password state
    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    };
    // Changes the Double-check Password state
    onPasswordRepeatChange = (event) => {
        this.setState({passwordRepeat: event.target.value});
    };
    onMonthChange = (event) => {
        this.setState({month: event.target.value})
    }
    onDayChange = (event) => {
        this.setState({day: event.target.value})
    }
    onYearChange = (event) => {
        this.setState({year: event.target.value})
    }
    onPhoneChange = (event) => {
        this.setState({phone: event.target.value})
    }
    onMeetAddressChange = (event) => {
        this.setState({meetAddress: event.target.value})
    }
    onBillAddressChange = (event) => {
        this.setState({billAddress: event.target.value})
    }
    onCityChange = (event) => {
        this.setState({city: event.target.value})
    }
    onZipChange = (event) => {
        this.setState({zip: event.target.value})
    }
    onStatesChange = (event) => {
        this.setState({states: event.target.value})
    }
    days = (month) => {
        var maxDay;
        var allDays = []
        if (month === "February"){
            maxDay = 29;
        }
        else if (["April","June","September","November"].indexOf(month)>=0){
            maxDay = 30;
        }
        else{
            maxDay = 31;
        }
        for (var i = 1; i <= maxDay; i++){
            allDays.push(((i<10)?"0":"") + String(i));
        }
        return allDays;
    }

    years = () => {
        var allYears = [];
        for (var i = 2007; i >=1901; i--){
            allYears.push(String(i));
        }
        return allYears;
    }

    // Checks validity of user input, then sends a request to insert user data into the server. Then logs the user in.
    onRegisterClick = (event) =>{
        let valid = true;
        this.setState({invalidEmail : "",
                       invalidFirstName:"",
                       invalidPassword:"",
                       invalidPassMatch:"",
                       invalidRegInfo:"",
                       invalidDOB: "",
                       invalidAddress: "",
                       invalidCity: "",
                       invalidZip: "",
                       invalidStates:"",
                       invalidPhone:""
                       });
        // Email validity
        if (this.state.email == ""){
            this.setState({invalidEmail : "active"});
            valid = false;
        } else if (this.state.invalidEmail === "active"){
            this.setState({invalidEmail : ""});
        }
        // First Name validity
        if (this.state.firstName == ""){
            this.setState({invalidFirstName : "active"});
            valid = false;
        } else if (this.state.invalidFirstName === "active"){
            this.setState({invalidFirstName : ""});
        }
        // Last Name validity
        if (this.state.lastName == ""){
            this.setState({invalidLastName : "active"});
            valid = false;
        } else if (this.state.invalidLastName === "active"){
            this.setState({invalidLastName : ""});
        }
        // Password validity
        if (this.state.password == ""){
            this.setState({invalidPassword : "active"});
            valid = false;
        } else if (this.state.invalidPassword === "active"){
            this.setState({invalidPassword : ""});
        }
        // Meeting Address validity
        if (this.state.meetAddress == ""){
            this.setState({invalidMeetAddress : "active"});
            valid = false;
        } else if (this.state.invalidMeetAddress === "active"){
            this.setState({invalidMeetAddress : ""});
        }
        // Billing Address validity
        if (this.state.billAddress == ""){
            this.setState({invalidBillAddress : "active"});
            valid = false;
        } else if (this.state.invalidBillAddress === "active"){
            this.setState({invalidBillAddress : ""});
        }
        // City validity
        if (this.state.city == ""){
            this.setState({invalidCity : "active"});
            valid = false;
        } else if (this.state.invalidCity === "active"){
            this.setState({invalidCity : ""});
        }
        // ZIP validity
        if ((this.state.zip.length != 5)||(!(/^\d+$/.test(this.state.zip)))){
            this.setState({invalidZip : "active"});
            valid = false;
        } else if (this.state.invalidZip === "active"){
            this.setState({invalidZip : ""});
        }
        // State validity
        if (this.state.states == ""){
            this.setState({invalidStates : "active"});
            valid = false;
        } else if (this.state.invalidStates === "active"){
            this.setState({invalidStates : ""});
        }
        // DOB validity
        if ((this.state.day == "")||(this.state.month == "")||(this.state.year == "")){
            this.setState({invalidDOB : "active"});
            valid = false;
        } else if (this.state.invalidDOB === "active"){
            this.setState({invalidDOB : ""});
        }
        // Phone validity
        if (((this.state.phone[3] != "-")||(this.state.phone[7] != "-"))
            ||(!(/^\d+$/.test(this.state.phone.slice(0,3))))
            ||(!(/^\d+$/.test(this.state.phone.slice(4,7))))
            ||(!(/^\d+$/.test(this.state.phone.slice(8))))){
            this.setState({invalidPhone : "active"});
            valid = false;
        } else if (this.state.invalidPhone === "active"){
            this.setState({invalidPhone : ""});
        }
        // Password match validity
        if (this.state.password !== this.state.passwordRepeat){
            this.setState({invalidPassMatch : "active"});
            valid = false;
        } else if (this.state.InvalidPassMatch === "active"){
            this.setState({invalidPassMatch : ""});
        }
        // Send registration request to server
        if (valid){
            var monthInd = months.indexOf(this.state.month) + 1
            fetch("http://localhost:3000/register",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                password: this.state.password,
                birth_date: this.state.year+((monthInd<10)?"0":"")+String(monthInd)+this.state.day,
                phone: this.state.phone,
                meet_addr: this.state.meetAddress,
                bill_addr: this.state.billAddress,
                city: this.state.city, 
                state: this.state.states,
                zip: this.state.zip
            })
            }).then(response => 
                response.json()).then(ret => {
                    if (ret === "invalid"){
                        this.setState({invalidRegInfo: "active"})
                    }
                    else {
                        this.props.onSign(true,ret.email,ret.firstname);
                    }
                });
        }
    }
    render(){
        return (
            <div>
            { (!this.props.signedIn) ?
            <div>
                <div className="fg-hum">
                    <div className="page-title"><h2 align="center">Register</h2></div>
                   <div className="inner-present register-page">
                        <h3 align="center"> Basic Info: </h3>
                        <div className="row">
                            <div className="col-6">
                                <div className="entry-prompt">
                                    <label htmlFor="email">E-mail:</label>
                                    <input type="text" className="form-control" id="email" onChange={this.onEmailChange} />
                                    <div className={"invalid-entry " + this.state.invalidEmail}>Please enter a valid email address!</div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="entry-prompt">
                                    <label htmlFor="phone">Phone (XXX-XXX-XXXX):</label>
                                    <input type="text" className="form-control" id="phone" onChange={this.onPhoneChange} />
                                    <div className={"invalid-entry " + this.state.invalidPhone}>Please enter a valid Phone Number!</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="entry-prompt">
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" className="form-control" id="password" onChange={this.onPasswordChange}/>
                                    <div className={"invalid-entry " + this.state.invalidPassword}>Please enter a valid password!</div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="entry-prompt">
                                    <label htmlFor="repeat-password">Repeat Password:</label>
                                    <input type="password" className="form-control" id="repeat-password" onChange={this.onPasswordRepeatChange}/>
                                    <div className={"invalid-entry " + this.state.invalidPassMatch}>Please enter matching passwords!</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="entry-prompt">
                                    <label htmlFor="firstname">First Name:</label>
                                    <input type="text" className="form-control" id="firstname" onChange={this.onFirstNameChange}/>
                                    <div className={"invalid-entry " + this.state.invalidFirstName}>Please enter a valid first name!</div>
                               </div>
                            </div>
                            <div className="col-6">
                                <div className="entry-prompt">
                                    <label htmlFor="lastname">Last Name:</label>
                                    <input type="text" className="form-control" id="lastname" onChange={this.onLastNameChange}/>
                                    <div className={"invalid-entry " + this.state.invalidLastName}>Please enter a valid last name!</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                            <div className="entry-prompt">
                                <label htmlFor="birthdate">Date of Birth:</label>
                                <div id="birthdate">
                                <select className="date-select month-select" id="month" onChange={this.onMonthChange} required="">
                                <option value="">Month</option>
                                {months.map(item=>{
                                return(<option>{item}</option>)
                                })}
                                </select>
                                <select className="date-select day-select" id="day" onChange={this.onDayChange} required="">
                                <option value="">Day</option>
                                {this.days(this.state.month).map(item=>{
                                return(<option>{item}</option>)
                                })}
                                </select>
                                <select className="date-select year-select" id="year" onChange={this.onYearChange} required="">
                                <option value="">Year</option>
                                {this.years().map(item=>{
                                return(<option>{item}</option>)
                                })}
                                </select>
                                <div className={"invalid-entry " + this.state.invalidDOB}>Please enter a valid Date of Birth!</div>
                                </div>
                            </div>
                                
                            </div>
                            <div className="col-6">
                                <div className="entry-prompt">
                                    <label htmlFor="meet-address">Preferred Meeting Address:</label>
                                    <input type="text" className="form-control" id="meet-address" onChange={this.onMeetAddressChange} />
                                    <div className={"invalid-entry " + this.state.invalidMeetAddress}>Please enter a valid meeting address!</div>
                                </div>
                            </div> 
                        </div>
                        <div className="bill-label">
                        <h3>Billing Info:</h3>
                        </div>
                        <div className="row">
                            <div className="col-6">
                               <div className="entry-prompt">
                                    <label htmlFor="bill-address">Billing Address:</label>
                                    <input type="text" className="form-control" id="bill-address" onChange={this.onBillAddressChange} />
                                    <div className={"invalid-entry " + this.state.invalidBillAddress}>Please enter a valid billing address!</div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="entry-prompt">
                                        <label htmlFor="city">City:</label>
                                        <input type="text" className="form-control" id="city" onChange={this.onCityChange} />
                                        <div className={"invalid-entry " + this.state.invalidCity}>Please enter a valid city!</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="entry-prompt">
                                <label htmlFor="states">State:</label><br/>
                                <select className="date-select month-select" id="states" onChange={this.onStatesChange} required="">
                                    <option value="">State</option>
                                    {states.map(item=>{
                                    return(<option>{item}</option>)
                                    })}
                                </select>
                                <div className={"invalid-entry " + this.state.invalidStates}>Please enter a valid state!</div>
                                </div>
                            </div>
                            <div className="col-6">
                               <div className="entry-prompt">
                                        <label htmlFor="zip">ZIP Code:</label>
                                        <input type="text" className="form-control" id="zip" onChange={this.onZipChange} />
                                        <div className={"invalid-entry " + this.state.invalidZip}>Please enter a valid ZIP code!</div>
                                </div>
                            </div>
                        </div>
                        <AccountType />
                        <a className="btn btn-orange btn-block" href="#" role="button" onClick={this.onRegisterClick}>Register</a><br/>
                        <div className={"invalid-entry " + this.state.invalidRegInfo}>Invalid Registration Info. Please try a different email!</div>
                    </div>
                </div>
            </div>:
            <Redirect to="/" />
            }
            </div>
        );
    }
}
export default Register;