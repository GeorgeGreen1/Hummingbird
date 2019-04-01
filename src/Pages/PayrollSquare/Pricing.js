import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
// Shows the different pricing options that are available to users

const hours = [10,14,18,22,24,28,32,36,48,60,80,100];
const prices = [60,58,58,58,56,56,56,56,52,50,48,46];

class PayrollSquare extends Component{
    componentDidMount(){
        // this.props.onNavChange(1);
    }
    render(){
        return (
          <div>  
              Go to Square
            </div>
        );
    }
}

export default PayrollSquare;