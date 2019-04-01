import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './UserProfile.css'

// Shows the different pricing options that are available to users


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
                id: this.props.match.params.id,
                member_type: this.props.match.params.membertype,
                querier_type: this.props.querier_type   
            })
        })
        .then(response=>
            response.json()
        ).then(ret => {
            let elem = ret[0];
            this.setState({
                name: elem.firstname + " " + elem.lastname,
                email: elem.email,
                phone: elem.phone,
                city: elem.city,
                ste: elem.state,
                zip: elem.zip,
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
                    id: elem.id
                })
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

    getExpList(subjLvlList){
        let n = subjLvlList.length;
        return subjLvlList.map((item,i) => {
            return (item.subject + " - " + item.level + ((i<(n-1))?", ":""))
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
          { (this.props.signedIn && ( (this.props.querier_type==='admin')|| ((this.props.querier_type==='tutor')&&(this.props.member_type==='student')) )) ?
            (
            (this.state.redirect)?
            <Redirect to={"../tutorlogs/"+this.state.id}/>
            :
            <div>
                <div className="fg-hum">
                    <div className="page-title"><h2 align="center">User Profile</h2></div>
                    <div className="inner-present home-page">
                    <h2>{this.state.name}</h2>
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
                            <b>Location:</b> {this.state.city}, {this.state.ste}
                        </div>
                        {/* Organization needs to be different for non-admins */}
                        <div className="col-6">
                        {(this.props.querier_type==='admin')?<span><b>Billing Address:</b> {this.state.bill_addr} {this.state.zip}</span>:""}
                        </div>
                    </div>
                    {
                    (this.state.member_type==='tutor')?
                    <div className="row profile">
                        <div className="col-12">
                            {(this.state.subjList[0]===null)?null:<div><b>Subjects:</b><br/> {this.getExpList(this.getSubjLvl(this.state.subjList,this.state.lvlList))}</div>}
                            {(this.state.desc==="")?null:<div><b>Description:</b><br/>{this.state.desc}<br/></div>}
                            {<div className="view-logs"><a className="btn btn-orange btn-account" href="#" role="button" onClick={this.goToLogs}>View Logs</a></div>}

                        </div>
                    </div>
                    :null
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