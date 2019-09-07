import React, { Component } from 'react';
import API from '../../../utils/API';
import Header from '../../Header';
import DateQuestionDialog from '../DateQuestionDialog';
import { ReactComponent as Cake } from './cake.svg';

class Birthday extends Component {
  state = {
    User: {},
    title: 'Birthday',
    question: "what is your partner's birthday?",
    userField: null,
    nextQuestionLink: '/anniversary',
    dateQuestionDialogOpen: false
  };

  componentDidMount() {
    const path = this.props.location.pathname;
    this.props.setPreviousPath(path);
    this.loadUserInfo();
    setTimeout(() => this.setDateQuestionDialogOpen(), 500);
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

  setDateQuestionDialogOpen = () => {
    this.setState({
      dateQuestionDialogOpen: true
    });
  };

  setDateQuestionDialogClosed = () => {
    this.setState({
      dateQuestionDialogOpen: false
    });
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
            firstName={this.state.User.firstName}
            title={this.state.title}
            question={this.state.question}
            userField={this.state.userField}
            link={this.state.nextQuestionLink}
            dateQuestionDialogOpen={this.state.dateQuestionDialogOpen}
            setDateQuestionDialogClosed={this.setDateQuestionDialogClosed}
            handleFormSubmit={this.handleFormSubmit}
            handleUserDateInputChange={this.handleUserDateInputChange}
            image={Cake}
            label="Partner's Birthday"
          />
        </div>
      </>
    );
  }
}

export default Birthday;
