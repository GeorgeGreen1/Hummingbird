import React, {Component} from 'react';
import TutorTableAdmin from '../../Components/TutorTableAdmin/TutorTableAdmin';
import {Redirect} from 'react-router-dom';

// Displays information on becoming a tutor

class TutorList extends Component{
    constructor(props){
        super(props);
        this.state = {
            tutors: []
        }
    }

    getSubjLvl (subjArr,lvlArr){
        let aggSubjLvl = [];
        for (let i = 0; i< subjArr.length; i++){
            aggSubjLvl.push({
                subject: subjArr[i],
                level: lvlArr[i]
            })
        }
        return aggSubjLvl;
    }

    componentDidMount(){
        fetch("http://localhost:3000/getalltutors",{
            method: 'get',
            headers: {'Content-Type' : 'application/json'},
        })
        .then(response=>
            response.json()
        ).then(ret => {
            let tuts = [];
            ret.map(item=>{
                tuts.push({
                    id: item.id,
                    firstname: item.firstname,
                    lastname: item.lastname,
                    email: item.email,
                    subjects: this.getSubjLvl(item.subject,item.level)
                });
            })
            this.setState({tutors: tuts})
        }
        )
    }
    render(){
        return (
            <div>
            { (this.props.signedIn && (this.props.memberType==='admin')) ?
            <div>
                <div className="fg-hum">
                    <div className="page-title"><h2 align="center">Full Tutor List</h2></div>
                    {this.state.tutors.length > 0 && <TutorTableAdmin tutors={this.state.tutors} />}
                </div>
            </div> : 
            <Redirect to="/" />}
            </div>
        );
    }
}

export default TutorList;