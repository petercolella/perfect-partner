import React, { useContext } from 'react';
import { Context as UserContext } from '../../context/UserContext';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';

import fn from '../../utils/fn';

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

const CustomCardMedia = withStyles(theme => ({
  root: {
    backgroundPositionX: 'left',
    maxWidth: 96,
    objectFit: 'contain'
  }
}))(CardMedia);

const UserProfile = props => {
  const {
    state: { signedIn, user }
  } = useContext(UserContext);

  const classes = useStyles();

  const { deleted, setUserProfileDialogOpen } = props;

  return (
    <Zoom in={!deleted} timeout={{ enter: 0, exit: 2000 }}>
      <Paper className={classes.root}>
        <Card className={classes.card}>
          <CardHeader
            align="center"
            title={`${signedIn ? user.firstName + `'s` : `User`} Profile`}
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
                        target="_blank"
                      >
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
                    onClick={() => setUserProfileDialogOpen(true)}
                  >
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
    </Zoom>
  );
};

export default UserProfile;
