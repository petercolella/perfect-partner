import React from 'react';
import { ReactComponent as Gift } from './gift.svg';

import DateQuestionPage from '../DateQuestionPage';

const question = {
  dateKey: 'anniversaryDate',
  label: 'Anniversary',
  nextQuestionLink: '/birthday',
  question: 'what is your anniversary date?',
  reminderKey: 'anniversaryReminders',
  title: 'Anniversary'
};

const Anniversary = props => {
  const { handleSnackbarOpen, loadUserInfo, signedIn, user } = props;

  return (
    <DateQuestionPage
      Image={Gift}
      handleSnackbarOpen={handleSnackbarOpen}
      loadUserInfo={loadUserInfo}
      question={question}
      signedIn={signedIn}
      user={user}
    />
  );
};

export default Anniversary;
