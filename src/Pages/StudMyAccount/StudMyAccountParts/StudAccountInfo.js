import React, {Component} from 'react';
// The available locations

const initState = {
    meetAddress: "",
    city: "",
    zip: "",
    states:"",
    phone:"",
    billAddress: "",
    alt_phone:"",
    meetAddress_loaded: "",
    city_loaded: "",
    zip_loaded: "",
    phone_loaded:"",
    billAddress_loaded: "",
    alt_phone_loaded:"",
    invalidZip: "",
    invalidStates:"",
    invalidPhone:"",
    invalidAltPhone:"",
};

const states = ["AL","AK","AZ","AR","CA","CO","CT","DC","DE","FL","GA","GU","HI",
                "ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI",
                "MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC",
                "ND","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX",
                "UT","VT","VA","VI","WA","WV","WI","WY"]    

class StudAccountInfo extends Component {
    constructor(props){
        super(props);
        this.state = initState;
    }

    componentDidMount() {
        fetch("http://localhost:3000/getacct",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                id: this.props.id
            })
        })
        .then(response => 
            response.json()
        )
        .then(ret=>{
            this.setState({
                meetAddress: ret.meet_addr,
                city: ret.city,
                zip: ret.zip,
                states: ret.state,
                phone: ret.phone,
                billAddress: ret.bill_addr,
                alt_phone: ret.alt_phone,
                meetAddress_loaded: ret.meet_addr,
                city_loaded: ret.city,
                zip_loaded: ret.zip,
                states_loaded: ret.state,
                phone_loaded: ret.phone,
                billAddress_loaded: ret.bill_addr,
                alt_phone_loaded: ret.alt_phone
            })
        })   
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
    onAltPhoneChange = (event) => {
        this.setState({alt_phone: event.target.value})
    }
    onResetClick = () => {
        this.setState({
            meetAddress: this.state.meetAddress_loaded,
            city: this.state.city_loaded,
            zip: this.state.zip_loaded,
            states: this.state.states_loaded,
            phone: this.state.phone_loaded,
            billAddress: this.state.billAddress_loaded,
            alt_phone: this.state.alt_phone_loaded,
        })
    }

    onSubmitClick = (event) =>{
        let valid = true;
        this.setState({ invalidMeetAddress: "",
                        invalidBillAddress: "",
                        invalidCity: "",
                        invalidZip: "",
                        invalidStates:"",
                        invalidPhone:"",
                        invalidAltPhone:""
                    });
        // Set blank entries to original value
        if (this.state.meetAddress===""){
            this.setState({meetAddress: this.state.meetAddress_loaded})
        }
        if (this.state.billAddress===""){
            this.setState({billAddress: this.state.billAddress_loaded})
        }
        if (this.state.city===""){
            this.setState({city:this.state.city_loaded})
        }
        if (this.state.phone===""){
            this.setState({phone:this.state.phone_loaded})
        }
        if (this.state.alt_phone===""){
            this.setState({alt_phone:this.state.alt_phone_loaded})
        }
        if (this.state.zip===""){
            this.setState({zip:this.state.zip_loaded})
        }
        if (this.state.states===""){
            this.setState({states:this.state.states_loaded})
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
        // Alt Phone validity
        if (this.state.alt_phone!==null){
            if (((this.state.alt_phone[3] != "-")||(this.state.alt_phone[7] != "-"))
                ||(!(/^\d+$/.test(this.state.alt_phone.slice(0,3))))
                ||(!(/^\d+$/.test(this.state.alt_phone.slice(4,7))))
                ||(!(/^\d+$/.test(this.state.alt_phone.slice(8))))){
                this.setState({invalidAltPhone : "active"});
                valid = false;
            } else if (this.state.invalidAltPhone === "active"){
                this.setState({invalidAltPhone : ""});
            }
        }
        // ZIP validity
        if ((this.state.zip.length != 5)||(!(/^\d+$/.test(this.state.zip)))){
            this.setState({invalidZip : "active"});
            valid = false;
        } else if (this.state.invalidZip === "active"){
            this.setState({invalidZip : ""});
        }
        fetch("http://localhost:3000/updateacct",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                meetAddress: this.state.meetAddress,
                city: this.state.city,
                zip: this.state.zip,
                states: this.state.states,
                phone: this.state.phone,
                billAddress: this.state.billAddress,
                alt_phone: this.state.alt_phone,
                id: this.props.id
            })
        }).then(response => 
            response.json())
            .then(ret=>{
                this.setState({
                    meetAddress_loaded: ret.meet_addr,
                    city_loaded: ret.city,
                    zip_loaded: ret.zip,
                    states_loaded: ret.state,
                    phone_loaded: ret.phone,
                    billAddress_loaded: ret.bill_addr,
                    alt_phone_loaded: ret.alt_phone,
                })
            })
        }
    render(){
        return (
            <div className='subpage-content'>
                <div className="heading">
                    <h3>My Info</h3>
                </div>
                <div className="row">
                            <div className="col-6">
                                <div className="entry-prompt">
                                    <label for="phone">Phone (XXX-XXX-XXXX):</label>
                                    <input type="text" value={this.state.phone} class="form-control" id="phone" onChange={this.onPhoneChange} />
                                    <div className={"invalid-entry " }>Please enter a valid phone number!</div>
                                </div>
                            </div>
                            <div className="col-6"> 
                                <div className="entry-prompt">
                                    <label for="meetAddress">Preferred Meeting Address:</label>
                                    <input type="text" value={this.state.meetAddress} class="form-control" id="meetAddress" onChange={this.onMeetAddressChange}/>
                                    <div className={"invalid-entry " }>Please enter a meeting address!</div>
                                </div>
                            </div>
                </div>
                <div className="row">
                            <div className="col-6">
                                <div className="entry-prompt">
                                    <label for="alt-phone">Alternate Phone Number:</label>
                                    <input type="text" value={this.state.alt_phone} class="form-control" id="alt-phone" onChange={this.onAltPhoneChange} />
                                    {/* <div className={"invalid-entry " }>Please enter a valid phone number!</div> */}
                                </div>
                            </div>
                </div>
                <hr/>
                <div className="bill-label">
                        <h3>Billing Info:</h3>
                </div>
                <div className="row">
                            <div className="col-6">
                                <div className="entry-prompt">
                                    <label for="billAddress">Billing Address:</label>
                                    <input type="text" value={this.state.billAddress} class="form-control" id="billAddress" onChange={this.onBillAddressChange} />
                                    {/* <div className={"invalid-entry " }>Please enter a valid city!</div> */}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="entry-prompt">
                                    <label for="city">City:</label>
                                    <input type="text" value={this.state.city} class="form-control" id="city" onChange={this.onCityChange} />
                                    <div className={"invalid-entry " }>Please enter a valid city!</div>
                                </div>
                            </div>
                </div>
                <div className="row">
                            <div className="col-6">
                                <div className="entry-prompt">
                                <label for="states">State:</label><br/>
                                <select class="date-select month-select" value={this.state.states} id="states" onChange={this.onStatesChange} required="">
                                    <option value="">State</option>
                                    {states.map(item=>{
                                    return(<option>{item}</option>)
                                    })}
                                </select>
                                <div className={"invalid-entry "}>Please enter a valid state!</div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="entry-prompt">
                                    <label for="zip">ZIP Code:</label>
                                    <input type="text" value={this.state.zip} class="form-control" id="zip" onChange={this.onZipChange} />
                                    <div className={"invalid-entry " }>Please enter a valid ZIP code!</div>
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

export default StudAccountInfo