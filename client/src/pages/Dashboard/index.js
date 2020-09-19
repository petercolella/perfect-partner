import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import NudgeTable from '../../components/NudgeTable';
import UserDates from '../../components/UserDates';
import UserProfile from '../../components/UserProfile';

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

const Dashboard = () => {
  const [deleted, setDeleted] = useState(false);
  const [redirect, setRedirect] = useState(false);

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
              setDeleted={setDeleted}
              setRedirect={setRedirect}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <UserDates deleted={deleted} />
          </Grid>
          <Grid item xs={12}>
            <NudgeTable deleted={deleted} />
          </Grid>
        </Grid>
      </Container>
    </Fade>
  );
};

export default Dashboard;
