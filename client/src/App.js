import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import API from './utils/API';

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
  const [previousPath, setPreviousPathState] = useState('/');
  const [signedIn, setSignedIn] = useState(false);
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

  const idRef = useRef();

  const loadUserInfo = useCallback(() => {
    const id = sessionStorage.getItem('currentUserId');
    idRef.current = id;
    if (idRef.current) {
      API.getUser(id).then(res => {
        setUser(user => (res.data ? res.data : user));
      });
    } else {
      setUserSignedOut();
    }
  }, []);

  useEffect(() => {
    loadUserInfo();
  }, [loadUserInfo, signedIn]);

  const getPreviousPath = () => {
    return previousPath;
  };

  const setPreviousPath = path => {
    setPreviousPathState(path);
    console.log('previousPathApp:', previousPath);
  };

  useEffect(() => {
    const loadGoogle = () => {
      window.gapi.load('auth2', function() {
        /* Ready. Make a call to gapi.auth2.init or some other API */
        window.gapi.auth2.init({
          client_id:
            '1061415806670-1l8r6vaqn21lc7h45l0ethglqat21kls.apps.googleusercontent.com'
        });
        const GoogleAuth = window.gapi.auth2.getAuthInstance();

        GoogleAuth.isSignedIn.listen(setSignedIn);
      });
    };
    window.addEventListener('google-loaded', loadGoogle);
    if (previousPath) {
      console.log('previousPath:', true);
      loadGoogle();
    }
  }, [previousPath]);

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

    setUserSignedOut();
  };

  return (
    <div>
      <NavBar signedIn={signedIn} signOut={signOut} user={user} />
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
                setUser={setUser}
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
