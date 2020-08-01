import React from 'react';
import { ReactComponent as Love } from './love.svg';

import QuestionPage from '../../components/QuestionComponents/QuestionPage';

const question = {
  key: 'partnerName',
  label: "Partner's Name",
  nextQuestionLink: '/phone',
  placeholder: "Enter your partner's name.",
  questionText: "what is your partner's name?",
  title: 'Partner Name'
};

const Partner = () => {
  return <QuestionPage Image={Love} question={question} />;
};

export default Partner;
