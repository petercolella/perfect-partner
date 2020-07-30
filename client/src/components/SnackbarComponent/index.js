import React, { useContext } from 'react';
import { Context as SnackbarContext } from '../../context/SnackbarContext';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from '../SnackbarContentWrapper';

const Transition = props => {
  return <Slide {...props} direction="up" />;
};

const SnackbarComponent = () => {
  const {
    state: { autoHideDuration, message, snackbarOpen, variant },
    setSnackbarOpen
  } = useContext(SnackbarContext);

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
      open={snackbarOpen}
      autoHideDuration={autoHideDuration}
      onClose={handleSnackbarClose}
      TransitionComponent={Transition}
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
