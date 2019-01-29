import React, { Component } from 'react';
import Modal from '../Modal';

class Phone extends Component {
  state = {
    question: 'What is your phone number?',
    userField: User.phone,
    nextQuestionLink: '/partner'
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

export default Phone;
