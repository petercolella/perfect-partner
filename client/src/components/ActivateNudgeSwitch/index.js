import React, { useState, useEffect } from 'react';
import Switch from '@material-ui/core/Switch';
import API from '../../utils/API';

const ActivateNudgeSwitch = props => {
  const [didMount, setDidMount] = useState(false);
  const [state, setState] = useState({
    checked: props.nudge.activated
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  useEffect(() => {
    if (didMount) activateNudge(state.checked);
  }, [state]);

  useEffect(() => setDidMount(true), []);

  function activateNudge(checked) {
    const nudge = props.nudge;
    nudge.activated = checked;
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
    <Switch
      checked={state.checked}
      onChange={handleChange('checked')}
      value="checked"
      color="primary"
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  );
};

export default ActivateNudgeSwitch;
