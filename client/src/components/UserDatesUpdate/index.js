import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import { ReactComponent as Calendar } from './calendar.svg';
import SnackbarComponent from '../SnackbarComponent';

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

const UserDatesUpdate = props => {
  const classes = useStyles();
  const {
    anniversaryDate,
    birthDate,
    closeUserDatesUpdateComp,
    handleUserFormSubmit,
    handleUserDateInputChange,
    userDatesDialogOpen,
    user
  } = props;
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const clickHandler = () => {
    handleUserFormSubmit();
    setSnackbarOpen(true);
  };

  return (
    <div>
      <SnackbarComponent
        open={snackbarOpen}
        message={
          <span>
            Your profile has been successfully updated, {user.firstName}.
          </span>
        }
        variant="success"
      />
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
              value={anniversaryDate}
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
              value={birthDate}
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
          <Button onClick={clickHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserDatesUpdate;
