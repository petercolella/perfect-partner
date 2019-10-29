import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import API from '../../utils/API';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import MuiLink from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  login: {
    display: 'flex'
  },
  pushLeft: {
    marginLeft: theme.spacing(2)
  },
  pushRight: {
    marginRight: theme.spacing(2)
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

const NavBar = props => {
  const classes = useStyles();

  const { user, getPreviousPath, setUser, signedIn, signOut } = props;

  useEffect(() => {
    const onSignIn = googleUser => {
      const profile = googleUser.getBasicProfile();
      const id_token = googleUser.getAuthResponse().id_token;
      console.log('ID: ' + profile.getId());
      console.log('Email: ' + profile.getEmail());

      API.tokenSignInAxios(id_token).then(id => {
        sessionStorage.setItem('currentUserId', id);
        API.getUser(id).then(res => {
          setUser(user => (res.data ? res.data : user));
        });
      });
    };

    const onSuccess = googleUser => {
      console.log('Signed in as: ' + googleUser.getBasicProfile().getName());
      onSignIn(googleUser);
    };

    const onFailure = error => {
      console.log(error);
    };

    const renderGoogleLoginButton = () => {
      if (!signedIn) {
        console.log('rendering google signin button');
        window.gapi.signin2.render('my-signin2', {
          scope: 'profile email',
          width: 180,
          height: 30,
          longtitle: true,
          theme: 'dark',
          onsuccess: onSuccess,
          onfailure: onFailure
        });
      }
    };

    window.addEventListener('google-loaded', renderGoogleLoginButton);
    const previousPath = getPreviousPath();
    console.log('previousPathGoogle:', previousPath);
    if (previousPath) {
      console.log('previousPath:', true);
      renderGoogleLoginButton();
    }
  }, [getPreviousPath, setUser, signedIn]);

  return (
    <div className={classes.root}>
      <AppBar color="default" position="fixed">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Grid container>
            <Grid item xs={4} md={3}>
              <img id="header-img" alt="logo" src="/img/logo_p.png" />
            </Grid>
          </Grid>
          <div className={classes.login}>
            <Typography
              className={classes.pushRight}
              variant="subtitle1"
              noWrap>
              {user.name ? user.name : <span>Please sign in.</span>}
            </Typography>
            <img
              className={classes.img}
              id="avatar-image-header"
              alt="User"
              src={user.imageUrl}
            />
            {signedIn ? (
              <Typography className={classes.pushLeft} noWrap>
                <MuiLink
                  component="button"
                  variant="subtitle1"
                  onClick={signOut}>
                  Sign Out
                </MuiLink>
              </Typography>
            ) : (
              <div className={classes.pushLeft} id="my-signin2" />
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
