import React from 'react';
import API from '../../utils/API';
const $ = window.$;

const TestTextButton = props => {
  function sendText(e) {
    e.preventDefault();
    const phone = props.phone;
    $('.toast').toast('show');
    API.sendText({ phone })
      .then(res => {
        $('.toast').toast('show');
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
