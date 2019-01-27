import React from 'react';

const TestTextButton = props => {
  function sendText(e) {
    e.preventDefault();
    console.log(props.phone);
  }
  return (
    <button className="primary" onClick={sendText}>
      Click to Send Text
    </button>
  );
};

export default TestTextButton;
