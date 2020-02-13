import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
  multiline: {
    margin: 0
  }
}));

const UserDates = props => {
  const classes = useStyles();

  const {
    anniversaryDate,
    birthDate,
    setUserDatesDialogOpen,
    signedIn,
    user
  } = props;

  return (
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
                      ? DateTime.fromISO(anniversaryDate)
                          .setZone('UTC')
                          .toLocaleString()
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
                      ? DateTime.fromISO(birthDate)
                          .setZone('UTC')
                          .toLocaleString()
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
                  onClick={() => setUserDatesDialogOpen(true)}>
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
  );
};

export default UserDates;
