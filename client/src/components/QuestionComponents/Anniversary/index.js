import React, { useState, useCallback, useEffect } from 'react';
import { DateTime } from 'luxon';

import { ReactComponent as Gift } from './gift.svg';
import DateQuestionDialog from '../DateQuestionDialog';

import API from '../../../utils/API';
import fn from '../../../utils/fn';

const state = {
  label: 'Anniversary',
  nextQuestionLink: '/birthday',
  question: 'what is your anniversary date?',
  title: 'Anniversary'
};

const Anniversary = props => {
  const id = sessionStorage.getItem('currentUserId');
  const { loadUserInfo, signedIn, user } = props;
  const [anniversaryDate, setAnniversaryDate] = useState(null);
  const [anniversaryReminders, setAnniversaryReminders] = useState([]);
  const [dialogReminders, setDialogReminders] = useState([]);
  const [res, setRes] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [variant, setVariant] = useState(null);

  const loadAnniversaryDate = useCallback(() => {
    if (id) {
      API.getUser(id).then(res => {
        if (res.data.anniversaryDate) {
          const dt = DateTime.fromISO(res.data.anniversaryDate);
          setAnniversaryDate(fn.UTCToLocal(dt));
        }
        if (res.data.anniversaryReminders) {
          setDialogReminders(res.data.anniversaryReminders);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    loadAnniversaryDate();
  }, [loadAnniversaryDate]);

  const handleDateInputChange = date => {
    const dt = DateTime.fromJSDate(date).set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    console.log('handleDateInputChange:', dt, dt.toISO());
    setAnniversaryDate(dt);
  };

  const handleSnackbarOpen = variant => {
    setVariant(variant);
    setSnackbarOpen(true);
  };

  const handleFormSubmit = () => {
    if (!anniversaryDate) {
      handleSnackbarOpen('warning');
      return;
    }

    API.updateUser(user._id, {
      anniversaryDate: fn.localToUTC(anniversaryDate),
      anniversaryReminders
    })
      .then(res => {
        loadAnniversaryDate();
        setRes(res.data.anniversaryDate);
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
      Image={Gift}
      cancel={loadAnniversaryDate}
      dialogReminders={dialogReminders}
      firstName={user.firstName}
      handleDateInputChange={handleDateInputChange}
      handleFormSubmit={handleFormSubmit}
      label={state.label}
      link={state.nextQuestionLink}
      loadUserInfo={loadUserInfo}
      question={state.question}
      res={res}
      setParentReminders={setAnniversaryReminders}
      setSnackbarOpen={setSnackbarOpen}
      signedIn={signedIn}
      snackbarOpen={snackbarOpen}
      title={state.title}
      userField={anniversaryDate}
      variant={variant}
    />
  );
};

export default Anniversary;
