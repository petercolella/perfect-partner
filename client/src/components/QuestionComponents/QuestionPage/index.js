import React, { useState, useEffect } from 'react';

import QuestionDialog from '../QuestionDialog';
import SnackbarComponent from '../../SnackbarComponent';

import API from '../../../utils/API';

const QuestionPage = props => {
  const [message, setMessage] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [variant, setVariant] = useState(null);

  const { Image, loadUserInfo, question, signedIn, user } = props;
  const { key } = question;

  useEffect(() => {
    setInputValue(user[key]);
  }, [key, user]);

  const handleSnackbarOpen = (message, variant) => {
    setMessage(message);
    setVariant(variant);
    setSnackbarOpen(true);
  };

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
        loadUserInfo();
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
    <>
      <SnackbarComponent
        message={message}
        open={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        variant={variant}
      />
      <QuestionDialog
        cancel={loadUserInfo}
        firstName={user.firstName}
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        Image={Image}
        label={question.label}
        link={question.nextQuestionLink}
        placeholder={question.placeholder}
        question={question.question}
        signedIn={signedIn}
        title={question.title}
        userField={inputValue}
      />
    </>
  );
};

export default QuestionPage;
