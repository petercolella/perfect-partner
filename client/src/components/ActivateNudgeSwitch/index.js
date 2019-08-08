import React, { useState, useEffect, useRef, useCallback } from 'react';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import API from '../../utils/API';

const ActivateNudgeSwitch = props => {
  const [didMount, setDidMount] = useState(false);
  const [checked, setChecked] = useState(props.nudge.activated);

  const handleChange = event => {
    setChecked(event.target.checked);
  };

  const propsRef = useRef();
  propsRef.current = props;

  const activateNudge = useCallback(checked => {
    const { nudge, user } = propsRef.current;
    nudge.activated = checked;

    API.activateNudge(nudge._id, {
      nudge,
      user
    })
      .then(res => {
        console.log(res.data);
        propsRef.current.loadUserInfo();
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => setDidMount(true), []);

  const mountRef = useRef();
  mountRef.current = didMount;

  useEffect(() => {
    if (mountRef.current) activateNudge(checked);
  }, [activateNudge, checked]);

  return (
    <Tooltip title="Activate" color="primary">
      <Switch
        checked={checked}
        onChange={handleChange}
        value="checked"
        color="primary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </Tooltip>
  );
};

export default ActivateNudgeSwitch;
