import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
import Typography from '@material-ui/core/Typography';

import { ReactComponent as Pencil } from './pencil.svg';
import SnackbarContentWrapper from '../SnackbarContentWrapper';

const useStyles = makeStyles(theme => ({
  title: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const Transition = props => {
  return <Slide {...props} direction="up" />;
};

const NudgeUpdate = props => {
  const classes = useStyles();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const {
    setNudgeDialogOpen,
    nudgeDialogOpen,
    handleNudgeFormSubmit,
    handleInputChange,
    nudge
  } = props;

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const clickHandler = () => {
    handleNudgeFormSubmit();
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
        TransitionComponent={Transition}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}>
        <SnackbarContentWrapper
          onClose={handleSnackbarClose}
          variant="success"
          message={<span>{nudge.name} has been successfully updated.</span>}
        />
      </Snackbar>
      <Dialog
        fullWidth={true}
        open={nudgeDialogOpen}
        onClose={() => setNudgeDialogOpen(false)}
        aria-labelledby="form-dialog-title"
        scroll={'body'}>
        <DialogTitle
          className={classes.title}
          id="form-dialog-title"
          disableTypography={true}>
          <Pencil height="2.5em" width="2.5em" style={{ marginRight: 16 }} />
          <Typography variant="h6">
            Personalize Your {nudge.name} Nudge
          </Typography>
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
            value={nudge.name}
            onChange={handleInputChange('name')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="textMessage"
            label="Text Body"
            type="text"
            fullWidth
            value={nudge.textMessage}
            onChange={handleInputChange('textMessage')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="nudgeFrequency"
            label="Frequency"
            type="number"
            fullWidth
            value={nudge.nudgeFrequency}
            onChange={handleInputChange('nudgeFrequency')}
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
            onChange={handleInputChange('nudgeFrequencyUnit')}
            margin="normal"
            variant="outlined">
            <MenuItem value="days">days</MenuItem>
            <MenuItem value="weeks">weeks</MenuItem>
            <MenuItem value="months">months</MenuItem>
            <MenuItem value="years">years</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNudgeDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={clickHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NudgeUpdate;
