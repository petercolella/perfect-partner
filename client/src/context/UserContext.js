import createDataContext from './createStateContext';
import API from '../utils/API';

const noUser = {
  anniversaryDate: '',
  anniversaryReminders: [],
  birthDate: '',
  birthdayReminders: [],
  email: '',
  firstName: '',
  imageUrl:
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
  lastName: '',
  name: '',
  nudges: [],
  partnerName: '',
  phone: ''
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'set_current_user':
      return { ...state, user: action.payload };
    case 'set_error_message':
      return { ...state, errorMessage: action.payload };
    case 'setSignedIn':
      return { ...state, signedIn: action.payload };
    case 'set_user_error':
      return { user: noUser, errorMessage: action.payload, signedIn: false };
    default:
      return state;
  }
};

const loadCurrentUser = dispatch => res => {
  if (res) {
    dispatch({ type: 'set_current_user', payload: res.data });
  }
};

const onFailure = dispatch => err => {
  const errStr = err.response ? err.response.data.split(', ')[0] : err;
  dispatch({ type: 'set_user_error', payload: errStr });
};

const onSuccess = dispatch => async googleUser => {
  console.log('Signed in as: ' + googleUser.getBasicProfile().getName());
  const id_token = googleUser.getAuthResponse().id_token;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  sessionStorage.setItem('id_token', id_token);

  try {
    const id = await API.tokenSignInAxios(id_token, timeZone);
    if (id) {
      sessionStorage.setItem('currentUserId', id);
      API.getUser(id)
        .then(res => {
          dispatch({ type: 'set_current_user', payload: res.data });
        })
        .catch(err => {
          const errStr = err.response ? err.response.data.split(', ')[0] : err;
          dispatch({ type: 'set_user_error', payload: errStr });
          sessionStorage.removeItem('currentUserId');
          sessionStorage.removeItem('id_token');
        });
    }
  } catch (err) {
    console.log(err.response.data);
  }
};

const reloadCurrentUser = dispatch => () => {
  const id = sessionStorage.getItem('currentUserId');
  if (id) {
    API.getUser(id)
      .then(res => {
        dispatch({ type: 'set_current_user', payload: res.data });
      })
      .catch(err => {
        const errStr = err.response ? err.response.data.split(', ')[0] : err;
        dispatch({ type: 'set_user_error', payload: errStr });
      });
  }
};

const setErrorMessage = dispatch => message => {
  dispatch({ type: 'set_error_message', payload: message });
};

const setSignedIn = dispatch => signedIn => {
  dispatch({ type: 'setSignedIn', payload: signedIn });
};

const signOut = dispatch => () => {
  if (window.gapi && window.gapi.auth2) {
    const GoogleAuth = window.gapi.auth2.getAuthInstance();
    GoogleAuth.signOut()
      .then(() => {
        console.log('User signed out.');
      })
      .catch(err => console.log(err));
  }

  dispatch({ type: 'set_current_user', payload: noUser });
  sessionStorage.removeItem('currentUserId');
  sessionStorage.removeItem('id_token');
};

export const { Provider, Context } = createDataContext(
  userReducer,
  {
    loadCurrentUser,
    onFailure,
    onSuccess,
    reloadCurrentUser,
    setErrorMessage,
    setSignedIn,
    signOut
  },
  {
    user: {
      anniversaryDate: '',
      anniversaryReminders: [],
      birthDate: '',
      birthdayReminders: [],
      email: '',
      firstName: '',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
      lastName: '',
      name: '',
      nudges: [],
      partnerName: '',
      phone: ''
    },
    errorMessage: '',
    signedIn: false
  }
);
