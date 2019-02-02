import React, { Component } from "react";
import Modal from "../Modal";
import API from "../../../utils/API";

class Birthday extends Component {
  state = {
    users: [],
    User: {},
    title: "Birthday",
    question: "What is your partner's birthday?",
    userField: "",
    nextQuestionLink: "/anniversary"
  };

  componentDidMount() {
    this.loadUserInfo();
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
      birthDate: this.state.userField
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
        <Modal
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
            question={this.state.question}
            userField={this.state.userField}
            link={this.state.nextQuestionLink}
            title={this.state.title}
            user={this.state.User}
        />
    );
  }
}

export default Birthday;
