import React from 'react';
import Google from '../MainBody/Signin/Google';
import Header from '../Header';

const Landing = props => {
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
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-md-6 col-sm-12">
              {/* <Header /> */}
              <p className="home-saying">Did you forget your Anniversary?</p>
            </div>
          </div>
          <div className="row bottom-xs">
            <div className="col-xs-6">
              <div className="box shadow">
                <Google getPreviousPath={props.getPreviousPath} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
