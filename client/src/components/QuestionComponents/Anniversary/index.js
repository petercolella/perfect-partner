import React, { Component } from 'react';
import Modal from '../Modal';
import API from '../../../utils/API';
import Helmet from 'react-helmet';
const $ = window.$;

class Anniversary extends Component {
  state = {
    User: {},
    title: 'Anniversary',
    question: 'what is your anniversary date?',
    userField: '',
    nextQuestionLink: '/nudges'
  };

  componentDidMount() {
    this.loadUserInfo();
    $('.modal-content').css('background-image', 'url(./img/alcohol.jpg)');
  }

  loadUserInfo = () => {
    const id = sessionStorage.getItem('currentUserId');
    if (id) {
      API.getUser(id).then(res => this.setState({ User: res.data }));
    }
  };

  handleFormSubmit = event => {
    event.preventDefault();
    $('.toast').toast('show');
    API.updateUser(this.state.User._id, {
      anniversaryDate: this.state.userField
    });
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
      <div>
        <Helmet
          bodyAttributes={{
            style: 'background-image: url("/img/bedroom.jpg");'
          }}
        />
        <Modal
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          question={this.state.question}
          userField={this.state.userField}
          link={this.state.nextQuestionLink}
          title={this.state.title}
          user={this.state.User}
        />
      </div>
    );
  }
}

export default Anniversary;
