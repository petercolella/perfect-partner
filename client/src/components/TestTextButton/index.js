import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import API from '../../utils/API';
const $ = window.$;

const TestTextButton = props => {
  function sendText(e) {
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
    <>
      <Tooltip title="Send Text" color="primary">
        <IconButton aria-label="send text" onClick={sendText}>
          <SendIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default TestTextButton;
