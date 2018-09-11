import React, {Component} from 'react';
import "./PriceDisplay.css";

class PriceDisplay extends Component{
    render(){
        return (
            <div className="inner-present price-display">
                <div className="label" style={{"background-color": `${this.props.bgCol}`}}>
                <h1> {this.props.package} </h1>
                </div>
                <a>Select number of hours: </a>
                <select class="" id="state" required="" onChange={this.props.onHourschange}>
                {this.props.hoursOptions.map((item) => {
                    return <option>{item}</option>
                }
                )}
                </select><br/>
                <div className="price-view">
                    <a>Price:</a>
                    <h2>${this.props.hours}/hr</h2>
                </div>
            </div>
        );
    }
}

export default PriceDisplay;