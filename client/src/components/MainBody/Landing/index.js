import React from 'react';
import Google from '../Signin/Google';
import Header from '../../Header';

const Landing = () => {
  return (
    <div className="bkgd-image">
      <div className="container">
        <div className="col-12 tobottom">
          <Header />
          <div className="home-saying">Did you forget your Anniversary?</div>
          <div className="row bottom-xs">
            <div className="col-xs-6">
              <div className="box shadow">
                <Google />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
