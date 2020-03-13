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
import NudgeTable from '../NudgeTable';
import UserDates from '../UserDates';
import UserDatesAdd from '../UserDatesAdd';
import UserDatesUpdate from '../UserDatesUpdate';
import UserProfile from '../UserProfile';
import UserProfileDelete from '../UserProfileDelete';
import UserProfileUpdate from '../UserProfileUpdate';

const keyNameObj = {
  imageUrl: 'Image Link',
  firstName: 'First Name',
  lastName: 'Last Name',
  name: 'Full Name',
  email: 'Email',
  partnerName: `Partner's name`,
  phone: 'Phone Number',
  anniversaryDate: 'Your Anniversary',
  birthDate: `Partner's Birthday`
};

const newDateObj = {
  title: '',
  description: '',
  value: new Date(),
  reminders: []
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
  birthDate: '',
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
  for (let key in obj) {
    obj.name = keyNameObj[key];
    obj.value = obj[key];
    delete obj[key];
  }
  return obj;
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
  const [newDateValue, setNewDateValue] = useState(newDateObj.value);
  const [nudgeDialogOpen, setNudgeDialogOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [testNudge, setTestNudge] = useState(null);
  const [userDatesAddDialogOpen, setUserDatesAddDialogOpen] = useState(false);
  const [userDatesDialogOpen, setUserDatesDialogOpen] = useState(false);
  const [userDeleteDialogOpen, setUserDeleteDialogOpen] = useState(false);
  const [userProfileDialogOpen, setUserProfileDialogOpen] = useState(false);

  const { handleSnackbarOpen, loadUserInfo, signedIn, signOut, user } = props;

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
      })
      .catch(err => {
        const [errMsg] = err.response.data.match(/(?! )[^:]+$/);
        handleSnackbarOpen(errMsg, 'error');
      });
    handleSnackbarOpen(`The ${nudge.name} nudge has been deleted.`, 'info');
  };

  const handleNudgeInputChange = name => event => {
    setNudge({ ...nudge, [name]: event.target.value });
  };

  const launchNudgeUpdateComp = nudge => {
    setNudge(nudge);
    setTestNudge(nudge);
    setNudgeDialogOpen(true);
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
          `${nudge.name} has been successfully updated.`,
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

  const handleUserInputChange = name => event => {
    setDashboardUser({ ...dashboardUser, [name]: event.target.value });
  };

  const renderSnackbarMessage = res => {
    const dateKeysArray = ['anniversaryDate', 'birthDate'];

    const updatedValuesArray = Object.keys(res)
      .filter(key => res[key] !== user[key] && typeof res[key] !== 'object')
      .map(key => {
        return {
          [key]: !dateKeysArray.includes(key)
            ? res[key]
            : DateTime.fromISO(res[key])
                .setZone('UTC')
                .toLocaleString()
        };
      });

    const messageHTML = (
      <div>
        <p>
          Your profile has been successfully updated with the following changes:
        </p>
        <ul>
          {updatedValuesArray.map(el => {
            el = keyNameAndValue(el);
            return (
              <li key={el.name}>
                {el.name}: {el.value}
              </li>
            );
          })}
        </ul>
      </div>
    );

    handleSnackbarOpen(messageHTML, 'success');
  };

  const handleNewDateFormSubmit = () => {
    const newObj = {
      userId: user._id,
      title: newDate.title,
      description: newDate.description,
      value: newDateValue,
      reminders: dateReminders
    };
    API.saveDate(newObj).then(res => console.log(res));
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
      ...newUser,
      anniversaryDate: anniversaryDate
        ? fn.localToUTC(anniversaryDate).toISO()
        : undefined,
      birthDate: birthDate ? fn.localToUTC(birthDate).toISO() : undefined
    };

    const testArray = Object.keys(testUser).filter(
      key => testUser[key] !== user[key]
    );

    if (!testArray.length) {
      handleSnackbarOpen(`Oops! You haven't changed anything yet.`, 'warning');
      return;
    }

    API.updateUser(user._id, newUser)
      .then(res => {
        loadUserInfo();
        renderSnackbarMessage(res.data);
        setUserDatesDialogOpen(false);
        setUserProfileDialogOpen(false);
      })
      .catch(err => {
        // captures error message after last colon and space
        const [errMsg] = err.response.data.match(/(?! )[^:]+$/);
        handleSnackbarOpen(errMsg, 'error');
        loadDashboardUser();
        return;
      });
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
              handleNudgeDelete={handleNudgeDelete}
              handleNudgeFormSubmit={handleNudgeFormSubmit}
              handleNudgeInputChange={handleNudgeInputChange}
              launchNudgeUpdateComp={launchNudgeUpdateComp}
              nudge={nudge}
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
            birthDate={birthDate}
            closeUserDatesUpdateComp={closeUserDatesUpdateComp}
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
