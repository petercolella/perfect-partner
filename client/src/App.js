import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import API from './utils/API';

//components
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Birthday from './components/QuestionComponents/Birthday';
import NavBar from './components/NavBar';
import Nudges from './components/QuestionComponents/Nudges';
import Partner from './components/QuestionComponents/Partner';
import Phone from './components/QuestionComponents/Phone';
import Anniversary from './components/QuestionComponents/Anniversary';

//CSS
import './styles.css';

const App = () => {
  const [signedIn, setSignedIn] = useState(true);
  const [user, setUser] = useState({
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
  });

  const loadUserInfo = useCallback(() => {
    const id = sessionStorage.getItem('currentUserId');
    if (id) {
      API.getUser(id).then(res => {
        setUser(user => (res.data ? res.data : user));
      });
    } else {
      setSignedIn(false);
      setUserSignedOut();
    }
  }, []);

  const onSuccess = googleUser => {
    console.log('Signed in as: ' + googleUser.getBasicProfile().getName());
    const id_token = googleUser.getAuthResponse().id_token;

    API.tokenSignInAxios(id_token).then(id => {
      sessionStorage.setItem('currentUserId', id);
      API.getUser(id).then(res => {
        setUser(user => (res.data ? res.data : user));
      });
    });

    setSignedIn(true);
  };

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
  }, []);

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
    setUser({
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
    });
  };

  const signOut = () => {
    const GoogleAuth = window.gapi.auth2.getAuthInstance();
    GoogleAuth.signOut().then(function() {
      console.log('User signed out.');
    });

    sessionStorage.setItem('currentUserId', '');

    setSignedIn(false);
    setUserSignedOut();
  };

  return (
    <>
      <NavBar
        setUser={setUser}
        signedIn={signedIn}
        signOut={signOut}
        user={user}
      />
      <BrowserRouter>
        <>
          <Route
            exact
            path="/"
            render={routeProps => (
              <Landing {...routeProps} signedIn={signedIn} user={user} />
            )}
          />
          <Route
            exact
            path="/birthday"
            render={routeProps => (
              <Birthday
                {...routeProps}
                loadUserInfo={loadUserInfo}
                user={user}
              />
            )}
          />
          <Route
            exact
            path="/nudges"
            render={routeProps => (
              <Nudges {...routeProps} loadUserInfo={loadUserInfo} user={user} />
            )}
          />
          <Route
            exact
            path="/partner"
            render={routeProps => (
              <Partner
                {...routeProps}
                loadUserInfo={loadUserInfo}
                user={user}
              />
            )}
          />
          <Route
            exact
            path="/phone"
            render={routeProps => (
              <Phone {...routeProps} loadUserInfo={loadUserInfo} user={user} />
            )}
          />
          <Route
            exact
            path="/anniversary"
            render={routeProps => (
              <Anniversary
                {...routeProps}
                loadUserInfo={loadUserInfo}
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
        </>
      </BrowserRouter>
    </>
  );
};

export default App;
