import createDataContext from './createStateContext';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'set_snackbar_state':
      return { ...action.payload };
    case 'set_snackbar_open_state':
      return { ...state, snackbarOpen: action.payload };
    default:
      return state;
  }
};

const handleSnackbarOpen = dispatch => (
  message,
  variant,
  autoHideDuration = 5000
) => {
  dispatch({
    type: 'set_snackbar_state',
    payload: { message, variant, autoHideDuration, snackbarOpen: true }
  });
};

const setSnackbarOpen = dispatch => snackbarOpen => {
  dispatch({
    type: 'set_snackbar_open_state',
    payload: snackbarOpen
  });
};

export const { Provider, Context } = createDataContext(
  userReducer,
  { handleSnackbarOpen, setSnackbarOpen },
  { autoHideDuration: 5000, message: '', snackbarOpen: false, variant: null }
);
