import React from 'react';
import API from '../../utils/API';

const ActivateNudgeButton = props => {
  function activateNudge() {
    const nudge = props.nudge;
    nudge.activated = !nudge.activated;

    API.toggleNudgeActivatedState(props.nudge._id, {
      ...props.nudge
    })
      .then(res => {
        props.loadUserInfo();
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={activateNudge}>
        {props.nudge.activated ? 'Deactivate Nudge' : 'Activate Nudge'}
      </button>
    </div>
  );
};

export default ActivateNudgeButton;
