import React from 'react';
import API from '../../utils/API';

const ActivateNudgeButton = props => {
  function activateNudge() {
    const nudge = props.nudge;
    nudge.activated = !nudge.activated;
    console.log('nudge', nudge);

    API.activateNudge(props.nudge._id, {
      ...props
    })
      .then(res => {
        console.log(res.data);
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
