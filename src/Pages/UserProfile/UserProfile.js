import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './UserProfile.css'

// Shows the different pricing options that are available to users

const levels = ["Elementary","Middle School","High School","College"];
const education = [
    "H.S. Diploma or Equivalent",
    "Associate's Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate"
];
class UserProfile extends Component{
    constructor(){
        super();
        this.state = {
            name: "",
            email: "",
            phone: "",
            city: "",
            ste: "",
            bill_addr: "",
            zip: "",
            id: -1,
            edu: "",
            years_exp: "",
            subjList: [],
            lvlList: [],
            member_type: "",
            description: "",
            redirect: false
        };
    }

    componentDidMount(){
        fetch("http://localhost:3000/getprofileinfo",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                querier_id: this.props.id,
                profile_id: this.props.match.params.id,
                querier_type: this.props.querier_type   
            })
        })
        .then(response=>
            response.json()
        ).then(elem => {
            if (elem === null){
                this.setState({redirect: true});
            }
            else{
                this.setState({
                    name: elem.firstname + " " + elem.lastname,
                    email: elem.email,
                    phone: elem.phone,
                    member_type: elem.member_type
                })
                if (elem.member_type === 'tutor'){
                    this.setState({
                        subjList: elem.subject,
                        lvlList: elem.level,
                        desc: elem.description
                    })
                }   
                if (this.props.querier_type === 'admin'){
                    this.setState({
                        bill_addr: elem.bill_addr,
                        city: elem.city,
                        ste: elem.state,
                        zip: elem.zip,
                        id: elem.id,
                        edu: elem.edu_earned,
                        years_exp: elem.years_exp
                    })
                }
            }
        }
        )
    }

    getSubjLvl(subjArr,lvlArr){
        let aggSubjLvl = [];
        for (let i = 0; i< subjArr.length; i++){
            aggSubjLvl.push({
                subject: subjArr[i],
                level: lvlArr[i]
            })
        }
        return aggSubjLvl;
    }

    getExpertiseList(subjLvlList){
        let n = subjLvlList.length;
        return subjLvlList.map((item,i) => {
            return (item.subject + " - " + levels[item.level] + ((i<(n-1))?", ":""))
        })
    }

    onTutorizeClick = () => {
        fetch("http://localhost:3000/tutorize",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                user_id: this.props.match.params.id
            })
        }).then(response => {
            response.json();
        }).then(ret=>{
            window.location.reload();
            this.setState({member_type: "tutorx"});
        })
    }

    goToLogs = () => {
        this.setState({
            redirect: true
        })
    }

    render(){
        return (
          <div>  
          { (this.props.signedIn 
          
          //&& ( (this.props.querier_type==='admin')|| ((this.props.querier_type==='tutor')&&(this.props.member_type==='student')) )
          
          ) ?
            (
            (this.state.redirect)?
            <Redirect to="/"/>
            :
            <div>
                <div className="fg-hum">
                    <div className="page-title"><h2 align="center">User Profile</h2></div>
                    <div className="inner-present home-page">
                    <h2>{this.state.name}</h2>                    
                    <p><b>{this.state.member_type.toUpperCase()}</b></p>
                    {
                    (this.props.querier_type!=='admin')?
                    <span><p><b>Email:</b> {this.state.email}</p></span>
                    :
                    <div>
                        <div className="row profile">
                            <div className="col-6">
                                <b>Email:</b> {this.state.email}
                            </div>
                            <div className="col-6">
                                <b>Phone:</b> {this.state.phone}
                            </div>
                        </div>
                        <div className="row profile">
                            <div className="col-6">
                                <b>Years of Experience:</b> {this.state.years_exp}
                            </div>
                            <div className="col-6">
                                <b>Education Earned:</b> {education[this.state.edu]}
                            </div>
                        </div>
                        <div className="row profile">
                            <div className="col-6">
                                <b>Location:</b> {this.state.city}, {this.state.ste}
                            </div>
                            {/* Organization needs to be different for non-admins */}
                            <div className="col-6">
                                <span><b>Billing Address:</b> {this.state.bill_addr} {this.state.zip}</span>
                            </div>
                        </div>
                    </div>}
                    {
                    (this.state.member_type==='tutor')?
                    <div className="row profile">
                        <div className="col-12">
                            {(this.state.subjList[0]===null)?null:<div><b>Subjects:</b><br/> {this.getExpertiseList(this.getSubjLvl(this.state.subjList,this.state.lvlList))}</div>}
                            {(this.props.querier_type!=='admin')?null:
                            <div>
                                <b>Description:</b><br/>{this.state.desc}<br/>
                            </div>}

                        </div>
                    </div>
                    :null
                    }
                    {
                        (this.props.querier_type==='admin'&&this.state.member_type==='student')?
                        <div className="account-btns">
                            <a className="btn btn-orange btn-account" href="#" role="button" onClick={this.onTutorizeClick}>Tutorize</a><br/>
                        </div>
                        :
                        null
                    }
                    </div>
                </div>
            </div>) : 
            <Redirect to="/" />}
            </div>
        );
    }
}

export default UserProfile;