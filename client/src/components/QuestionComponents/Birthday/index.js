import React, { useState, useEffect, useCallback } from 'react';
import DateQuestionDialog from '../DateQuestionDialog';
import API from '../../../utils/API';
import { ReactComponent as Cake } from './cake.svg';

const state = {
  label: "Partner's Birthday",
  nextQuestionLink: '/anniversary',
  question: "what is your partner's birthday?",
  title: 'Birthday'
};

const Birthday = props => {
  const { loadUserInfo, user } = props;
  const [birthDate, setBirthDate] = useState(null);

  const loadBirthDate = useCallback(() => {
    const id = sessionStorage.getItem('currentUserId');
    if (id) {
      API.getUser(id).then(res => {
        setBirthDate(res.data.birthDate);
      });
    }
  }, []);

  useEffect(() => {
    loadBirthDate();
  }, [loadBirthDate]);

  const handleFormSubmit = event => {
    event.preventDefault();
    API.updateUser(user._id, {
      birthDate
    }).then(loadUserInfo);
  };

  const handleDateInputChange = date => {
    setBirthDate(date);
  };

  return (
    <DateQuestionDialog
      firstName={user.firstName}
      handleDateInputChange={handleDateInputChange}
      handleFormSubmit={handleFormSubmit}
      Image={Cake}
      label={state.label}
      link={state.nextQuestionLink}
      loadUserInfo={loadUserInfo}
      question={state.question}
      title={state.title}
      userField={birthDate}
    />
  );
};

export default Birthday;
