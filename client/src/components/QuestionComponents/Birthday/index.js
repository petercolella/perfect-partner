import React, { Component } from 'react';
import API from '../../../utils/API';
import Header from '../../Header';
import DateQuestionDialog from '../DateQuestionDialog';

class Birthday extends Component {
  state = {
    User: {},
    title: 'Birthday',
    question: "what is your partner's birthday?",
    userField: null,
    nextQuestionLink: '/anniversary'
  };

  componentDidMount() {
    const path = this.props.location.pathname;
    this.props.setPreviousPath(path);
    this.loadUserInfo();
  }

  loadUserInfo = () => {
    const id = sessionStorage.getItem('currentUserId');
    if (id) {
      API.getUser(id).then(res => {
        this.setState({
          User: res.data,
          userField: res.data.birthDate
        });
      });
    }
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.updateUser(this.state.User._id, {
      birthDate: this.state.userField
    }).then(this.loadUserInfo);
  };

  handleUserDateInputChange = date => {
    this.setState({
      userField: date
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
          <DateQuestionDialog
            handleFormSubmit={this.handleFormSubmit}
            handleUserDateInputChange={this.handleUserDateInputChange}
            question={this.state.question}
            userField={this.state.userField}
            link={this.state.nextQuestionLink}
            title={this.state.title}
            firstName={this.state.User.firstName}
          />
        </div>
      </>
    );
  }
}

export default Birthday;
