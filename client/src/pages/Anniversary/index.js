import React from 'react';
import { ReactComponent as Gift } from './gift.svg';

import DateQuestionPage from '../../components/QuestionComponents/DateQuestionPage';

const data = {
  dateKey: 'anniversaryDate',
  label: 'Anniversary',
  nextQuestionLink: '/birthday',
  question: 'what is your anniversary date?',
  reminderKey: 'anniversaryReminders',
  title: 'Anniversary'
};

const Anniversary = () => {
  return <DateQuestionPage Image={Gift} data={data} />;
};

export default Anniversary;
