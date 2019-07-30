import React, { Component } from 'react';
import Modal from '../Modal';
import API from '../../../utils/API';
import Header from '../../Header';
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
    const path = this.props.location.pathname;
    this.props.setPreviousPath(path);
    this.loadUserInfo();
    $('.modal-content').css('background-image', 'url(./img/phone-img.jpg)');
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
      <>
        <Header />
        <div className="bkgd-image">
          <div className="contaner invisible">
            <div className="row mb-3">
              <div className="col-md-4 col-sm-12">
                <img id="header-img" alt="logo" src="/img/logo_p.png" />
              </div>
            </div>
          </div>
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
      </>
    );
  }
}

export default Phone;
