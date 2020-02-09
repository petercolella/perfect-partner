import React, { useEffect, useState } from 'react';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from '../SnackbarContentWrapper';

const Transition = props => {
  return <Slide {...props} direction="up" />;
};

const SnackbarComponent = props => {
  const { message, open, variant } = props;
  const [snackbarOpen, setSnackbarOpen] = useState(open);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  useEffect(() => {
    setSnackbarOpen(open);
  }, [open]);

  return (
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
        variant={variant}
        message={message}
      />
    </Snackbar>
  );
};

export default SnackbarComponent;
