import React, { useState, useEffect, useCallback } from 'react';
import DateQuestionDialog from '../DateQuestionDialog';
import API from '../../../utils/API';
import { ReactComponent as Cake } from './cake.svg';

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
  const [res, setRes] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [variant, setVariant] = useState(null);

  const loadBirthDate = useCallback(() => {
    if (id) {
      API.getUser(id).then(res => {
        if (res.data.birthDate) {
          setBirthDate(res.data.birthDate);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    loadBirthDate();
  }, [loadBirthDate]);

  const handleSnackbarOpen = variant => {
    setVariant(variant);
    setSnackbarOpen(true);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    if (!birthDate) {
      handleSnackbarOpen('warning');
      return;
    }

    API.updateUser(user._id, {
      birthDate
    })
      .then(res => {
        loadUserInfo();
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

  const handleDateInputChange = date => {
    setBirthDate(date);
  };

  return (
    <DateQuestionDialog
      cancel={loadBirthDate}
      firstName={user.firstName}
      handleDateInputChange={handleDateInputChange}
      handleFormSubmit={handleFormSubmit}
      Image={Cake}
      label={state.label}
      link={state.nextQuestionLink}
      loadUserInfo={loadUserInfo}
      question={state.question}
      res={res}
      signedIn={signedIn}
      snackbarOpen={snackbarOpen}
      setSnackbarOpen={setSnackbarOpen}
      title={state.title}
      userField={birthDate}
      variant={variant}
    />
  );
};

export default Birthday;
