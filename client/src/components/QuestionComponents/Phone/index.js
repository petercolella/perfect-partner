import React, { Component } from 'react';
import Modal from '../Modal';
import API from '../../../utils/API';
import Helmet from 'react-helmet';
const $ = window.$;

class Phone extends Component {
  state = {
    User: {},
    userEmail: '',
    title: 'Phone Number',
    question: 'what is your phone number?',
    placeholder: 'Enter here (no dashes or spaces).',
    userField: '',
    nextQuestionLink: '/partner'
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
    const phoneRegEx = this.state.userField.replace(/\D/g, '');
    API.updateUser(this.state.User._id, {
      phone: phoneRegEx
    });
    this.setState({
      userField: phoneRegEx
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="container">
        <Helmet
          bodyAttributes={{
            style:
              'background-image: url("https://s3.amazonaws.com/bucket-tony-yellowstone/bedroom.jpg");'
          }}
        />
        <Modal
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          user={this.state.User}
          title={this.state.title}
          question={this.state.question}
          placeholder={this.state.placeholder}
          userField={this.state.userField}
          link={this.state.nextQuestionLink}
        />
      </div>
    );
  }
}

export default Phone;
