import React, { Component } from 'react';
import Modal from '../Modal';
import API from '../../../utils/API';

class Phone extends Component {
  state = {
    users: [],
    User: {},
    title: 'Phone Number',
    question: 'What is your phone number?',
    userField: 'phone',
    nextQuestionLink: '/partner'
  };

  componentDidMount() {
    this.loadUserInfo();
  }
  loadUserInfo = () => {
    API.getUsers().then(res =>
      this.setState({ users: res.data, User: res.data[0] })
    );
  };

  render() {
    return (
      <Modal
        question={this.state.question}
        userField={this.state.userField}
        link={this.state.nextQuestionLink}
        title={this.state.title}
      />
    );
  }
}

export default Phone;
