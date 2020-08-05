import React, { useContext, useEffect } from 'react';
import { Context as SnackbarContext } from '../../context/SnackbarContext';
import { Context as UserContext } from '../../context/UserContext';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from '../SnackbarContentWrapper';

const TransitionUp = props => {
  return <Slide {...props} direction="up" />;
};

const TransitionDown = props => {
  return <Slide {...props} direction="down" />;
};

const SnackbarComponent = () => {
  const {
    state: { autoHideDuration, message, snackbarOpen, variant },
    handleSnackbarOpen,
    setSnackbarOpen
  } = useContext(SnackbarContext);
  const {
    state: { errorMessage },
    setErrorMessage
  } = useContext(UserContext);

  useEffect(() => {
    if (errorMessage) {
      handleSnackbarOpen(errorMessage, 'error');
      setErrorMessage('');
    }
  }, [errorMessage, handleSnackbarOpen, setErrorMessage]);

  const errorBoolean = variant === 'error';
  const verticalValue = errorBoolean ? 'top' : 'bottom';
  const horizontalValue = errorBoolean ? 'right' : 'left';
  const transitionValue = errorBoolean ? TransitionDown : TransitionUp;

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: verticalValue,
        horizontal: horizontalValue
      }}
      open={snackbarOpen}
      autoHideDuration={autoHideDuration}
      onClose={handleSnackbarClose}
      TransitionComponent={transitionValue}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
    >
      <SnackbarContentWrapper
        onClose={handleSnackbarClose}
        variant={variant}
        message={message}
      />
    </Snackbar>
  );
};

export default SnackbarComponent;
