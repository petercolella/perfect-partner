import React, { Component } from 'react';
import Modal from '../Modal';

class Partner extends Component {
  state = {
    question: "What is your partner's name?",
    userField: User.partnerName,
    nextQuestionLink: '/anniversay'
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

export default Partner;
