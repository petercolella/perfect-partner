import React, { Component } from 'react';
import API from "../../../utils/API"

class About extends Component {
    state = { 
        users: [],
        name: "",
        phone: "",
        nudgeFrequency: "",
        partnerName: "",
        anniversaryDate: "",
        birthDate: ""
    }
    componentDidMount() {
        this.loadUserInfo();
      }
    
      loadUserInfo = () => {
        API.getUsers().then(res =>
          this.setState({ users: res.data, name: "", phone: "", nudgeFrequency: "", partnerName: "", anniversaryDate: "", birthDate: "" })
        );
      };

      render(){
        return (
    <div className="container-fluid">
    <h1>About Page</h1>
    <p>Lorem Ipsum is simply dummy text of the
        printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
        book. It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
        containing Lorem Ipsum passages, and mo re recently with desktop publishing software like Aldus PageMaker
        including versions of Lorem Ipsum.
    </p>
    <ul>
        {this.state.users.map(user => (
          <li key={user._id}>
            <p>Name: {user.name}</p>
            <p>Phone: {user.phone}</p>
            <p>Nudge Frequency: {user.nudgeFrequency}</p>
            <p>Partner Name: {user.partnerName}</p>
            <p>Anniversary Date: {user.anniversaryDate}</p>
            <p>Birth Date: {user.birthDate}</p>
          </li>
        ))}
      </ul>
</div>
    )}
};

  
export default About