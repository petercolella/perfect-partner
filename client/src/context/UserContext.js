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

const loadUserContextInfo = dispatch => res => {
  dispatch({ type: 'set_current_user', payload: res.data });
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
