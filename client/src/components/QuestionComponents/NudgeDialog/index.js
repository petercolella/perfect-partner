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
  button: {
    margin: theme.spacing(1)
  },
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing(3)
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

const NudgeDialog = props => {
  const classes = useStyles();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [nudgeArr, setNudgeArr] = useState([
    'Romantic Text',
    'Buy Flowers',
    'Dinner Reservations'
  ]);
  const [snackbarNudges, setSnackbarNudges] = useState([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [state, setState] = useState({});

  React.useEffect(() => {
    setTimeout(() => {
      setDialogOpen(true);
    }, 250);
  }, []);

  const Image = props.image;

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

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const selectAllCheckboxes = isSelected => {
    Object.keys(state).forEach(name => {
      setState(prevState => ({
        ...prevState,
        [name]: isSelected
      }));
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
          userId: props.user._id,
          nudge: {
            name: nudge
          }
        };
        API.saveNudge(newNudge);
      });

    setSnackbarNudges(newNudges);
    setToastOpen(true);
  }

  function handleDialogClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setDialogOpen(false);
    props.loadUserInfo();
    setTimeout(() => {
      setDialogOpen(true);
    }, 250);
  }

  function handleToastClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setToastOpen(false);
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={toastOpen}
        autoHideDuration={3000}
        onClose={handleToastClose}
        TransitionComponent={TransitionUp}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}>
        {snackbarNudges.length > 0 ? (
          <MySnackbarContentWrapper
            onClose={handleToastClose}
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
            onClose={handleToastClose}
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
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.user.firstName}, {props.question}
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
                    control={
                      <Checkbox
                        checked={state[name]}
                        onChange={handleChange(name)}
                        value={name}
                      />
                    }
                    label={name}
                    className={
                      snackbarNudges.includes(name) && classes.lineThrough
                    }
                  />
                ))}
              </FormGroup>
              <FormHelperText>*These can be customized later.</FormHelperText>
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
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
          <Link to={props.link}>
            <Button onClick={() => setDialogOpen(false)} color="primary">
              Next
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NudgeDialog;
