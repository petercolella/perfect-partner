import React, { Component } from "react";
import Modal from "../Modal";
import API from "../../../utils/API";

class Nudges extends Component {
  state = {
    users: [],
    User: {},
    title: "Nudges",
    question: "Please select your nudges.",
    userField: "",
    nextQuestionLink: "/"
  };

  componentDidMount() {
    this.loadUserInfo();
  }
  loadUserInfo = () => {
    API.getUsers().then(res =>
      this.setState({
        users: res.data,
        User: res.data[0]
      })
    );
  };
  handleFormSubmit = event => {
    event.preventDefault();
    alert(`userField: ${this.state.userField}`);
    API.updateUser(/*id here*/{
    nudges: this.state.userField
      })
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
      />
    );
  }
}

export default Nudges;
