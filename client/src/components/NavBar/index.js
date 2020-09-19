import React, { useContext, useEffect, useState } from 'react';
import { Context as UserContext } from '../../context/UserContext';
import { makeStyles } from '@material-ui/core/styles';

import NavMenu from '../NavMenu';

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import MuiLink from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import './navbar.css';
import bye from './bye.gif';
import logo from './logo_p.png';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  googleHide: {
    animation: 'google-hide 2.5s ease-in-out forwards'
  },
  googleShow: {
    animation: 'none',
    [theme.breakpoints.up('sm')]: {
      animation: 'google-show 2s ease-in-out 0.5s forwards'
    }
  },
  img: {
    borderRadius: '50%',
    height: 30,
    margin: 'auto'
  },
  login: {
    display: 'flex',
    justifyContent: 'flex-end',
    maxWidth: '100%'
  },
  logo: {
    maxWidth: '100%'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  noWidth: {
    display: 'none',
    margin: 0,
    width: 0
  },
  pushLeft: {
    marginLeft: theme.spacing(2)
  },
  pushRight: {
    marginRight: theme.spacing(2)
  },
  userHide: {
    animation: 'user-hide 2s ease-in-out 0.5s forwards',
    display: 'inline-flex',
    marginLeft: theme.spacing(2)
  },
  userName: {
    width: 180,
    textAlign: 'right'
  },
  userShow: {
    animation: 'user-show 2.5s ease-in-out forwards',
    display: 'inline-flex',
    marginLeft: theme.spacing(2)
  }
}));

const winWidth = window.innerWidth;

const NavBar = () => {
  const {
    state: { signedIn, user },
    onFailure,
    onSuccess,
    setSignedIn,
    signOut
  } = useContext(UserContext);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    const renderGoogleLoginButton = () => {
      window.gapi.signin2.render('my-signin2', {
        scope: 'profile email',
        width: 180,
        height: 30,
        longtitle: true,
        theme: 'dark',
        onsuccess: onSuccess,
        onfailure: onFailure
      });
    };

    const loadGoogle = () => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id:
            '1061415806670-1l8r6vaqn21lc7h45l0ethglqat21kls.apps.googleusercontent.com'
        });

        const GoogleAuth = window.gapi.auth2.getAuthInstance();

        renderGoogleLoginButton();

        GoogleAuth.isSignedIn.listen(setSignedIn);
      });
    };

    window.addEventListener('google-loaded', loadGoogle);
  }, [onFailure, onSuccess, setSignedIn]);

  return (
    <div className={classes.root}>
      <AppBar color="default" position="fixed">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Grid container alignItems="center" justify="space-between">
            <Grid item xs={12} sm={3} lg={2} id="logo-grid">
              <img className={classes.logo} id="logo" alt="logo" src={logo} />
            </Grid>
            <Grid item xs={12} sm={8} xl={10} id="login-grid">
              <div className={classes.login} id="login">
                <Fade
                  in={!signedIn}
                  timeout={2500}
                  style={{ transitionDelay: !signedIn ? '1000ms' : '0ms' }}
                >
                  <div
                    className={`${
                      signedIn ? classes.googleHide : classes.googleShow
                    } ${winWidth < 600 && signedIn && classes.noWidth}`}
                    id="my-signin2"
                  />
                </Fade>
                <Fade in={signedIn} timeout={2500}>
                  <div
                    className={`${
                      signedIn ? classes.userShow : classes.userHide
                    } ${winWidth < 600 && !signedIn && classes.noWidth}`}
                    id="user"
                  >
                    <Typography
                      className={`${classes.userName} ${classes.pushRight}`}
                      id="user-name"
                      variant="subtitle1"
                      noWrap
                    >
                      {signedIn ? `Hi, ${user.firstName}!` : `Bye!`}
                    </Typography>
                    <img
                      className={classes.img}
                      alt="User"
                      src={signedIn ? user.imageUrl : bye}
                    />
                    <Typography className={classes.pushLeft} noWrap>
                      <MuiLink
                        component="button"
                        variant="subtitle1"
                        onClick={signOut}
                      >
                        Sign Out
                      </MuiLink>
                    </Typography>
                  </div>
                </Fade>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <NavMenu setDrawerOpen={setDrawerOpen} />
      </Drawer>
    </div>
  );
};

export default NavBar;
