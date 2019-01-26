import React from "react";
import FormStructure from '../../Layout/Grid/FormStructure'
import {Link} from "react-router-dom";
import NewProfile from './RegistrationWizzard/NewProfile_1'

class ProfileForm extends React.Component {
   constructor() {
    super();
    this.state = {
      nextbutton: 'continue'
    };
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({nextbutton:'next'})
  };


  render() {
    return(
        <div>
          <FormStructure
              question="First, let's learn a little about you."
              newButton={<Link to="/profilepage">Continue</Link>}
          />
        </div>

    )
  }
}

export default ProfileForm