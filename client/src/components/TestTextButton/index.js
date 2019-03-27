import React from 'react';
import API from '../../utils/API';
const $ = window.$;

const TestTextButton = props => {
  function sendText(e) {
    console.log(props);
    e.preventDefault();
    const phone = props.user.phone;
    const textMessage = props.nudge.textMessage;
    $('#phone-toast').toast('show');
    API.sendText({ phone, textMessage })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <div>
      <button className="btn btn-primary" onClick={sendText}>
        Send Text
      </button>
    </div>
  );
};

export default TestTextButton;
