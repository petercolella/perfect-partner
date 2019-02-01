import React, { Component } from 'react';
import Modal from '../Modal';
import API from '../../../utils/API';

class Anniversary extends Component {
  state = {
    users: [],
    User: {},
    title: 'Anniversary',
    question: 'What is your anniversary date?',
    userField: '',
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
  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <Modal
        handleInputChange={this.state.handleInputChange}
        question={this.state.question}
        userField={this.state.userField}
        link={this.state.nextQuestionLink}
        title={this.state.title}
      />
    );
  }
}

export default Anniversary;
