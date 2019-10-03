import React, { useState, useEffect, useCallback, useRef } from 'react';
import API from '../../../utils/API';
import Header from '../../Header';
import DateQuestionDialog from '../DateQuestionDialog';
import { ReactComponent as Gift } from './gift.svg';

const Anniversary = props => {
  const [state, setState] = useState({
    nextQuestionLink: '/nudges',
    question: 'what is your anniversary date?',
    title: 'Anniversary',
    User: {},
    userField: null
  });

  const loadUserInfo = useCallback(() => {
    const id = sessionStorage.getItem('currentUserId');
    if (id) {
      API.getUser(id).then(res => {
        setState(state => ({
          ...state,
          User: res.data,
          userField: res.data.anniversaryDate || null
        }));
      });
    }
  }, []);

  const propsRef = useRef();
  propsRef.current = props;

  useEffect(() => {
    loadUserInfo();

    return () => {
      const path = propsRef.current.location.pathname;
      propsRef.current.setPreviousPath(path);
    };
  }, [loadUserInfo]);

  const handleFormSubmit = event => {
    event.preventDefault();
    API.updateUser(state.User._id, {
      anniversaryDate: state.userField
    }).then(loadUserInfo);
  };

  const handleDateInputChange = date => {
    setState({
      ...state,
      userField: date
    });
  };

  return (
    <>
      <Header />
      <div className="bkgd-image">
        <div className="container invisible">
          <div className="row mb-3">
            <div className="col-md-4 col-sm-12">
              <img id="header-img" alt="logo" src="/img/logo_p.png" />
            </div>
          </div>
        </div>
        <DateQuestionDialog
          firstName={state.User.firstName}
          handleDateInputChange={handleDateInputChange}
          handleFormSubmit={handleFormSubmit}
          image={Gift}
          label="Anniversary"
          link={state.nextQuestionLink}
          loadUserInfo={loadUserInfo}
          question={state.question}
          title={state.title}
          userField={state.userField}
        />
      </div>
    </>
  );
};

export default Anniversary;
