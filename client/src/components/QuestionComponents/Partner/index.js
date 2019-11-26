import React, { useState, useCallback, useEffect } from 'react';
import QuestionDialog from '../QuestionDialog';
import API from '../../../utils/API';
import { ReactComponent as Love } from './love.svg';

const state = {
  label: "Partner's Name",
  nextQuestionLink: '/phone',
  placeholder: "Enter your partner's name.",
  question: "what is your partner's name?",
  title: 'Partner Name'
};

const Partner = props => {
  const id = sessionStorage.getItem('currentUserId');
  const { loadUserInfo, signedIn, user } = props;
  const [partnerName, setPartnerName] = useState('');

  const loadPartner = useCallback(() => {
    if (id) {
      API.getUser(id).then(res => {
        if (res.data.partnerName) {
          setPartnerName(res.data.partnerName);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    loadPartner();
  }, [loadPartner]);

  const handleFormSubmit = event => {
    event.preventDefault();
    API.updateUser(user._id, {
      partnerName
    }).then(loadUserInfo);
  };

  const handleInputChange = event => {
    const { value } = event.target;
    setPartnerName(value);
  };

  return (
    <QuestionDialog
      cancel={loadPartner}
      firstName={user.firstName}
      handleFormSubmit={handleFormSubmit}
      handleInputChange={handleInputChange}
      Image={Love}
      label={state.label}
      link={state.nextQuestionLink}
      loadUserInfo={loadUserInfo}
      placeholder={state.placeholder}
      question={state.question}
      signedIn={signedIn}
      title={state.title}
      userField={partnerName}
    />
  );
};

export default Partner;
