import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import API from '../../../utils/API';
import Grow from '@material-ui/core/Grow';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  button: {
    margin: theme.spacing(1)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  formControl: {
    margin: theme.spacing(3)
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  },
  lineThrough: {
    textDecoration: 'line-through'
  }
}));

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
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
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant])}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
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

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

const nudgeArr = ['Romantic Text', 'Buy Flowers', 'Dinner Reservations'];

const NudgeDialog = props => {
  const classes = useStyles();

  const {
    Image,
    link,
    loadNudges,
    loadUserInfo,
    nudges,
    question,
    signedIn,
    title,
    user
  } = props;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarNudges, setSnackbarNudges] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [state, setState] = useState({});

  const loadDialog = useCallback(() => {
    setDialogOpen(false);
    setTimeout(() => {
      loadUserInfo();
      setDialogOpen(true);
    }, 250);
  }, [loadUserInfo]);

  useEffect(() => {
    loadDialog();
  }, [loadDialog, signedIn]);

  const nudgeArrRef = useRef();
  nudgeArrRef.current = nudgeArr;

  const createNudgeObject = useCallback(() => {
    const newNameObj = nudgeArrRef.current.reduce((nudgeObj, nudge) => {
      return {
        ...nudgeObj,
        [nudge]: false
      };
    }, {});
    setState(newNameObj);
  }, []);

  useEffect(() => {
    createNudgeObject();
  }, [createNudgeObject]);

  const isDiabled = name => {
    for (let nudge of nudges) {
      if (nudge.name === name) {
        return true;
      }
    }
    return false;
  };

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const selectAllCheckboxes = isSelected => {
    Object.keys(state).forEach(name => {
      if (!isDiabled(name)) {
        setState(prevState => ({
          ...prevState,
          [name]: isSelected
        }));
      }
    });
  };

  const selectAll = () => selectAllCheckboxes(true);

  const deselectAll = () => selectAllCheckboxes(false);

  function handleSubmit() {
    const newNudges = [];

    Object.keys(state)
      .filter(nudge => state[nudge])
      .forEach(nudge => {
        newNudges.push(nudge);
        const newNudge = {
          userId: user._id,
          nudge: {
            name: nudge
          }
        };
        API.saveNudge(newNudge).then(() => {
          loadNudges();
          loadUserInfo();
          deselectAll();
        });
      });

    setSnackbarNudges(snackbarNudges.concat(newNudges));
    setSnackbarOpen(true);
  }

  function handleDialogClose(event, reason) {
    if (reason === 'clickaway' || reason === 'backdropClick') {
      return;
    }

    setDialogOpen(false);
  }

  function handleSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        TransitionComponent={TransitionUp}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}>
        {snackbarNudges.length > 0 ? (
          <MySnackbarContentWrapper
            onClose={handleSnackbarClose}
            variant="success"
            message={
              <span>
                You submitted these nudges:
                <ul>
                  {snackbarNudges.map((nudge, i) => (
                    <li key={i}>{nudge}</li>
                  ))}
                </ul>
              </span>
            }
          />
        ) : (
          <MySnackbarContentWrapper
            onClose={handleSnackbarClose}
            variant="warning"
            message={<span>Oops!</span>}
          />
        )}
      </Snackbar>
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
        scroll={'body'}>
        <DialogTitle id="form-dialog-title">
          <Image height="2.5em" width="2.5em" style={{ marginRight: 16 }} />
          {title}
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        {signedIn ? (
          <>
            <DialogContent>
              <DialogContentText>
                {user.firstName}, {question}
              </DialogContentText>
              <div className={classes.root}>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                  fullWidth={true}>
                  <FormGroup row>
                    {nudgeArr.map(name => (
                      <FormControlLabel
                        key={name}
                        className={
                          snackbarNudges.includes(name)
                            ? classes.lineThrough
                            : null
                        }
                        control={
                          <Checkbox
                            checked={state[name]}
                            onChange={handleChange(name)}
                            value={name}
                            disabled={isDiabled(name)}
                          />
                        }
                        label={name}
                      />
                    ))}
                  </FormGroup>
                  <FormHelperText>
                    *These can be customized later.
                  </FormHelperText>
                </FormControl>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={selectAll} color="primary">
                &#10003; All
              </Button>
              <Button onClick={deselectAll} color="primary">
                &#10003; None
              </Button>
              <Button onClick={deselectAll} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
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

export default NudgeDialog;
