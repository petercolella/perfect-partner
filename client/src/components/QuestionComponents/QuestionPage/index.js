import React, { useContext, useState, useEffect } from 'react';
import { Context as UserContext } from '../../../context/UserContext';
import { Context as SnackbarContext } from '../../../context/SnackbarContext';

import QuestionDialog from '../QuestionDialog';

import API from '../../../utils/API';

const QuestionPage = ({ Image, question }) => {
  const { handleSnackbarOpen } = useContext(SnackbarContext);
  const {
    state: { user },
    loadCurrentUser,
    reloadCurrentUser
  } = useContext(UserContext);
  const { key } = question;
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(user[key]);
  }, [key, user]);

  const handleFormSubmit = () => {
    let phoneRegEx;

    if (key === 'phone') {
      phoneRegEx = inputValue.replace(/\D/g, '');

      if (phoneRegEx.length !== 10) {
        handleSnackbarOpen('Phone number must be 10 digits.', 'warning');
        return;
      }
    }

    if (inputValue === user[key] || phoneRegEx === user[key]) {
      handleSnackbarOpen(`Oops! You haven't changed anything yet.`, 'warning');
      return;
    }

    API.updateUser(user._id, {
      [key]: key === 'phone' ? phoneRegEx : inputValue
    })
      .then(res => {
        handleSnackbarOpen(
          `${question.title}: ${res.data[key]} has been submitted.`,
          'success'
        );
        loadCurrentUser(res);
      })
      .catch(err => {
        // captures error message after last colon and space
        const [errMsg] = err.response.data.match(/(?! )[^:]+$/);
        handleSnackbarOpen(errMsg, 'error');
      });
  };

  const handleInputChange = event => {
    const { value } = event.target;
    setInputValue(value);
  };

  return (
    <QuestionDialog
      cancel={reloadCurrentUser}
      firstName={user.firstName}
      handleFormSubmit={handleFormSubmit}
      handleInputChange={handleInputChange}
      Image={Image}
      question={question}
      userField={inputValue}
    />
  );
};

export default QuestionPage;
