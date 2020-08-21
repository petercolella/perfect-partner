import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { ReactComponent as Calendar } from './calendar.svg';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2)
  },
  root: {
    marginBottom: 0,
    marginTop: theme.spacing(2)
  },
  title: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const reminderArr = ['1 Week', '2 Weeks', '30 Days', '60 Days', '90 Days'];

const UserDatesAdd = props => {
  const classes = useStyles();
  const {
    dialogReminders,
    handleDateInputChange,
    handleNewDateFormSubmit,
    handleUserDateInputChange,
    newDate,
    newDateValue,
    setParentReminders,
    setUserDatesAddDialogOpen,
    user,
    userDatesAddDialogOpen
  } = props;

  const [reminders, setReminders] = useState([]);
  const [reminderObj, setReminderObj] = useState({});

  const isChecked = useCallback(
    name => {
      for (let reminder of dialogReminders) {
        if (reminder === name) {
          return true;
        }
      }
      return false;
    },
    [dialogReminders]
  );

  const createReminderObject = useCallback(() => {
    const newReminderObj = reminderArr.reduce((reminderObj, reminder) => {
      return {
        ...reminderObj,
        [reminder]: isChecked(reminder)
      };
    }, {});
    setReminderObj(newReminderObj);
  }, [isChecked]);

  useEffect(() => {
    createReminderObject();
  }, [createReminderObject, dialogReminders, newDate]);

  useEffect(() => {
    const newReminders = Object.keys(reminderObj).filter(
      reminder => reminderObj[reminder]
    );
    setReminders(newReminders);
  }, [reminderObj]);

  useEffect(() => {
    setParentReminders(reminders);
  }, [reminders, setParentReminders]);

  const handleChange = name => event => {
    setReminderObj({ ...reminderObj, [name]: event.target.checked });
  };

  return (
    <Dialog
      fullWidth={true}
      open={userDatesAddDialogOpen}
      onClose={() => setUserDatesAddDialogOpen(false)}
      aria-labelledby="form-dialog-title"
      scroll={'body'}
    >
      <DialogTitle
        className={classes.title}
        id="form-dialog-title"
        disableTypography={true}
      >
        <Calendar height="2.5em" width="2.5em" style={{ marginRight: 16 }} />
        <Typography variant="h6">New Date</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add an important date, {user.firstName}.
        </DialogContentText>
        <TextField
          id="title"
          label="Title"
          type="text"
          fullWidth
          value={newDate.title}
          onChange={handleDateInputChange('title')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="description"
          label="Description"
          type="text"
          fullWidth
          value={newDate.description}
          onChange={handleDateInputChange('description')}
          margin="normal"
          variant="outlined"
        />
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
            value={newDateValue}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </MuiPickersUtilsProvider>
        <div className={classes.root}>
          <DialogContentText classes={{ root: classes.root }}>
            Select each reminder you would like* (in addition to the day of):
          </DialogContentText>
          <FormControl
            component="fieldset"
            className={classes.formControl}
            fullWidth={true}
          >
            <FormGroup row>
              {reminderArr.map(name => (
                <FormControlLabel
                  key={name}
                  control={
                    <Checkbox
                      checked={reminderObj[name]}
                      onChange={handleChange(name)}
                      value={name}
                    />
                  }
                  label={name}
                />
              ))}
            </FormGroup>
            <FormHelperText>
              *Submitting overrides previous values
            </FormHelperText>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setUserDatesAddDialogOpen(false)}
          color="secondary"
        >
          Cancel
        </Button>
        <Button onClick={handleNewDateFormSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDatesAdd;
