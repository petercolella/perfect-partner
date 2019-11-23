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
import { ReactComponent as Gift } from '../QuestionComponents/Anniversary/gift.svg';
import { ReactComponent as Cake } from '../QuestionComponents/Birthday/cake.svg';
import { ReactComponent as Reminder } from '../QuestionComponents/Nudges/reminder.svg';
import { ReactComponent as Love } from '../QuestionComponents/Partner/love.svg';
import { ReactComponent as Smartphone } from '../QuestionComponents/Phone/smartphone.svg';

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
    marginLeft: '-1.5em'
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  svg: {
    height: '1.25em',
    width: '1.25em'
  }
}));

const NavMenu = props => {
  const classes = useStyles();

  const { setDrawerOpen } = props;

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <Link
          to="/"
          onClick={() => setDrawerOpen(false)}
          className={classes.link}>
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
          className={classes.link}>
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
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <Gift className={classes.svg} />
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                primary="Anniversary"
              />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <Cake className={classes.svg} />
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                primary="Birthday"
              />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <Reminder className={classes.svg} />
              </ListItemIcon>
              <ListItemText className={classes.listItemText} primary="Nudges" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <Love className={classes.svg} />
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                primary="Partner"
              />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <Smartphone className={classes.svg} />
              </ListItemIcon>
              <ListItemText className={classes.listItemText} primary="Phone" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default NavMenu;
