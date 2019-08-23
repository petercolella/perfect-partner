import React from 'react';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import { green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
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
  const { message, onClose, variant, ...other } = props;

  return (
    <SnackbarContent
      className={clsx(classes[variant])}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <CheckCircleIcon
            className={clsx(classes.icon, classes.iconVariant)}
          />
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

const UserUpdate = props => {
  const [toastOpen, setToastOpen] = React.useState(false);

  function handleToastClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setToastOpen(false);
  }

  const clickHandler = e => {
    props.handleUserFormSubmit(e);
    setToastOpen(true);
  };

  return (
    <div>
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={toastOpen}
          autoHideDuration={2000}
          onClose={handleToastClose}
          TransitionComponent={TransitionUp}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}>
          <MySnackbarContentWrapper
            onClose={handleToastClose}
            variant="success"
            message={
              <span>
                Your profile has been successfully updated,{' '}
                {props.user.firstName}.
              </span>
            }
          />
        </Snackbar>
      </div>
      <Dialog
        fullWidth={true}
        open={props.userDialogOpen}
        onClose={props.closeUpdateComp}
        aria-labelledby="form-dialog-title"
        scroll={'body'}>
        <DialogTitle id="form-dialog-title">
          Edit Your Profile, {props.user.firstName}.
          {/* <Pencil height="2.5em" width="2.5em" style={{ marginLeft: 16 }} /> */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Make changes below. Your email address is from the Gmail account
            with which you logged in.
          </DialogContentText>
          <TextField
            id="name"
            label="Full Name"
            type="text"
            fullWidth
            value={props.user.name}
            onChange={props.handleUserInputChange('name')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            value={props.user.firstName}
            onChange={props.handleUserInputChange('firstName')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            value={props.user.lastName}
            onChange={props.handleUserInputChange('lastName')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={props.user.email}
            onChange={props.handleUserInputChange('email')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="phone"
            label="Phone"
            type="tel"
            fullWidth
            value={props.user.phone}
            onChange={props.handleUserInputChange('phone')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="partnerName"
            label="Partner's Name"
            type="text"
            fullWidth
            value={props.user.partnerName}
            onChange={props.handleUserInputChange('partnerName')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="anniversaryDate"
            label="Anniversary Date"
            type="date"
            fullWidth
            value={props.user.anniversaryDate}
            onChange={props.handleUserInputChange('anniversaryDate')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="birthDate"
            label="Partner's Birthday"
            type="date"
            fullWidth
            value={props.user.birthDate}
            onChange={props.handleUserInputChange('birthDate')}
            margin="normal"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.closeUserUpdateComp} color="primary">
            Cancel
          </Button>
          <Button onClick={e => clickHandler(e)} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <div
        className="modal fade"
        id="editUserModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editUserModalCenterTitle"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="editUserModalCenterTitle"
                style={{ lineHeight: '2' }}>
                Edit Profile
              </h5>
              <div aria-live="polite" aria-atomic="true">
                <div
                  className="toast"
                  id="user-toast"
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                  data-delay="2000"
                  style={{
                    backgroundColor: '#22b5e0',
                    color: 'white',
                    margin: 'auto'
                  }}>
                  <div className="toast-body" style={{ padding: '0.5rem' }}>
                    {props.user.firstName}, your profile has been successfully
                    updated.
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                style={{ margin: '-1rem -1rem -1rem 0' }}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <div className="col">
                    <label htmlFor="userNameInput">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userNameInput"
                      onChange={props.handleUserInputChange}
                      value={props.user.name}
                      name="name"
                    />
                    <label htmlFor="userFirstNameInput">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userFirstNameInput"
                      onChange={props.handleUserInputChange}
                      value={props.user.firstName}
                      name="firstName"
                    />
                    <label htmlFor="userLastNameInput">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userLastNameInput"
                      onChange={props.handleUserInputChange}
                      value={props.user.lastName}
                      name="lastName"
                    />
                    <label htmlFor="userEmailInput">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userEmailInput"
                      onChange={props.handleUserInputChange}
                      value={props.user.email}
                      name="email"
                    />
                    <label htmlFor="userPhoneInput">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userPhoneInput"
                      onChange={props.handleUserInputChange}
                      value={props.user.phone}
                      name="phone"
                    />
                    <label htmlFor="userPartnerNameInput">Partner Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userPartnerNameInput"
                      onChange={props.handleUserInputChange}
                      value={props.user.partnerName}
                      name="partnerName"
                    />
                    <label htmlFor="userAnniversaryDateInput">
                      Anniversary
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="userAnniversaryDateInput"
                      onChange={props.handleUserInputChange}
                      value={props.user.anniversaryDate}
                      name="anniversaryDate"
                    />
                    <label htmlFor="userBirthDateInput">
                      Partner's Birthday'
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="userBirthDateInput"
                      onChange={props.handleUserInputChange}
                      value={props.user.birthDate}
                      name="birthDate"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={props.handleUserFormSubmit}>
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={props.closeUserUpdateComp}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserUpdate;
