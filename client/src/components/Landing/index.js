import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '../Avatar';

const Landing = props => {
  const { user } = props;

  return (
    <>
      <div className="bkgd-image">
        <Toolbar />
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-md-6 col-sm-12">
              <p className="home-saying">Planned Spontaneity</p>
            </div>
          </div>
          <div className="row bottom-xs">
            <div className="col-xs-6">
              <div className="box shadow">
                <Avatar user={user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
