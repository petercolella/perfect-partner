import React, { Component } from 'react';
import Modal from '../Modal';
import API from '../../../utils/API';
import Helmet from 'react-helmet';
const $ = window.$;

class Phone extends Component {
  state = {
    User: {},
    title: 'Phone Number',
    question: 'what is your phone number?',
    placeholder: 'Enter here (no dashes or spaces).',
    userField: '',
    nextQuestionLink: '/partner'
  };

  componentDidMount() {
    this.loadUserInfo();
  }

  loadUserInfo = () => {
    const id = sessionStorage.getItem('currentUserId');
    API.getUser(id).then(res => this.setState({ User: res.data }));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    $('.toast').toast('show');
    const phoneRegEx = this.state.userField.replace(/\D/g, '');
    API.updateUser(this.state.User._id, {
      phone: phoneRegEx
    });
    this.setState({
      userField: phoneRegEx
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="container">
        <Helmet
          bodyAttributes={{
            style:
              'background-image: url("https://s3.amazonaws.com/bucket-tony-yellowstone/bedroom.jpg");'
          }}
        />
        <Modal
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          user={this.state.User}
          title={this.state.title}
          question={this.state.question}
          placeholder={this.state.placeholder}
          userField={this.state.userField}
          link={this.state.nextQuestionLink}
        />
      </div>
    );
  }
}

export default Phone;
