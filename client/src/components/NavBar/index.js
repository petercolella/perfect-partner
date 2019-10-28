import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

  const { user, signOut } = props;

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
            <Typography className={classes.pushLeft} noWrap>
              <MuiLink component="button" variant="subtitle1" onClick={signOut}>
                Sign Out
              </MuiLink>
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
