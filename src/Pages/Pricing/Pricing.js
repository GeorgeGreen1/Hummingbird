import React, {Component} from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import banner from '../../Images/banner-img.png';
import PriceDisplay from '../../Components/PriceDisplay/PriceDisplay';


const hours = [10,14,18,22,24,28,32,36,48,60,80,100];
const prices = [60,58,58,58,56,56,56,56,52,50,48,46];

class Pricing extends Component{
    componentDidMount(){
        this.props.onNavChange(1);
    }
    render(){
        return (
            <div>
                <div className="fg-hum">
                    <h2 align="center"> Package Options </h2>
                    <div className="row sub-window">
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
                <footer class="footer">
                    <div class="container">
                        <span> Hummingbird Tutoring &copy; 2018</span>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Pricing;