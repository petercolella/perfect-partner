import React, { Component } from 'react';
import Modal from '../Modal';
import API from '../../../utils/API';
import Helmet from 'react-helmet';
const $ = window.$;

class Anniversary extends Component {
  state = {
    User: {},
    userEmail: '',
    title: 'Anniversary',
    question: 'What is your anniversary date?',
    userField: '',
    nextQuestionLink: '/nudges'
  };

  initClient = function() {
    const self = this;
    window.gapi.load('auth2', function() {
      window.gapi.auth2
        .init({
          client_id:
            '773798651320-0da27e8d6k9mo9ldaijdlupeib1r56jq.apps.googleusercontent.com'
        })
        .then(
          GoogleAuth => {
            const userProfile = GoogleAuth.currentUser.get().getBasicProfile();
            if (userProfile) {
              const currentUserEmail = userProfile.getEmail();
              self.setState(
                {
                  userEmail: currentUserEmail
                },
                () => {
                  self.loadUserInfo();
                }
              );
            }
          },
          err => {
            console.log(err);
          }
        );
    });
  };

  componentDidMount() {
    this.initClient();
    $('.modal-content').css(
      'background-image',
      'url(https://s3.amazonaws.com/bucket-tony-yellowstone/alcohol.jpg)'
    );
  }

  loadUserInfo = () => {
    const email = this.state.userEmail;
    API.getUserByEmail(email).then(res => {
      const resUser = res.data.shift();
      this.setState({ User: resUser });
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    $('.toast').toast('show');
    API.updateUser(this.state.User._id, {
      anniversaryDate: this.state.userField
    });
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <div>
        <Helmet
          bodyAttributes={{
            style:
              'background-image: url("https://s3.amazonaws.com/bucket-tony-yellowstone/bedroom.jpg");'
          }}
        />
        <Modal
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          question={this.state.question}
          userField={this.state.userField}
          link={this.state.nextQuestionLink}
          title={this.state.title}
          user={this.state.User}
        />
      </div>
    );
  }
}

export default Anniversary;
