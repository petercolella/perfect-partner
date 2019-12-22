import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

import SnackbarContentWrapper from '../SnackbarContentWrapper';

import { ReactComponent as Pencil } from './pencil.svg';

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

const NudgeUpdate = props => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  function handleSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  }

  const clickHandler = e => {
    props.handleFormSubmit(e);
    setSnackbarOpen(true);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        TransitionComponent={TransitionUp}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}>
        <SnackbarContentWrapper
          onClose={handleSnackbarClose}
          variant="success"
          message={
            <span>{props.nudge.name} has been successfully updated.</span>
          }
        />
      </Snackbar>
      <Dialog
        fullWidth={true}
        open={props.dialogOpen}
        onClose={props.closeUpdateComp}
        aria-labelledby="form-dialog-title"
        scroll={'body'}>
        <DialogTitle id="form-dialog-title">
          <Pencil height="2.5em" width="2.5em" style={{ marginRight: 16 }} />
          Personalize Your {props.nudge.name} Nudge
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Give it your special touch. You can make changes as often as you
            like!
          </DialogContentText>
          <TextField
            id="name"
            label="Nudge Name"
            type="text"
            fullWidth
            value={props.nudge.name}
            onChange={props.handleInputChange('name')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="textMessage"
            label="Text Body"
            type="text"
            fullWidth
            value={props.nudge.textMessage}
            onChange={props.handleInputChange('textMessage')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="nudgeFrequency"
            label="Frequency"
            type="number"
            fullWidth
            value={props.nudge.nudgeFrequency}
            onChange={props.handleInputChange('nudgeFrequency')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="nudgeFrequencyUnit"
            select
            label="Frequency Unit"
            type="text"
            fullWidth
            value={props.nudge.nudgeFrequencyUnit}
            onChange={props.handleInputChange('nudgeFrequencyUnit')}
            margin="normal"
            variant="outlined">
            <MenuItem value="days">days</MenuItem>
            <MenuItem value="weeks">weeks</MenuItem>
            <MenuItem value="months">months</MenuItem>
            <MenuItem value="years">years</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.closeUpdateComp} color="primary">
            Cancel
          </Button>
          <Button onClick={e => clickHandler(e)} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NudgeUpdate;
