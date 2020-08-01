import React, { useContext, useCallback, useEffect, useState } from 'react';
import { Context as AuthContext } from '../../../context/AuthContext';
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
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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
  },
  title: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const QuestionDialog = ({
  cancel,
  firstName,
  handleFormSubmit,
  handleInputChange,
  Image,
  question,
  userField
}) => {
  const {
    state: { signedIn }
  } = useContext(AuthContext);

  const {
    label,
    nextQuestionLink,
    placeholder,
    questionText,
    title
  } = question;

  const [dialogOpen, setDialogOpen] = useState(false);

  const classes = useStyles();

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

  const reloadDialog = () => {
    if (!dialogOpen) setDialogOpen(true);
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
                {firstName}, {questionText}
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
              <Link to={nextQuestionLink} className={classes.link}>
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
              <Link to={nextQuestionLink} className={classes.link}>
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
