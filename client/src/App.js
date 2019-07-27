import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//components
import Landing from './components/MainBody/Landing';
import MainBody from './components/MainBody/MainBody';
import Birthday from './components/QuestionComponents/Birthday';
import Nudges from './components/QuestionComponents/Nudges';
import Partner from './components/QuestionComponents/Partner';
import Phone from './components/QuestionComponents/Phone';
import Anniversary from './components/QuestionComponents/Anniversary';
import Header from './components/Header';

//CSS
import './styles.css';

class App extends Component {
  state = {
    previousPath: ''
  };

  setPreviousPath = path => {
    this.setState({
      previousPath: path
    });
  };

  getPreviousPath = () => {
    return this.state.previousPath;
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route
            exact
            path="/"
            render={routeProps => (
              <Landing {...routeProps} getPreviousPath={this.getPreviousPath} />
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
              <Nudges {...routeProps} setPreviousPath={this.setPreviousPath} />
            )}
          />
          <Route
            exact
            path="/partner"
            render={routeProps => (
              <Partner {...routeProps} setPreviousPath={this.setPreviousPath} />
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
    );
  }
}

export default App;
