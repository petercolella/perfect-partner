import React from 'react';
import { ReactComponent as Love } from './love.svg';

import QuestionPage from '../QuestionPage';

const question = {
  key: 'partnerName',
  label: "Partner's Name",
  nextQuestionLink: '/phone',
  placeholder: "Enter your partner's name.",
  question: "what is your partner's name?",
  title: 'Partner Name'
};

const Partner = props => {
  const { handleSnackbarOpen, loadUserInfo, signedIn, user } = props;

  return (
    <QuestionPage
      Image={Love}
      handleSnackbarOpen={handleSnackbarOpen}
      loadUserInfo={loadUserInfo}
      question={question}
      signedIn={signedIn}
      user={user}
    />
  );
};

export default Partner;
