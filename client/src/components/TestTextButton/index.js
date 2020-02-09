import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import API from '../../utils/API';
import fn from '../../utils/fn';

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const MySnackbarContentWrapper = React.forwardRef((props, ref) => {
  const classes = useStyles1();
  const { message, onClose, variant, ...other } = props;

  return (
    <SnackbarContent
      className={clsx(classes[variant])}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <CheckCircleIcon
            className={clsx(classes.icon, classes.iconVariant)}
          />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
      ref={ref}
    />
  );
});

const Transition = props => {
  return <Slide {...props} direction="up" />;
};

const TestTextButton = props => {
  const [toastOpen, setToastOpen] = React.useState(false);

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setToastOpen(false);
  };

  const sendText = () => {
    const phone = props.user.phone;
    const textMessage = props.nudge.textMessage;
    API.sendText({ phone, textMessage })
      .then(res => {
        console.log(res.data);
        setToastOpen(true);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={toastOpen}
        autoHideDuration={2000}
        onClose={handleToastClose}
        TransitionComponent={Transition}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}>
        <MySnackbarContentWrapper
          onClose={handleToastClose}
          variant="success"
          message={
            props.user.phone
              ? `Text Sent to ${fn.formatPhoneNumber(props.user.phone)}.`
              : `Please log in to send a text.`
          }
        />
      </Snackbar>
      <Tooltip title="Send Text" color="primary">
        <IconButton aria-label="send text" onClick={sendText}>
          <SendIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default TestTextButton;
