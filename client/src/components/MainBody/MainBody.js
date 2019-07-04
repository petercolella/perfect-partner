import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
import Dashboard from './Dashboard/Dashboard';
import fn from '../../utils/fn';
const $ = window.$;

class MainBody extends Component {
  state = {
    User: {
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    },
    nudges: [],
    nudge: {
      name: '',
      nudgeFrequency: '',
      nudgeFrequencyUnit: '',
      textMessage: '',
      activated: false
    },
    nudgeFrequencyUnit: ''
  };

  componentDidMount() {
    this.loadUserInfo();
  }

  loadUserInfo = () => {
    const id = sessionStorage.getItem('currentUserId');
    API.getUser(id).then(res => {
      this.setState(
        res.data
          ? { User: res.data, nudges: res.data.nudges }
          : { state: this.prevState }
      );
    });
  };

  launchUpdateComp = nudge => {
    this.setState({ nudge });
    this.showModal();
  };

  showModal() {
    $('#editNudgeModalCenter').modal('show');
  }

  closeUpdateComp = () => {
    this.hideModal();
  };

  hideModal() {
    $('#editNudgeModalCenter').modal('hide');
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      nudge: {
        ...this.state.nudge,
        [name]: value
      }
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    $('#nudge-toast').toast('show');
    API.updateNudge(this.state.nudge._id, {
      ...this.state.nudge
    }).then(() => {
      this.loadUserInfo();
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 dashboard-rght">
            <div className="row" style={{ padding: '1em' }}>
              <div className="col-md-2  avatar-center dash">
                <h1>{this.state.User.name}</h1>
                <img
                  id="avatar-image"
                  alt="User"
                  src={this.state.User.imageUrl}
                />
              </div>
              <div
                className="col-md-5 d-flex align-items-center justify-content-center"
                style={{ border: 'white solid 0.25rem' }}>
                {this.state.User.name ? (
                  <div>
                    <p>
                      <span>Phone Number:</span>{' '}
                      {fn.formatPhoneNumber(this.state.User.phone)}
                    </p>
                    <p>
                      <span>Partner's Name:</span> {this.state.User.partnerName}
                    </p>
                    <p>
                      <span>Partner's Birthday:</span>{' '}
                      {this.state.User.birthDate}
                    </p>
                    <p>
                      <span>Your Anniversary:</span>{' '}
                      {this.state.User.anniversaryDate}
                    </p>
                  </div>
                ) : (
                  <p>
                    Please click{' '}
                    <Link to="/" style={{ color: '#22b5e0' }}>
                      here
                    </Link>{' '}
                    to sign in before continuing.
                  </p>
                )}
              </div>
              <div className="col-md-5">
                <span className="helper" />
                <img alt="love-hearts" src="./img/love-hearts.jpg" />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Dashboard
              user={this.state.User}
              nudges={this.state.nudges}
              nudge={this.state.nudge}
              loadUserInfo={this.loadUserInfo}
              launchUpdateComp={this.launchUpdateComp}
              closeUpdateComp={this.closeUpdateComp}
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleFormSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default MainBody;
