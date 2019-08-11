import React from 'react';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import { green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';

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

function MySnackbarContentWrapper(props) {
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
    />
  );
}

const NudgeUpdate = props => {
  const [open, setOpen] = React.useState(false);

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }
  const clickHandler = e => {
    props.handleFormSubmit(e);
    setOpen(true);
  };

  return (
    <div>
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}>
          <MySnackbarContentWrapper
            onClose={handleClose}
            variant="success"
            message={
              <span>{props.nudge.name} has been successfully updated.</span>
            }
          />
        </Snackbar>
      </div>
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
