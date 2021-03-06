import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import frontbanner from './Images/banner-img.png';
import banner_1 from './Images/banner-img-1.png';
import banner_2 from './Images/banner-img-2.png';
import banner_3 from './Images/banner-img-3.png';
import banner_4 from './Images/banner-img-4.png';
import banner_5 from './Images/banner-img-5.png';
import NavBar from './Components/NavBar/NavBar';
import DefaultHome from './Pages/DefaultHome/DefaultHome';
import StudentHome from './Pages/StudentHome/StudentHome';
import AdminHome from './Pages/AdminHome/AdminHome';
import TutorHome from './Pages/TutorHome/TutorHome';
import AdminLogs from './Pages/AdminLogs/AdminLogs';
import JobPostings from './Pages/JobPostings/JobPostings';
import Tutor from './Pages/Tutor/Tutor';
import TutorList from './Pages/TutorList/TutorList';
import Pricing from './Pages/Pricing/Pricing';
import MySessions from './Pages/MySessions/MySessions';
import MySessionsStudent from './Pages/MySessions/MySessionsStudent';
import PurchaseHours from './Pages/PurchaseHours/PurchaseHours';
import FindTutor from './Pages/FindTutor/FindTutor';
import SignIn from './Pages/SignIn/SignIn';
import Register from './Pages/Register/Register';
import StudMyAccount from './Pages/StudMyAccount/StudMyAccount';
import TutorMyAccount from './Pages/TutorMyAccount/TutorMyAccount';
import UserProfile from './Pages/UserProfile/UserProfile';
import MatchUsers from './Pages/MatchUsers/MatchUsers';
import AdminSearch from './Pages/AdminSearch/AdminSearch';
//import TutorLogs from './Pages/TutorLogs/TutorLogs';

const bannerRotation = [banner_1,banner_2,banner_3,banner_4,banner_5];
const initState = {
  signedIn : true,
  email: "heloooiamcyunthiuh@gmail.com",
  name: "Todd",
  navbarElem: 0,
  member_type: 'admin',
  id: 5,
  loaded: false
}

class App extends Component {
  constructor(){
    super();
    this.state = initState;
  }

  componentWillMount(){
    const that = this;
    let sqPaymentScript = document.createElement('script');
    sqPaymentScript.src = "https://js.squareup.com/v2/paymentform";
    sqPaymentScript.type = "text/javascript"
    sqPaymentScript.async = false;
    sqPaymentScript.onload = ()=>{that.setState({
      loaded: true
    })};
    document.getElementsByTagName("head")[0].appendChild(sqPaymentScript);
  }

