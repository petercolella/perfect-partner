import React, { useCallback, useEffect, useState } from 'react';
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
import SnackbarComponent from '../SnackbarComponent';
import UserDates from '../UserDates';
import UserDatesUpdate from '../UserDatesUpdate';
import UserProfile from '../UserProfile';
import UserProfileUpdate from '../UserProfileUpdate';

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

const noNudge = {
  name: '',
  nudgeFrequency: '',
  nudgeFrequencyUnit: '',
  textMessage: '',
  activated: false
};

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

const keyNameAndValue = obj => {
  for (let key in obj) {
    obj.name = keyNameObj[key];
    obj.value = obj[key];
    delete obj[key];
  }
  return obj;
};

const Dashboard = props => {
  const [anniversaryDate, setAnniversaryDate] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [message, setMessage] = useState(null);
  const [nudge, setNudge] = useState(noNudge);
  const [nudgeDialogOpen, setNudgeDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [testNudge, setTestNudge] = useState(null);
  const [userDatesDialogOpen, setUserDatesDialogOpen] = useState(false);
  const [userProfileDialogOpen, setUserProfileDialogOpen] = useState(false);
  const [variant, setVariant] = useState(null);

  const { loadUserInfo, signedIn, user } = props;

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

  const handleSnackbarOpen = (message, variant) => {
    setMessage(message);
    setVariant(variant);
    setSnackbarOpen(true);
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
        handleSnackbarOpen(
          `${nudge.name} has been successfully updated.`,
          'success'
        );
        loadUserInfo();
      })
      .catch(err => {
        // captures error message after last colon and space
        const [errMsg] = err.response.data.match(/(?! )[^:]+$/);
        handleSnackbarOpen(errMsg, 'error');
      });
    setNudgeDialogOpen(false);
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
      birthDate: setBirthDate
    };

    setStateObj[name](dt);
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

  const handleUserFormSubmit = () => {
    const newUser = {
      ...dashboardUser,
      anniversaryDate: fn.localToUTC(anniversaryDate),
      birthDate: fn.localToUTC(birthDate)
    };

    const testUser = {
      ...newUser,
      anniversaryDate: fn.localToUTC(anniversaryDate).toISO(),
      birthDate: fn.localToUTC(birthDate).toISO()
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
        renderSnackbarMessage(res.data);
        loadUserInfo();
      })
      .catch(err => {
        // captures error message after last colon and space
        const [errMsg] = err.response.data.match(/(?! )[^:]+$/);
        handleSnackbarOpen(errMsg, 'error');
      });

    setUserDatesDialogOpen(false);
    setUserProfileDialogOpen(false);
  };

  const classes = useStyles();

  return (
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
              setUserProfileDialogOpen={setUserProfileDialogOpen}
              signedIn={signedIn}
              user={user}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <UserDates
              anniversaryDate={anniversaryDate}
              birthDate={birthDate}
              setUserDatesDialogOpen={setUserDatesDialogOpen}
              signedIn={signedIn}
              user={user}
            />
          </Grid>
          <Grid item xs={12}>
            <NudgeTable
              handleNudgeFormSubmit={handleNudgeFormSubmit}
              handleNudgeInputChange={handleNudgeInputChange}
              launchNudgeUpdateComp={launchNudgeUpdateComp}
              nudge={nudge}
              nudgeDialogOpen={nudgeDialogOpen}
              setNudgeDialogOpen={setNudgeDialogOpen}
              user={user}
            />
          </Grid>
          <SnackbarComponent
            message={message}
            open={snackbarOpen}
            setSnackbarOpen={setSnackbarOpen}
            variant={variant}
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
          <UserProfileUpdate
            closeUserProfileUpdateComp={closeUserProfileUpdateComp}
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
