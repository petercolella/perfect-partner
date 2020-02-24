import React from 'react';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from '../SnackbarContentWrapper';

const Transition = props => {
  return <Slide {...props} direction="up" />;
};

const SnackbarComponent = props => {
  const { autoHideDuration, message, open, setSnackbarOpen, variant } = props;

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleSnackbarClose}
      TransitionComponent={Transition}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}>
      <SnackbarContentWrapper
        onClose={handleSnackbarClose}
        variant={variant}
        message={message}
      />
    </Snackbar>
  );
};

export default SnackbarComponent;
