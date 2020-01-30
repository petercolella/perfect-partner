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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import API from '../../utils/API';
import fn from '../../utils/fn';
import NudgeTable from '../NudgeTable';
import UserProfileUpdate from '../UserProfileUpdate';

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
  },
  multiline: {
    margin: 0
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
  const [userProfileDialogOpen, setUserProfileDialogOpen] = useState(false);

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
    setUserProfileDialogOpen(true);
  };

  const closeUserProfileUpdateComp = () => {
    setUserProfileDialogOpen(false);
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
    setUserProfileDialogOpen(false);
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
              <Card className={classes.card}>
                <CardHeader
                  align="center"
                  title={`${signedIn ? `${user.firstName}'s` : 'User'} Profile
                  `}
                />
                <Divider variant="middle" />
                {signedIn ? (
                  <>
                    <List dense={true}>
                      <ListItem>
                        <CustomCardMedia
                          component="img"
                          image={user.imageUrl}
                          alt={`${user.firstName}'s Image`}
                          title={`${user.firstName}'s Image`}
                          height="96"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          classes={{
                            multiline: classes.multiline
                          }}
                          primary="Image Link:"
                          secondary={
                            <MuiLink
                              href={user.imageUrl}
                              color="inherit"
                              target="_blank">
                              {user.imageUrl}
                            </MuiLink>
                          }
                          secondaryTypographyProps={{ noWrap: true }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          classes={{
                            multiline: classes.multiline
                          }}
                          primary="First Name:"
                          secondary={user.firstName}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          classes={{
                            multiline: classes.multiline
                          }}
                          primary="Last Name:"
                          secondary={user.lastName}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          classes={{
                            multiline: classes.multiline
                          }}
                          primary="Full Name:"
                          secondary={user.name}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          classes={{
                            multiline: classes.multiline
                          }}
                          primary="Email:"
                          secondary={user.email}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          classes={{
                            multiline: classes.multiline
                          }}
                          primary="Partner's Name:"
                          secondary={user.partnerName}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          classes={{
                            multiline: classes.multiline
                          }}
                          primary="Phone Number:"
                          secondary={
                            user.phone ? fn.formatPhoneNumber(user.phone) : null
                          }
                        />
                      </ListItem>
                    </List>
                    <Divider variant="middle" />
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.root}>
              <Card className={classes.card}>
                <CardHeader align="center" title="Important Dates" />
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
                          secondary={
                            user.anniversaryDate
                              ? new Date(
                                  user.anniversaryDate
                                ).toLocaleDateString()
                              : ''
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          classes={{
                            multiline: classes.multiline
                          }}
                          primary="Partner's Birthday:"
                          secondary={
                            user.birthDate
                              ? new Date(user.birthDate).toLocaleDateString()
                              : ''
                          }
                        />
                      </ListItem>
                    </List>
                    <Divider variant="middle" />
                    <div className={classes.buttonContainer}>
                      <CardActions>
                        <Button
                          variant="outlined"
                          className={classes.button}
                          onClick={launchUserUpdateComp}>
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
          <UserProfileUpdate
            closeUserProfileUpdateComp={closeUserProfileUpdateComp}
            handleUserInputChange={handleUserInputChange}
            handleUserDateInputChange={handleUserDateInputChange}
            handleUserFormSubmit={handleUserFormSubmit}
            user={user}
            userProfileDialogOpen={userProfileDialogOpen}
          />
        </Grid>
      </Container>
    </Fade>
  );
};

export default Dashboard;
