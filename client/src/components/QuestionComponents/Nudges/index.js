import React, { Component } from 'react';
import API from '../../../utils/API';
import Header from '../../Header';
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
    const path = this.props.location.pathname;
    this.props.setPreviousPath(path);
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
          <NudgeDialog
            image={Reminder}
            link={this.state.nextQuestionLink}
            loadUserInfo={this.loadUserInfo}
            nudges={this.state.nudges}
            question={this.state.question}
            title={this.state.title}
            user={this.state.User}
          />
        </div>
      </>
    );
  }
}
export default Nudges;
