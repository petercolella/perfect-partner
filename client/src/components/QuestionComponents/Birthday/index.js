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
  const [birthdayReminders, setBirthdayReminders] = useState([]);
  const [dialogReminders, setDialogReminders] = useState([]);
  const [res, setRes] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [variant, setVariant] = useState(null);

  const loadBirthDate = useCallback(() => {
    if (id) {
      API.getUser(id).then(res => {
        if (res.data.birthDate) {
          setBirthDate(res.data.birthDate);
          setDialogReminders(res.data.birthdayReminders);
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

  const handleFormSubmit = () => {
    if (!birthDate) {
      handleSnackbarOpen('warning');
      return;
    }

    API.updateUser(user._id, {
      birthDate,
      birthdayReminders
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
    const dateToDateString = date.toDateString();
    setBirthDate(dateToDateString);
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
