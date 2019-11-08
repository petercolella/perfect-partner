import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  img: {
    borderRadius: '50%',
    height: 96,
    marginBottom: '0.35em',
    width: 'auto'
  },
  item: {
    textAlign: 'center',
    color: '#fff'
  },
  link: {
    color: '#22b5e0',
    '&:hover': {
      color: '#22b5e0'
    }
  }
}));

const Avatar = props => {
  const { user } = props;

  const classes = useStyles();

  return (
    <>
      <Grid container justify="center" alignItems="center">
        <Grid item className={classes.item}>
          <img src={user.imageUrl} alt="profile-img" className={classes.img} />
          {user.name ? (
            <>
              <Typography
                variant="h5"
                gutterBottom>{`Welcome, ${user.name}`}</Typography>
              <Typography variant="subtitle2">
                Please click{' '}
                <Link to="/phone" className={classes.link}>
                  HERE
                </Link>
              </Typography>
              <Typography variant="subtitle2">
                to begin setting up your profile.
              </Typography>
            </>
          ) : (
            <Typography variant="h5">Please Sign In.</Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Avatar;
