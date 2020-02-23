import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteIcon from '@material-ui/icons/HighlightOffOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 3, 3)
  },
  link: {
    textDecoration: 'none'
  },
  title: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const UserProfileDelete = props => {
  const classes = useStyles();
  const {
    setUserDeleteDialogOpen,
    handleUserAccountDeleteSubmit,
    userDeleteDialogOpen,
    user
  } = props;

  return (
    <Dialog open={userDeleteDialogOpen}>
      <DialogTitle
        className={classes.title}
        id="form-dialog-title"
        disableTypography={true}>
        <DeleteIcon
          color="error"
          fontSize="large"
          style={{ marginRight: 16 }}
        />
        <Typography variant="h6">
          Delete your account, {user.firstName}?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure? Your data will be permanently erased.
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.buttons}>
        <Link to="/landing" className={classes.link}>
          <Button
            onClick={handleUserAccountDeleteSubmit}
            color="secondary"
            startIcon={<DeleteForeverIcon />}
            size="small"
            variant="contained">
            Yes, do it.
          </Button>
        </Link>
        <Button
          onClick={() => setUserDeleteDialogOpen(false)}
          size="small"
          variant="contained"
          autoFocus>
          No, get me out of here!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserProfileDelete;
