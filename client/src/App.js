import React, { useState } from 'react';
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

const App = () => {
  const [previousPath, setPreviousPathState] = useState('');

  const setPreviousPath = path => {
    setPreviousPathState(path);
    console.log('previousPathApp:', previousPath);
  };

  const getPreviousPath = () => {
    return previousPath;
  };

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
                getPreviousPath={getPreviousPath}
                setPreviousPath={setPreviousPath}
              />
            )}
          />
          <Route
            exact
            path="/birthday"
            render={routeProps => (
              <Birthday {...routeProps} setPreviousPath={setPreviousPath} />
            )}
          />
          <Route
            exact
            path="/nudges"
            render={routeProps => (
              <Nudges {...routeProps} setPreviousPath={setPreviousPath} />
            )}
          />
          <Route
            exact
            path="/partner"
            render={routeProps => (
              <Partner {...routeProps} setPreviousPath={setPreviousPath} />
            )}
          />
          <Route
            exact
            path="/phone"
            render={routeProps => (
              <Phone {...routeProps} setPreviousPath={setPreviousPath} />
            )}
          />
          <Route
            exact
            path="/anniversary"
            render={routeProps => (
              <Anniversary {...routeProps} setPreviousPath={setPreviousPath} />
            )}
          />
          <Route
            exact
            path="/dashboard"
            render={routeProps => (
              <MainBody {...routeProps} setPreviousPath={setPreviousPath} />
            )}
          />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
