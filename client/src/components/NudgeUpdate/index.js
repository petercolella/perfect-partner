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

import { ReactComponent as Pencil } from './pencil.svg';

const useStyles = makeStyles(theme => ({
  title: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const NudgeUpdate = ({
  setNudgeDialogOpen,
  nudgeDialogOpen,
  handleNudgeFormSubmit,
  handleNudgeInputChange,
  nudge
}) => {
  const classes = useStyles();

  return (
    <Dialog
      fullWidth={true}
      open={nudgeDialogOpen}
      onClose={() => setNudgeDialogOpen(false)}
      aria-labelledby="form-dialog-title"
      scroll={'body'}
    >
      <DialogTitle
        className={classes.title}
        id="form-dialog-title"
        disableTypography={true}
      >
        <Pencil height="2.5em" width="2.5em" style={{ marginRight: 16 }} />
        <Typography variant="h6">
          Personalize Your {nudge.name} Nudge
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Give it your special touch. You can make changes as often as you like!
        </DialogContentText>
        <TextField
          id="name"
          label="Nudge Name"
          type="text"
          fullWidth
          value={nudge.name}
          onChange={handleNudgeInputChange('name')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="textMessage"
          label="Text Body"
          type="text"
          fullWidth
          value={nudge.textMessage}
          onChange={handleNudgeInputChange('textMessage')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="nudgeFrequency"
          label="Frequency"
          type="number"
          fullWidth
          value={nudge.nudgeFrequency}
          onChange={handleNudgeInputChange('nudgeFrequency')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="nudgeFrequencyUnit"
          select
          label="Frequency Unit"
          type="text"
          fullWidth
          value={nudge.nudgeFrequencyUnit}
          onChange={handleNudgeInputChange('nudgeFrequencyUnit')}
          margin="normal"
          variant="outlined"
        >
          <MenuItem value="days">days</MenuItem>
          <MenuItem value="weeks">weeks</MenuItem>
          <MenuItem value="months">months</MenuItem>
          <MenuItem value="years">years</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setNudgeDialogOpen(false)} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleNudgeFormSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NudgeUpdate;
