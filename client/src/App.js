import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//components
import Landing from './components/Landing';
import MainBody from './components/MainBody';
import Birthday from './components/QuestionComponents/Birthday';
import NavBar from './components/NavBar';
import Nudges from './components/QuestionComponents/Nudges';
import Partner from './components/QuestionComponents/Partner';
import Phone from './components/QuestionComponents/Phone';
import Anniversary from './components/QuestionComponents/Anniversary';

//CSS
import './styles.css';

class App extends Component {
  state = {
    previousPath: '/'
  };

  setPreviousPath = path => {
    this.setState(
      {
        previousPath: path
      },
      () => console.log('previousPath:', this.state.previousPath)
    );
  };

  getPreviousPath = () => {
    return this.state.previousPath;
  };

  render() {
    return (
      <div>
        <NavBar />
        <BrowserRouter>
          <div>
            <Route
              exact
              path="/"
              render={routeProps => (
                <Landing
                  {...routeProps}
                  getPreviousPath={this.getPreviousPath}
                />
              )}
            />
            <Route
              exact
              path="/birthday"
              render={routeProps => (
                <Birthday
                  {...routeProps}
                  setPreviousPath={this.setPreviousPath}
                />
              )}
            />
            <Route
              exact
              path="/nudges"
              render={routeProps => (
                <Nudges
                  {...routeProps}
                  setPreviousPath={this.setPreviousPath}
                />
              )}
            />
            <Route
              exact
              path="/partner"
              render={routeProps => (
                <Partner
                  {...routeProps}
                  setPreviousPath={this.setPreviousPath}
                />
              )}
            />
            <Route
              exact
              path="/phone"
              render={routeProps => (
                <Phone {...routeProps} setPreviousPath={this.setPreviousPath} />
              )}
            />
            <Route
              exact
              path="/anniversary"
              render={routeProps => (
                <Anniversary
                  {...routeProps}
                  setPreviousPath={this.setPreviousPath}
                />
              )}
            />
            <Route
              exact
              path="/dashboard"
              render={routeProps => (
                <MainBody
                  {...routeProps}
                  setPreviousPath={this.setPreviousPath}
                />
              )}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
