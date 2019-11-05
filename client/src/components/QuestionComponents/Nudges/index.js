import React, { Component } from 'react';
import API from '../../../utils/API';
import NudgeDialog from '../NudgeDialog';
import { ReactComponent as Reminder } from './reminder.svg';

class Nudges extends Component {
  state = {
    nextQuestionLink: '/dashboard',
    nudges: [],
    question: 'please select your nudges.',
    title: 'Nudges',
    User: {}
  };

  componentDidMount() {
    this.loadUserInfo();
  }

  loadUserInfo = () => {
    const id = sessionStorage.getItem('currentUserId');
    if (id) {
      API.getUser(id).then(res =>
        this.setState({ User: res.data, nudges: res.data.nudges })
      );
    }
  };

  render() {
    return (
      <NudgeDialog
        image={Reminder}
        link={this.state.nextQuestionLink}
        loadUserInfo={this.loadUserInfo}
        nudges={this.state.nudges}
        question={this.state.question}
        title={this.state.title}
        user={this.state.User}
      />
    );
  }
}
export default Nudges;
