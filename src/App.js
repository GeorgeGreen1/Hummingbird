import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import banner from './Images/banner-img.png';
import NavBar from './Components/NavBar/NavBar';
import DefaultHome from './Pages/DefaultHome/DefaultHome';
import StudentHome from './Pages/StudentHome/StudentHome';
import Pricing from './Pages/Pricing/Pricing';
import PurchaseHours from './Pages/PurchaseHours/PurchaseHours';
import Tutor from './Pages/Tutor/Tutor';
import SignIn from './Pages/SignIn/SignIn';
import Register from './Pages/Register/Register';

const initState = {
  signedIn : false,
  email: "",
  name: "",
  navbarElem: 0
}

class App extends Component {
  constructor(){
    super();
    this.state = initState;
  }

  onSetName = (name) => {
    this.setState({name: name});
  };

  onSetEmail = (email) => {
    this.setState({email: email});
  };

  onSignOut = () => {
    const {signedIn, email, name, navbarElem} = initState;
    this.setState({signedIn: signedIn,
                   email: email,
                   name: name,
                   navbarElem: navbarElem});
  }

  onSign = (input) => {
    this.setState({signedIn: input});
  };

  onNavChange = (i) =>{
    this.setState({navbarElem: i})
  }

  render() {
    let routes = 
    [ // Default (not signed in) page
      {
        path: "/",
        renderComp: (this.state.signedIn === false) ? <DefaultHome subpage="who-we-are" signedIn={this.state.signedIn} onSign={this.onSign} onNavChange={this.onNavChange}/> : <StudentHome signedIn={this.state.signedIn} onSign={this.onSign} onNavChange={this.onNavChange} userName={this.state.name}/>
      },
      // "Why Hummingbird" subpage of home
      {
        path: "/why-hummingbird",
        renderComp: <DefaultHome subpage="why-hummingbird" signedIn={this.state.signedIn} onSign={this.onSign} onNavChange={this.onNavChange}/>
      },
      // "Subjects" subpage of home
      {
        path: "/subjects",
        renderComp: <DefaultHome subpage="subjects" signedIn={this.state.signedIn} onSign={this.onSign} onNavChange={this.onNavChange}/>
      },
      // "Locations" subpage of home
      {
        path: "/locations",
        renderComp: <DefaultHome subpage="locations" signedIn={this.state.signedIn} onSign={this.onSign} onNavChange={this.onNavChange}/>
      },
      // Pricing page
      {
        path: "/pricing",
        renderComp: <Pricing signedIn={this.state.signedIn} onSign={this.onSign} onNavChange={this.onNavChange}/>
      },
      // Pricing page
      {
        path: "/purchasehours",
        renderComp: <PurchaseHours signedIn={this.state.signedIn} onSign={this.onSign} onNavChange={this.onNavChange}/>
      },
      // "Become a tutor" page
      {
        path: "/tutor",
        renderComp: <Tutor signedIn={this.state.signedIn} onSign={this.onSign} onNavChange={this.onNavChange}/>
      },
      // Sign in page
      {
        path: "/signin",
        renderComp: <SignIn signedIn={this.state.signedIn} onSign={this.onSign} onNavChange={this.onNavChange} onSetEmail={this.onSetEmail} onSetName={this.onSetName}/>
      },
      // Register page
      {
        path: "/register",
        renderComp: <Register signedIn={this.state.signedIn} onSign={this.onSign} onNavChange={this.onNavChange} onSetEmail={this.onSetEmail} onSetName={this.onSetName}/>
      },
      // Profile page
      {
        path: "/profile/:user",
        renderComp: <Register signedIn={this.state.signedIn} onSign={this.onSign}/>
      },
    ];
    return (
      <Router>
        <div className="app container">
            <img className="banner" src={banner} alt="banner" width='100%'/>
            <NavBar activeBtn={this.state.navbarElem} signedIn={this.state.signedIn} onSignOut={this.onSignOut}/>
            {
              routes.map(item => {
                return(<Route exact path={item.path} render={()=>item.renderComp} />)
              })
            }
        </div>
      </Router>
    );
  }
}

export default App;
