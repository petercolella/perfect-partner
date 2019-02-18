import React, { Component } from 'react';
import API from '../../utils/API';
import Dashboard from './Dashboard/Dashboard';

class MainBody extends Component {
  state = {
    User: {},
    userEmail: '',
    name: '',
    phone: '',
    nudges: [
      { name: 'Romantic Text', frequency: 7 },
      { name: 'Buy Flowers', frequency: 4 },
      { name: 'Dinner Reservations', frequency: 3 }
    ],
    nudgeFrequency: '',
    partnerName: '',
    anniversaryDate: '',
    birthDate: ''
  };

  initClient = function() {
    const self = this;
    window.gapi.load('auth2', function() {
      window.gapi.auth2
        .init({
          client_id:
            '773798651320-0da27e8d6k9mo9ldaijdlupeib1r56jq.apps.googleusercontent.com'
        })
        .then(
          GoogleAuth => {
            const currentUserEmail = GoogleAuth.currentUser
              .get()
              .getBasicProfile()
              .getEmail();
            self.setState(
              {
                userEmail: currentUserEmail
              },
              () => {
                self.loadUserInfo();
              }
            );
          },
          err => {
            console.log(err);
          }
        );
    });
  };

  componentDidMount() {
    this.initClient();
  }

  loadUserInfo = () => {
    const email = this.state.userEmail;
    API.getUserByEmail(email).then(res => {
      const resUser = res.data.shift();
      this.setState({ User: resUser });
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
            zIndex: 1051,
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
              Text Sent to {this.state.User.phone}.
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
            <p>
              <span>Partners Name:</span> {this.state.User.partnerName}
            </p>
            <p>
              <span>Phone Number:</span> {this.state.User.phone}
            </p>
            <p>
              <span>Patners Birthday:</span> {this.state.User.birthDate}
            </p>
            <p>
              <span>Your Anniversary:</span> {this.state.User.anniversaryDate}
            </p>
          </div>
          <div className="col-md-8">
            <Dashboard user={this.state.User} nudges={this.state.nudges} />
          </div>
        </div>
      </div>
    );
  }
}
export default MainBody;
