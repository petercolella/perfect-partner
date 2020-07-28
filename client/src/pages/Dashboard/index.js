import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';

import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import API from '../../utils/API';
import fn from '../../utils/fn';
import NudgeTable from '../../components/NudgeTable';
import UserDates from '../../components/UserDates';
import UserDatesAdd from '../../components/UserDatesAdd';
import UserDatesUpdate from '../../components/UserDatesUpdate';
import UserProfile from '../../components/UserProfile';
import UserProfileDelete from '../../components/UserProfileDelete';
import UserProfileUpdate from '../../components/UserProfileUpdate';

const keyNameObj = {
  imageUrl: 'Image Link',
  firstName: 'First Name',
  lastName: 'Last Name',
  name: 'Full Name',
  email: 'Email',
  partnerName: `Partner's name`,
  phone: 'Phone Number',
  anniversaryDate: 'Your Anniversary',
  birthDate: `Partner's Birthday`,
  anniversaryReminders: 'Anniversary Reminders',
  birthdayReminders: 'Birthday Reminders',
  title: 'Title',
  description: 'Description',
  value: 'Custom Date',
  reminders: 'Reminders'
};

const newDateObj = {
  title: '',
  description: '',
  value: null,
  reminders: []
};

const newNudgeObj = {
  name: '',
  nudgeFrequency: 7,
  nudgeFrequencyUnit: '',
  textMessage: ''
};

const noNudge = {
  name: '',
  nudgeFrequency: '',
  nudgeFrequencyUnit: '',
  textMessage: '',
  activated: false
};

const noUser = {
  anniversaryDate: '',
  anniversaryReminders: [],
  birthDate: '',
  birthdayReminders: [],
  email: '',
  firstName: '',
  imageUrl:
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
  lastName: '',
  name: '',
  nudges: [],
  partnerName: '',
  phone: ''
};

const userKeyArray = [
  'firstName',
  'lastName',
  'name',
  'email',
  'partnerName',
  'phone'
];

const keyNameAndValue = obj => {
  const newObj = {};
  for (let key in obj) {
    newObj.name = keyNameObj[key];
    newObj.newValue = Array.isArray(obj[key])
      ? obj[key].join(' \u2022 ')
      : obj[key];
  }
  return newObj;
};

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: '#22b5e0',
    minHeight: '100vh',
    padding: theme.spacing(4, 4, 8)
  },
  heading: {
    border: '2px #fff solid',
    borderRadius: 4,
    color: '#fff',
    padding: 16,
    [theme.breakpoints.down('xs')]: {
      marginTop: 46
    }
  }
}));

