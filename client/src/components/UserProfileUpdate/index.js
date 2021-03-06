import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputMask from 'react-input-mask';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { ReactComponent as User } from './user.svg';

const useStyles = makeStyles(theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 3, 3)
  },
  title: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const UserProfileUpdate = ({
  closeUserProfileUpdateComp,
  handleUserFormSubmit,
  handleUserInputChange,
  setUserDeleteDialogOpen,
  user,
  userProfileDialogOpen
}) => {
  const classes = useStyles();

  return (
    <Dialog
      fullWidth={true}
      open={userProfileDialogOpen}
      onClose={closeUserProfileUpdateComp}
      aria-labelledby="form-dialog-title"
      scroll={'body'}
    >
      <DialogTitle
        className={classes.title}
        id="form-dialog-title"
        disableTypography={true}
      >
        <User height="2.5em" width="2.5em" style={{ marginRight: 16 }} />
        <Typography variant="h6">
          Edit Your Profile, {user.firstName}.
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Make changes below. Your email address is from the Gmail account with
          which you logged in.
        </DialogContentText>
        <TextField
          id="imageUrl"
          label="Image Link"
          type="text"
          fullWidth
          name="imageUrl"
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
          name="firstName"
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
          name="lastName"
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
          name="name"
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
          name="email"
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
          name="partnerName"
          value={user.partnerName}
          onChange={handleUserInputChange('partnerName')}
          margin="normal"
          variant="outlined"
        />
        <InputMask
          mask={`(9\u200A9\u200A9) 9\u200A9\u200A9-9\u200A9\u200A9\u200A9`}
          maskPlaceholder="_"
          onChange={handleUserInputChange('phone')}
          value={user.phone}
        >
          <TextField
            id="phone"
            label="Phone"
            type="tel"
            fullWidth
            name="phone"
            margin="normal"
            variant="outlined"
          />
        </InputMask>
      </DialogContent>
      <DialogActions className={classes.buttons}>
        <Button
          onClick={() => setUserDeleteDialogOpen(true)}
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
        >
          Delete Your Account
        </Button>
        <div>
          <Button onClick={closeUserProfileUpdateComp} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUserFormSubmit} color="primary">
            Submit
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default UserProfileUpdate;
