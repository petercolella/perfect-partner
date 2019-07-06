import React from 'react';
import API from '../../utils/API';

const ActivateNudgeButton = props => {
  function activateNudge() {
    const nudge = props.nudge;
    nudge.activated = !nudge.activated;
    const { nudges, ...userAndNudge } = props;

    API.activateNudge(props.nudge._id, {
      ...userAndNudge
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
