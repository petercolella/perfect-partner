import React, { Component } from 'react';
import API from '../../../utils/API';
import TestTextButton from '../../TestTextButton';

class UserList extends Component {
  state = {
    users: [],
    name: '',
    phone: '',
    nudgeFrequency: '',
    partnerName: '',
    anniversaryDate: '',
    birthDate: ''
  };
  componentDidMount() {
    this.loadUserInfo();
  }

  loadUserInfo = () => {
    API.getUsers().then(res =>
      this.setState({
        users: res.data,
        name: '',
        phone: '',
        nudgeFrequency: '',
        partnerName: '',
        anniversaryDate: '',
        birthDate: ''
      })
    );
  };

  render() {
    return (
      <div className="container-fluid">
        <h1>User List</h1>
        <ul>
          {this.state.users.map(user => (
            <li key={user._id}>
              <p>Name: {user.name}</p>
              <p>Phone: {user.phone}</p>
              <p>Nudge Frequency: {user.nudgeFrequency}</p>
              <p>Partner Name: {user.partnerName}</p>
              <p>Anniversary Date: {user.anniversaryDate}</p>
              <p>Birth Date: {user.birthDate}</p>
              <TestTextButton phone={user.phone} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserList;
