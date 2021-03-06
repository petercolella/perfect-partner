import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HelpIcon from '@material-ui/icons/Help';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { ReactComponent as Gift } from '../../pages/Anniversary/gift.svg';
import { ReactComponent as Cake } from '../../pages/Birthday/cake.svg';
import { ReactComponent as Reminder } from '../../pages/Nudges/reminder.svg';
import { ReactComponent as Love } from '../../pages/Partner/love.svg';
import { ReactComponent as Smartphone } from '../../pages/Phone/smartphone.svg';

const useStyles = makeStyles(theme => ({
  root: {
    width: 'auto',
    backgroundColor: theme.palette.background.paper
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  },
  listItemText: {
    marginBottom: 0
  },
  nested: {
    paddingLeft: theme.spacing(2)
  },
  svg: {
    height: '1.25em',
    width: '1.25em'
  }
}));

const NavMenu = ({ setDrawerOpen }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <Link
          to="/"
          onClick={() => setDrawerOpen(false)}
          className={classes.link}
        >
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link
          to="/dashboard"
          onClick={() => setDrawerOpen(false)}
          className={classes.link}
        >
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Questions" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link
              to="/anniversary"
              onClick={() => setDrawerOpen(false)}
              className={classes.link}
            >
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <Gift className={classes.svg} />
                </ListItemIcon>
                <ListItemText
                  className={classes.listItemText}
                  primary="Anniversary"
                />
              </ListItem>
            </Link>
            <Link
              to="/birthday"
              onClick={() => setDrawerOpen(false)}
              className={classes.link}
            >
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <Cake className={classes.svg} />
                </ListItemIcon>
                <ListItemText
                  className={classes.listItemText}
                  primary="Birthday"
                />
              </ListItem>
            </Link>
            <Link
              to="/nudges"
              onClick={() => setDrawerOpen(false)}
              className={classes.link}
            >
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <Reminder className={classes.svg} />
                </ListItemIcon>
                <ListItemText
                  className={classes.listItemText}
                  primary="Nudges"
                />
              </ListItem>
            </Link>
            <Link
              to="/partner"
              onClick={() => setDrawerOpen(false)}
              className={classes.link}
            >
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <Love className={classes.svg} />
                </ListItemIcon>
                <ListItemText
                  className={classes.listItemText}
                  primary="Partner"
                />
              </ListItem>
            </Link>
            <Link
              to="/phone"
              onClick={() => setDrawerOpen(false)}
              className={classes.link}
            >
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <Smartphone className={classes.svg} />
                </ListItemIcon>
                <ListItemText
                  className={classes.listItemText}
                  primary="Phone"
                />
              </ListItem>
            </Link>
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default NavMenu;
