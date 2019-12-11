import React, { useState, useCallback, useEffect } from 'react';
import DateQuestionDialog from '../DateQuestionDialog';
import API from '../../../utils/API';
import { ReactComponent as Gift } from './gift.svg';

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
  const [res, setRes] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [variant, setVariant] = useState(null);

  const loadAnniversaryDate = useCallback(() => {
    if (id) {
      API.getUser(id).then(res => {
        if (res.data.anniversaryDate) {
          setAnniversaryDate(res.data.anniversaryDate);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    loadAnniversaryDate();
  }, [loadAnniversaryDate]);

  const handleSnackbarOpen = variant => {
    setVariant(variant);
    setSnackbarOpen(true);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    if (!anniversaryDate) {
      handleSnackbarOpen('warning');
      return;
    }

    API.updateUser(user._id, {
      anniversaryDate
    })
      .then(res => {
        loadUserInfo();
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

  const handleDateInputChange = date => {
    setAnniversaryDate(date);
  };

  return (
    <DateQuestionDialog
      cancel={loadAnniversaryDate}
      firstName={user.firstName}
      handleDateInputChange={handleDateInputChange}
      handleFormSubmit={handleFormSubmit}
      Image={Gift}
      label={state.label}
      link={state.nextQuestionLink}
      loadUserInfo={loadUserInfo}
      question={state.question}
      res={res}
      signedIn={signedIn}
      snackbarOpen={snackbarOpen}
      setSnackbarOpen={setSnackbarOpen}
      title={state.title}
      userField={anniversaryDate}
      variant={variant}
    />
  );
};

export default Anniversary;
