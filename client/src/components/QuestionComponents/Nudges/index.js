import React, { useState, useCallback, useEffect } from 'react';
import NudgeDialog from '../NudgeDialog';
import API from '../../../utils/API';
import { ReactComponent as Reminder } from './reminder.svg';

const state = {
  nextQuestionLink: '/dashboard',
  question: 'please select your nudges.',
  title: 'Nudges'
};

const Nudges = props => {
  const { loadUserInfo, user } = props;
  const [nudges, setNudges] = useState(null);

  const loadNudges = useCallback(() => {
    const id = sessionStorage.getItem('currentUserId');
    if (id) {
      API.getUser(id).then(res => {
        setNudges(res.data.nudges);
      });
    }
  }, []);

  useEffect(() => {
    loadNudges();
  }, [loadNudges]);

  return (
    <NudgeDialog
      image={Reminder}
      link={state.nextQuestionLink}
      loadUserInfo={loadUserInfo}
      nudges={nudges}
      question={state.question}
      title={state.title}
      user={user}
    />
  );
};

export default Nudges;
