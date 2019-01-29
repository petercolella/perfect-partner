import React, { Component } from 'react';
import Modal from '../Modal';
import API from '../../../utils/API';

class Anniversary extends Component {
  state = {
    users: [],
    User: {},
    title: 'Anniversary',
    question: 'What is your annivesary date?',
    userField: 'anniversayDate',
    nextQuestionLink: '/birthday'
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

export default Anniversary;
