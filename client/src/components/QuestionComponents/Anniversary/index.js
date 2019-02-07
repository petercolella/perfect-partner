import React, { Component } from 'react';
import Modal from '../Modal';
import API from '../../../utils/API';
import Helmet from "react-helmet";
const $ = window.$;

class Anniversary extends Component {
  state = {
    users: [],
    User: {},
    title: 'Anniversary',
    question: 'What is your anniversary date?',
    userField: '',
    nextQuestionLink: '/nudges'
  };

  componentDidMount() {
    this.loadUserInfo();
    $('.modal-content').css('background-image','url(https://s3.amazonaws.com/bucket-tony-yellowstone/alcohol.jpg)');

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
    alert(`userField: ${this.state.userField}`);
    API.updateUser(this.state.User._id, {
      anniversaryDate: this.state.userField
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
          <Helmet bodyAttributes={{style:'background-image: url("https://s3.amazonaws.com/bucket-tony-yellowstone/bedroom.jpg");'}}/>
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
    );
  }
}

export default Anniversary;
