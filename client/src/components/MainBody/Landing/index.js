import React from "react";
import logo from '../../../img/logo_p.png';
import Google from '../Signin/Google';
import Helmet from 'react-helmet';

const Landing = () => {

  return (

  <div className="container">
   <Helmet bodyAttributes={{style:'background-image: url("https://s3.amazonaws.com/bucket-tony-yellowstone/bedroom.jpg");'}}/>

    <div className="col-12 tobottom">
      <img className="d-block" alt="" src={logo}/>
        <div className="home-saying">Did you forget your Anniversary?</div>
        <div className="row bottom-xs">
            <div className="col-xs-6">
                <div className="box shadow">
                    <Google/>
                </div>
            </div>
        </div>
    </div>
  </div>
  );
};

export default Landing;

