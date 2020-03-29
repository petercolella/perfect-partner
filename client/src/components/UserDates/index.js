import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';

import AddBoxIcon from '@material-ui/icons/AddBox';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';

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

const StyledIconButton = withStyles(theme => ({
  root: {
    marginBottom: '-0.5em'
  }
}))(IconButton);

const UserDates = props => {
  const classes = useStyles();

  const {
    anniversaryDate,
    birthDate,
    deleted,
    setUserDatesAddDialogOpen,
    setUserDatesDialogOpen,
    signedIn,
    user
  } = props;

  return (
    <Zoom
      in={!deleted}
      timeout={{ enter: 0, exit: 2000 }}
      style={{ transitionDelay: !deleted ? '0ms' : '250ms' }}>
      <Paper className={classes.root}>
        <Card className={classes.card}>
          <CardHeader
            align="center"
            action={
              <Tooltip title="Add Date" color="primary">
                <StyledIconButton
                  aria-label="add a date"
                  onClick={() => setUserDatesAddDialogOpen(true)}>
                  <AddBoxIcon color="primary" />
                </StyledIconButton>
              </Tooltip>
            }
            title="Important Dates"
          />
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
                    secondary={`${
                      user.anniversaryDate
                        ? `${DateTime.fromISO(anniversaryDate)
                            .setZone('UTC')
                            .toLocaleString()} \u2014 Reminders: ${
                            user.anniversaryReminders.length
                              ? user.anniversaryReminders.join(' \u2022 ')
                              : 'None'
                          }`
                        : 'None Entered'
                    }`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    classes={{
                      multiline: classes.multiline
                    }}
                    primary="Partner's Birthday:"
                    secondary={`${
                      user.birthDate
                        ? `${DateTime.fromISO(birthDate)
                            .setZone('UTC')
                            .toLocaleString()} \u2014 Reminders: ${
                            user.birthdayReminders.length
                              ? user.birthdayReminders.join(' \u2022 ')
                              : 'None'
                          }`
                        : 'None Entered'
                    }`}
                  />
                </ListItem>
                {user.customDates &&
                  user.customDates.map(date => (
                    <ListItem key={date._id}>
                      <ListItemText
                        classes={{
                          multiline: classes.multiline
                        }}
                        primary={date.title}
                        secondary={`${DateTime.fromISO(date.value)
                          .setZone('UTC')
                          .toLocaleString()} \u2014 Reminders: ${
                          date.reminders.length
                            ? date.reminders.join(' \u2022 ')
                            : 'None'
                        }`}
                      />
                    </ListItem>
                  ))}
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
    </Zoom>
  );
};

export default UserDates;
