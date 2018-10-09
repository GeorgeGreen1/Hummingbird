import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import PriceDisplay from '../../Components/PriceDisplay/PriceDisplay';
import './PurchaseHours.css'

const hours  = [10,14,18,22,24,28,32,36,48,60,80,100];
const prices = [60,58,58,58,56,56,56,56,52,50,48,46];

class PurchaseHours extends Component{
    constructor(){
        super();
        this.state = {
            hoursState: 0
        };
    }
    
    componentDidMount(){
        // this.props.onNavChange(4);
    }

    // GET HOURS
    onHoursChange = (event) => {
        let val = parseInt(event.target.value);
        if (!(isNaN(val))){
            let val = parseInt(event.target.value);
            let i = hours.indexOf(val);
            this.setState({hoursState: hours[i]*prices[i]});
        }
    }

    render(){
        return (
            <div>
            { (this.props.signedIn) ?
            <div>
                <div className="fg-hum">
                    <h2 align="center"> Add Tutoring Hours </h2>
                    <div className="row pricing-window">
                        <div className="col-4">
                            <PriceDisplay package="Bronze" prices={prices.slice(0,4)} hours={hours.slice(0,4)}/>
                        </div>
                        <div className="col-4">
                            <PriceDisplay package="Silver" prices={prices.slice(4,8)} hours={hours.slice(4,8)}/>
                        </div>
                        <div className="col-4">
                            <PriceDisplay package="Gold"  prices={prices.slice(8)} hours={hours.slice(8)}/>
                        </div>
                    </div>
                    <div className="hours-select">
                        <a className="ee" align="center"> Select Number of Hours: </a>
                        <select class="price-select" id="state" onChange={this.onHoursChange} required="">
                            <option value="">Select...</option>
                            {hours.map(item=>{
                            return(<option>{item}</option>)
                            })}
                        </select>
                    </div> 
                    <div className="current-price">
                    <a>Current Price: ${this.state.hoursState}.00</a>
                    </div>
                    <a className="btn btn-checkout" href="#" role="button" onClick={this.pageDown}>Checkout</a>
                </div>
                <footer class="footer">
                    <div class="container">
                        <span> Hummingbird Tutoring &copy; 2018</span>
                    </div>
                </footer>
            </div>:
            <Redirect to="/" />
            }
            </div>
        );
    }
}

export default PurchaseHours;