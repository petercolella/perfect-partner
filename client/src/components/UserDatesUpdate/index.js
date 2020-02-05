import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

import { ReactComponent as Calendar } from './calendar.svg';
import SnackbarContentWrapper from '../SnackbarContentWrapper';

import fn from '../../utils/fn';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  title: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const Transition = props => {
  return <Slide {...props} direction="up" />;
};

const UserDatesUpdate = props => {
  const classes = useStyles();
  const {
    closeUserDatesUpdateComp,
    handleUserFormSubmit,
    handleUserDateInputChange,
    userDatesDialogOpen,
    user
  } = props;
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  if (user.anniversaryDate) {
    const dt = DateTime.fromISO(user.anniversaryDate);
    user.anniversaryDate = fn.UTCToLocal(dt);
    console.log('user.anniversaryDate:', user.anniversaryDate);
  }

  if (user.birthDate) {
    const dt = DateTime.fromISO(user.birthDate);
    user.birthDate = fn.UTCToLocal(dt);
    console.log('user.birthDate:', user.birthDate);
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const clickHandler = e => {
    handleUserFormSubmit(e);
    setSnackbarOpen(true);
  };

  return (
    <div>
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          TransitionComponent={Transition}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}>
          <SnackbarContentWrapper
            onClose={handleSnackbarClose}
            variant="success"
            message={
              <span>
                Your profile has been successfully updated, {user.firstName}.
              </span>
            }
          />
        </Snackbar>
      </div>
      <Dialog
        fullWidth={true}
        open={userDatesDialogOpen}
        onClose={closeUserDatesUpdateComp}
        aria-labelledby="form-dialog-title"
        scroll={'body'}>
        <DialogTitle
          className={classes.title}
          id="form-dialog-title"
          disableTypography={true}>
          <Calendar height="2.5em" width="2.5em" style={{ marginRight: 16 }} />
          <Typography variant="h6">
            Change Your Dates, {user.firstName}.
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Make changes below.</DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk
              id="anniversaryDate"
              label="Anniversary Date"
              format="MM/dd/yyyy"
              fullWidth
              value={user.anniversaryDate}
              onChange={handleUserDateInputChange('anniversaryDate')}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              margin="normal"
              variant="inline"
              inputVariant="outlined"
            />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk
              id="birthDate"
              label="Partner's Birthday"
              format="MM/dd/yyyy"
              fullWidth
              value={user.birthDate}
              onChange={handleUserDateInputChange('birthDate')}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              margin="normal"
              variant="inline"
              inputVariant="outlined"
            />
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUserDatesUpdateComp} color="primary">
            Cancel
          </Button>
          <Button onClick={e => clickHandler(e)} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserDatesUpdate;
