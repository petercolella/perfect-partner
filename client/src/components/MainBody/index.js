import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
import Dashboard from '../Dashboard';
import UserUpdate from '../UserUpdate';
import fn from '../../utils/fn';
const $ = window.$;

class MainBody extends Component {
  state = {
    User: {
      name: '',
      firstName: '',
      lastName: '',
      phone: '',
      partnerName: '',
      email: '',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
      anniversaryDate: '',
      birthDate: ''
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
    const path = this.props.location.pathname;
    this.props.setPreviousPath(path);
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

  launchUserUpdateComp = User => {
    this.setState({ User });
    this.showUserModal();
  };

  showUserModal() {
    $('#editUserModalCenter').modal('show');
  }

  closeUserUpdateComp = () => {
    this.hideUserModal();
  };

  hideUserModal() {
    $('#editUserModalCenter').modal('hide');
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

  handleUserInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      User: {
        ...this.state.User,
        [name]: value
      }
    });
  };

  handleUserFormSubmit = event => {
    event.preventDefault();
    $('#user-toast').toast('show');
    API.updateUser(this.state.User._id, {
      ...this.state.User
    }).then(() => {
      this.loadUserInfo();
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row ">
          <div className="col-md-4 col-sm-12">
            <img id="header-img" alt="logo" src="/img/logo_p.png" />
          </div>
          <div className="col-md-4 offset-md-4 col-sm-12 d-flex justify-content-end">
            <h3 className="my-auto mr-2">
              {this.state.User.name ? (
                this.state.User.name
              ) : (
                <span>Please sign in.</span>
              )}
            </h3>
            <img
              className="my-auto"
              id="avatar-image-header"
              alt="User"
              src={this.state.User.imageUrl}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 dashboard-rght">
            <div className="row" style={{ padding: '1em' }}>
              {/* <div className="col-md-2  avatar-center dash">
                <h1>{this.state.User.name}</h1>
                <img
                  id="avatar-image"
                  alt="User"
                  src={this.state.User.imageUrl}
                />
              </div> */}
              <div
                className="col-md-6 col-sm-12 d-flex align-items-center justify-content-center p-1"
                style={{ border: 'white solid 0.25rem' }}>
                {this.state.User.name ? (
                  <div>
                    <p>
                      <span>Phone Number: </span>
                      {this.state.User.phone
                        ? fn.formatPhoneNumber(this.state.User.phone)
                        : null}
                    </p>
                    <p>
                      <span>Partner's Name: </span>
                      {this.state.User.partnerName}
                    </p>
                    <p>
                      <span>Partner's Birthday: </span>
                      {this.state.User.birthDate}
                    </p>
                    <p>
                      <span>Your Anniversary: </span>
                      {this.state.User.anniversaryDate}
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        this.launchUserUpdateComp(this.state.User)
                      }>
                      Edit Your Profile
                    </button>
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
              <div className="col-md-6 col-sm-12 p-1">
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
        <UserUpdate
          closeUserUpdateComp={this.closeUserUpdateComp}
          handleUserInputChange={this.handleUserInputChange}
          handleUserFormSubmit={this.handleUserFormSubmit}
          user={this.state.User}
        />
      </div>
    );
  }
}

export default MainBody;
