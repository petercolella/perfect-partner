import React from 'react';
import { ReactComponent as Cake } from './cake.svg';

import DateQuestionPage from '../../components/QuestionComponents/DateQuestionPage';

const data = {
  dateKey: 'birthDate',
  label: "Partner's Birthday",
  nextQuestionLink: '/nudges',
  question: "what is your partner's birthday?",
  reminderKey: 'birthdayReminders',
  title: 'Birthday'
};

const Birthday = () => {
  return <DateQuestionPage Image={Cake} data={data} />;
};

export default Birthday;
