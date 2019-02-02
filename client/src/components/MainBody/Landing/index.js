import React from "react";
import logo from '../../../img/pp_logo.png';
import Google from '../Signin/Google'

const Landing = () => {

  return (
  <div className="row justify-content-center">
    <div className="col-12">
      <img className="mx-auto d-block" alt="" src={logo}/>
      <div className="shadow card card-body mb-2"><Google/>
      </div>
    </div>
  </div>
  );
};

export default Landing;
