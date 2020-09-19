import createDataContext from './createStateContext';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'setSignedIn':
      return { ...state, signedIn: action.payload };
    case 'signin':
      return { token: action.payload, errorMessage: '' };
    case 'signout':
      return { token: null, errorMessage: '' };
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await sessionStorage.getItem('token');
  if (token) {
    dispatch({ type: 'signin', payload: token });
  } else {
    console.log('No token');
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};

const setSignedIn = dispatch => signedIn => {
  dispatch({ type: 'setSignedIn', payload: signedIn });
};

const signup = dispatch => async ({ email, password }) => {
  try {
    // const response = await trackerApi.post('/signup', { email, password });
    // await sessionStorage.setItem('token', response.data.token);
    // dispatch({ type: 'signin', payload: response.data.token });
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up.'
    });
  }
};

const signin = dispatch => async ({ email, password }) => {
  try {
    // const response = await trackerApi.post('/signin', { email, password });
    // await sessionStorage.setItem('token', response.data.token);
    // dispatch({ type: 'signin', payload: response.data.token });
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Email or password is incorrect.'
    });
  }
};

const signout = dispatch => async () => {
  await sessionStorage.removeItem('token');
  dispatch({ type: 'signout' });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { setSignedIn, signup, signin, signout, clearErrorMessage, tryLocalSignin },
  { signedIn: false, token: null, errorMessage: '' }
);
