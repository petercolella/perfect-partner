import React, { Component } from 'react';
import Modal from '../Modal';

class Anniversary extends Component {
  state = {
    question: 'What is your annivesary Date?',
    userField: User.anniversayDate,
    nextQuestionLink: '/birthday'
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

export default Anniversary;
