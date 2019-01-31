import React from 'react';
import API from '../../utils/API';

const TestTextButton = props => {
  function sendText(e) {
    e.preventDefault();
    const phone = props.phone;
    API.sendText({ phone })
      .then(res => {
        alert('Text Sent!');
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <button className="primary" onClick={sendText}>
      Click to Send Text
    </button>
  );
};

export default TestTextButton;
