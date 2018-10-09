import React, {Component} from 'react';
import './StudMyAccountParts.css';

// The available locations

class TutorApply extends Component {

    onTutor = () => {
        console.log("Jeg Heter Tutor")
        fetch("http://localhost:3000/tutorize",{
                method: 'post',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    email: this.props.email,
                  })
        })
    }
    render(){
        return (
            <div className='subpage-content'>
                <a class="btn btn-orange" href="#" role="button" onClick={this.onTutor}>Click Here to Become a Tutor</a>
            </div>
        );
    }
}

export default TutorApply;