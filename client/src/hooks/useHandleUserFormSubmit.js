import { useContext } from 'react';
import { Context as SnackbarContext } from '../context/SnackbarContext';
import { Context as UserContext } from '../context/UserContext';
import useRenderSnackbarMessage from '../hooks/useRenderSnackbarMessage';

import API from '../utils/API';
import fn from '../utils/fn';

export default (dialogSetter, stateSetter, stateObj) => {
  const { handleSnackbarOpen } = useContext(SnackbarContext);
  const { loadCurrentUser, reloadCurrentUser } = useContext(UserContext);
  const [renderSnackbarMessage] = useRenderSnackbarMessage();

  const handleUserFormSubmit = () => {
    const newUser = {
      ...stateObj.dashboardUser,
      anniversaryDate: stateObj.anniversaryDate
        ? fn.localToUTC(stateObj.anniversaryDate)
        : undefined,
      birthDate: stateObj.birthDate
        ? fn.localToUTC(stateObj.birthDate)
        : undefined
    };

    const testUser = {
      ...stateObj.dashboardUser,
      anniversaryDate: stateObj.anniversaryDate
        ? fn.localToUTC(stateObj.anniversaryDate).toISO()
        : undefined,
      birthDate: stateObj.birthDate
        ? fn.localToUTC(stateObj.birthDate).toISO()
        : undefined
    };

    const testArray = Object.keys(testUser).filter(key => {
      if (Array.isArray(testUser[key])) {
        return testUser[key].join() !== stateObj.user[key].join();
      }
      return testUser[key] !== stateObj.user[key];
    });

    const customDateTestArray = stateObj.dashboardCustomDates
      ? stateObj.dashboardCustomDates.flatMap(date => {
          return Object.keys(date).filter(key => {
            return (
              stateObj.user.customDates.find(({ _id }) => _id === date._id) &&
              date[key] !==
                stateObj.user.customDates.find(({ _id }) => _id === date._id)[
                  key
                ]
            );
          });
        })
      : [];

    if (!testArray.length && !customDateTestArray.length) {
      handleSnackbarOpen(`Oops! You haven't changed anything yet.`, 'warning');
      return;
    }

    if (newUser.phone.length !== 10 && newUser.phone !== '') {
      handleSnackbarOpen('Phone number must be 10 digits.', 'warning');
      return;
    }

    if (testArray.length) {
      let reqBody = newUser;
      if (!newUser.phone && newUser.phone === stateObj.user.phone) {
        const { phone, ...rest } = newUser;
        reqBody = rest;
      }

      API.updateUser(stateObj.user._id, reqBody)
        .then(res => {
          renderSnackbarMessage(res.data);
          loadCurrentUser(res);
          dialogSetter(false);
        })
        .catch(err => {
          // captures error message after last colon and space
          const [errMsg] = err.response
            ? err.response.data.match(/(?! )[^:]+$/)
            : 'Error!';
          handleSnackbarOpen(errMsg, 'error');
          stateSetter();
          return;
        });
    }

    if (customDateTestArray.length) {
      stateObj.dashboardCustomDates.forEach((date, i) => {
        let changed = false;
        Object.keys(date).forEach(key => {
          if (date[key] !== stateObj.user.customDates[i][key]) {
            changed = true;
          }
        });
        if (changed) {
          const tempDate = { ...date };
          tempDate.value = fn.localToUTC(tempDate.value);
          API.updateDate(date._id, tempDate)
            .then(res => {
              renderSnackbarMessage(res.data, true);
              reloadCurrentUser();
              dialogSetter(false);
            })
            .catch(err => {
              // captures error message after last colon and space
              const [errMsg] = err.response
                ? err.response.data.match(/(?! )[^:]+$/)
                : err.message;
              handleSnackbarOpen(errMsg, 'error');
              stateSetter();
              return;
            });
        }
      });
    }
  };

  return [handleUserFormSubmit];
};
