import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import API from '../../utils/API';
import fn from '../../utils/fn';
import NudgeTable from '../NudgeTable';
import UserUpdate from '../UserUpdate';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  button: {
    borderColor: '#22b5e0',
    color: '#22b5e0'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: 8,
    paddingRight: 8
  },
  card: {
    minWidth: 275
  },
  container: {
    backgroundColor: '#22b5e0',
    minHeight: '100vh',
    padding: theme.spacing(4, 9, 8)
  },
  heading: {
    border: '2px #fff solid',
    borderRadius: 4,
    color: '#fff',
    padding: 16,
    [theme.breakpoints.down('xs')]: {
      marginTop: 46
    }
  },
  headingMediaQuery: {
    marginBottom: 7.2,
    marginRight: 24,
    maxWidth: 275
  },
  profileMediaQuery: {
    maxWidth: 275
  }
}));

const Dashboard = props => {
  const matches = useMediaQuery('(max-width:770px) and (min-width:600px)');

  const [nudge, setNudge] = useState({
    name: '',
    nudgeFrequency: '',
    nudgeFrequencyUnit: '',
    textMessage: '',
    activated: false
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [userDialogOpen, setUserDialogOpen] = useState(false);

  const { loadUserInfo, setUser, signedIn, user } = props;

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
    })
      .then(() => {
        loadUserInfo();
      })
      .catch(err => console.log(err));
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
    <Fade in={true} timeout={1000}>
      <Container className={classes.container}>
        <Toolbar />
        <Grid container spacing={4}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start">
            <Grid
              item
              xs={12}
              sm={5}
              className={matches ? classes.headingMediaQuery : null}>
              <Typography
                variant="h3"
                align="left"
                className={classes.heading}
                gutterBottom>
                Dashboard
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              className={matches ? classes.profileMediaQuery : null}>
              <Paper className={classes.root}>
                {signedIn ? (
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
                    <div className={classes.buttonContainer}>
                      <CardActions>
                        <Button
                          variant="outlined"
                          className={classes.button}
                          onClick={launchUserUpdateComp}>
                          Edit Your Profile
                        </Button>
                      </CardActions>
                    </div>
                  </Card>
                ) : (
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography color="textSecondary" variant="body1">
                        Please sign in to continue.
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Paper>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
          <UserUpdate
            closeUserUpdateComp={closeUserUpdateComp}
            handleUserInputChange={handleUserInputChange}
            handleUserDateInputChange={handleUserDateInputChange}
            handleUserFormSubmit={handleUserFormSubmit}
            user={user}
            userDialogOpen={userDialogOpen}
          />
        </Grid>
      </Container>
    </Fade>
  );
};

export default Dashboard;
