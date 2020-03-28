import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import DeleteIcon from '@material-ui/icons/Delete';

import { ReactComponent as Calendar } from './calendar.svg';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  divider: {
    margin: theme.spacing(1, 0)
  },
  text: {
    marginBottom: 0
  },
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
    dashboardCustomDates,
    handleCustomDateDelete,
    handleUserCustomDateInputChange,
    handleUserCustomDatePickerChange,
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
            clearable
            format="MM/dd/yyyy"
            fullWidth
            id="anniversaryDate"
            inputVariant="outlined"
            label="Anniversary Date"
            margin="normal"
            onChange={handleUserDateInputChange('anniversaryDate')}
            placeholder="mm/dd/yyyy"
            value={anniversaryDate}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            animateYearScrolling={true}
            clearable
            format="MM/dd/yyyy"
            fullWidth
            id="birthDate"
            inputVariant="outlined"
            label="Partner's Birthday"
            margin="normal"
            onChange={handleUserDateInputChange('birthDate')}
            placeholder="mm/dd/yyyy"
            value={birthDate}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </MuiPickersUtilsProvider>
        {dashboardCustomDates &&
          dashboardCustomDates.map(date => (
            <div key={date._id}>
              <Divider className={classes.divider} variant="fullWidth" />
              <DialogContentText className={classes.text} variant="body2">
                {date.title}
                <Tooltip title="Delete Date" color="primary">
                      <IconButton
                        aria-label="delete date"
                        onClick={() => handleCustomDateDelete(date)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
              </DialogContentText>
              <TextField
                id={date.title}
                label="Title"
                type="text"
                fullWidth
                name="title"
                value={date.title}
                onChange={handleUserCustomDateInputChange(date._id)}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id={date.description}
                label="Description"
                type="text"
                fullWidth
                name="description"
                value={date.description}
                onChange={handleUserCustomDateInputChange(date._id)}
                margin="normal"
                variant="outlined"
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  animateYearScrolling={true}
                  clearable
                  format="MM/dd/yyyy"
                  fullWidth
                  id={date._id}
                  inputVariant="outlined"
                  label="Date"
                  margin="normal"
                  onChange={handleUserCustomDatePickerChange(date._id)}
                  placeholder="mm/dd/yyyy"
                  value={date.value}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          ))}
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
