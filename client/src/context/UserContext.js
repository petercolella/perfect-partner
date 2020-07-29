import createDataContext from './createStateContext';
import API from '../utils/API';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'set_current_user':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const loadUserContextInfo = dispatch => () => {
  const id = sessionStorage.getItem('currentUserId');
  if (id) {
    // setSignedIn(true);
    API.getUser(id)
      .then(res => {
        // setUser(user => (res.data ? res.data : user));
        dispatch({ type: 'set_current_user', payload: res.data });
      })
      .catch(err => {
        const errStr = err.response ? err.response.data.split(', ')[0] : err;
        // handleSnackbarOpen(errStr, 'error');
        // signOut();
        console.log(errStr);
      });
  } else {
    // signOut();
  }
};

export const { Provider, Context } = createDataContext(
  userReducer,
  { loadUserContextInfo },
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
    }
  }
);
