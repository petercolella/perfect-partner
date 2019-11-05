import React, { Component } from 'react';
import QuestionDialog from '../QuestionDialog';
import API from '../../../utils/API';
import { ReactComponent as Love } from './love.svg';

class Partner extends Component {
  state = {
    nextQuestionLink: '/birthday',
    placeholder: "Enter your partner's name.",
    question: "what is your partner's name?",
    title: 'Partner Name',
    User: {},
    userField: ''
  };

  componentDidMount() {
    this.loadUserInfo();
  }

  loadUserInfo = () => {
    const id = sessionStorage.getItem('currentUserId');
    if (id) {
      API.getUser(id).then(res => {
        this.setState({
          User: res.data,
          userField: res.data.partnerName || ''
        });
      });
    }
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.updateUser(this.state.User._id, {
      partnerName: this.state.userField
    }).then(this.loadUserInfo);
  };

  handleInputChange = event => {
    const { value } = event.target;
    this.setState({
      userField: value
    });
  };

  render() {
    return (
      <QuestionDialog
        firstName={this.state.User.firstName}
        handleFormSubmit={this.handleFormSubmit}
        handleInputChange={this.handleInputChange}
        image={Love}
        label="Partner's Name"
        link={this.state.nextQuestionLink}
        loadUserInfo={this.loadUserInfo}
        placeholder={this.state.placeholder}
        question={this.state.question}
        title={this.state.title}
        user={this.state.User}
        userField={this.state.userField}
      />
    );
  }
}

export default Partner;
