import React, { useState, useCallback, useEffect } from 'react';
import DateQuestionDialog from '../DateQuestionDialog';
import API from '../../../utils/API';
import { ReactComponent as Gift } from './gift.svg';

const state = {
  label: 'Anniversary',
  nextQuestionLink: '/nudges',
  question: 'what is your anniversary date?',
  title: 'Anniversary'
};

const Anniversary = props => {
  const id = sessionStorage.getItem('currentUserId');
  const { loadUserInfo, signedIn, user } = props;
  const [anniversaryDate, setAnniversaryDate] = useState(null);

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

  const handleFormSubmit = event => {
    event.preventDefault();
    API.updateUser(user._id, {
      anniversaryDate
    }).then(loadUserInfo);
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
      signedIn={signedIn}
      title={state.title}
      userField={anniversaryDate}
    />
  );
};

export default Anniversary;
