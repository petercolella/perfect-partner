import React, { useState, useEffect, useCallback } from 'react';
import API from '../../../utils/API';
import Header from '../../Header';
import DateQuestionDialog from '../DateQuestionDialog';
import { ReactComponent as Cake } from './cake.svg';

const Birthday = props => {
  const [state, setState] = useState({
    User: {},
    title: 'Birthday',
    question: "what is your partner's birthday?",
    userField: null,
    nextQuestionLink: '/anniversary'
  });

  const loadUserInfo = useCallback(() => {
    const id = sessionStorage.getItem('currentUserId');
    if (id) {
      API.getUser(id).then(res => {
        setState(state => ({
          ...state,
          User: res.data,
          userField: res.data.anniversaryDate
        }));
      });
    }
  }, []);

  useEffect(() => {
    loadUserInfo();

    return () => {
      const path = props.location.pathname;
      props.setPreviousPath(path);
    };
  }, [loadUserInfo, props]);

  const closeDateQuestionDialog = () => {
    loadUserInfo();
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    API.updateUser(state.User._id, {
      birthDate: state.userField
    }).then(loadUserInfo);
  };

  const handleUserDateInputChange = name => date => {
    console.log('date:', date);
    setState({
      ...state,
      [name]: date
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
          title={state.title}
          question={state.question}
          userField={state.userField}
          link={state.nextQuestionLink}
          closeDateQuestionDialog={closeDateQuestionDialog}
          handleFormSubmit={handleFormSubmit}
          handleUserDateInputChange={handleUserDateInputChange}
          image={Cake}
          label="Partner's Birthday"
        />
      </div>
    </>
  );
};

export default Birthday;
