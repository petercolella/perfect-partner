import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';

const useStyles = makeStyles(theme => ({
  root: {
    width: 'auto',
    backgroundColor: theme.palette.background.paper
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  }
}));

const NavMenu = props => {
  const classes = useStyles();

  const { setDrawerOpen } = props;

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <Link
            to="/"
            onClick={() => setDrawerOpen(false)}
            className={classes.link}>
            <ListItemText primary="Home" />
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <Link
            to="/dashboard"
            onClick={() => setDrawerOpen(false)}
            className={classes.link}>
            <ListItemText primary="Dashboard" />
          </Link>
        </ListItem>
      </List>
    </div>
  );
};

export default NavMenu;
