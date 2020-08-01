import createDataContext from './createStateContext';
import API from '../utils/API';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'set_current_user':
      return { ...state, user: action.payload };
    case 'set_error_message':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const loadCurrentUser = dispatch => res => {
  if (res) {
    dispatch({ type: 'set_current_user', payload: res.data });
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
        dispatch({ type: 'set_error_message', payload: errStr });
      });
  }
};

export const { Provider, Context } = createDataContext(
  userReducer,
  { loadCurrentUser, reloadCurrentUser },
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
    errorMessage: ''
  }
);
