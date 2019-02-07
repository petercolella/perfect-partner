import React, { Component } from 'react';
import API from '../../../utils/API';
import NudgeModal from '../NudgeModal';
import Helmet from 'react-helmet';
const $ = window.$;

class Nudges extends Component {
  state = {
    users: [],
    User: {},
    title: 'Nudges',
    question: 'Please select your nudges.',
    userField: '',
    nextQuestionLink: '/dashboard',
    nudges: [
      { name: 'Romantic Text', frequency: 7 },
      { name: 'Buy Flowers', frequency: 4 },
      { name: 'Dinner Reservations', frequency: 3 }
    ]
  };

  componentDidMount() {
    this.loadUserInfo();
    $('.modal-content').css(
      'background-image',
      'url(https://s3.amazonaws.com/bucket-tony-yellowstone/romance.jpg)'
    );
  }
  loadUserInfo = () => {
    API.getUsers().then(res => {
      this.setState({ users: res.data, User: res.data[res.data.length - 1] });
      console.log(res.data[res.data.length - 1]);
      console.log(res.data[res.data.length - 1]._id);
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    $('.toast').toast('show');
    API.updateUser(this.state.User._id, {
      nudges: this.state.userField
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
      <div>
        <Helmet
          bodyAttributes={{
            style:
              'background-image: url("https://s3.amazonaws.com/bucket-tony-yellowstone/bedroom.jpg");'
          }}
        />

        <NudgeModal
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          question={this.state.question}
          userField={this.state.userField}
          link={this.state.nextQuestionLink}
          title={this.state.title}
          user={this.state.User}
          nudges={this.state.nudges}
        />
      </div>
    );
  }
}
export default Nudges;
