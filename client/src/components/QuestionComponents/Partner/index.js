import React, { Component } from 'react';
import Modal from '../Modal';
import API from '../../../utils/API';
import Header from '../../Header';
const $ = window.$;

class Partner extends Component {
  state = {
    User: {},
    title: 'Partner Name',
    question: "what is your partner's name?",
    userField: '',
    nextQuestionLink: '/birthday'
  };

  componentDidMount() {
    const path = this.props.location.pathname;
    this.props.setPreviousPath(path);
    this.loadUserInfo();
    $('.modal-content').css('background-image', 'url(./img/hearts.jpg)');
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
      partnerName: this.state.userField
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
            question={this.state.question}
            userField={this.state.userField}
            link={this.state.nextQuestionLink}
            title={this.state.title}
            user={this.state.User}
          />
        </div>
      </>
    );
  }
}

export default Partner;
