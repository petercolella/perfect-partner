import React, { useCallback, useContext, useEffect, useState } from 'react';
import useHandleUserFormSubmit from '../../hooks/useHandleUserFormSubmit';
import { Context as SnackbarContext } from '../../context/SnackbarContext';
import { Context as UserContext } from '../../context/UserContext';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';

import AddBoxIcon from '@material-ui/icons/AddBox';

import UserDatesAdd from '../../components/UserDatesAdd';
import UserDatesUpdate from '../../components/UserDatesUpdate';

import API from '../../utils/API';
import fn from '../../utils/fn';

const newDateObj = {
  title: '',
  description: '',
  value: null,
  reminders: []
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  button: {
    borderColor: '#22b5e0',
    color: '#22b5e0',
    margin: theme.spacing(1)
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  multiline: {
    margin: 0
  }
}));

const StyledIconButton = withStyles(theme => ({
  root: {
    marginBottom: '-0.5em'
  }
}))(IconButton);

const UserDates = ({ deleted }) => {
  const { handleSnackbarOpen } = useContext(SnackbarContext);
  const {
    state: { signedIn, user },
    reloadCurrentUser
  } = useContext(UserContext);

  const [anniversaryDate, setAnniversaryDate] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [dashboardCustomDates, setDashboardCustomDates] = useState([]);
  const [dashboardUser, setDashboardUser] = useState(user);
  const [dateReminders, setDateReminders] = useState([]);
  const [newDate, setNewDate] = useState(newDateObj);
  const [newDateValue, setNewDateValue] = useState(newDateObj.value);
  const [userDatesAddDialogOpen, setUserDatesAddDialogOpen] = useState(false);
  const [userDatesDialogOpen, setUserDatesDialogOpen] = useState(false);

  const loadCustomDates = useCallback(() => {
    if (user.customDates) {
      const arr = user.customDates.map(date => {
        const dt = fn.UTCToLocal(DateTime.fromISO(date.value));
        date.value = dt;
        return date;
      });
      setDashboardCustomDates([...arr]);
    }
  }, [user]);

  const loadDates = useCallback(() => {
    if (user.anniversaryDate) {
      const dt = DateTime.fromISO(user.anniversaryDate);
      setAnniversaryDate(fn.UTCToLocal(dt));
    }

    if (user.birthDate) {
      const dt = DateTime.fromISO(user.birthDate);
      setBirthDate(fn.UTCToLocal(dt));
    }
  }, [user]);

  const loadDashboardState = useCallback(() => {
    loadCustomDates();
    loadDates();
    setDashboardUser(user);
  }, [loadCustomDates, loadDates, user]);

  useEffect(() => {
    loadDashboardState();
  }, [loadDashboardState]);

  const [handleUserFormSubmit] = useHandleUserFormSubmit(
    setUserDatesDialogOpen,
    loadDashboardState,
    { anniversaryDate, birthDate, dashboardCustomDates, dashboardUser, user }
  );

  const closeUserDatesAddComp = () => {
    setUserDatesAddDialogOpen(false);
    loadDashboardState();
  };

  const closeUserDatesUpdateComp = () => {
    setUserDatesDialogOpen(false);
    loadDashboardState();
  };

  const handleCustomDateDelete = date => {
    API.deleteDate(date._id)
      .then(res => {
        reloadCurrentUser();
        handleSnackbarOpen(
          `The ${date.title} custom date has been deleted.`,
          'info'
        );
      })
      .catch(err => {
        const [errMsg] = err.response.data.match(/(?! )[^:]+$/);
        handleSnackbarOpen(errMsg, 'error');
      });
  };

  const handleUserCustomDateInputChange = id => event => {
    const { name, value } = event.target;

    const newDashboardCustomDates = dashboardCustomDates.map(date => {
      if (date._id === id) {
        const tempDate = { ...date };
        tempDate[name] = value;
        return tempDate;
      }

      return date;
    });

    setDashboardCustomDates(newDashboardCustomDates);
  };

  const handleUserCustomDatePickerChange = id => input => {
    const dt = DateTime.fromJSDate(input).set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });

    const newDashboardCustomDates = dashboardCustomDates.map(date => {
      if (date._id === id) {
        const tempDate = { ...date };
        tempDate.value = dt;
        return tempDate;
      }

      return date;
    });

    setDashboardCustomDates(newDashboardCustomDates);
  };

  const handleUserCustomDateReminderChange = (id, value) => {
    const newDashboardCustomDates = dashboardCustomDates.map(date => {
      if (date._id === id) {
        const tempDate = { ...date };
        tempDate.reminders = value;
        return tempDate;
      }

      return date;
    });

    setDashboardCustomDates(newDashboardCustomDates);
  };

  const handleUserDatePickerChange = name => date => {
    const dt = DateTime.fromJSDate(date).set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });

    const setStateObj = {
      anniversaryDate: setAnniversaryDate,
      birthDate: setBirthDate,
      newDate: setNewDateValue
    };

    setStateObj[name](dt);
  };

  const handleDateInputChange = name => event => {
    setNewDate({ ...newDate, [name]: event.target.value });
  };

  const handleReminderChange = useCallback(
    (anniversaryReminders, birthdayReminders) => {
      setDashboardUser(dashboardUser => {
        return {
          ...dashboardUser,
          anniversaryReminders,
          birthdayReminders
        };
      });
    },
    []
  );

  const handleNewDateFormSubmit = () => {
    if (!newDateValue || !newDateValue.isValid) {
      handleSnackbarOpen(`Oops! That's not valid date.`, 'warning');
      return;
    }

    if (!newDate.title) {
      handleSnackbarOpen(`Oops! Title can't be blank.`, 'warning');
      return;
    }

    if (!newDate.description) {
      handleSnackbarOpen(`Oops! Description can't be blank.`, 'warning');
      return;
    }

    const newObj = {
      title: newDate.title,
      description: newDate.description,
      value: fn.localToUTC(newDateValue),
      reminders: dateReminders
    };

    API.saveDate(newObj)
      .then(res => {
        closeUserDatesAddComp();
        reloadCurrentUser();
        handleSnackbarOpen(
          `The ${res.data.title} custom date has been successfully added.`,
          'success'
        );
        setNewDate(newDateObj);
        setNewDateValue(newDateObj.value);
        setDateReminders([]);
      })
      .catch(err => {
        // captures error message after last colon and space
        const [errMsg] = err.response.data.match(/(?! )[^:]+$/);
        handleSnackbarOpen(errMsg, 'error');
        loadCustomDates();
        return;
      });
  };

  const classes = useStyles();

  return (
    <>
      <Zoom
        in={!deleted}
        timeout={{ enter: 0, exit: 2000 }}
        style={{ transitionDelay: !deleted ? '0ms' : '250ms' }}
      >
        <Paper className={classes.root}>
          <Card className={classes.card}>
            <CardHeader
              align="center"
              action={
                <Tooltip title="Add Date" color="primary">
                  <StyledIconButton
                    aria-label="add a date"
                    onClick={() => setUserDatesAddDialogOpen(true)}
                  >
                    <AddBoxIcon color="primary" />
                  </StyledIconButton>
                </Tooltip>
              }
              title="Important Dates"
            />
            <Divider variant="middle" />
            {signedIn ? (
              <>
                <List dense={true}>
                  <ListItem>
                    <ListItemText
                      classes={{
                        multiline: classes.multiline
                      }}
                      primary="Your Anniversary:"
                      secondary={`${
                        user.anniversaryDate
                          ? `${DateTime.fromISO(anniversaryDate)
                              .setZone('UTC')
                              .toLocaleString()} \u2014 Reminders: ${
                              user.anniversaryReminders.length
                                ? user.anniversaryReminders.join(' \u2022 ')
                                : 'None Selected'
                            }`
                          : 'None Entered'
                      }`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      classes={{
                        multiline: classes.multiline
                      }}
                      primary="Partner's Birthday:"
                      secondary={`${
                        user.birthDate
                          ? `${DateTime.fromISO(birthDate)
                              .setZone('UTC')
                              .toLocaleString()} \u2014 Reminders: ${
                              user.birthdayReminders.length
                                ? user.birthdayReminders.join(' \u2022 ')
                                : 'None Selected'
                            }`
                          : 'None Entered'
                      }`}
                    />
                  </ListItem>
                  {user.customDates &&
                    user.customDates.map(date => (
                      <ListItem key={date._id}>
                        <ListItemText
                          classes={{
                            multiline: classes.multiline
                          }}
                          primary={date.title}
                          secondary={`${DateTime.fromISO(date.value)
                            .setZone('UTC')
                            .toLocaleString()} \u2014 Reminders: ${
                            date.reminders.length
                              ? date.reminders.join(' \u2022 ')
                              : 'None Selected'
                          }`}
                        />
                      </ListItem>
                    ))}
                </List>
                <Divider variant="middle" />
                <div className={classes.buttonContainer}>
                  <CardActions>
                    <Button
                      variant="outlined"
                      className={classes.button}
                      onClick={() => setUserDatesDialogOpen(true)}
                    >
                      Change Your Dates
                    </Button>
                  </CardActions>
                </div>
              </>
            ) : (
              <CardContent>
                <Typography color="textSecondary" variant="body1">
                  Please sign in to continue.
                </Typography>
              </CardContent>
            )}
          </Card>
        </Paper>
      </Zoom>
      <UserDatesAdd
        dialogReminders={newDate.reminders}
        handleDateInputChange={handleDateInputChange}
        handleNewDateFormSubmit={handleNewDateFormSubmit}
        handleUserDatePickerChange={handleUserDatePickerChange}
        newDate={newDate}
        newDateValue={newDateValue}
        setParentReminders={setDateReminders}
        setUserDatesAddDialogOpen={setUserDatesAddDialogOpen}
        user={user}
        userDatesAddDialogOpen={userDatesAddDialogOpen}
      />
      <UserDatesUpdate
        anniversaryDate={anniversaryDate}
        anniversaryReminders={user.anniversaryReminders || []}
        birthDate={birthDate}
        birthdayReminders={user.birthdayReminders || []}
        closeUserDatesUpdateComp={closeUserDatesUpdateComp}
        dashboardCustomDates={dashboardCustomDates}
        handleCustomDateDelete={handleCustomDateDelete}
        handleReminderChange={handleReminderChange}
        handleUserCustomDateInputChange={handleUserCustomDateInputChange}
        handleUserCustomDateReminderChange={handleUserCustomDateReminderChange}
        handleUserCustomDatePickerChange={handleUserCustomDatePickerChange}
        handleUserDatePickerChange={handleUserDatePickerChange}
        handleUserFormSubmit={handleUserFormSubmit}
        user={user}
        userDatesDialogOpen={userDatesDialogOpen}
      />
    </>
  );
};

export default UserDates;
