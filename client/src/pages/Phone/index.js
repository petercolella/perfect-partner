import React from 'react';
import { ReactComponent as Smartphone } from './smartphone.svg';

import QuestionPage from '../../components/QuestionComponents/QuestionPage';

const question = {
  key: 'phone',
  label: 'Phone',
  nextQuestionLink: '/dashboard',
  placeholder: 'Enter with no dashes or spaces.',
  questionText: 'what is your phone number?',
  title: 'Phone Number'
};

const Phone = () => {
  return <QuestionPage Image={Smartphone} question={question} />;
};

export default Phone;
