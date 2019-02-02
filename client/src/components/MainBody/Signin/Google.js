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
        }).catch(err => {
            console.log(err);
        });
    }

    onSignIn = googleUser => {
        var profile = googleUser.getBasicProfile();
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

        this.createUser(googleUser.getBasicProfile());
    };

    onSuccess(googleUser) {
        console.log('Logged in as: ' + googleUser.getBasicProfile().getName());

        // ******* NEED REDIRECT CODE TO SEND TO PAGE FOR SIGN UP *************
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
            onsuccess: this.onSignIn,
            onfailure: this.onFailure
        });
    }

    render() {
        return (
            <div style={styles} className="container">
                <div className="jumbotron">
                    <h1 className="text-center display-4">
                        Welcome to the Landing Page!
                    </h1>
                    <hr />
                    <div className="row">
                        <div className="col-4">
                            <p className="lead">{this.state.currentUserMessage}</p>
                            {this.state.imageUrl ? (
                                <img src={this.state.imageUrl} alt="profile-img" />
                            ) : (
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                                    alt="profile-img"
                                    style={styles.imgStyle}
                                />
                            )}
                        </div>
                        <div className="col-8">
                            <p>
                                Please click <Link to="/phone">HERE</Link> to answer a question.
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
