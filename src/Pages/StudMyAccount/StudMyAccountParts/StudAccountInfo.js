import React, {Component} from 'react';
// The available locations

const initState = {
    address: "",
    city: "",
    zip: "",
    states:"",
    phone:"",
    invalidZip: "",
    invalidStates:"",
    invalidPhone:"",
    alt_address: "",
    alt_city: "",
    alt_zip: "",
    alt_states:"",
    alt_phone:"",
    invalidAltZip:"",
    invalidAltStates:"",
    invalidAltPhone:""
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
                email: this.props.email
            })
        })
        .then(response => 
            response.json()
        )
        .then(ret=>{
            this.setState({
                address: ret.street_addr,
                city: ret.city,
                zip: ret.zip,
                states: ret.state,
                phone: ret.phone,
                alt_address: ret.alt_street_addr,
                alt_city: ret.alt_city,
                alt_zip: ret.alt_zip,
                alt_states: ret.alt_state,
                alt_phone: ret.alt_phone
            })
        })   
    }
    onPhoneChange = (event) => {
        this.setState({phone: event.target.value})
    }
    onAddressChange = (event) => {
        this.setState({address: event.target.value})
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
    onAltAddressChange = (event) => {
        this.setState({alt_address: event.target.value})
    }
    onAltCityChange = (event) => {
        this.setState({alt_city: event.target.value})
    }
    onAltZipChange = (event) => {
        this.setState({alt_zip: event.target.value})
    }
    onAltStatesChange = (event) => {
        this.setState({alt_states: event.target.value})
    }
    onSubmitClick = (event) =>{
        let valid = true;
        this.setState({ invalidAddress: "",
                        invalidCity: "",
                        invalidZip: "",
                        invalidStates:"",
                        invalidPhone:"",
                        invalidAltZip:"",
                        invalidAltStates:"",
                        invalidAltPhone:""
                    });
        
    }
    render(){
        return (
            <div className='subpage-content'>
                <h3>My Info</h3>
                <div className="row">
                            <div className="col-6">
                                <div className="entry-prompt">
                                    <label for="phone">Phone Number (XXX-XXX-XXXX):</label>
                                    <input type="text" placeholder={this.state.phone} class="form-control" id="phone" onChange={this.onPhoneChange} />
                                    <div className={"invalid-entry " }>Please enter a valid phone number!</div>
                                </div>
                            </div>
                            <div className="col-6"> 
                                <div className="entry-prompt">
                                    <label for="address">Street Address:</label>
                                    <input type="text" placeholder={this.state.address} class="form-control" id="address" onChange={this.onAddressChange}/>
                                    <div className={"invalid-entry " }>Please enter a street address!</div>
                                </div>
                            </div>
                </div>
                <div className="row">
                            <div className="col-6">
                                <div className="entry-prompt">
                                    <label for="city">City:</label>
                                    <input type="text" placeholder={this.state.city} class="form-control" id="city" onChange={this.onCityChange} />
                                    <div className={"invalid-entry " }>Please enter a valid city!</div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="entry-prompt">
                                <label for="states">State:</label><br/>
                                <select class="date-select month-select" id="states" onChange={this.onStatesChange} required="">
                                    <option value="">State</option>
                                    {states.map(item=>{
                                    return(<option>{item}</option>)
                                    })}
                                </select>
                                <div className={"invalid-entry "}>Please enter a valid state!</div>
                                </div>
                            </div>
                </div>
                <div className="row">
                            <div className="col-6">
                                <div className="entry-prompt">
                                    <label for="zip">ZIP Code:</label>
                                    <input type="text" placeholder={this.state.zip} class="form-control" id="zip" onChange={this.onZipChange} />
                                    <div className={"invalid-entry " }>Please enter a valid ZIP code!</div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="entry-prompt">
                                    <label for="alt-phone">Alternate Phone Number:</label>
                                    <input type="text" placeholder={this.state.alt_phone} class="form-control" id="alt-phone" onChange={this.onAltPhoneChange} />
                                    {/* <div className={"invalid-entry " }>Please enter a valid phone number!</div> */}
                                </div>
                            </div>
                </div>
                <div className="row">
                            <div className="col-6">
                                <div className="entry-prompt">
                                    <label for="alt-address">Alternate Address:</label>
                                    <input type="text" placeholder={this.state.alt_address} class="form-control" id="alt-address" onChange={this.onAltAddressChange} />
                                    {/* <div className={"invalid-entry " }>Please enter a valid city!</div> */}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="entry-prompt">
                                    <label for="alt-city">Alternate City:</label>
                                    <input type="text" placeholder={this.state.alt_city} class="form-control" id="alt-city" onChange={this.onAltCityChange} />
                                    {/* <div className={"invalid-entry " }>Please enter a valid city!</div> */}
                                </div>
                            </div>
                </div>
                <div className="row">
                            <div className="col-6">
                                <div className="entry-prompt">
                                <label for="alt-states">Alternate State:</label><br/>
                                <select class="date-select month-select" id="alt-states" onChange={this.onAltStatesChange} required="">
                                    <option value="">State</option>
                                    {states.map(item=>{
                                    return(<option>{item}</option>)
                                    })}
                                </select>
                                {/* <div className={"invalid-entry "}>Please enter a valid state!</div> */}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="entry-prompt">
                                    <label for="alt-zip">Alternate ZIP Code:</label>
                                    <input type="text" placeholder={this.state.alt_zip} class="form-control" id="alt-zip" onChange={this.onAltZipChange} />
                                    {/* <div className={"invalid-entry " }>Please enter a valid ZIP code!</div> */}
                                </div>
                            </div>
                </div>
                <div className="entry-prompt">
                    <a className="btn btn-orange btn-signin" href="#" role="button" onClick={this.onRegisterClick}>Submit</a><br/>
                </div>
            </div>
        );
    }
}

export default StudAccountInfo