import React from 'react';
import { ReactComponent as Cake } from './cake.svg';

import DateQuestionPage from '../DateQuestionPage';

const data = {
  dateKey: 'birthDate',
  label: "Partner's Birthday",
  nextQuestionLink: '/nudges',
  question: "what is your partner's birthday?",
  reminderKey: 'birthdayReminders',
  title: 'Birthday'
};

const Birthday = props => {
  const { handleSnackbarOpen, loadUserInfo, signedIn, user } = props;

  return (
    <DateQuestionPage
      Image={Cake}
      handleSnackbarOpen={handleSnackbarOpen}
      loadUserInfo={loadUserInfo}
      data={data}
      signedIn={signedIn}
      user={user}
    />
  );
};

export default Birthday;
