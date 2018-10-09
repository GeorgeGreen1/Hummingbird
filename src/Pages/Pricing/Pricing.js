import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import scrabble from '../../Images/scrabble.jpeg'
import PriceDisplay from '../../Components/PriceDisplay/PriceDisplay';

// Shows the different pricing options that are available to users

const hours = [10,14,18,22,24,28,32,36,48,60,80,100];
const prices = [60,58,58,58,56,56,56,56,52,50,48,46];

class Pricing extends Component{
    componentDidMount(){
        // this.props.onNavChange(1);
    }
    render(){
        return (
          <div>  
          { (!this.props.signedIn) ?
            <div>
                <div className="fg-hum">
                    <h2 align="center"> Price Options </h2>
                    <p> As a student, you have several options prices depending on the number of tutoring hours you wish to purchase at a single time.
                        These options are split into three levels shown below. 
                    </p>
                    <div className="row pricing-window">
                        <div className="col-4">
                            <PriceDisplay package="Bronze" hours={hours.slice(0,4)} prices={prices.slice(0,4)}/>
                        </div>
                        <div className="col-4">
                            <PriceDisplay package="Silver" hours={hours.slice(4,8)} prices={prices.slice(4,8)}/>
                        </div>
                        <div className="col-4">
                            <PriceDisplay package="Gold"  hours={hours.slice(8)} prices={prices.slice(8)}/>
                        </div>
                    </div>
                </div>
            </div> : 
            <Redirect to="/" />}
            </div>
        );
    }
}

export default Pricing;