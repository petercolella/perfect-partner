import React, { Component } from 'react';
import API from '../../../utils/API';
import Header from '../../Header';
import DateQuestionDialog from '../DateQuestionDialog';
import { ReactComponent as Gift } from './gift.svg';

class Anniversary extends Component {
  state = {
    User: {},
    title: 'Anniversary',
    question: 'what is your anniversary date?',
    userField: null,
    nextQuestionLink: '/nudges'
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
          userField: res.data.anniversaryDate
        });
      });
    }
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.updateUser(this.state.User._id, {
      anniversaryDate: this.state.userField
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
            firstName={this.state.User.firstName}
            title={this.state.title}
            question={this.state.question}
            userField={this.state.userField}
            link={this.state.nextQuestionLink}
            handleFormSubmit={this.handleFormSubmit}
            handleUserDateInputChange={this.handleUserDateInputChange}
            image={Gift}
            label="Anniversary"
          />
        </div>
      </>
    );
  }
}

export default Anniversary;
