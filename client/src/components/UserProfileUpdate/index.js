import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { ReactComponent as User } from './user.svg';
import SnackbarContentWrapper from '../SnackbarContentWrapper';

const useStyles = makeStyles(theme => ({
  title: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const Transition = props => {
  return <Slide {...props} direction="up" />;
};

const UserProfileUpdate = props => {
  const classes = useStyles();
  const {
    closeUserProfileUpdateComp,
    handleUserFormSubmit,
    handleUserInputChange,
    userProfileDialogOpen,
    user
  } = props;
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const clickHandler = () => {
    handleUserFormSubmit();
    setSnackbarOpen(true);
  };

  return (
    <div>
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          TransitionComponent={Transition}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}>
          <SnackbarContentWrapper
            onClose={handleSnackbarClose}
            variant="success"
            message={
              <span>
                Your profile has been successfully updated, {user.firstName}.
              </span>
            }
          />
        </Snackbar>
      </div>
      <Dialog
        fullWidth={true}
        open={userProfileDialogOpen}
        onClose={closeUserProfileUpdateComp}
        aria-labelledby="form-dialog-title"
        scroll={'body'}>
        <DialogTitle
          className={classes.title}
          id="form-dialog-title"
          disableTypography={true}>
          <User height="2.5em" width="2.5em" style={{ marginRight: 16 }} />
          <Typography variant="h6">
            Edit Your Profile, {user.firstName}.
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Make changes below. Your email address is from the Gmail account
            with which you logged in.
          </DialogContentText>
          <TextField
            id="imageUrl"
            label="Image Link"
            type="text"
            fullWidth
            value={user.imageUrl}
            onChange={handleUserInputChange('imageUrl')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            value={user.firstName}
            onChange={handleUserInputChange('firstName')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            value={user.lastName}
            onChange={handleUserInputChange('lastName')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="name"
            label="Full Name"
            type="text"
            fullWidth
            value={user.name}
            onChange={handleUserInputChange('name')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={user.email}
            onChange={handleUserInputChange('email')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="partnerName"
            label="Partner's Name"
            type="text"
            fullWidth
            value={user.partnerName}
            onChange={handleUserInputChange('partnerName')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="phone"
            label="Phone"
            type="tel"
            fullWidth
            value={user.phone}
            onChange={handleUserInputChange('phone')}
            margin="normal"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUserProfileUpdateComp} color="primary">
            Cancel
          </Button>
          <Button onClick={clickHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserProfileUpdate;
