import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import { ReactComponent as Calendar } from './calendar.svg';

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
    handleUserDateInputChange,
    handleUserFormSubmit,
    user,
    userDatesDialogOpen
  } = props;

  return (
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
            animateYearScrolling={true}
            id="anniversaryDate"
            label="Anniversary Date"
            placeholder="mm/dd/yyyy"
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
            animateYearScrolling={true}
            id="birthDate"
            label="Partner's Birthday"
            placeholder="mm/dd/yyyy"
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
        <Button onClick={closeUserDatesUpdateComp} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleUserFormSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDatesUpdate;
