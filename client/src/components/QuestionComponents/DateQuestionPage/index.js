import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import DateQuestionDialog from '../DateQuestionDialog';

import API from '../../../utils/API';
import fn from '../../../utils/fn';

const DateQuestionPage = props => {
  const [inputValue, setInputValue] = useState(null);
  const [inputReminders, setInputReminders] = useState([]);
  const [dialogReminders, setDialogReminders] = useState([]);

  const {
    Image,
    handleSnackbarOpen,
    loadUserInfo,
    question,
    signedIn,
    user
  } = props;
  const { dateKey, reminderKey } = question;

  //   const loadDate = useCallback(() => {
  //     if (id) {
  //       API.getUser(id).then(res => {
  //         if (res.data.anniversaryDate) {
  //           const dt = DateTime.fromISO(res.data.anniversaryDate);
  //           setAnniversaryDate(fn.UTCToLocal(dt));
  //         }
  //         if (res.data.inputReminders) {
  //           setDialogReminders(res.data.inputReminders);
  //         }
  //       });
  //     }
  //   }, [id]);

  useEffect(() => {
    if (user[dateKey]) {
      const dt = DateTime.fromISO(user[dateKey]);
      setInputValue(fn.UTCToLocal(dt));
    }
    if (user[reminderKey]) {
      setDialogReminders(user[reminderKey]);
    }
  }, [dateKey, reminderKey, user]);

  const handleDateInputChange = date => {
    const dt = DateTime.fromJSDate(date).set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    setInputValue(dt);
  };

  //   const handleSnackbarOpen = variant => {
  //     setVariant(variant);
  //     setSnackbarOpen(true);
  //   };

  const handleFormSubmit = () => {
    if (!inputValue) {
      handleSnackbarOpen('warning');
      return;
    }

    API.updateUser(user._id, {
      [dateKey]: fn.localToUTC(inputValue),
      inputReminders
    })
      .then(res => {
        const dt = DateTime.fromISO(res.data[dateKey]);
        const localeStr = dt.setZone('UTC').toLocaleString();

        handleSnackbarOpen(localeStr, 'success');
        loadUserInfo();
      })
      .catch(err => {
        // captures error message after last colon and space
        const [errMsg] = err.response.data.match(/(?! )[^:]+$/);
        handleSnackbarOpen(errMsg, 'error');
      });
  };

  return (
    <DateQuestionDialog
      Image={Image}
      cancel={loadUserInfo}
      dialogReminders={dialogReminders}
      firstName={user.firstName}
      handleDateInputChange={handleDateInputChange}
      handleFormSubmit={handleFormSubmit}
      label={question.label}
      link={question.nextQuestionLink}
      question={question.question}
      setParentReminders={setInputReminders}
      signedIn={signedIn}
      title={question.title}
      userField={inputValue}
    />
  );
};

export default DateQuestionPage;
