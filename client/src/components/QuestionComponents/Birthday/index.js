import React, { Component } from 'react';
import Modal from '../Modal';
import API from '../../../utils/API';

class Birthday extends Component {
  state = {
    users: [],
    User: {},
    title: 'Birthday',
    question: "What is your partner's birthday?",
    userField: 'birthDate',
    nextQuestionLink: '/nudges'
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
      />
    );
  }
}

export default Birthday;
