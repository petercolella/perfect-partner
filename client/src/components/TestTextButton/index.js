import React, { useContext } from 'react';
import { Context as SnackbarContext } from '../../context/SnackbarContext';

import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Tooltip from '@material-ui/core/Tooltip';

import API from '../../utils/API';
import fn from '../../utils/fn';

const TestTextButton = ({ user, nudge }) => {
  const { handleSnackbarOpen } = useContext(SnackbarContext);
  const { phone } = user;
  const { textMessage } = nudge;

  const sendText = () => {
    if (!phone) {
      handleSnackbarOpen('A phone number is required!', 'warning');
      return;
    }

    API.sendText({ phone, textMessage })
      .then(res => {
        console.log(res.data);
        handleSnackbarOpen(
          `Text Sent to ${fn.formatPhoneNumber(phone)}.`,
          'success'
        );
      })
      .catch(err => {
        console.log(err);
        const [errMsg] = err.response.data.match(/(?! )[^:]+$/);
        handleSnackbarOpen(errMsg, 'error');
      });
  };
  return (
    <Tooltip title="Send Text" color="primary">
      <IconButton aria-label="send text" onClick={sendText}>
        <SendIcon />
      </IconButton>
    </Tooltip>
  );
};

export default TestTextButton;
