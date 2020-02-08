import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import CloseIcon from '@material-ui/icons/Close';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fade from '@material-ui/core/Fade';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import SnackbarContentWrapper from '../../SnackbarContentWrapper';

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
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  }
}));

const TransitionUp = props => {
  return <Slide {...props} direction="up" />;
};

const QuestionDialog = props => {
  const classes = useStyles();

  const {
    cancel,
    firstName,
    handleFormSubmit,
    handleInputChange,
    Image,
    label,
    link,
    placeholder,
    question,
    res,
    signedIn,
    snackbarOpen,
    setSnackbarOpen,
    title,
    userField,
    variant
  } = props;

  const [dialogOpen, setDialogOpen] = useState(false);

  const loadDialog = useCallback(() => {
    setTimeout(() => {
      setDialogOpen(true);
    }, 250);
  }, []);

  useEffect(() => {
    loadDialog();
  }, [loadDialog, signedIn]);

  const handleDialogClose = (event, reason) => {
    if (reason === 'clickaway' || reason === 'backdropClick') {
      return;
    }

    setDialogOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const reloadDialog = () => {
    if (!dialogOpen) setDialogOpen(true);
  };

  const renderSnackbarContentWrapper = (res, variant) => {
    let span;
    switch (variant) {
      case 'error':
        span = res;
        break;
      case 'success':
        span = `${title}: ${res} has been submitted.`;
        break;
      case 'warning':
        span = `Oops! That's not valid input.`;
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
          {renderSnackbarContentWrapper(res, variant)}
        </Snackbar>
      </div>
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
                {firstName}, {question}
              </DialogContentText>
              <TextField
                id="questionDialogTextField"
                label={label}
                type="text"
                fullWidth
                value={userField}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                helperText={placeholder}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={cancel} color="secondary">
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

export default QuestionDialog;
