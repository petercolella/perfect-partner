import React, { Component } from 'react';
import Modal from '../Modal';

class Nudges extends Component {
  state = {
    question: "What is your partner's name?",
    userField: User.nudges,
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

export default Nudges;
