import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
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

const CustomCardMedia = withStyles(theme => ({
  root: {
    backgroundPositionX: 'left',
    maxWidth: 96,
    objectFit: 'contain'
  }
}))(CardMedia);

const noNudge = {
  name: '',
  nudgeFrequency: '',
  nudgeFrequencyUnit: '',
  textMessage: '',
  activated: false
};

const Dashboard = props => {
  const [nudge, setNudge] = useState(noNudge);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [fade, setFade] = useState(true);
  const [userDialogOpen, setUserDialogOpen] = useState(false);

  const { loadUserInfo, setUser, signedIn, user } = props;

  useEffect(() => {
    return () => {
      setFade(false);
      setNudge(noNudge);
    };
  }, []);

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
    })
      .then(() => {
        loadUserInfo();
      })
      .catch(err => console.log(err.response.data));
    setUserDialogOpen(false);
  };

  const classes = useStyles();

  return (
    <Fade in={fade} timeout={1000}>
      <Container className={classes.container}>
        <Toolbar />
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h3" align="center" className={classes.heading}>
              Dashboard
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.root}>
              {signedIn ? (
                <Card className={classes.card}>
                  <CardHeader title={`${user.firstName}'s Profile:`} />
                  <Divider />
                  <CardContent>
                    <CustomCardMedia
                      component="img"
                      image={user.imageUrl}
                      alt={`${user.firstName}'s Image`}
                      title={`${user.firstName}'s Image`}
                      height="96"
                    />
                    <Typography variant="body1" noWrap={true}>
                      <span>Image Url: </span>
                      {user.imageUrl}
                    </Typography>
                    <Typography variant="body1">
                      <span>First Name: </span>
                      {user.firstName}
                    </Typography>
                    <Typography variant="body1">
                      <span>Last Name: </span>
                      {user.lastName}
                    </Typography>
                    <Typography variant="body1">
                      <span>Full Name: </span>
                      {user.name}
                    </Typography>
                    <Typography variant="body1">
                      <span>Email: </span>
                      {user.email}
                    </Typography>
                    <Typography variant="body1">
                      <span>Partner's Name: </span>
                      {user.partnerName}
                    </Typography>
                    <Typography variant="body1">
                      <span>Phone Number: </span>
                      {user.phone ? fn.formatPhoneNumber(user.phone) : null}
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
                  <CardHeader title={`${user.firstName}'s Profile:`} />
                  <Divider />
                  <CardContent>
                    <Typography color="textSecondary" variant="body1">
                      Please sign in to continue.
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.root}>
              {signedIn ? (
                <Card className={classes.card}>
                  <CardHeader title="Important Dates:" />
                  <Divider />
                  <CardContent>
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
                  <CardHeader title="Important Dates:" />
                  <Divider />
                  <CardContent>
                    <Typography color="textSecondary" variant="body1">
                      Please sign in to continue.
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Paper>
          </Grid>
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
