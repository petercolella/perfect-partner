import React, { useState, useCallback, useEffect } from 'react';
import QuestionDialog from '../QuestionDialog';
import SnackbarComponent from '../../SnackbarComponent';
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
  const [message, setMessage] = useState(null);
  const [partnerName, setPartnerName] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [variant, setVariant] = useState(null);

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

  const handleSnackbarOpen = (message, variant) => {
    setMessage(message);
    setVariant(variant);
    setSnackbarOpen(true);
  };

  const handleFormSubmit = () => {
    if (!partnerName) {
      handleSnackbarOpen(`Oops! You haven't changed anything yet.`, 'warning');
      return;
    }

    API.updateUser(user._id, {
      partnerName
    })
      .then(res => {
        handleSnackbarOpen(
          `${state.title}: ${res.data.partnerName} has been submitted.`,
          'success'
        );
        loadUserInfo();
      })
      .catch(err => {
        // captures error message after last colon and space
        const [errMsg] = err.response.data.match(/(?! )[^:]+$/);
        handleSnackbarOpen(errMsg, 'error');
      });
  };

  const handleInputChange = event => {
    const { value } = event.target;
    setPartnerName(value);
  };

  return (
    <>
      <SnackbarComponent
        message={message}
        open={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        variant={variant}
      />
      <QuestionDialog
        cancel={loadPartner}
        firstName={user.firstName}
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        Image={Love}
        label={state.label}
        link={state.nextQuestionLink}
        placeholder={state.placeholder}
        question={state.question}
        signedIn={signedIn}
        title={state.title}
        userField={partnerName}
      />
    </>
  );
};

export default Partner;
