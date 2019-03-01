import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../utils/API';

const styles = {
  marginTop: 120,
  imgStyle: {
    height: 96,
    width: 'auto'
  }
};

class SignIn extends Component {
  state = {
    currentUser: '',
    currentUserMessage: 'Please Sign In.',
    imageUrl: ''
  };

  createUser(profile) {
    API.saveUser({
      name: profile.getName(),
      email: profile.getEmail(),
      imageUrl: profile.getImageUrl()
    });
  }

  onSignIn = googleUser => {
    const profile = googleUser.getBasicProfile();
    const id_token = googleUser.getAuthResponse().id_token;
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    if (profile.getName()) {
      this.setState({
        currentUser: profile.getName(),
        currentUserMessage: `Hello, ${profile.getName()}`,
        imageUrl: profile.getImageUrl()
      });
    }

    API.getUserByEmail(profile.getEmail()).then(res => {
      const resUser = res.data.shift();

      if (!resUser) {
        this.createUser(profile);
      }
    });

    API.tokenSignInAxios(id_token);
  };

  onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());

    // ******* NEED REDIRECT CODE TO SEND TO PAGE FOR SIGN UP *************
    this.onSignIn(googleUser);
  }

  onFailure(error) {
    console.log(error);
  }

  componentDidMount() {
    window.gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: this.onSuccess,
      onfailure: this.onFailure
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row mx-auto">
            <div className="avatar-center">
              {this.state.imageUrl ? (
                <img
                  src={this.state.imageUrl}
                  alt="profile-img"
                  className="logo-avatar"
                />
              ) : (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  alt="profile-img"
                  style={styles.imgStyle}
                />
              )}
              <p className="lead">{this.state.currentUserMessage}</p>
              <p className="clicktext">
                Please click{' '}
                <Link to="/phone">
                  HERE
                  <br />
                </Link>{' '}
                to answer a question.
              </p>
            </div>
          </div>
        </div>
        <div id="my-signin2" />
      </div>
    );
  }
}

export default SignIn;
