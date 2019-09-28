import React, { Component } from 'react';
import QuestionDialog from '../QuestionDialog';
import API from '../../../utils/API';
import Header from '../../Header';
import { ReactComponent as Smartphone } from './smartphone.svg';

class Phone extends Component {
  state = {
    nextQuestionLink: '/partner',
    placeholder: 'Enter with no dashes or spaces.',
    question: 'what is your phone number?',
    title: 'Phone Number',
    User: {},
    userField: ''
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
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
            image={Smartphone}
            label="Phone"
            link={this.state.nextQuestionLink}
            loadUserInfo={this.loadUserInfo}
            placeholder={this.state.placeholder}
            question={this.state.question}
            title={this.state.title}
            user={this.state.User}
            userField={this.state.userField}
          />
        </div>
      </>
    );
  }
}

export default Phone;
