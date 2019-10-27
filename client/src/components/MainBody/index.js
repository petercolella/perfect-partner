import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import API from '../../utils/API';
import UserUpdate from '../UserUpdate';
import NudgeTable from '../NudgeTable';
import fn from '../../utils/fn';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  card: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  signOut: {
    fontSize: '1rem',
    lineHeight: '48px',
    marginLeft: theme.spacing(1)
  }
}));

const MainBody = props => {
  const [user, setUser] = useState({
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
  });

  const [nudge, setNudge] = useState({
    name: '',
    nudgeFrequency: '',
    nudgeFrequencyUnit: '',
    textMessage: '',
    activated: false
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [userDialogOpen, setUserDialogOpen] = useState(false);

  const { location, setPreviousPath } = props;

  useEffect(() => {
    setPreviousPath(location.pathname);
  }, [location, setPreviousPath]);

  const idRef = useRef();

  const loadUserInfo = useCallback(() => {
    const id = sessionStorage.getItem('currentUserId');
    idRef.current = id;
    if (idRef.current) {
      API.getUser(id).then(res => {
        setUser(user => (res.data ? res.data : user));
      });
    }
  }, []);

  useEffect(() => {
    loadUserInfo();
  }, [loadUserInfo]);

  const launchUpdateComp = nudge => {
    setNudge(nudge);
    setDialogOpen(true);
  };

  const closeUpdateComp = () => {
    setDialogOpen(false);
  };

  const launchUserUpdateComp = () => {
    setUserDialogOpen(true);
  };

  const closeUserUpdateComp = () => {
    setUserDialogOpen(false);
    loadUserInfo();
  };

  const handleInputChange = name => event => {
    setNudge({ ...nudge, [name]: event.target.value });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    API.updateNudge(nudge._id, {
      ...nudge
    }).then(() => {
      loadUserInfo();
    });
    setDialogOpen(false);
  };

  const handleUserInputChange = name => event => {
    setUser({ ...user, [name]: event.target.value });
  };

  const handleUserDateInputChange = name => date => {
    console.log('date:', date);
    setUser({ ...user, [name]: date });
  };

  const handleUserFormSubmit = event => {
    event.preventDefault();
    API.updateUser(user._id, {
      ...user
    }).then(() => {
      loadUserInfo();
    });
    setUserDialogOpen(false);
  };

  useEffect(() => {
    window.gapi.load('auth2', function() {
      /* Ready. Make a call to gapi.auth2.init or some other API */
      window.gapi.auth2.init({
        client_id:
          '1061415806670-1l8r6vaqn21lc7h45l0ethglqat21kls.apps.googleusercontent.com'
      });
    });
  }, []);

  const signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
      console.log('User signed out.');
    });

    sessionStorage.setItem('currentUserId', '');

    setUser({
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
    });
  };

  const classes = useStyles();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 col-sm-12">
          <img id="header-img" alt="logo" src="/img/logo_p.png" />
        </div>
        <div className="col-md-4 offset-md-4 col-sm-12 d-flex justify-content-end">
          <h3 className="my-auto mr-2" id="avatar-text-header">
            {user.name ? user.name : <span>Please sign in.</span>}
          </h3>
          <img
            className="my-auto"
            id="avatar-image-header"
            alt="User"
            src={user.imageUrl}
          />
          <MuiLink
            component="button"
            variant="body2"
            onClick={signOut}
            className={classes.signOut}>
            Sign Out
          </MuiLink>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <Paper className={classes.root}>
            {user.name ? (
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="body1">
                    <span>Phone Number: </span>
                    {user.phone ? fn.formatPhoneNumber(user.phone) : null}
                  </Typography>
                  <Typography variant="body1">
                    <span>Partner's Name: </span>
                    {user.partnerName}
                  </Typography>
                  <Typography variant="body1">
                    <span>Partner's Birthday: </span>
                    {user.birthDate
                      ? new Date(user.birthDate).toLocaleDateString()
                      : ''}
                  </Typography>
                  <Typography variant="body1">
                    <span>Your Anniversary: </span>
                    {user.anniversaryDate
                      ? new Date(user.anniversaryDate).toLocaleDateString()
                      : ''}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={launchUserUpdateComp}>
                    Edit Your Profile
                  </Button>
                </CardActions>
              </Card>
            ) : (
              <Card className={classes.card}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom>
                    Please click{' '}
                    <Link to="/" style={{ color: '#22b5e0' }}>
                      here
                    </Link>{' '}
                    to sign in before continuing.
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Paper>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <NudgeTable
            user={user}
            nudge={nudge}
            loadUserInfo={loadUserInfo}
            launchUpdateComp={launchUpdateComp}
            closeUpdateComp={closeUpdateComp}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            dialogOpen={dialogOpen}
          />
        </div>
      </div>
      <UserUpdate
        closeUserUpdateComp={closeUserUpdateComp}
        handleUserInputChange={handleUserInputChange}
        handleUserDateInputChange={handleUserDateInputChange}
        handleUserFormSubmit={handleUserFormSubmit}
        user={user}
        userDialogOpen={userDialogOpen}
      />
    </div>
  );
};

export default MainBody;
