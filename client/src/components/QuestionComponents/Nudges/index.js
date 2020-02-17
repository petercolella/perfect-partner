import React, { useState, useEffect } from 'react';
import NudgeDialog from '../NudgeDialog';
import { ReactComponent as Reminder } from './reminder.svg';

const state = {
  nextQuestionLink: '/partner',
  question: 'please select your nudges.',
  title: 'Nudges'
};

const Nudges = props => {
  const { loadUserInfo, signedIn, user } = props;
  const [nudges, setNudges] = useState([]);

  useEffect(() => {
    setNudges(user.nudges);
  }, [user]);

  return (
    <NudgeDialog
      Image={Reminder}
      link={state.nextQuestionLink}
      loadUserInfo={loadUserInfo}
      nudges={nudges}
      question={state.question}
      signedIn={signedIn}
      title={state.title}
      user={user}
    />
  );
};

export default Nudges;
