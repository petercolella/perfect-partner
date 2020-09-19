import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import Anniversary from './pages/Anniversary';
import Birthday from './pages/Birthday';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import NavBar from './components/NavBar';
import Nudges from './pages/Nudges';
import Partner from './pages/Partner';
import Phone from './pages/Phone';
import SnackbarComponent from './components/SnackbarComponent';

import './styles.css';

const App = () => {
  return (
    <>
      <SnackbarComponent />
      <CssBaseline />
      <BrowserRouter>
        <>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/anniversary" component={Anniversary} />
            <Route exact path="/birthday" component={Birthday} />
            <Route exact path="/nudges" component={Nudges} />
            <Route exact path="/partner" component={Partner} />
            <Route exact path="/phone" component={Phone} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route component={Landing} />
          </Switch>
        </>
      </BrowserRouter>
    </>
  );
};

export default App;
