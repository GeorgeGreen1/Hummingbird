import React, {Component} from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import banner from '../../Images/banner-img.png';
import PriceDisplay from '../../Components/PriceDisplay/PriceDisplay';

class Pricing extends Component{
    constructor(props){
        super(props);
        this.state = {
            bronzePrice : 60,
            silverPrice : 56,
            goldPrice : 52
        };
      }

      handleBronzeChange = (event) => {
        let val;
        switch (parseInt(event.target.value)){
            case 10:
                val = 60;
                break;
            case 14:
                val = 58;
                break;
            case 18:
                val = 58;
                break;
            case 22:
                val = 58;
                break;
            default:
                val = "";
        }
        this.setState({bronzePrice : val});
      }
      handleSilverChange = (event) => {
        let val;
        switch (parseInt(event.target.value)){
            case 24:
                val = 56;
                break;
            case 28:
                val = 56;
                break;
            case 32:
                val = 56;
                break;
            case 36:
                val = 56;
                break;
            default:
                val = "";
        }
        this.setState({silverPrice : val});
      }
      handleGoldChange = (event) => {
        let val;
        switch (parseInt(event.target.value)){
            case 48:
                val = 52;
                break;
            case 60:
                val = 50;
                break;
            case 80:
                val = 48;
                break;
            case 100:
                val = 46;
                break;
            default:
                val = "";
        }
        this.setState({goldPrice : val});
    }

      hoursPrice = [[[10,60],[14,58],[18,58],[22,58]],
      [[24,56],[28,56],[32,56],[36,56]],
      [[48,52],[60,50],[80,48],[100,46]]];

      hoursPrice = [[10,14,18,22],[24,28,32,36],[48,60,80,100]];
    render(){
        return (
            <div className="container">
                <img src={banner} alt="banner" width='100%'/>
                <NavBar activeBtn={["","active","","",""]}/>
                <div className="fg-hum">
                    <h2 align="center"> Package Options </h2>
                    <div className="row sub-window">
                        <div className="col-4">
                            <PriceDisplay package="Bronze" bgCol="#72553C" hoursOptions={this.hoursPrice[0]} onHourschange={this.handleBronzeChange} hours={this.state.bronzePrice}/>
                        </div>
                        <div className="col-4">
                            <PriceDisplay package="Silver" bgCol="#8CB8BA" hoursOptions={this.hoursPrice[1]} onHourschange={this.handleSilverChange} hours={this.state.silverPrice}/>
                        </div>
                        <div className="col-4">
                            <PriceDisplay package="Gold" bgCol="#FFD700" hoursOptions={this.hoursPrice[2]} onHourschange={this.handleGoldChange} hours={this.state.goldPrice}/>
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