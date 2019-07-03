import React from 'react';
import API from '../../utils/API';

const ActivateNudgeButton = props => {
  function activateNudge(e) {
    e.preventDefault();
    const user = props.user;
    const nudge = props.nudge;
    API.toggleNudgeActivatedState({
      user,
      nudge
    })
      .then(res => {
        console.log(res.data);
        props.toggleNudgeActivatedState();
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
