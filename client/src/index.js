import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

//components
import About from './components/MainBody/About/About';
import Landing from './components/MainBody/Landing';
import Nav from './components/Header/Nav';
import MainBody from './components/MainBody/MainBody';
import RegistrationWizard from './components/MainBody/RegistrationWizard/RegistrationWizard';
import Profile from './components/MainBody/Profile';
// import Dashboard from './components/MainBody/Dashboard/Dashboard';
import Birthday from './components/QuestionComponents/Birthday';
import Nudges from './components/QuestionComponents/Nudges';
import Partner from './components/QuestionComponents/Partner';
import Phone from './components/QuestionComponents/Phone';
import Anniversary from './components/QuestionComponents/Anniversary';
import NudgeDB from './components/MainBody/Nudgedb';

//CSS
import './styles.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav />
          <Route exact path="/landing" component={Landing} />
          <Route exact path="/" component={MainBody} />
          <Route exact path="/about" component={About} />
          <Route exact path="/registration" component={RegistrationWizard} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/dashboard" component={MainBody} />
          <Route exact path="/birthday" component={Birthday} />
          <Route exact path="/nudges" component={Nudges} />
          <Route exact path="/partner" component={Partner} />
          <Route exact path="/phone" component={Phone} />
          <Route exact path="/anniversary" component={Anniversary} />
          <Route exact path="/nudgedb" component={NudgeDB} />
        </div>
      </BrowserRouter>
    );
  }
}

render(<App />, document.getElementById('root'));
