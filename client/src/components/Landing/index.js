import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '../Avatar';

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: '100vh'
  },
  homeSaying: {
    color: '#fff',
    padding: theme.spacing(4),
    textShadow: '2px 2px #848484',
    [theme.breakpoints.down('sm')]: {
      marginTop: 46
    }
  }
}));

const Landing = props => {
  const { signedIn, user } = props;

  const classes = useStyles();

  return (
    <Fade in={true} timeout={1000}>
      <Container className={classes.container}>
        <Grid
          container
          direction="column"
          justify="space-between"
          className={classes.container}>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-start">
            <Grid item xs={12} sm={6}>
              <Toolbar />
              <Typography
                variant="h2"
                align="left"
                className={classes.homeSaying}>
                Planned Spontaneity
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-end">
            <Grid item>
              <Avatar signedIn={signedIn} user={user} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Fade>
  );
};

export default Landing;
