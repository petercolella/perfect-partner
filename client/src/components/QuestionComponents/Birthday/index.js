import React, { useState, useEffect, useCallback } from 'react';
import { DateTime } from 'luxon';

import { ReactComponent as Cake } from './cake.svg';
import DateQuestionDialog from '../DateQuestionDialog';

import API from '../../../utils/API';
import fn from '../../../utils/fn';

const state = {
  label: "Partner's Birthday",
  nextQuestionLink: '/nudges',
  question: "what is your partner's birthday?",
  title: 'Birthday'
};

const Birthday = props => {
  const id = sessionStorage.getItem('currentUserId');
  const { loadUserInfo, signedIn, user } = props;
  const [birthDate, setBirthDate] = useState(null);
  const [birthdayReminders, setBirthdayReminders] = useState([]);
  const [dialogReminders, setDialogReminders] = useState([]);
  const [res, setRes] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [variant, setVariant] = useState(null);

  const loadBirthDate = useCallback(() => {
    if (id) {
      API.getUser(id).then(res => {
        if (res.data.birthDate) {
          const dt = DateTime.fromISO(res.data.birthDate);
          setBirthDate(fn.UTCToLocal(dt));
        }
        if (res.data.birthdayReminders) {
          setDialogReminders(res.data.birthdayReminders);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    loadBirthDate();
  }, [loadBirthDate]);

  const handleDateInputChange = date => {
    const dt = DateTime.fromJSDate(date).set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    console.log('handleDateInputChange:', dt, dt.toISO());
    setBirthDate(dt);
  };

  const handleSnackbarOpen = variant => {
    setVariant(variant);
    setSnackbarOpen(true);
  };

  const handleFormSubmit = () => {
    if (!birthDate) {
      handleSnackbarOpen('warning');
      return;
    }

    API.updateUser(user._id, {
      birthDate: fn.localToUTC(birthDate),
      birthdayReminders
    })
      .then(res => {
        loadBirthDate();
        setRes(res.data.birthDate);
        handleSnackbarOpen('success');
      })
      .catch(err => {
        // captures error message after last colon and space
        const [errMsg] = err.response.data.match(/(?! )[^:]+$/);
        setRes(errMsg);
        handleSnackbarOpen('error');
      });
  };

  return (
    <DateQuestionDialog
      Image={Cake}
      cancel={loadBirthDate}
      dialogReminders={dialogReminders}
      firstName={user.firstName}
      handleDateInputChange={handleDateInputChange}
      handleFormSubmit={handleFormSubmit}
      label={state.label}
      link={state.nextQuestionLink}
      loadUserInfo={loadUserInfo}
      question={state.question}
      res={res}
      setParentReminders={setBirthdayReminders}
      setSnackbarOpen={setSnackbarOpen}
      signedIn={signedIn}
      snackbarOpen={snackbarOpen}
      title={state.title}
      userField={birthDate}
      variant={variant}
    />
  );
};

export default Birthday;
