import React, {Component} from 'react';
import "./PriceDisplay.css";

// Lists available prices for different package categories

class PriceDisplay extends Component{

    render(){
        return (
            <div className="price-display">
            <h3>{this.props.package}</h3>
            <table>
                <thead>
                    <tr>
                    <th>Hours</th>
                    <th>Price per hour</th>
                    </tr>
                </thead>
                <tr>
                    <td>{this.props.hours[0]}</td>
                    <td>${this.props.prices[0]}</td>
                </tr>
                <tr>
                    <td>{this.props.hours[1]}</td>
                    <td>${this.props.prices[1]}</td>
                </tr>
                <tr>
                    <td>{this.props.hours[2]}</td>
                    <td>${this.props.prices[2]}</td>
                </tr>
                <tr>
                    <td>{this.props.hours[3]}</td>
                    <td>${this.props.prices[3]}</td>
                </tr>
            </table>
            </div>
        );
    }
}

export default PriceDisplay;