import React, { Component } from 'react';
import API from '../../../utils/API';
import Header from '../../Header';
import DateQuestionDialog from '../DateQuestionDialog';
import getTime from 'date-fns/getTime';

const getUTCDate = (date = new Date()) => {
  const dateFromString = new Date(date);
  return new Date(
    getTime(dateFromString) + dateFromString.getTimezoneOffset() * 60 * 1000
  );
};

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
        console.log(`
Birthday Component:

res.data.birthDate:
${res.data.birthDate}
        `);
        this.setState(
          {
            User: res.data,
            userField: res.data.birthDate ? res.data.birthDate : null
          },
          function() {
            console.log(`
Birthday Component:

this.state.userField:
${this.state.userField}
            `);
            console.log(`
Birthday Component:

this.state.User.birthDate:
${this.state.User.birthDate}
            `);
          }
        );
      });
    }
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.updateUser(this.state.User._id, {
      birthDate: this.state.userField
    }).then(this.loadUserInfo);
  };

  handleUserDateInputChange = name => event => {
    console.log(`
    Birthday Component:
  
    event: ${event}
    `);
    this.setState({
      [name]: event
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
            date={getUTCDate(this.state.User.birthDate)}
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
