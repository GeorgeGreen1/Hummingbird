import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import banner from './Images/banner-img.png';
import NavBar from './Components/NavBar/NavBar';
import DefaultHome from './Pages/DefaultHome/DefaultHome';
import StudentHome from './Pages/StudentHome/StudentHome';
import TutorHome from './Pages/TutorHome/TutorHome';
import Tutor from './Pages/Tutor/Tutor';
import Pricing from './Pages/Pricing/Pricing';
import PurchaseHours from './Pages/PurchaseHours/PurchaseHours';
import FindTutor from './Pages/FindTutor/FindTutor';
import SignIn from './Pages/SignIn/SignIn';
import Register from './Pages/Register/Register';
import StudMyAccount from './Pages/StudMyAccount/StudMyAccount';
import TutorMyAccount from './Pages/TutorMyAccount/TutorMyAccount';
const initState = {

  signedIn : false,
  email: "dave@davemail.com",
  name: "Dave",
  navbarElem: 0,
  member_type: 'student'
}

class App extends Component {
  constructor(){
    super();
    this.state = initState;
  }


  // Sets the sign in state, this will likely be moved to a single shared function
  onSign = (sign,email,firstname,member_type) => {
    this.setState({signedIn: sign,
                   email: email,
                   name: firstname,
                  member_type: member_type});
  };

  // Changes the nav bar display each time a route changes
  onNavChange = (i) =>{
    this.setState({navbarElem: i})
  }

  render() {
    let routes = 
    [ // Default (not signed in) page
      {
        path: "/",
        renderComp: (this.state.signedIn === false) ? <DefaultHome subpage="who-we-are" signedIn={this.state.signedIn}  onNavChange={this.onNavChange}/> : ((this.state.member_type === 'tutor') ? <TutorHome memberType={this.state.member_type} signedIn={this.state.signedIn}  onNavChange={this.onNavChange} userName={this.state.name}/>:<StudentHome memberType={this.state.member_type} signedIn={this.state.signedIn}  onNavChange={this.onNavChange} userName={this.state.name}/>)
      },
      // "Why Hummingbird" subpage of home
      {
        path: "/why-hummingbird",
        renderComp: <DefaultHome subpage="why-hummingbird" signedIn={this.state.signedIn}/>
      },
      // "Subjects" subpage of home
      {
        path: "/subjects",
        renderComp: <DefaultHome subpage="subjects" signedIn={this.state.signedIn}/>
      },
      // "Locations" subpage of home
      {
        path: "/locations",
        renderComp: <DefaultHome subpage="locations" signedIn={this.state.signedIn}/>
      },
      // "Become a tutor" page
      {
        path: "/tutor",
        renderComp: <Tutor signedIn={this.state.signedIn} />
      },
      // Pricing page
      
      {
        path: "/pricing",
        renderComp: <Pricing signedIn={this.state.signedIn} />
      },
      // Purchase Hours page
      {
        path: "/addhours",
        renderComp: <PurchaseHours signedIn={this.state.signedIn} />
      },
      // Find a tutor page
      {
        path: "/findtutor",
        renderComp: <FindTutor signedIn={this.state.signedIn}/>
      },

      // Sign in page
      { 
        path: "/signin",
        renderComp: <SignIn signedIn={this.state.signedIn}  onNavChange={this.onNavChange} onSetEmail={this.onSetEmail} onSetName={this.onSetName} onSign={this.onSign}/>
      },
      // Register page
      {
        path: "/register",
        renderComp: <Register signedIn={this.state.signedIn}  onNavChange={this.onNavChange} onSetEmail={this.onSetEmail} onSetName={this.onSetName} onSign={this.onSign}/>
      },
      {
        path: "/account/",
        renderComp: <StudMyAccount signedIn={this.state.signedIn} />
      },
      {
        path: "/account/myinfo",
        renderComp: (this.state.member_type === 'tutor') ? <TutorMyAccount signedIn={this.state.signedIn} subpage='myinfo'/> : <StudMyAccount signedIn={this.state.signedIn} subpage='myinfo'/>
      },
      {
        path: "/account/settings",
        renderComp: (this.state.member_type === 'tutor') ? <TutorMyAccount signedIn={this.state.signedIn} subpage='settings'/> : <StudMyAccount signedIn={this.state.signedIn} subpage='settings'/>
      },
      {
        path: "/account/becomeatutor",
        renderComp: <StudMyAccount signedIn={this.state.signedIn} subpage="becomeatutor"/>
      },
      {
        path: "/account/becomeatutor/apply",
        renderComp: <StudMyAccount signedIn={this.state.signedIn} subpage="tutorapply" email={this.state.email}/>
      }
    ];
    return (
      <Router>
        <div className="app container">
            <img className="banner" src={banner} alt="banner" width='100%'/>
            <NavBar activeBtn={this.state.navbarElem} signedIn={this.state.signedIn} onSign={this.onSign} name={this.state.name} member_type={this.state.member_type} onNavChange={this.onNavChange}/>
            {
              // Sets up the actual routes for each page
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
