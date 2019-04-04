import React, { Component } from 'react';
import API from '../../../utils/API';
import NudgeModal from '../NudgeModal';
import Helmet from 'react-helmet';
import Checkbox from '../Checkbox';
const $ = window.$;
const nudgeOptions = ['Romantic Text', 'Buy Flowers', 'Dinner Reservations'];

class Nudges extends Component {
  state = {
    User: {},
    title: 'Nudges',
    question: 'please select your nudges.',
    selectedNudges: [],
    toastNudges: [],
    nextQuestionLink: '/dashboard',
    checkboxes: nudgeOptions.reduce((options, option) => {
      console.log('options: ', options);
      console.log('option: ', option);
      return {
        ...options,
        [option]: false
      };
    }, {})
  };

  componentDidMount() {
    this.loadUserInfo();
    $('.modal-content').css(
      'background-image',
      'url(https://s3.amazonaws.com/bucket-tony-yellowstone/romance.jpg)'
    );
  }

  loadUserInfo = () => {
    const id = sessionStorage.getItem('currentUserId');
    if (id) {
      API.getUser(id).then(res => this.setState({ User: res.data }));
    }
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({ selectedNudges: [] }, function() {
      console.log('1. selectedNudges: ', this.state.selectedNudges);
    });

    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        console.log('checkbox: ', checkbox);
        this.state.selectedNudges.push(checkbox);
        const newNudge = {
          userId: this.state.User._id,
          nudge: {
            name: checkbox
          }
        };
        API.saveNudge(newNudge);
      });

    this.setState({ toastNudges: this.state.selectedNudges });
    console.log('2. selectedNudges: ', this.state.selectedNudges);

    $('.toast').toast('show');
  };

  selectAllCheckboxes = isSelected => {
    Object.keys(this.state.checkboxes).forEach(checkbox => {
      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes,
          [checkbox]: isSelected
        }
      }));
    });
  };

  selectAll = () => this.selectAllCheckboxes(true);

  deselectAll = () => this.selectAllCheckboxes(false);

  handleCheckboxChange = event => {
    const { name } = event.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  createCheckbox = (option, index) => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
      index={index}
    />
  );

  createCheckboxes = () =>
    nudgeOptions.map((option, index) => this.createCheckbox(option, index));

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
          nudges={this.state.toastNudges}
          createCheckboxes={this.createCheckboxes}
          selectAll={this.selectAll}
          deselectAll={this.deselectAll}
        />
      </div>
    );
  }
}
export default Nudges;
