import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles(theme => ({
  displayNone: {
    display: 'none'
  },
  img: {
    borderRadius: '50%',
    height: 96,
    marginBottom: '0.35em',
    width: 'auto'
  },
  link: {
    color: '#22b5e0',
    '&:hover': {
      color: '#22b5e0'
    }
  },
  paper: {
    borderRadius: 25,
    backgroundColor: '#ef5350',
    color: '#fff',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
    textAlign: 'center',
    transition: 'margin-left 2s linear'
  }
}));

const Avatar = props => {
  const { signedIn, user } = props;

  const classes = useStyles();

  return (
    <>
      <Grid
        container
        direction={signedIn ? 'row' : 'row-reverse'}
        justify="center"
        alignItems="center"
      >
        <Zoom in={signedIn} timeout={1000}>
          <Grid item>
            <Paper
              elevation={12}
              className={`${classes.paper} ${
                !signedIn ? classes.displayNone : ''
              }`}
            >
              <img
                src={user.imageUrl}
                alt="profile-img"
                className={classes.img}
              />
              <Typography
                variant="h5"
                gutterBottom
              >{`Welcome, ${user.name}`}</Typography>
              <Typography variant="subtitle2">
                Please click{' '}
                <Link to="/anniversary" className={classes.link}>
                  HERE
                </Link>
              </Typography>
              <Typography variant="subtitle2">
                to begin setting up your profile.
              </Typography>
            </Paper>
          </Grid>
        </Zoom>
        <Zoom in={!signedIn} timeout={1000}>
          <Grid item>
            <Paper
              className={`${classes.paper} ${
                signedIn ? classes.displayNone : ''
              }`}
              elevation={12}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                alt="profile-img"
                className={classes.img}
              />
              <Typography variant="h5">Please Sign In.</Typography>
            </Paper>
          </Grid>
        </Zoom>
      </Grid>
    </>
  );
};

export default Avatar;
