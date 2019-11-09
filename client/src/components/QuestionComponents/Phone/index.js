import React, { useState, useCallback, useEffect } from 'react';
import QuestionDialog from '../QuestionDialog';
import API from '../../../utils/API';
import { ReactComponent as Smartphone } from './smartphone.svg';

const state = {
  label: 'Phone',
  nextQuestionLink: '/partner',
  placeholder: 'Enter with no dashes or spaces.',
  question: 'what is your phone number?',
  title: 'Phone Number'
};

const Phone = props => {
  const { loadUserInfo, user } = props;
  const [phone, setPhone] = useState('');

  const loadPhone = useCallback(() => {
    const id = sessionStorage.getItem('currentUserId');
    if (id) {
      API.getUser(id).then(res => {
        if (res.data.phone) {
          setPhone(res.data.phone);
        }
      });
    }
  }, []);

  useEffect(() => {
    loadPhone();
  }, [loadPhone]);

  const handleFormSubmit = event => {
    event.preventDefault();
    const phoneRegEx = phone.replace(/\D/g, '');
    API.updateUser(user._id, {
      phone: phoneRegEx
    }).then(loadUserInfo);
  };

  const handleInputChange = event => {
    const { value } = event.target;
    setPhone(value);
  };

  return (
    <QuestionDialog
      firstName={user.firstName}
      handleFormSubmit={handleFormSubmit}
      handleInputChange={handleInputChange}
      image={Smartphone}
      label={state.label}
      link={state.nextQuestionLink}
      loadUserInfo={loadUserInfo}
      placeholder={state.placeholder}
      question={state.question}
      title={state.title}
      userField={phone}
    />
  );
};

export default Phone;
