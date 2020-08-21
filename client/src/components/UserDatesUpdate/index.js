import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import DeleteIcon from '@material-ui/icons/Delete';

import UserDatesDelete from '../UserDatesDelete';

import { ReactComponent as Calendar } from './calendar.svg';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  deleteButton: {
    padding: 8
  },
  divider: {
    margin: theme.spacing(1, 0)
  },
  root: {
    marginBottom: 0,
    marginTop: theme.spacing(2)
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 0
  },
  title: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const reminderArr = ['1 Week', '2 Weeks', '30 Days', '60 Days', '90 Days'];

const UserDatesUpdate = props => {
  const classes = useStyles();
  const {
    anniversaryDate,
    anniversaryReminders,
    birthDate,
    birthdayReminders,
    closeUserDatesUpdateComp,
    dashboardCustomDates,
    handleCustomDateDelete,
    handleReminderChange,
    handleUserCustomDateInputChange,
    handleUserCustomDateReminderChange,
    handleUserCustomDatePickerChange,
    handleUserDateInputChange,
    handleUserFormSubmit,
    user,
    userDatesDialogOpen
  } = props;

  const [birthdayUpdateReminders, setBirthdayUpdateReminders] = useState([]);
  const [birthdayReminderObj, setBirthdayReminderObj] = useState({});
  const [anniversaryUpdateReminders, setAnniversaryUpdateReminders] = useState(
    []
  );
  const [anniversaryReminderObj, setAnniversaryReminderObj] = useState({});
  const [
    customDateReminderBooleanObjArray,
    setCustomDateReminderBooleanObjArray
  ] = useState([]);
  const [userDateDeleteDialogOpen, setUserDateDeleteDialogOpen] = useState(
    false
  );
  const [userDateToDelete, setUserDateToDelete] = useState({ name: '' });

  const handleUserDateDeleteClick = userDate => {
    setUserDateDeleteDialogOpen(true);
    setUserDateToDelete(userDate);
  };

  const handleUserDateDeleteConfirm = userDate => {
    handleCustomDateDelete(userDate);
    setUserDateDeleteDialogOpen(false);
  };

  const isBirthdayReminderChecked = useCallback(
    name => {
      for (let reminder of birthdayReminders) {
        if (reminder === name) {
          return true;
        }
      }
      return false;
    },
    [birthdayReminders]
  );

  const isAnniversaryReminderChecked = useCallback(
    name => {
      for (let reminder of anniversaryReminders) {
        if (reminder === name) {
          return true;
        }
      }
      return false;
    },
    [anniversaryReminders]
  );

  const isCustomDateReminderChecked = useCallback(
    (id, name) => {
      for (let date of dashboardCustomDates) {
        if (date._id === id) {
          for (let reminder of date.reminders) {
            if (reminder === name) {
              return true;
            }
          }
        }
      }
      return false;
    },
    [dashboardCustomDates]
  );

  const createBirthdayReminderObject = useCallback(() => {
    const newBirthdayReminderObj = reminderArr.reduce(
      (birthdayReminderObj, reminder) => {
        return {
          ...birthdayReminderObj,
          [reminder]: isBirthdayReminderChecked(reminder)
        };
      },
      {}
    );
    setBirthdayReminderObj(newBirthdayReminderObj);
  }, [isBirthdayReminderChecked]);

  const createAnniversaryReminderObject = useCallback(() => {
    const newAnniversaryReminderObj = reminderArr.reduce(
      (anniversaryReminderObj, reminder) => {
        return {
          ...anniversaryReminderObj,
          [reminder]: isAnniversaryReminderChecked(reminder)
        };
      },
      {}
    );
    setAnniversaryReminderObj(newAnniversaryReminderObj);
  }, [isAnniversaryReminderChecked]);

  const createCustomDateReminderArray = useCallback(() => {
    const newCustomDateArray = [];
    dashboardCustomDates.forEach(date => {
      const newCustomDateReminderObj = reminderArr.reduce(
        (customDateReminderObj, reminder) => {
          return {
            ...customDateReminderObj,
            [reminder]: isCustomDateReminderChecked(date._id, reminder)
          };
        },
        {}
      );
      newCustomDateArray.push(newCustomDateReminderObj);
    });
    setCustomDateReminderBooleanObjArray(newCustomDateArray);
  }, [dashboardCustomDates, isCustomDateReminderChecked]);

  useEffect(() => {
    createBirthdayReminderObject();
  }, [createBirthdayReminderObject, birthdayReminders]);

  useEffect(() => {
    createAnniversaryReminderObject();
  }, [createAnniversaryReminderObject, anniversaryReminders]);

  useEffect(() => {
    createCustomDateReminderArray();
  }, [createCustomDateReminderArray, dashboardCustomDates]);

  useEffect(() => {
    const newReminders = Object.keys(birthdayReminderObj).filter(
      reminder => birthdayReminderObj[reminder]
    );
    setBirthdayUpdateReminders(newReminders);
  }, [birthdayReminderObj]);

  useEffect(() => {
    const newReminders = Object.keys(anniversaryReminderObj).filter(
      reminder => anniversaryReminderObj[reminder]
    );
    setAnniversaryUpdateReminders(newReminders);
  }, [anniversaryReminderObj]);

  useEffect(() => {
    handleReminderChange(anniversaryUpdateReminders, birthdayUpdateReminders);
  }, [
    handleReminderChange,
    anniversaryUpdateReminders,
    birthdayUpdateReminders
  ]);

  const handleCancel = () => {
    closeUserDatesUpdateComp();
    createBirthdayReminderObject();
    createAnniversaryReminderObject();
    createCustomDateReminderArray();
  };

  const handleBirthdayChange = name => event => {
    setBirthdayReminderObj({
      ...birthdayReminderObj,
      [name]: event.target.checked
    });
  };

  const handleAnniversaryChange = name => event => {
    setAnniversaryReminderObj({
      ...anniversaryReminderObj,
      [name]: event.target.checked
    });
  };

  const handleCustomDateChange = (index, name, id) => event => {
    const newCustomDateReminderBooleanObjArray = customDateReminderBooleanObjArray.map(
      (obj, i) => {
        if (index === i) {
          return {
            ...obj,
            [name]: event.target.checked
          };
        }

        return obj;
      }
    );

    const newCustomDateReminderArray = Object.keys(
      newCustomDateReminderBooleanObjArray[index]
    ).filter(key => newCustomDateReminderBooleanObjArray[index][key]);

    handleUserCustomDateReminderChange(id, newCustomDateReminderArray);
    setCustomDateReminderBooleanObjArray(newCustomDateReminderBooleanObjArray);
  };

  return (
    <>
      <Dialog
        fullWidth={true}
        open={userDatesDialogOpen}
        onClose={closeUserDatesUpdateComp}
        aria-labelledby="form-dialog-title"
        scroll={'body'}
      >
        <DialogTitle
          className={classes.title}
          id="form-dialog-title"
          disableTypography={true}
        >
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
          <div className={classes.root}>
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
                        checked={anniversaryReminderObj[name]}
                        onChange={handleAnniversaryChange(name)}
                        value={name}
                      />
                    }
                    label={name}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </div>
          <Divider className={classes.divider} variant="fullWidth" />
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
          <div className={classes.root}>
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
                        checked={birthdayReminderObj[name]}
                        onChange={handleBirthdayChange(name)}
                        value={name}
                      />
                    }
                    label={name}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </div>
          {dashboardCustomDates &&
            dashboardCustomDates.map((date, index) => (
              <div key={date._id}>
                <Divider className={classes.divider} variant="fullWidth" />
                <DialogContentText className={classes.text} variant="body2">
                  <Tooltip title="Delete Date" color="primary">
                    <IconButton
                      className={classes.deleteButton}
                      aria-label="delete date"
                      onClick={() => handleUserDateDeleteClick(date)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  {date.title}
                </DialogContentText>
                <TextField
                  id={`custom-title-${date.title}`}
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
                  id={`custom-description-${date.description}`}
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
                <div className={classes.root}>
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
                              checked={
                                customDateReminderBooleanObjArray[index]
                                  ? customDateReminderBooleanObjArray[index][
                                      name
                                    ]
                                  : false
                              }
                              onChange={handleCustomDateChange(
                                index,
                                name,
                                date._id
                              )}
                              value={name}
                            />
                          }
                          label={name}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                </div>
              </div>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUserFormSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <UserDatesDelete
        handleUserDateDeleteConfirm={handleUserDateDeleteConfirm}
        userDate={userDateToDelete}
        userDateDeleteDialogOpen={userDateDeleteDialogOpen}
        setUserDateDeleteDialogOpen={setUserDateDeleteDialogOpen}
      />
    </>
  );
};

export default UserDatesUpdate;
