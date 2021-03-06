import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';
import { Context as SnackbarContext } from '../../../context/SnackbarContext';
import { Context as UserContext } from '../../../context/UserContext';
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
import Typography from '@material-ui/core/Typography';

import API from '../../../utils/API';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
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
  },
  title: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const nudgeArr = ['Romantic Text', 'Buy Flowers', 'Dinner Reservations'];

const NudgeDialog = ({ Image, link, nudges, question, title }) => {
  const {
    state: { signedIn, user },
    reloadCurrentUser
  } = useContext(UserContext);
  const { handleSnackbarOpen } = useContext(SnackbarContext);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarNudges, setSnackbarNudges] = useState([]);
  const [nudgeObj, setNudgeObj] = useState({});

  const classes = useStyles();

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
    setNudgeObj(newNameObj);
  }, []);

  useEffect(() => {
    createNudgeObject();
  }, [createNudgeObject]);

  const handleDialogClose = (event, reason) => {
    if (reason === 'clickaway' || reason === 'backdropClick') {
      return;
    }

    setDialogOpen(false);
  };

  const isDiabled = name => {
    for (let nudge of nudges) {
      if (nudge.name === name) {
        return true;
      }
    }
    return false;
  };

  const reloadDialog = () => {
    if (!dialogOpen) setDialogOpen(true);
  };

  const selectAllCheckboxes = isSelected => {
    Object.keys(nudgeObj).forEach(name => {
      if (!isDiabled(name)) {
        setNudgeObj(prevState => ({
          ...prevState,
          [name]: isSelected
        }));
      }
    });
  };

  const selectAll = () => selectAllCheckboxes(true);

  const deselectAll = () => selectAllCheckboxes(false);

  const renderNudgeList = snackbarNudges => {
    return (
      <div>
        <p>You submitted these nudges:</p>
        <ul>
          {snackbarNudges.map((nudge, i) => (
            <li key={i}>{nudge}</li>
          ))}
        </ul>
      </div>
    );
  };

  const handleChange = name => event => {
    setNudgeObj({ ...nudgeObj, [name]: event.target.checked });
  };

  const handleSubmit = () => {
    const newNudges = Object.keys(nudgeObj).filter(nudge => nudgeObj[nudge]);

    if (!newNudges.length > 0) {
      handleSnackbarOpen('Please select at least one nudge.', 'warning');
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
        reloadCurrentUser();
        deselectAll();
        handleSnackbarOpen(
          renderNudgeList(snackbarNudges.concat(resultsNameArr)),
          'success'
        );
        setSnackbarNudges(snackbarNudges.concat(resultsNameArr));
      })
      .catch(err => {
        // captures error message after last colon and space
        const [errMsg] = err.response.data.match(/(?! )[^:]+$/);
        handleSnackbarOpen(errMsg, 'error');
      });
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
            <DialogContent>
              <DialogContentText>
                {user.firstName}, {question}
              </DialogContentText>
              <div className={classes.root}>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                  fullWidth={true}
                >
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
                            checked={nudgeObj[name]}
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
