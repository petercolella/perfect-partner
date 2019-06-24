import React from 'react';
import API from '../../utils/API';
// sconst $ = window.$;

const ActivateNudgeButton = props => {
  function activateNudge(e) {
    e.preventDefault();
    const user = props.user;
    const phone = props.user.phone;
    const nudge = props.nudge;
    const name = props.nudge.name;
    const nudgeFrequency = props.nudge.nudgeFrequency;
    const nudgeFrequencyUnit = props.nudge.nudgeFrequencyUnit;
    const textMessage = props.nudge.textMessage;
    // $('#phone-toast').toast('show');
    API.activateNudge({
      user,
      phone,
      nudge,
      name,
      nudgeFrequency,
      nudgeFrequencyUnit,
      textMessage
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <div>
      <button className="btn btn-primary" onClick={activateNudge}>
        Activate Nudge
      </button>
    </div>
  );
};

export default ActivateNudgeButton;
