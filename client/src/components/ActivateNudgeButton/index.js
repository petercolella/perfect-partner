import React from 'react';
import API from '../../utils/API';

const ActivateNudgeButton = props => {
  console.log('activateNudgeButtonProps:', props);
  function activateNudge(e) {
    e.preventDefault();
    // const user = props.user;
    const nudge = props.nudge;
    console.log('nudge', nudge);
    API.toggleNudgeActivatedState({
      nudge
    })
      .then(res => {
        console.log(res.data);
        props.toggleNudgeActivatedState(nudge._id);
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
