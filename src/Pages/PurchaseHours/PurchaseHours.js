import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import PriceDisplay from '../../Components/PriceDisplay/PriceDisplay';
import PaymentForm from '../../Components/PaymentForm/PaymentForm';
import './PurchaseHours.css'

const hours  = [10,14,18,22,24,28,32,36,48,60,80,100];
const prices = [60,58,58,58,56,56,56,56,52,50,48,46];

class PurchaseHours extends Component{
    constructor(){
        super();
        this.state = {
            hoursState: 0,
            loaded: false,
            checkout: false
        };
    }
    
    componentDidMount(){
        // this.props.onNavChange(4);
        this.setState({
            loaded: this.props.loaded
        })
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
            { (this.props.signedIn && (this.props.memberType==='student')) ?
            <div>
                <div className="fg-hum">
                    <div className="page-title"><h2 align="center">Add Tutoring Hours</h2></div>
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
                    <div className="payment">
                    <div className="hours-select">
                        <a> Select Number of Hours: </a>
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
                    {(!this.state.checkout)&&<a className="btn btn-orange btn-checkout" href="#" role="button" onClick={()=>{this.setState({checkout: true})}}>Checkout</a>}
                    {this.state.loaded && this.state.checkout && <PaymentForm paymentForm={ window.SqPaymentForm }
                    />}
                    { this.state.checkout &&<a className="btn btn-orange btn-checkout" href="#" role="button" onClick={()=>{this.setState({checkout: false})}}>Back</a>}
                    </div>
                </div>
            </div>:
            <Redirect to="/" />
            }
            </div>
        );
    }
}

export default PurchaseHours;