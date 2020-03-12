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
    newDate,
    handleUserDateInputChange,
    handleNewDateFormSubmit,
    setUserDatesAddDialogOpen,
    user,
    userDatesAddDialogOpen
  } = props;

  return (
    <Dialog
      fullWidth={true}
      open={userDatesAddDialogOpen}
      onClose={() => setUserDatesAddDialogOpen(false)}
      aria-labelledby="form-dialog-title"
      scroll={'body'}>
      <DialogTitle
        className={classes.title}
        id="form-dialog-title"
        disableTypography={true}>
        <Calendar height="2.5em" width="2.5em" style={{ marginRight: 16 }} />
        <Typography variant="h6">New Date</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add an Important Date, {user.firstName}.
        </DialogContentText>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            animateYearScrolling={true}
            clearable
            format="MM/dd/yyyy"
            fullWidth
            id="newDate"
            inputVariant="outlined"
            label="Date"
            margin="normal"
            onChange={handleUserDateInputChange('newDate')}
            placeholder="mm/dd/yyyy"
            value={newDate}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setUserDatesAddDialogOpen(false)}
          color="secondary">
          Cancel
        </Button>
        <Button onClick={handleNewDateFormSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDatesUpdate;
