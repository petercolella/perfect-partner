import React, { useContext, useState, useEffect } from 'react';
import { Context as UserContext } from '../../context/UserContext';
import NudgeDialog from '../../components/QuestionComponents/NudgeDialog';
import { ReactComponent as Reminder } from './reminder.svg';

const state = {
  nextQuestionLink: '/partner',
  question: 'please select your nudges.',
  title: 'Nudges'
};

const Nudges = () => {
  const {
    state: { user }
  } = useContext(UserContext);
  const [nudges, setNudges] = useState([]);

  useEffect(() => {
    setNudges(user.nudges);
  }, [user]);

  return (
    <NudgeDialog
      Image={Reminder}
      link={state.nextQuestionLink}
      nudges={nudges}
      question={state.question}
      title={state.title}
    />
  );
};

export default Nudges;
