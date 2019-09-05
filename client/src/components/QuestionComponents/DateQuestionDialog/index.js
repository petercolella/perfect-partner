import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
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
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant])}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
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

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

const DateQuestionDialog = props => {
  const [toastOpen, setToastOpen] = React.useState(false);

  function handleToastClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setToastOpen(false);
  }

  const clickHandler = e => {
    props.handleFormSubmit(e);
    setToastOpen(true);
  };

  console.log(`
props.userField:
${props.userField}

new Date(props.userField).toLocaleDateString():
${new Date(props.userField).toLocaleDateString()}
  `);

  return (
    <div>
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={toastOpen}
          autoHideDuration={3000}
          onClose={handleToastClose}
          TransitionComponent={TransitionUp}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}>
          {props.userField ? (
            <MySnackbarContentWrapper
              onClose={handleToastClose}
              variant="success"
              message={
                <span>
                  {props.title}:{' '}
                  {new Date(props.userField).toLocaleDateString()} has been
                  submitted.
                </span>
              }
            />
          ) : (
            <MySnackbarContentWrapper
              onClose={handleToastClose}
              variant="warning"
              message={
                <span>
                  The {props.title} date has been cleared. Please enter a valid
                  date before submitting.
                </span>
              }
            />
          )}
        </Snackbar>
      </div>
      <Dialog
        fullWidth={true}
        open={true}
        onClose={props.closeUpdateComp}
        aria-labelledby="form-dialog-title"
        scroll={'body'}>
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.firstName}, {props.question}
          </DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              animateYearScrolling={true}
              clearable
              id="birthDate"
              label="Partner's Birthday"
              format="MM/dd/yyyy"
              fullWidth
              placeholder="mm/dd/yyyy"
              value={props.userField}
              onChange={props.handleUserDateInputChange}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              margin="normal"
              inputVariant="outlined"
            />
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={clickHandler} color="primary">
            Submit
          </Button>
          <Link to={props.link}>
            <Button color="primary">Next</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DateQuestionDialog;
