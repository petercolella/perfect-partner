import React, { Component } from 'react';
import Modal from '../Modal';

class Birthday extends Component {
  state = {
    question: "What is your partner's birthday?",
    userField: User.birthDate,
    nextQuestionLink: '/dashboard'
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
