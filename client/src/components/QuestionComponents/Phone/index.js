import React, { Component } from 'react';
import QuestionDialog from '../QuestionDialog';
import API from '../../../utils/API';
import Header from '../../Header';

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

  componentWillUnmount() {
    const path = this.props.location.pathname;
    this.props.setPreviousPath(path);
  }

  loadUserInfo = () => {
    const id = sessionStorage.getItem('currentUserId');
    if (id) {
      API.getUser(id).then(res => {
        this.setState({
          User: res.data,
          userField: res.data.phone
        });
      });
    }
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const phoneRegEx = this.state.userField.replace(/\D/g, '');
    API.updateUser(this.state.User._id, {
      phone: phoneRegEx
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
      <>
        <Header />
        <div className="bkgd-image">
          <div className="container invisible">
            <div className="row mb-3">
              <div className="col-md-4 col-sm-12">
                <img id="header-img" alt="logo" src="/img/logo_p.png" />
              </div>
            </div>
          </div>
          <QuestionDialog
            firstName={this.state.User.firstName}
            title={this.state.title}
            question={this.state.question}
            userField={this.state.userField}
            link={this.state.nextQuestionLink}
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
            label="Phone"
            user={this.state.User}
            placeholder={this.state.placeholder}
          />
        </div>
      </>
    );
  }
}

export default Phone;
