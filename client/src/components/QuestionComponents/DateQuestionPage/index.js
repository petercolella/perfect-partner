import React, { useCallback, useContext, useState, useEffect } from 'react';
import { Context as UserContext } from '../../../context/UserContext';
import { Context as SnackbarContext } from '../../../context/SnackbarContext';
import { DateTime } from 'luxon';

import DateQuestionDialog from '../DateQuestionDialog';

import API from '../../../utils/API';
import fn from '../../../utils/fn';

const DateQuestionPage = ({ Image, data, signedIn }) => {
  const { handleSnackbarOpen } = useContext(SnackbarContext);
  const {
    state: { user },
    loadCurrentUser
  } = useContext(UserContext);
  const [inputValue, setInputValue] = useState(null);
  const [inputReminders, setInputReminders] = useState([]);
  const [dialogReminders, setDialogReminders] = useState([]);

  const {
    dateKey,
    label,
    nextQuestionLink,
    question,
    reminderKey,
    title
  } = data;

  const initializeValues = useCallback(() => {
    setInputValue(
      user[dateKey] ? fn.UTCToLocal(DateTime.fromISO(user[dateKey])) : null
    );
    setDialogReminders(user[reminderKey] || []);
  }, [dateKey, reminderKey, user]);

  useEffect(() => {
    initializeValues();
  }, [initializeValues]);

  const handleDateInputChange = date => {
    const dt = DateTime.fromJSDate(date).set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });

    setInputValue(dt);
  };

  const handleFormSubmit = () => {
    if (!inputValue || !inputValue.isValid) {
      handleSnackbarOpen(`Oops! That's not valid date.`, 'warning');
      return;
    }

    if (
      fn.localToUTC(inputValue).toISO() === user[dateKey] &&
      JSON.stringify(inputReminders) === JSON.stringify(user[reminderKey])
    ) {
      handleSnackbarOpen(`Oops! You haven't changed anything yet.`, 'warning');
      return;
    }

    API.updateUser(user._id, {
      [dateKey]: fn.localToUTC(inputValue),
      [reminderKey]: inputReminders
    })
      .then(res => {
        const dt = DateTime.fromISO(res.data[dateKey]);
        const localeStr = dt.setZone('UTC').toLocaleString();

        handleSnackbarOpen(
          `${title}: ${localeStr} has been submitted.`,
          'success'
        );
        loadCurrentUser(res);
      })
      .catch(err => {
        // captures error message after last colon and space
        const [errMsg] = err.response.data.match(/(?! )[^:]+$/);
        handleSnackbarOpen(errMsg, 'error');
        initializeValues();
      });
  };

  return (
    <DateQuestionDialog
      Image={Image}
      cancel={initializeValues}
      dialogReminders={dialogReminders}
      firstName={user.firstName}
      handleDateInputChange={handleDateInputChange}
      handleFormSubmit={handleFormSubmit}
      label={label}
      link={nextQuestionLink}
      question={question}
      setParentReminders={setInputReminders}
      signedIn={signedIn}
      title={title}
      userField={inputValue}
    />
  );
};

export default DateQuestionPage;
