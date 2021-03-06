import React, {Component} from 'react';
// The available locations


const initState = {
    meetAddress: "",
    city: "",
    zip: "",
    states:"",
    phone:"",
    description: "",
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
    invalidEduEarned:"",
    invalidBillAddress:"",
    invalidMeetAddress:"",
    invalidCity:"",
    addsubj: "",
    addlvl: -1,
    selectsubj: "",
    edu_earned: -1,
    mysubjects: [],
    subjects: []
};

const states = ["AL","AK","AZ","AR","CA","CO","CT","DC","DE","FL","GA","GU","HI",
                "ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI",
                "MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC",
                "ND","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX",
                "UT","VT","VA","VI","WA","WV","WI","WY"];
const lvls = ["Elementary","Middle School","High School","College"];
const education = [
    "H.S. Diploma or Equivalent",
    "Associate's Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate"
];
class TutorAccountInfo extends Component {
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
        fetch("http://localhost:3000/getallsubj",{
            method: 'get',
            headers: {'Content-Type' : 'application/json'},
        })
        .then(response => 
            response.json()
        ).then(ret=>{
            const subjList = [];
            ret.map(item => {
                subjList.push(item.name)
            })
            this.setState({subjects: subjList})
        })
        fetch("http://localhost:3000/getmysubjects",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                id: this.props.id
            })
        })
        .then(response => 
            response.json()
        ).then(ret=>{
            const subjList = [];
            ret.map(item => {
                subjList.push(item.name + ' - ' + item.level)
            })
            this.setState({mysubjects: subjList})
        })
        fetch("http://localhost:3000/gettutorbg",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                id: this.props.id
            })
        })
        .then(response => {
            response.json()
        }
        ).then(ret=>{
            if(ret !== undefined){
                this.setState({
                    edu_earned: ret[0].edu_earned,
                    description: ret[0].description    
                })
            }
        })
    }
    onPhoneChange = (event) => {
        this.setState({phone: event.target.value})
    }
    onDescriptionChange = (event) => {
        this.setState({description: event.target.value})
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
    onAddSubjChange = (event) => {
        this.setState({addsubj: event.target.value});
    }
    onAddLvlChange = (event) => {
        this.setState({addlvl: lvls.indexOf(event.target.value)});
    }
    onAddSubjClick = () => {
        console.log("adding")
        fetch("http://localhost:3000/addtutorsubj",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                id: this.props.id,
                member_type: this.props.member_type,
                subj: this.state.addsubj,
                lvl: this.state.addlvl
            })
        }).then(rsp => {
                const subjCurrent = this.state.mysubjects;
                subjCurrent.push(this.state.addsubj + " - " + this.state.addlvl);
                this.setState({mysubjects: subjCurrent});
            }
        )
    }
    onSubjSelectChange = (event) =>{
        this.setState({selectsubj: event.target.value});
    }
    onSubjRemoveClick = () =>{
        const splitSelect = this.state.selectsubj.split("-")
        fetch("http://localhost:3000/rmtutorsubj",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                id: this.props.id,
                subj: this.state.subjects.indexOf(splitSelect[0].substr(0,splitSelect[0].length-1))+1,
            })
        }).then(rsp => {
                const subjCurrent = this.state.mysubjects;
                console.log(this.state.selectsubj);
                const subjNew = subjCurrent.filter(item => item !== this.state.selectsubj);
                this.setState({mysubjects: subjNew})
            }
        )
    }
    onEduEarnedChange = (event) =>{
        this.setState({
            edu_earned: education.indexOf(event.target.value)
        });
    }
    onSubmitClick = (event) =>{
        let valid = true;
        this.setState({ invalidMeetAddress: "",
                        invalidBillAddress: "",
                        invalidCity: "",
                        invalidZip: "",
                        invalidStates:"",
                        invalidPhone:"",
                        invalidAltPhone:"",
                        invalidEduEarned:""
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
                id: this.props.id,
                descr: this.state.description,
                edu_earned: this.state.edu_earned
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
                    description: ret.description,
                    edu_earned: ret.edu_earned
                })
            })
        }
    render(){
        return (
            <div className='subpage-content'>
                <div className='primary-info'>
                    <h3>My Info</h3>
                    <div className="row">
                                <div className="col-6">
                                    <div className="entry-prompt">
                                        <label htmlFor="phone">Phone (XXX-XXX-XXXX):</label>
                                        <input type="text" value={this.state.phone} className="form-control" id="phone" onChange={this.onPhoneChange} />
                                        <div className={"invalid-entry "+this.state.invalidPhone}>Please enter a valid phone number!</div>
                                    </div>
                                </div>
                                <div className="col-6"> 
                                    <div className="entry-prompt">
                                        <label htmlFor="meetAddress">Preferred Meeting Address:</label>
                                        <input type="text" value={this.state.meetAddress} className="form-control" id="meetAddress" onChange={this.onMeetAddressChange}/>
                                        <div className={"invalid-entry "+this.state.invalidMeetAddress}>Please enter a meeting address!</div>
                                    </div>
                                </div>
                    </div>
                    <div className="row">
                                <div className="col-6">
                                    <div className="entry-prompt">
                                        <label htmlFor="alt-phone">Alternate Phone Number:</label>
                                        <input type="text" value={this.state.alt_phone} className="form-control" id="alt-phone" onChange={this.onAltPhoneChange} />
                                        <div className={"invalid-entry "+this.state.invalidAltPhone}>Please enter a valid phone number!</div>
                                    </div> 
                                </div>
                                <div className="col-6">
                                    <div className="entry-prompt">
                                    <label htmlhtmlFor="description">Description:</label>
                                    <textarea id="description" value={this.state.description} onChange={this.onDescriptionChange}/> 
                                    </div> 
                                </div>
                    </div>
                    <div className="row">
                            <div className="col-6">
                                    <div className="entry-prompt">
                                        <label htmlFor="edu-earned">Education:</label><br/>
                                        <select className="subj-select" onChange={this.onEduEarnedChange}>
                                        <option value="">Select Level...</option>
                                            {education.map(item=>{
                                                return(<option>{item}</option>)
                                                })}
                                        </select>
                                    </div> 
                            </div>
                    </div>
                </div>
                <div className='billing-info'>
                    <div className="myinfo-label">
                            <h3>Billing Info:</h3>
                    </div>
                    <div className="row">
                                <div className="col-6">
                                    <div className="entry-prompt">
                                        <label htmlFor="billAddress">Billing Address:</label>
                                        <input type="text" value={this.state.billAddress} className="form-control" id="billAddress" onChange={this.onBillAddressChange} />
                                        <div className={"invalid-entry "+this.state.invalidBillAddress}>Please enter a valid city!</div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="entry-prompt">
                                        <label htmlFor="city">City:</label>
                                        <input type="text" value={this.state.city} className="form-control" id="city" onChange={this.onCityChange} />
                                        <div className={"invalid-entry "+this.state.invalidCity}>Please enter a valid city!</div>
                                    </div>
                                </div>
                    </div>
                    <div className="row">
                                <div className="col-6">
                                    <div className="entry-prompt">
                                    <label htmlFor="states">State:</label><br/>
                                    <select className="date-select month-select" value={this.state.states} id="states" onChange={this.onStatesChange} required="">
                                        <option value="">State</option>
                                        {states.map(item=>{
                                        return(<option>{item}</option>)
                                        })}
                                    </select>
                                    <div className={"invalid-entry "+this.state.invalidStates}>Please enter a valid state!</div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="entry-prompt">
                                        <label htmlFor="zip">ZIP Code:</label>
                                        <input type="text" value={this.state.zip} className="form-control" id="zip" onChange={this.onZipChange} />
                                        <div className={"invalid-entry "+this.state.invalidZip}>Please enter a valid ZIP code!</div>
                                    </div>
                                </div>
                    </div>
                </div>
                <div className="myinfo-label">
                            <h3>My Subjects:</h3>
                </div>
                    <div className="subjects-info">
                            <div className="row">
                            <div className="col-6">
                            <select className="subj-select" onChange={this.onAddSubjChange}>
                                <option value="">Select Subject...</option>
                                {this.state.subjects.map(item=>{
                                    return(<option>{item}</option>)
                                    })} 
                            </select>
                            <select className="subj-select" onChange={this.onAddLvlChange}>
                               <option value="">Select Level...</option>
                                {lvls.map(item=>{
                                    return(<option>{item}</option>)
                                    })}
                            </select>
                            <a className="btn btn-orange btn-account" href="#" role="button" onClick={this.onAddSubjClick}>Add</a><br/>
                            </div>
                            <div className="col-6">
                            <select className="subj-interact" multiple onChange={this.onSubjSelectChange}>
                                {this.state.mysubjects.map(item=>{
                                    return(<option>{item}</option>)
                                    })}
                            </select>
                            <a className="btn btn-orange btn-account" href="#" role="button" onClick={this.onSubjRemoveClick}>Remove</a><br/>
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

export default TutorAccountInfo