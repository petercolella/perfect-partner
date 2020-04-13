import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';

import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteIcon from '@material-ui/icons/HighlightOffOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
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

const UserDateDelete = props => {
  const classes = useStyles();
  const {
    setUserDateDeleteDialogOpen,
    handleUserDateDeleteConfirm,
    userDate,
    userDateDeleteDialogOpen
  } = props;

  return (
    <Dialog open={userDateDeleteDialogOpen}>
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
          Delete{' '}
          {DateTime.fromISO(userDate.value).setZone('UTC').toLocaleString()}{' '}
          {userDate.title}?
        </Typography>
      </DialogTitle>
      <DialogActions className={classes.buttons}>
        <Button
          onClick={() => handleUserDateDeleteConfirm(userDate)}
          color="secondary"
          startIcon={<DeleteForeverIcon />}
          size="small"
          variant="contained">
          Confirm
        </Button>
        <Button
          onClick={() => setUserDateDeleteDialogOpen(false)}
          size="small"
          variant="contained"
          autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDateDelete;
