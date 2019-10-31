import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
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
  const [nudge, setNudge] = useState({
    name: '',
    nudgeFrequency: '',
    nudgeFrequencyUnit: '',
    textMessage: '',
    activated: false
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [userDialogOpen, setUserDialogOpen] = useState(false);

  const { location, loadUserInfo, setPreviousPath, setUser, user } = props;

  useEffect(() => {
    setPreviousPath(location.pathname);
  }, [location, setPreviousPath]);

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

  const classes = useStyles();

  return (
    <div className="container-fluid background">
      <Toolbar />
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
