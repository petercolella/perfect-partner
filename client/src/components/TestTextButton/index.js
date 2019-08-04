import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import API from '../../utils/API';
const $ = window.$;

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const TestTextButton = props => {
  const classes = useStyles();

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
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      onClick={sendText}>
      Send Text
    </Button>
  );
};

export default TestTextButton;
