import React from 'react';
import API from '../../utils/API';

const ActivateNudgeButton = props => {
  //   console.log('activateNudgeButtonProps:', props);
  function activateNudge(e) {
    e.preventDefault();
    const nudge = props.nudge;
    nudge.activated = !nudge.activated;
    console.log('activatedNudgeButton nudge', nudge);

    API.toggleNudgeActivatedState(props.nudge._id, {
      ...props.nudge
    })
      .then(res => {
        console.log('res.data', res.data);
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
