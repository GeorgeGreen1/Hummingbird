import React, {Component} from 'react';

class SelectStudent extends Component{
    constructor(){
        super();
        this.state = {
            students: []
        };
    }


    componentDidMount(){
        fetch("http://localhost:3000/getstudents",{
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            id: this.props.id
        })
    })
        .then(response=>
            response.json()
        ).then(ret => {
                let studs = [];
                ret.map(item=>{
                    studs.push({
                        id: item.id,
                        firstname: item.firstname,
                        lastname: item.lastname
                    });
                })
                this.setState({students: studs})
            }
        )
    }

    render(){
        return(
            <div id="student">
                <select className="student"  required="" onChange={this.props.onStudChange}>
                    <option value="">Select Student...</option>
                    {this.state.students.map(item=>{
                    return(<option>{item.id} - {item.lastname}, {item.firstname}</option>)
                    })}
                </select>
             </div>
        )
    }
}

export default SelectStudent;