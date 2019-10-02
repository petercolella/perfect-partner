import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
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
  }
}));

const NudgeDialog = props => {
  const classes = useStyles();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [nudgeArr, setNudgeArr] = useState([
    'Romantic Text',
    'Buy Flowers',
    'Dinner Reservations'
  ]);
  const [snackbarNudges, setSnackbarNudges] = useState([]);
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
  }

  return (
    <div>
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
