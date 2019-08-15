import React from 'react';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import { green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const MySnackbarContentWrapper = React.forwardRef((props, ref) => {
  const classes = useStyles1();
  const { message, onClose, variant, ...other } = props;

  return (
    <SnackbarContent
      className={clsx(classes[variant])}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <CheckCircleIcon
            className={clsx(classes.icon, classes.iconVariant)}
          />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
      ref={ref}
    />
  );
});

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

const NudgeUpdate = props => {
  const [toastOpen, setToastOpen] = React.useState(false);

  function handleToastClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setToastOpen(false);
  }

  const clickHandler = e => {
    props.handleFormSubmit(e);
    setToastOpen(true);
  };

  return (
    <div>
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={toastOpen}
          autoHideDuration={2000}
          onClose={handleToastClose}
          TransitionComponent={TransitionDown}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}>
          <MySnackbarContentWrapper
            onClose={handleToastClose}
            variant="success"
            message={
              <span>{props.nudge.name} has been successfully updated.</span>
            }
          />
        </Snackbar>
      </div>
      <Dialog
        open={props.dialogOpen}
        onClose={props.closeUpdateComp}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            // autoFocus
            id="nudge-name"
            label="Nudge Name"
            // type="text"
            fullWidth
            value={props.nudge.name}
            onChange={props.handleInputChange('name')}
            margin="normal"
            variant="outlined"
          />
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
      <div
        className="modal fade"
        id="editNudgeModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editNudgeModalCenterTitle"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="editNudgeModalCenterTitle"
                style={{ lineHeight: '2' }}>
                Edit Nudge
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                style={{ margin: '-1rem -1rem -1rem 0' }}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <div className="col">
                    <label htmlFor="nudgeNameInput">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nudgeNameInput"
                      onChange={props.handleInputChange}
                      value={props.nudge.name}
                      name="name"
                    />
                    <label htmlFor="nudgeFrequencyInput">Frequency</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nudgeFrequencyInput"
                      onChange={props.handleInputChange}
                      value={props.nudge.nudgeFrequency}
                      name="nudgeFrequency"
                    />
                    <label htmlFor="nudgeFrequencyUnitInput">
                      Frequency Unit
                    </label>
                    <select
                      type="text"
                      className="form-control"
                      id="nudgeFrequencyUnitInput"
                      onChange={props.handleInputChange}
                      value={props.nudge.nudgeFrequencyUnit}
                      name="nudgeFrequencyUnit">
                      <option value="seconds">seconds</option>
                      <option value="minutes">minutes</option>
                      <option value="hours">hours</option>
                      <option value="days">days</option>
                      <option value="weeks">weeks</option>
                      <option value="months">months</option>
                      <option value="years">years</option>
                    </select>
                    <label htmlFor="nudgeTextInput">Text Body</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nudgeTextInput"
                      onChange={props.handleInputChange}
                      value={props.nudge.textMessage}
                      name="textMessage"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={e => clickHandler(e)}>
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={props.closeUpdateComp}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NudgeUpdate;
