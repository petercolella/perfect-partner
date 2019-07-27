import React, { Component } from 'react';
import Modal from '../Modal';
import API from '../../../utils/API';
const $ = window.$;

class Birthday extends Component {
  state = {
    User: {},
    title: 'Birthday',
    question: "what is your partner's birthday?",
    userField: '',
    nextQuestionLink: '/anniversary'
  };

  componentDidMount() {
    const path = this.props.location.pathname;
    this.props.setPreviousPath(path);
    this.loadUserInfo();
    $('.modal-content').css(
      'background-image',
      'url(./img/birthday-history-600x319.jpg)'
    );
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
      birthDate: this.state.userField
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
      <div className="bkgd-image">
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

export default Birthday;
