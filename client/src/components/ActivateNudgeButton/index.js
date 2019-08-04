import React from 'react';
import Switch from '@material-ui/core/Switch';
import API from '../../utils/API';

const ActivateNudgeButton = props => {
  const [state, setState] = React.useState({
    checked: true
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
    activateNudge();
  };

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
    <Switch
      checked={state.checkedB}
      onChange={handleChange('checked')}
      value="checked"
      color="primary"
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  );
};

export default ActivateNudgeButton;
