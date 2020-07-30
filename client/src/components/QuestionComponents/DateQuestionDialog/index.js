import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context as AuthContext } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import CloseIcon from '@material-ui/icons/Close';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  click: {
    color: '#fff',
    padding: theme.spacing(4),
    textShadow: '2px 2px #848484',
    margin: 'auto'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  dialogBackground: {
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw'
  },
  formControl: {
    margin: theme.spacing(2)
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  },
  root: {
    marginBottom: 0,
    marginTop: theme.spacing(2)
  },
  title: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const reminderArr = ['1 Week', '2 Weeks', '30 Days', '60 Days', '90 Days'];

const DateQuestionDialog = ({
  Image,
  cancel,
  dialogReminders,
  firstName,
  handleDateInputChange,
  handleFormSubmit,
  label,
  link,
  question,
  setParentReminders,
  title,
  userField
}) => {
  const {
    state: { signedIn }
  } = useContext(AuthContext);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [reminderObj, setReminderObj] = useState({});

  const classes = useStyles();

  const loadDialog = useCallback(() => {
    setTimeout(() => {
      setDialogOpen(true);
    }, 250);
  }, []);

  useEffect(() => {
    loadDialog();
  }, [loadDialog, signedIn]);

  const isChecked = useCallback(
    name => {
      for (let reminder of dialogReminders) {
        if (reminder === name) {
          return true;
        }
      }
      return false;
    },
    [dialogReminders]
  );

  const createReminderObject = useCallback(() => {
    const newReminderObj = reminderArr.reduce((reminderObj, reminder) => {
      return {
        ...reminderObj,
        [reminder]: isChecked(reminder)
      };
    }, {});
    setReminderObj(newReminderObj);
  }, [isChecked]);

  useEffect(() => {
    createReminderObject();
  }, [createReminderObject, dialogReminders]);

  useEffect(() => {
    const newReminders = Object.keys(reminderObj).filter(
      reminder => reminderObj[reminder]
    );
    setReminders(newReminders);
  }, [reminderObj]);

  useEffect(() => {
    setParentReminders(reminders);
  }, [reminders, setParentReminders]);

  const handleChange = name => event => {
    setReminderObj({ ...reminderObj, [name]: event.target.checked });
  };

  const handleDialogClose = (event, reason) => {
    if (reason === 'clickaway' || reason === 'backdropClick') {
      return;
    }

    setDialogOpen(false);
  };

  const reloadDialog = () => {
    if (!dialogOpen) setDialogOpen(true);
  };

  const reset = () => {
    cancel();
    createReminderObject();
  };

  return (
    <div className={classes.dialogBackground} onClick={reloadDialog}>
      <Fade
        in={!dialogOpen}
        timeout={1000}
        style={{ transitionDelay: !dialogOpen ? '500ms' : '0ms' }}
      >
        <Typography variant="h2" align="center" className={classes.click}>
          Click to reload dialog.
        </Typography>
      </Fade>
      <Dialog
        fullWidth={true}
        open={dialogOpen}
        TransitionComponent={Grow}
        TransitionProps={{
          ...(dialogOpen ? { timeout: 1000 } : {})
        }}
        keepMounted
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
        scroll={'body'}
      >
        <DialogTitle
          className={classes.title}
          id="form-dialog-title"
          disableTypography={true}
        >
          <Image height="2.5em" width="2.5em" style={{ marginRight: 16 }} />
          <Typography variant="h6">{title}</Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleDialogClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        {signedIn ? (
          <>
            <DialogContent dividers>
              <DialogContentText>
                {firstName}, {question}
              </DialogContentText>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  animateYearScrolling={true}
                  clearable
                  format="MM/dd/yyyy"
                  fullWidth
                  id="dateQuestionDialogDatePicker"
                  inputVariant="outlined"
                  label={label}
                  margin="normal"
                  onChange={handleDateInputChange}
                  placeholder="mm/dd/yyyy"
                  value={userField}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </MuiPickersUtilsProvider>
              <div className={classes.root}>
                <DialogContentText classes={{ root: classes.root }}>
                  Select each reminder you would like* (in addition to the day
                  of):
                </DialogContentText>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                  fullWidth={true}
                >
                  <FormGroup row>
                    {reminderArr.map(name => (
                      <FormControlLabel
                        key={name}
                        control={
                          <Checkbox
                            checked={reminderObj[name]}
                            onChange={handleChange(name)}
                            value={name}
                          />
                        }
                        label={name}
                      />
                    ))}
                  </FormGroup>
                  <FormHelperText>
                    *Submitting overrides previous values
                  </FormHelperText>
                </FormControl>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={reset} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleFormSubmit} color="primary">
                Submit
              </Button>
              <Link to={link} className={classes.link}>
                <Button onClick={() => setDialogOpen(false)} color="primary">
                  Next
                </Button>
              </Link>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogContent>
              <DialogContentText>
                Please close this dialog and sign in to continue.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Link to={link} className={classes.link}>
                <Button onClick={() => setDialogOpen(false)} color="primary">
                  Next
                </Button>
              </Link>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default DateQuestionDialog;
