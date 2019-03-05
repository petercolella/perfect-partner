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
    currentUserId: '',
    currentUser: '',
    currentUserMessage: 'Please Sign In.',
    imageUrl: ''
  };

  onSignIn = googleUser => {
    const profile = googleUser.getBasicProfile();
    const id_token = googleUser.getAuthResponse().id_token;
    console.log('ID: ' + profile.getId());
    console.log('Email: ' + profile.getEmail());

    if (profile.getName()) {
      this.setState({
        currentUser: profile.getName(),
        currentUserMessage: `Hello, ${profile.getName()}`,
        imageUrl: profile.getImageUrl()
      });
    }

    API.tokenSignInAxios(id_token).then(id => {
      console.log('currentUserId', id);
      this.setState({ currentUserId: id });
      sessionStorage.setItem('currentUserId', id);
    });
  };

  onSuccess = googleUser => {
    console.log('Signed in as: ' + googleUser.getBasicProfile().getName());
    this.onSignIn(googleUser);
  };

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
