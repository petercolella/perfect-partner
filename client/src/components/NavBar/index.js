import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import MuiLink from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import './navbar.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  googleHide: {
    animation: 'google-hide 2s ease-in-out forwards'
  },
  googleShow: {
    animation: 'google-show 2s ease-in-out forwards'
  },
  login: {
    display: 'flex'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  pushLeft: {
    marginLeft: theme.spacing(2)
  },
  pushRight: {
    marginRight: theme.spacing(2)
  },
  userHide: {
    animation: 'user-hide 2s ease-in-out forwards',
    display: 'inline-flex',
    marginLeft: theme.spacing(2)
  },
  userName: {
    minWidth: 120,
    textAlign: 'right'
  },
  userShow: {
    animation: 'user-show 2s ease-in-out forwards',
    display: 'inline-flex',
    marginLeft: theme.spacing(2)
  }
}));

const NavBar = props => {
  const classes = useStyles();

  const { user, signedIn, signOut } = props;

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
            <Grid item xs={6} md={4} lg={3} xl={2}>
              <img id="header-img" alt="logo" src="/img/logo_p.png" />
            </Grid>
          </Grid>
          <div className={classes.login}>
            <Fade in={!signedIn} timeout={2000}>
              <div
                className={signedIn ? classes.googleHide : classes.googleShow}
                id="my-signin2"
              />
            </Fade>
            <Fade in={signedIn} timeout={2000}>
              <div className={signedIn ? classes.userShow : classes.userHide}>
                <Typography
                  className={`${classes.userName} ${classes.pushRight}`}
                  variant="subtitle1"
                  noWrap>
                  {user.name}
                </Typography>
                <img
                  className={classes.img}
                  id="avatar-image-header"
                  alt="User"
                  src={user.imageUrl}
                />
                <Typography className={classes.pushLeft} noWrap>
                  <MuiLink
                    component="button"
                    variant="subtitle1"
                    onClick={signOut}>
                    Sign Out
                  </MuiLink>
                </Typography>
              </div>
            </Fade>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
