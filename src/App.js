import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Home from './Pages/Home/Home';
import Pricing from './Pages/Pricing/Pricing';
import Tutor from './Pages/Tutor/Tutor';
import SignIn from './Pages/SignIn/SignIn';
import Register from './Pages/Register/Register';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path="/" render={()=><Home subpage="who-we-are"/>} />
          <Route exact path="/why-hummingbird" render={()=><Home subpage="why-hummingbird"/>} />
          <Route exact path="/subjects" render={()=><Home subpage="subjects"/>} />
          <Route exact path="/locations" render={()=><Home subpage="locations"/>} />
          <Route exact path="/pricing" component={Pricing}/>
          <Route exact path="/tutor" component={Tutor}/>
          <Route exact path="/signin" component={SignIn}/>
          <Route exact path="/register" component={Register}/>
        </div>
      </Router>
    );
  }
}

export default App;
