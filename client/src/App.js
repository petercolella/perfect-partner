import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import API from './utils/API';

import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Birthday from './components/QuestionComponents/Birthday';
import NavBar from './components/NavBar';
import Nudges from './components/QuestionComponents/Nudges';
import Partner from './components/QuestionComponents/Partner';
import Phone from './components/QuestionComponents/Phone';
import Anniversary from './components/QuestionComponents/Anniversary';
import SnackbarContentWrapper from './components/SnackbarContentWrapper';

import './styles.css';

const noUser = {
  anniversaryDate: '',
  birthDate: '',
  email: '',
  firstName: '',
  imageUrl:
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
  lastName: '',
  name: '',
  nudges: [],
  partnerName: '',
  phone: ''
};

const Transition = props => {
  return <Slide {...props} direction="up" />;
};

const App = () => {
  const [message, setMessage] = useState(null);
  const [signedIn, setSignedIn] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [user, setUser] = useState(noUser);
  const [variant, setVariant] = useState(null);

  const handleSnackbarOpen = (message, variant) => {
    setMessage(message);
    setVariant(variant);
    setSnackbarOpen(true);
  };

  const signOut = useCallback(() => {
    if (window.gapi && window.gapi.auth2) {
      const GoogleAuth = window.gapi.auth2.getAuthInstance();
      GoogleAuth.signOut()
        .then(function() {
          console.log('User signed out.');
        })
        .catch(err => console.log(err));
    }

    setUserSignedOut();
    sessionStorage.removeItem('currentUserId');
    sessionStorage.removeItem('id_token');
  }, []);

  const loadUserInfo = useCallback(() => {
    const id = sessionStorage.getItem('currentUserId');
    if (id) {
      setSignedIn(true);
      API.getUser(id)
        .then(res => {
          setUser(user => (res.data ? res.data : user));
        })
        .catch(err => {
          const errStr = err.response.data.split(', ')[0];
          console.log(errStr);
          handleSnackbarOpen(errStr, 'error');
          signOut();
        });
    } else {
      signOut();
    }
  }, [signOut]);

  const onSuccess = useCallback(
    googleUser => {
      console.log('Signed in as: ' + googleUser.getBasicProfile().getName());
      const id_token = googleUser.getAuthResponse().id_token;
      sessionStorage.setItem('id_token', id_token);

      API.tokenSignInAxios(id_token)
        .then(id => {
          sessionStorage.setItem('currentUserId', id);
          loadUserInfo();
        })
        .catch(err => {
          console.log(err.response.data);
          handleSnackbarOpen(err.response.data, 'error');
          signOut();
        });
    },
    [loadUserInfo, signOut]
  );

  const onFailure = error => {
    console.log(error);
  };

  const renderGoogleLoginButton = useCallback(() => {
    console.log('rendering google signin button');
    window.gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 180,
      height: 30,
      longtitle: true,
      theme: 'dark',
      onsuccess: onSuccess,
      onfailure: onFailure
    });
  }, [onSuccess]);

  useEffect(() => {
    const loadGoogle = () => {
      console.log('loadGoogle');
      window.gapi.load('auth2', function() {
        window.gapi.auth2.init({
          client_id:
            '1061415806670-1l8r6vaqn21lc7h45l0ethglqat21kls.apps.googleusercontent.com'
        });

        const GoogleAuth = window.gapi.auth2.getAuthInstance();

        renderGoogleLoginButton();

        GoogleAuth.isSignedIn.listen(setSignedIn);
      });
    };
    loadUserInfo();

    window.addEventListener('google-loaded', loadGoogle);
  }, [loadUserInfo, renderGoogleLoginButton]);

  const setUserSignedOut = () => {
    setUser(noUser);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        TransitionComponent={Transition}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}>
        <SnackbarContentWrapper
          onClose={handleSnackbarClose}
          variant={variant}
          message={message}
        />
      </Snackbar>
      <CssBaseline />
      <BrowserRouter>
        <>
          <NavBar
            setUser={setUser}
            signedIn={signedIn}
            signOut={signOut}
            user={user}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={routeProps => (
                <Landing {...routeProps} signedIn={signedIn} user={user} />
              )}
            />
            <Route
              exact
              path="/anniversary"
              render={routeProps => (
                <Anniversary
                  {...routeProps}
                  loadUserInfo={loadUserInfo}
                  signedIn={signedIn}
                  user={user}
                />
              )}
            />
            <Route
              exact
              path="/birthday"
              render={routeProps => (
                <Birthday
                  {...routeProps}
                  loadUserInfo={loadUserInfo}
                  signedIn={signedIn}
                  user={user}
                />
              )}
            />
            <Route
              exact
              path="/nudges"
              render={routeProps => (
                <Nudges
                  {...routeProps}
                  loadUserInfo={loadUserInfo}
                  signedIn={signedIn}
                  user={user}
                />
              )}
            />
            <Route
              exact
              path="/partner"
              render={routeProps => (
                <Partner
                  {...routeProps}
                  loadUserInfo={loadUserInfo}
                  signedIn={signedIn}
                  user={user}
                />
              )}
            />
            <Route
              exact
              path="/phone"
              render={routeProps => (
                <Phone
                  {...routeProps}
                  loadUserInfo={loadUserInfo}
                  signedIn={signedIn}
                  user={user}
                />
              )}
            />
            <Route
              exact
              path="/dashboard"
              render={routeProps => (
                <Dashboard
                  {...routeProps}
                  loadUserInfo={loadUserInfo}
                  setUser={setUser}
                  signedIn={signedIn}
                  user={user}
                />
              )}
            />
            <Route
              render={routeProps => (
                <Landing {...routeProps} signedIn={signedIn} user={user} />
              )}
            />
          </Switch>
        </>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
