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

  useEffect(() => {
    setSnackbarOpen(open);
  }, [open]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const renderSnackbarContentWrapper = (message, variant) => {
    let span;
    switch (variant) {
      case 'error':
        span = message;
        break;
      case 'success':
        span = message;
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
      {renderSnackbarContentWrapper(message, variant)}
    </Snackbar>
  );
};

export default SnackbarComponent;
