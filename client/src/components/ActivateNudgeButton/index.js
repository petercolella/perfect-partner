import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import API from '../../utils/API';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const ActivateNudgeButton = props => {
  const classes = useStyles();

  function activateNudge() {
    const nudge = props.nudge;
    nudge.activated = !nudge.activated;
    const { nudges, ...userAndNudge } = props;

    API.activateNudge(props.nudge._id, {
      ...userAndNudge
    })
      .then(res => {
        console.log(res.data);
        props.loadUserInfo();
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      onClick={activateNudge}>
      {props.nudge.activated ? 'Deactivate Nudge' : 'Activate Nudge'}
    </Button>
  );
};

export default ActivateNudgeButton;
