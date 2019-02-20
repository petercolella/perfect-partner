import React, { Component } from 'react';
import API from '../../../utils/API';
import NudgeModal from '../NudgeModal';
import Helmet from 'react-helmet';
import Checkbox from '../Checkbox';
const $ = window.$;
const nudgeOptions = ['Romantic Text', 'Buy Flowers', 'Dinner Reservations'];

class Nudges extends Component {
  state = {
    User: {},
    userEmail: '',
    title: 'Nudges',
    question: 'Please select your nudges.',
    userField: '',
    nextQuestionLink: '/dashboard',
    nudges: [
      { name: 'Romantic Text', nudgeFrequency: 7 },
      { name: 'Buy Flowers', nudgeFrequency: 4 },
      { name: 'Dinner Reservations', nudgeFrequency: 3 }
    ],
    checkboxes: nudgeOptions.reduce(
      (options, option) => ({
        ...options,
        [option]: false
      }),
      {}
    )
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
            const currentUserEmail = GoogleAuth.currentUser
              .get()
              .getBasicProfile()
              .getEmail();
            self.setState(
              {
                userEmail: currentUserEmail
              },
              () => {
                self.loadUserInfo();
              }
            );
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
      'url(https://s3.amazonaws.com/bucket-tony-yellowstone/romance.jpg)'
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
      nudges: this.state.nudges
    });
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  createCheckbox = option => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  createCheckboxes = () => nudgeOptions.map(this.createCheckbox);

  render() {
    return (
      <div>
        <Helmet
          bodyAttributes={{
            style:
              'background-image: url("https://s3.amazonaws.com/bucket-tony-yellowstone/bedroom.jpg");'
          }}
        />

        <NudgeModal
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          question={this.state.question}
          userField={this.state.userField}
          link={this.state.nextQuestionLink}
          title={this.state.title}
          user={this.state.User}
          nudges={this.state.nudges}
          createCheckboxes={this.createCheckboxes}
        />
      </div>
    );
  }
}
export default Nudges;
