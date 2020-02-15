import React from 'react';
import { ReactComponent as Smartphone } from './smartphone.svg';

import QuestionPage from '../QuestionPage';

const question = {
  key: 'phone',
  label: 'Phone',
  nextQuestionLink: '/dashboard',
  placeholder: 'Enter with no dashes or spaces.',
  question: 'what is your phone number?',
  title: 'Phone Number'
};

const Phone = props => {
  const { loadUserInfo, signedIn, user } = props;

  return (
    <QuestionPage
      Image={Smartphone}
      loadUserInfo={loadUserInfo}
      question={question}
      signedIn={signedIn}
      user={user}
    />
  );
};

export default Phone;
