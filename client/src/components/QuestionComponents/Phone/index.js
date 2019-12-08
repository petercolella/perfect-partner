import React, { useState, useCallback, useEffect } from 'react';
import QuestionDialog from '../QuestionDialog';
import API from '../../../utils/API';
import { ReactComponent as Smartphone } from './smartphone.svg';

const state = {
  label: 'Phone',
  nextQuestionLink: '/dashboard',
  placeholder: 'Enter with no dashes or spaces.',
  question: 'what is your phone number?',
  title: 'Phone Number'
};

const Phone = props => {
  const id = sessionStorage.getItem('currentUserId');
  const { loadUserInfo, signedIn, user } = props;
  const [phone, setPhone] = useState('');
  const [res, setRes] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [variant, setVariant] = useState(null);

  const loadPhone = useCallback(() => {
    if (id) {
      API.getUser(id).then(res => {
        if (res.data.phone) {
          setPhone(res.data.phone);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    loadPhone();
  }, [loadPhone]);

  const handleFormSubmit = event => {
    event.preventDefault();
    const phoneRegEx = phone.replace(/\D/g, '');

    if (phoneRegEx.length !== 10) {
      setVariant('warning');
      setSnackbarOpen(true);
      return;
    }

    API.updateUser(user._id, {
      phone: phoneRegEx
    })
      .then(res => {
        loadUserInfo();
        setRes(res.data.phone);
        setVariant('success');
        setSnackbarOpen(true);
      })
      .catch(err => {
        // captures error message after last colon and space
        const [errMsg] = err.response.data.match(/(?! )[^:]+$/);
        setRes(errMsg);
        setVariant('error');
        setSnackbarOpen(true);
      });
  };

  const handleInputChange = event => {
    const { value } = event.target;
    setPhone(value);
  };

  return (
    <QuestionDialog
      cancel={loadPhone}
      firstName={user.firstName}
      handleFormSubmit={handleFormSubmit}
      handleInputChange={handleInputChange}
      Image={Smartphone}
      label={state.label}
      link={state.nextQuestionLink}
      loadUserInfo={loadUserInfo}
      placeholder={state.placeholder}
      question={state.question}
      res={res}
      signedIn={signedIn}
      snackbarOpen={snackbarOpen}
      setSnackbarOpen={setSnackbarOpen}
      title={state.title}
      userField={phone}
      variant={variant}
    />
  );
};

export default Phone;