  // Sets the sign in state, this will likely be moved to a single shared function
  onSign = (sign,email,firstname,member_type,id) => {
    this.setState({signedIn: sign,
                   email: email,
                   name: firstname,
                   member_type: member_type,
                   id: id});
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
        renderComp: (this.state.signedIn === false) ? <DefaultHome subpage="who-we-are" signedIn={this.state.signedIn}  onNavChange={this.onNavChange}/> : ((this.state.member_type === 'tutor') ? <TutorHome memberType={this.state.member_type} signedIn={this.state.signedIn}  onNavChange={this.onNavChange} id={this.state.id} userName={this.state.name}/>:((this.state.member_type === 'admin')? <AdminHome memberType={this.state.member_type} signedIn={this.state.signedIn} id={this.state.id} userName={this.state.name}/>:<StudentHome memberType={this.state.member_type} signedIn={this.state.signedIn} id={this.state.id} userName={this.state.name}/>))
      },
      // "Why Take Action" subpage of home
      {
        path: "/why-take-action",
        renderComp: <DefaultHome subpage="why-take-action" signedIn={this.state.signedIn}/>
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
        renderComp: <PurchaseHours signedIn={this.state.signedIn} id={this.state.id} memberType={this.state.member_type} loaded={this.state.loaded}/>
      },
      // Find a tutor page
      {
        path: "/findtutor",
        renderComp: <FindTutor signedIn={this.state.signedIn} id={this.state.id} memberType={this.state.member_type}/>
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
      // Account Pages
      {
        path: "/account/",
        renderComp: <StudMyAccount signedIn={this.state.signedIn} memberType={this.state.member_type}/>
      },
      // My info
      {
        path: "/account/myinfo",
        renderComp: (this.state.member_type === 'tutor') ? <TutorMyAccount email={this.state.email} id={this.state.id} signedIn={this.state.signedIn} subpage='myinfo' member_type={this.state.member_type}/> : <StudMyAccount email={this.state.email} id={this.state.id} signedIn={this.state.signedIn} subpage='myinfo' member_type={this.state.member_type}/>
      },
      // My Account Settings
      {
        path: "/account/settings",
        renderComp: (this.state.member_type === 'tutor') ? <TutorMyAccount signedIn={this.state.signedIn} id={this.state.id} subpage='settings' member_type={this.state.member_type}/> : <StudMyAccount signedIn={this.state.signedIn} subpage='settings' id={this.state.id} member_type={this.state.member_type}/>
      },
      // Become a tutor
      {
        path: "/account/becomeatutor",
        renderComp: <StudMyAccount signedIn={this.state.signedIn} subpage="becomeatutor" memberType={this.state.member_type}/>
      },
      // Tutor application
      {
        path: "/account/becomeatutor/apply",
        renderComp: <StudMyAccount signedIn={this.state.signedIn} subpage="tutorapply" email={this.state.email} memberType={this.state.member_type}/>
      },
      {
        path: "/account/changepass",
        renderComp: (this.state.member_type === 'tutor') ? <TutorMyAccount signedIn={this.state.signedIn} id={this.state.id} subpage='changepass' member_type={this.state.member_type}/> : <StudMyAccount signedIn={this.state.signedIn} subpage='changepass' id={this.state.id} member_type={this.state.member_type}/>
      },
      // Tutor's sessions

      //Log session
      {
        path: "/mysessions/logsession",
        renderComp: <MySessions tutor_id={this.state.id} signedIn={this.state.signedIn} subpage="logsession" memberType={this.state.member_type}/>
      },
      // All logs
      {
        path: "/mysessions/all-logs",
        renderComp: <MySessions tutor_id={this.state.id} signedIn={this.state.signedIn} subpage="all-logs" memberType={this.state.member_type}/>
      },
      
      // Logs for admins to see
      {
        path: "/adminlogs",
        renderComp: <AdminLogs signedIn={this.state.signedIn} memberType={this.state.member_type}/>
      },
      // Job Postings for admins to see
      {
        path: "/jobpostings",
        renderComp: <JobPostings signedIn={this.state.signedIn} memberType={this.state.member_type}/>
      },
      // Tutor list for admins to see
      {
        path: "/tutorlist",
        renderComp: <TutorList signedIn={this.state.signedIn} memberType={this.state.member_type}/>
      },
      // Tutor list for admins to see
      {
        path: "/mysessionsstudent",
        renderComp: <MySessionsStudent id = {this.state.id} signedIn={this.state.signedIn} memberType={this.state.member_type}/>
      },
      // Interface for Admins to match students with tutors
      {
        path: "/matchusers",
        renderComp: <MatchUsers id = {this.state.id} signedIn={this.state.signedIn} memberType={this.state.member_type}/>
      },
      // Interface for Admins to search for users
      {
        path: "/adminsearch/adminalluserssearch",
        renderComp: <AdminSearch id = {this.state.id} signedIn={this.state.signedIn} subpage="usersearch" memberType={this.state.member_type}/>
      },
      {
        path: "/adminsearch/admintutorsubject",
        renderComp: <AdminSearch id = {this.state.id} signedIn={this.state.signedIn} subpage="tutorsubject" memberType={this.state.member_type}/>
      }
    ];
    return (
      <Router>
        <div className="app">
            {/* <img className="banner" src={banner} alt="banner" width='100%'/> */}
            <NavBar activeBtn={this.state.navbarElem} signedIn={this.state.signedIn} onSign={this.onSign} name={this.state.name} member_type={this.state.member_type} onNavChange={this.onNavChange}/>
            <div className="container">
            <img className="banner" src={bannerRotation[Math.floor(Math.random()*5)]} alt="banner" width='100%'/>
              {// Sets up the actual routes for each page
                routes.map(item => {
                  return(<Route exact path={item.path} render={()=>item.renderComp} />)
                })}
            <Route exact path="/userprofile/:id" render={({match})=><UserProfile signedIn={this.state.signedIn} match={match} querier_type={this.state.member_type} id={this.state.id}/>}/>
            {/* <Route exact path="/tutorlogs/:id" render={({match})=><TutorLogs match={match} querier_type={this.state.member_type}/>}/> */}
              <footer className="footer">
                  <div className="container">
                      <span> Take Action Tutoring &copy; 2019</span>
                  </div>
              </footer>
            </div>
        </div>
      </Router>
    );
  }
}

export default App;
