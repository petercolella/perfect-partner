import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { ReactComponent as Reminder } from './reminder.svg';

const useStyles = makeStyles(theme => ({
  title: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const NudgeAdd = props => {
  const classes = useStyles();

  const {
    setNudgeAddDialogOpen,
    nudgeAddDialogOpen,
    handleNudgeAddFormSubmit,
    handleNewNudgeInputChange,
    newNudge,
    user
  } = props;

  return (
    <Dialog
      fullWidth={true}
      open={nudgeAddDialogOpen}
      onClose={() => setNudgeAddDialogOpen(false)}
      aria-labelledby="form-dialog-title"
      scroll={'body'}>
      <DialogTitle
        className={classes.title}
        id="form-dialog-title"
        disableTypography={true}>
        <Reminder height="2.5em" width="2.5em" style={{ marginRight: 16 }} />
        <Typography variant="h6">New Nudge</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Add a nudge, {user.firstName}.</DialogContentText>
        <TextField
          id="name"
          label="Nudge Name"
          type="text"
          fullWidth
          value={newNudge.name}
          onChange={handleNewNudgeInputChange('name')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="textMessage"
          label="Text Body"
          type="text"
          fullWidth
          value={newNudge.textMessage}
          onChange={handleNewNudgeInputChange('textMessage')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="nudgeFrequency"
          label="Frequency"
          type="number"
          fullWidth
          value={newNudge.nudgeFrequency}
          onChange={handleNewNudgeInputChange('nudgeFrequency')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="nudgeFrequencyUnit"
          select
          label="Frequency Unit"
          type="text"
          fullWidth
          value={newNudge.nudgeFrequencyUnit}
          onChange={handleNewNudgeInputChange('nudgeFrequencyUnit')}
          margin="normal"
          variant="outlined">
          <MenuItem value="days">days</MenuItem>
          <MenuItem value="weeks">weeks</MenuItem>
          <MenuItem value="months">months</MenuItem>
          <MenuItem value="years">years</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setNudgeAddDialogOpen(false)} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleNudgeAddFormSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NudgeAdd;
