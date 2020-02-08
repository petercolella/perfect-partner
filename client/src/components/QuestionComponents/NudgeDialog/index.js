import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import Fade from '@material-ui/core/Fade';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

import SnackbarContentWrapper from '../../SnackbarContentWrapper';

import API from '../../../utils/API';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  button: {
    margin: theme.spacing(1)
  },
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
  const [res, setRes] = useState(null);
  const [state, setState] = useState({});
  const [variant, setVariant] = useState(null);

  const loadDialog = useCallback(() => {
    setTimeout(() => {
      setDialogOpen(true);
    }, 250);
  }, []);

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

  const handleSnackbarOpen = variant => {
    setVariant(variant);
    setSnackbarOpen(true);
  };

  const handleSubmit = () => {
    const newNudges = Object.keys(state).filter(nudge => state[nudge]);

    if (!newNudges.length > 0) {
      handleSnackbarOpen('warning');
      return;
    }

    const promises = [];

    newNudges.forEach(nudge => {
      const newNudge = {
        userId: user._id,
        nudge: {
          name: nudge
        }
      };

      promises.push(API.saveNudge(newNudge));
    });

    Promise.all(promises)
      .then(results => {
        const resultsNameArr = results.reduce(
          (arr, result) => [...arr, result.data.name],
          []
        );
        loadNudges();
        loadUserInfo();
        deselectAll();
        setSnackbarNudges(snackbarNudges.concat(resultsNameArr));
        handleSnackbarOpen('success');
      })
      .catch(err => {
        // captures error message after last colon and space
        const [errMsg] = err.response.data.match(/(?! )[^:]+$/);
        setRes(errMsg);
        handleSnackbarOpen('error');
        return;
      });
  };

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

  const reloadDialog = () => {
    if (!dialogOpen) setDialogOpen(true);
  };

  const renderNudgeList = snackbarNudges => {
    return (
      <>
        You submitted these nudges:
        <ul>
          {snackbarNudges.map((nudge, i) => (
            <li key={i}>{nudge}</li>
          ))}
        </ul>
      </>
    );
  };

  const renderSnackbarContentWrapper = (res, variant) => {
    let span;
    switch (variant) {
      case 'error':
        span = res;
        break;
      case 'success':
        span = renderNudgeList(snackbarNudges);
        break;
      case 'warning':
        span = `Please select at least one nudge.`;
        break;
      default:
        return;
    }

    return (
      <SnackbarContentWrapper
        onClose={handleSnackbarClose}
        variant={variant}
        message={<span>{span}</span>}
      />
    );
  };

  return (
    <div className={classes.dialogBackground} onClick={reloadDialog}>
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
        {renderSnackbarContentWrapper(res, variant)}
      </Snackbar>
      <Fade
        in={!dialogOpen}
        timeout={1000}
        style={{ transitionDelay: !dialogOpen ? '500ms' : '0ms' }}>
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
            <DialogActions style={{ flexWrap: 'wrap' }}>
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
