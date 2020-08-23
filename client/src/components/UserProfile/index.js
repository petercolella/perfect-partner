import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import useHandleUserFormSubmit from '../../hooks/useHandleUserFormSubmit';
import { Context as SnackbarContext } from '../../context/SnackbarContext';
import { Context as UserContext } from '../../context/UserContext';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';

import UserProfileDelete from '../../components/UserProfileDelete';
import UserProfileUpdate from '../../components/UserProfileUpdate';

import API from '../../utils/API';
import fn from '../../utils/fn';

const userKeyArray = [
  'firstName',
  'lastName',
  'name',
  'email',
  'partnerName',
  'phone'
];

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

const UserProfile = ({ deleted, setDeleted, setRedirect }) => {
  const { handleSnackbarOpen } = useContext(SnackbarContext);
  const {
    state: { signedIn, user },
    signOut
  } = useContext(UserContext);

  const [dashboardUser, setDashboardUser] = useState(user);
  const [userDeleteDialogOpen, setUserDeleteDialogOpen] = useState(false);
  const [userProfileDialogOpen, setUserProfileDialogOpen] = useState(false);

  const loadDashboardUser = useCallback(() => {
    setDashboardUser(user);
  }, [user]);

  useEffect(() => {
    loadDashboardUser();
  }, [loadDashboardUser]);

  const [handleUserFormSubmit] = useHandleUserFormSubmit(
    setUserProfileDialogOpen,
    loadDashboardUser,
    {
      dashboardUser,
      user
    }
  );

  const closeUserProfileUpdateComp = () => {
    setUserProfileDialogOpen(false);
    loadDashboardUser();
  };

  const timeTotalRef = useRef();
  timeTotalRef.current = 0;

  const eraseUser = () => {
    Object.keys(dashboardUser).forEach(key => {
      if (
        typeof dashboardUser[key] === 'string' &&
        userKeyArray.includes(key)
      ) {
        for (let i = dashboardUser[key].length - 1; i >= 0; i--) {
          setTimeout(() => {
            setDashboardUser(dashboardUser => {
              return {
                ...dashboardUser,
                [key]: dashboardUser[key].substring(0, i)
              };
            });
          }, (timeTotalRef.current += 75));
        }
      }
    });
  };

  const handleUserAccountDeleteSubmit = () => {
    eraseUser();
    setTimeout(() => {
      setDeleted(true);
      setUserProfileDialogOpen(false);
    }, (timeTotalRef.current += 100));
    setTimeout(() => {
      API.deleteUser(user._id)
        .then(res => {
          handleSnackbarOpen('See ya!!!', 'info', 1000);
          setTimeout(() => {
            setRedirect(true);
            signOut();
          }, 1250);
        })
        .catch(err => {
          const [errMsg] = err.response.data.match(/(?! )[^:]+$/);
          handleSnackbarOpen(errMsg, 'error');
        });
    }, (timeTotalRef.current += 1250));
    setUserDeleteDialogOpen(false);
  };

  const handleUserInputChange = name => event => {
    let { value } = event.target;
    value = name === 'phone' ? value.replace(/\D/g, '') : value;
    setDashboardUser({ ...dashboardUser, [name]: value });
  };

  const classes = useStyles();

  return (
    <>
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
      <UserProfileDelete
        handleUserAccountDeleteSubmit={handleUserAccountDeleteSubmit}
        setUserDeleteDialogOpen={setUserDeleteDialogOpen}
        user={user}
        userDeleteDialogOpen={userDeleteDialogOpen}
      />
      <UserProfileUpdate
        closeUserProfileUpdateComp={closeUserProfileUpdateComp}
        handleUserFormSubmit={handleUserFormSubmit}
        handleUserInputChange={handleUserInputChange}
        setUserDeleteDialogOpen={setUserDeleteDialogOpen}
        user={dashboardUser}
        userProfileDialogOpen={userProfileDialogOpen}
      />
    </>
  );
};

export default UserProfile;
