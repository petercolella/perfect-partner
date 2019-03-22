import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
import Dashboard from './Dashboard/Dashboard';
const $ = window.$;

class MainBody extends Component {
  state = {
    User: {
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    },
    nudges: [],
    nudge: {}
  };

  componentDidMount() {
    this.loadUserInfo();
  }

  loadUserInfo = () => {
    const id = sessionStorage.getItem('currentUserId');
    API.getUser(id).then(res => {
      this.setState({ User: res.data, nudges: res.data.nudges });
    });
  };

  launchUpdateComp = nudge => {
    console.log('launchUpdateComp: ', nudge);
    this.setState({ nudge });
    this.showModal();
  };

  showModal() {
    $('#exampleModalCenter').modal('show');
  }

  closeUpdateComp = () => {
    this.hideModal();
  };

  hideModal() {
    $('#exampleModalCenter').modal('hide');
  }

  handleInputChange = event => {
    console.log('event.target: ', event.target);
    // console.log('event.target.nudge: ', event.target.nudge);
    console.log('nudge: ', this.state.nudge);
    const { name, value } = event.target;
    this.setState({
      nudge: {
        [name]: value
      }
    });
  };

  // shadow card card-body mb-2
  render() {
    return (
      <div className="container-fluid">
        <div
          aria-live="polite"
          aria-atomic="true"
          className="d-flex justify-content-center align-items-center"
          style={{
            position: 'absolute',
            minHeight: 200,
            minWidth: '100vw',
            paddingTop: 328
          }}>
          <div
            className="toast "
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            data-delay="2000"
            style={{
              position: 'realative',
              backgroundColor: '#0bb3e2',
              color: 'white'
            }}>
            <div className="toast-body">
              {this.state.User.phone
                ? `Text Sent to ${this.state.User.phone}.`
                : `Please log in to send a text.`}
            </div>
          </div>
        </div>
        <div className="row dashbkgrd" />
        <div className="row">
          <div className="col-md-4 dashboard-rght">
            <div className="row">
              <div className="col-md-4  avatar-center dash">
                <img alt="" src={this.state.User.imageUrl} />
              </div>
              <div className="col-md-8">
                <h1>{this.state.User.name}</h1>
              </div>
            </div>
            {this.state.User.name ? (
              <div>
                <p>
                  <span>Partners Name:</span> {this.state.User.partnerName}
                </p>
                <p>
                  <span>Phone Number:</span> {this.state.User.phone}
                </p>
                <p>
                  <span>Partners Birthday:</span> {this.state.User.birthDate}
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
          <div className="col-md-8">
            <Dashboard
              user={this.state.User}
              nudges={this.state.nudges}
              nudge={this.state.nudge}
              launchUpdateComp={this.launchUpdateComp}
              closeUpdateComp={this.closeUpdateComp}
              handleInputChange={this.handleInputChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default MainBody;
