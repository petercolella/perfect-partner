import React, { useContext } from 'react';
import { Context as SnackbarContext } from '../context/SnackbarContext';
import { Context as UserContext } from '../context/UserContext';
import { DateTime } from 'luxon';
import fn from '../utils/fn';

const keyNameObj = {
  imageUrl: 'Image Link',
  firstName: 'First Name',
  lastName: 'Last Name',
  name: 'Full Name',
  email: 'Email',
  partnerName: `Partner's name`,
  phone: 'Phone Number',
  anniversaryDate: 'Your Anniversary',
  birthDate: `Partner's Birthday`,
  anniversaryReminders: 'Anniversary Reminders',
  birthdayReminders: 'Birthday Reminders',
  title: 'Title',
  description: 'Description',
  value: 'Custom Date',
  reminders: 'Reminders'
};

const keyNameAndValue = obj => {
  const newObj = {};
  for (let key in obj) {
    newObj.name = keyNameObj[key];
    newObj.newValue = Array.isArray(obj[key])
      ? obj[key].join(' \u2022 ')
      : key === 'phone'
      ? fn.formatPhoneNumber(obj[key])
      : obj[key];
  }
  return newObj;
};

export default () => {
  const { handleSnackbarOpen } = useContext(SnackbarContext);
  const {
    state: { user }
  } = useContext(UserContext);

  const renderSnackbarMessage = (res, isCustomDate = false) => {
    const dateKeysArray = ['anniversaryDate', 'birthDate', 'value'];

    const customDatesChanged = (resObj, resObjKey) => {
      let changed;
      user.customDates.forEach(date => {
        if (date._id === resObj._id) {
          Object.keys(date).forEach(key => {
            if (key === resObjKey) {
              changed =
                key === 'reminders'
                  ? date[key].join('') !== resObj[key].join('')
                  : (key === 'value'
                      ? date[key].setZone('UTC').toISO()
                      : date[key]) !== resObj[key];
            }
          });
        }
      });
      return changed;
    };

    const updatedValuesArray = Object.keys(res)
      .filter(key => {
        if (['_id', '__v', 'customDates', 'nudges'].includes(key)) return false;

        if (isCustomDate) return customDatesChanged(res, key);

        if (Array.isArray(res[key]))
          return res[key].join() !== user[key].join();

        return res[key] !== user[key];
      })
      .map(key => {
        return {
          [key]: !dateKeysArray.includes(key)
            ? res[key]
            : DateTime.fromISO(res[key]).setZone('UTC').toLocaleString()
        };
      });

    const snackbarValuesArray = updatedValuesArray.map(
      el => (el = keyNameAndValue(el))
    );

    const messageHTML = (
      <div>
        <p>
          Your {isCustomDate ? `${res.title} date` : 'profile'} has been
          successfully updated with the following changes:
        </p>
        <ul>
          {snackbarValuesArray.map((el, i) => {
            return (
              <li key={el.name || i}>
                {el.name}: {el.newValue}
              </li>
            );
          })}
        </ul>
      </div>
    );

    handleSnackbarOpen(messageHTML, 'success');
  };

  return [renderSnackbarMessage];
};