const Dashboard = props => {
  const [anniversaryDate, setAnniversaryDate] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [dateReminders, setDateReminders] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [nudge, setNudge] = useState(noNudge);
  const [newDate, setNewDate] = useState(newDateObj);
  const [newNudge, setNewNudge] = useState(newNudgeObj);
  const [newDateValue, setNewDateValue] = useState(newDateObj.value);
  const [nudgeDialogOpen, setNudgeDialogOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [testNudge, setTestNudge] = useState(null);
  const [nudgeAddDialogOpen, setNudgeAddDialogOpen] = useState(false);
  const [userDatesAddDialogOpen, setUserDatesAddDialogOpen] = useState(false);
  const [userDatesDialogOpen, setUserDatesDialogOpen] = useState(false);
  const [userDeleteDialogOpen, setUserDeleteDialogOpen] = useState(false);
  const [userProfileDialogOpen, setUserProfileDialogOpen] = useState(false);

  const { handleSnackbarOpen, loadUserInfo, signedIn, signOut, user } = props;

  const [dashboardCustomDates, setDashboardCustomDates] = useState([]);
  const [dashboardUser, setDashboardUser] = useState(user);

  const loadDashboardUser = useCallback(() => {
    setDashboardUser(user);
  }, [user]);

  useEffect(() => {
    loadDashboardUser();
  }, [loadDashboardUser]);

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

  useEffect(() => {
    loadDates();
  }, [loadDates]);

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

  useEffect(() => {
    loadCustomDates();
  }, [loadCustomDates]);

  const closeNudgeAddComp = () => {
    setNudgeAddDialogOpen(false);
    loadDashboardUser();
  };

  const closeUserDatesAddComp = () => {
    setUserDatesAddDialogOpen(false);
    loadCustomDates();
  };

  const closeUserDatesUpdateComp = () => {
    setUserDatesDialogOpen(false);
    loadDates();
  };

  const closeUserProfileUpdateComp = () => {
    setUserProfileDialogOpen(false);
    loadDashboardUser();
  };

  const timeTotalRef = useRef();
  timeTotalRef.current = 0;

  const eraseUser = () => {
    Object.keys(dashboardUser).forEach(key => {
      if (
        typeof dashboardUser[key] === 'string' &&
        userKeyArray.includes(key)
      ) {
        for (let i = dashboardUser[key].length - 1; i >= 0; i--) {
          setTimeout(() => {
            setDashboardUser(dashboardUser => {
              return {
                ...dashboardUser,
                [key]: dashboardUser[key].substring(0, i)
              };
            });
          }, (timeTotalRef.current += 75));
        }
      }
    });
  };

  const handleUserAccountDeleteSubmit = () => {
    eraseUser();
    setTimeout(() => {
      setDeleted(true);
      setUserProfileDialogOpen(false);
    }, (timeTotalRef.current += 100));
    setTimeout(() => {
      API.deleteUser(user._id)
        .then(res => {
          handleSnackbarOpen('See ya!!!', 'info', 1000);
          setTimeout(() => {
            setRedirect(true);
            signOut();
          }, 1250);
        })
        .catch(err => {
          const [errMsg] = err.response.data.match(/(?! )[^:]+$/);
          handleSnackbarOpen(errMsg, 'error');
        });
    }, (timeTotalRef.current += 1250));
    setUserDeleteDialogOpen(false);
  };

  const handleNudgeDelete = nudge => {
    API.deleteNudge(nudge._id)
      .then(res => {
        loadUserInfo();
        handleSnackbarOpen(`The ${nudge.name} nudge has been deleted.`, 'info');
      })
      .catch(err => {
        const [errMsg] = err.response.data.match(/(?! )[^:]+$/);
        handleSnackbarOpen(errMsg, 'error');
      });
  };

  const handleNewNudgeInputChange = name => event => {
    setNewNudge({ ...newNudge, [name]: event.target.value });
  };

  const handleNudgeInputChange = name => event => {
    setNudge({ ...nudge, [name]: event.target.value });
  };

  const launchNudgeUpdateComp = nudge => {
    setNudge(nudge);
    setTestNudge(nudge);
    setNudgeDialogOpen(true);
  };

  const handleNudgeAddFormSubmit = () => {
    const body = {
      userId: user._id,
      nudge: newNudge
    };

    API.saveNudge(body)
      .then(res => {
        loadUserInfo();
        closeNudgeAddComp();
        handleSnackbarOpen(
          `${res.data.name} has been successfully added.`,
          'success'
        );
        setNewNudge(newNudgeObj);
      })
      .catch(err => {
        // captures error message after last colon and space
        const [errMsg] = err.response.data.match(/(?! )[^:]+$/);
        handleSnackbarOpen(errMsg, 'error');
        loadDashboardUser();
        return;
      });
  };

  const handleNudgeFormSubmit = () => {
    const testArray = Object.keys(testNudge).filter(
      key => testNudge[key] !== nudge[key]
    );

    if (!testArray.length) {
      handleSnackbarOpen(`Oops! You haven't changed anything yet.`, 'warning');
      return;
    }

    API.updateNudge(nudge._id, {
      ...nudge
    })
      .then(res => {
        loadUserInfo();
        handleSnackbarOpen(
          `${res.data.name} has been successfully updated.`,
          'success'
        );
        setNudgeDialogOpen(false);
      })
      .catch(err => {
        // captures error message after last colon and space
        const [errMsg] = err.response.data.match(/(?! )[^:]+$/);
        handleSnackbarOpen(errMsg, 'error');
        loadDashboardUser();
        return;
      });
  };

  const handleCustomDateDelete = date => {
    API.deleteDate(date._id)
      .then(res => {
        loadUserInfo();
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

  const handleUserDateInputChange = name => date => {
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

  const handleUserInputChange = name => event => {
    setDashboardUser({ ...dashboardUser, [name]: event.target.value });
  };

  const renderSnackbarMessage = (res, isCustomDate = false) => {
    const dateKeysArray = ['anniversaryDate', 'birthDate', 'value'];

    const customDatesChanged = (resObj, resObjKey) => {
      let changed;
      user.customDates.forEach(date => {
        if (date._id === resObj._id) {
          Object.keys(date).forEach(key => {
            if (key === resObjKey) {
              changed =
                key === 'reminders'
                  ? date[key].join('') !== resObj[key].join('')
                  : (key === 'value'
                      ? date[key].setZone('UTC').toISO()
                      : date[key]) !== resObj[key];
            }
          });
        }
      });
      return changed;
    };

    const updatedValuesArray = Object.keys(res)
      .filter(key => {
        if (['_id', '__v', 'customDates', 'nudges'].includes(key)) return false;

        if (isCustomDate) return customDatesChanged(res, key);

        if (Array.isArray(res[key]))
          return res[key].join() !== user[key].join();

        return user[key] ? res[key] !== user[key] : false;
      })
      .map(key => {
        return {
          [key]: !dateKeysArray.includes(key)
            ? res[key]
            : DateTime.fromISO(res[key]).setZone('UTC').toLocaleString()
        };
      });

    const snackbarValuesArray = updatedValuesArray.map(
      el => (el = keyNameAndValue(el))
    );

    const messageHTML = (
      <div>
        <p>
          Your {isCustomDate ? `${res.title} date` : 'profile'} has been
          successfully updated with the following changes:
        </p>
        <ul>
          {snackbarValuesArray.map((el, i) => {
            return (
              <li key={el.name || i}>
                {el.name}: {el.newValue}
              </li>
            );
          })}
        </ul>
      </div>
    );

    handleSnackbarOpen(messageHTML, 'success');
  };

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
        loadUserInfo();
        handleSnackbarOpen(
          `The ${res.data.title} custom date has been successfully added.`,
          'success'
        );
        setNewDate(newDateObj);
        setNewDateValue(newDateObj.value);
      })
      .catch(err => {
        // captures error message after last colon and space
        const [errMsg] = err.response.data.match(/(?! )[^:]+$/);
        handleSnackbarOpen(errMsg, 'error');
        loadCustomDates();
        return;
      });
  };

  const handleUserFormSubmit = () => {
    const newUser = {
      ...dashboardUser,
      anniversaryDate: anniversaryDate
        ? fn.localToUTC(anniversaryDate)
        : undefined,
      birthDate: birthDate ? fn.localToUTC(birthDate) : undefined
    };

    const testUser = {
      ...dashboardUser,
      anniversaryDate: anniversaryDate
        ? fn.localToUTC(anniversaryDate).toISO()
        : undefined,
      birthDate: birthDate ? fn.localToUTC(birthDate).toISO() : undefined
    };

    const testArray = Object.keys(testUser).filter(key => {
      if (Array.isArray(testUser[key])) {
        return testUser[key].join() !== user[key].join();
      }
      return testUser[key] !== user[key];
    });

    const customDateTestArray = dashboardCustomDates.flatMap(date => {
      return Object.keys(date).filter(key => {
        return (
          user.customDates.find(({ _id }) => _id === date._id) &&
          date[key] !==
            user.customDates.find(({ _id }) => _id === date._id)[key]
        );
      });
    });

    if (!testArray.length && !customDateTestArray.length) {
      handleSnackbarOpen(`Oops! You haven't changed anything yet.`, 'warning');
      return;
    }

    if (testArray.length) {
      API.updateUser(user._id, newUser)
        .then(res => {
          loadUserInfo();
          renderSnackbarMessage(res.data);
          setUserDatesDialogOpen(false);
          setUserProfileDialogOpen(false);
        })
        .catch(err => {
          // captures error message after last colon and space
          const [errMsg] = err.response
            ? err.response.data.match(/(?! )[^:]+$/)
            : 'Error!';
          handleSnackbarOpen(errMsg, 'error');
          loadDashboardUser();
          return;
        });
    }

    if (customDateTestArray.length) {
      dashboardCustomDates.forEach((date, i) => {
        let changed = false;
        Object.keys(date).forEach(key => {
          if (date[key] !== user.customDates[i][key]) {
            changed = true;
          }
        });
        if (changed) {
          const tempDate = { ...date };
          tempDate.value = fn.localToUTC(tempDate.value);
          API.updateDate(date._id, tempDate)
            .then(res => {
              loadUserInfo();
              renderSnackbarMessage(res.data, true);
              setUserDatesDialogOpen(false);
              setUserProfileDialogOpen(false);
            })
            .catch(err => {
              // captures error message after last colon and space
              const [errMsg] = err.response
                ? err.response.data.match(/(?! )[^:]+$/)
                : err.message;
              handleSnackbarOpen(errMsg, 'error');
              loadDashboardUser();
              return;
            });
        }
      });
    }
  };

  const classes = useStyles();

  return redirect ? (
    <Redirect to="/landing" />
  ) : (
    <Fade in={true} timeout={1000}>
      <Container className={classes.container}>
        <Toolbar />
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h3" align="center" className={classes.heading}>
              Dashboard
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <UserProfile
              deleted={deleted}
              setUserProfileDialogOpen={setUserProfileDialogOpen}
              signedIn={signedIn}
              user={!deleted ? user : noUser}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <UserDates
              anniversaryDate={anniversaryDate}
              birthDate={birthDate}
              deleted={deleted}
              setUserDatesAddDialogOpen={setUserDatesAddDialogOpen}
              setUserDatesDialogOpen={setUserDatesDialogOpen}
              signedIn={signedIn}
              user={user}
            />
          </Grid>
          <Grid item xs={12}>
            <NudgeTable
              deleted={deleted}
              handleNewNudgeInputChange={handleNewNudgeInputChange}
              handleNudgeDelete={handleNudgeDelete}
              handleNudgeFormSubmit={handleNudgeFormSubmit}
              handleNudgeAddFormSubmit={handleNudgeAddFormSubmit}
              handleNudgeInputChange={handleNudgeInputChange}
              launchNudgeUpdateComp={launchNudgeUpdateComp}
              newNudge={newNudge}
              nudge={nudge}
              nudgeAddDialogOpen={nudgeAddDialogOpen}
              setNudgeAddDialogOpen={setNudgeAddDialogOpen}
              nudgeDialogOpen={nudgeDialogOpen}
              setNudgeDialogOpen={setNudgeDialogOpen}
              user={user}
            />
          </Grid>
          <UserDatesAdd
            dialogReminders={newDate.reminders}
            handleDateInputChange={handleDateInputChange}
            handleNewDateFormSubmit={handleNewDateFormSubmit}
            handleUserDateInputChange={handleUserDateInputChange}
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
            handleUserCustomDateReminderChange={
              handleUserCustomDateReminderChange
            }
            handleUserCustomDatePickerChange={handleUserCustomDatePickerChange}
            handleUserDateInputChange={handleUserDateInputChange}
            handleUserFormSubmit={handleUserFormSubmit}
            user={user}
            userDatesDialogOpen={userDatesDialogOpen}
          />
          <UserProfileDelete
            setRedirect={setRedirect}
            setUserDeleteDialogOpen={setUserDeleteDialogOpen}
            handleUserAccountDeleteSubmit={handleUserAccountDeleteSubmit}
            userDeleteDialogOpen={userDeleteDialogOpen}
            user={user}
          />
          <UserProfileUpdate
            closeUserProfileUpdateComp={closeUserProfileUpdateComp}
            setUserDeleteDialogOpen={setUserDeleteDialogOpen}
            handleUserFormSubmit={handleUserFormSubmit}
            handleUserInputChange={handleUserInputChange}
            user={dashboardUser}
            userProfileDialogOpen={userProfileDialogOpen}
          />
        </Grid>
      </Container>
    </Fade>
  );
};

export default Dashboard;
