import React from 'react';
import Google from '../Signin/Google';
import Helmet from 'react-helmet';
import Nav from '../../Header/Nav/Nav';

const Landing = () => {
  return (
    <div className="container">
      <Helmet
        bodyAttributes={{
          style: 'background-image: url("./img/bedroom.jpg");'
        }}
      />

      <div className="col-12 tobottom">
        <Nav />
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
  );
};

export default Landing;
