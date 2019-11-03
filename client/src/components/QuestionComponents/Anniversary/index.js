import React, { useState, useCallback, useEffect } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import API from '../../../utils/API';
import DateQuestionDialog from '../DateQuestionDialog';
import { ReactComponent as Gift } from './gift.svg';

const state = {
  nextQuestionLink: '/nudges',
  question: 'what is your anniversary date?',
  title: 'Anniversary'
};

const Anniversary = props => {
  const { loadUserInfo, user } = props;
  const [anniversaryDate, setAnniversaryDate] = useState(null);

  const loadAnniversaryDate = useCallback(() => {
    const id = sessionStorage.getItem('currentUserId');
    if (id) {
      API.getUser(id).then(res => {
        setAnniversaryDate(res.data.anniversaryDate);
      });
    }
  }, []);

  useEffect(() => {
    loadAnniversaryDate();
  }, [loadAnniversaryDate]);

  const handleFormSubmit = event => {
    event.preventDefault();
    API.updateUser(user._id, {
      anniversaryDate
    }).then(loadUserInfo);
  };

  const handleDateInputChange = date => {
    setAnniversaryDate(date);
  };

  return (
    <>
      <Toolbar />
      <div className="bkgd-image">
        <DateQuestionDialog
          firstName={user.firstName}
          handleDateInputChange={handleDateInputChange}
          handleFormSubmit={handleFormSubmit}
          Image={Gift}
          label="Anniversary"
          link={state.nextQuestionLink}
          loadUserInfo={loadUserInfo}
          question={state.question}
          title={state.title}
          userField={anniversaryDate}
        />
      </div>
    </>
  );
};

export default Anniversary;
