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
      cancel={loadBirthDate}
      firstName={user.firstName}
      handleDateInputChange={handleDateInputChange}
      handleFormSubmit={handleFormSubmit}
      Image={Cake}
      label={state.label}
      link={state.nextQuestionLink}
      loadUserInfo={loadUserInfo}
      question={state.question}
      signedIn={signedIn}
      title={state.title}
      userField={birthDate}
    />
  );
};

export default Birthday;
