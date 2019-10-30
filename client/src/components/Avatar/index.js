import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  marginTop: 120,
  imgStyle: {
    height: 96,
    width: 'auto'
  }
};

const Avatar = props => {
  const { user } = props;

  return (
    <div>
      <div className="container">
        <div className="row mx-auto">
          <div className="avatar-center">
            {user.name ? (
              <img
                src={user.imageUrl}
                alt="profile-img"
                className="logo-avatar"
              />
            ) : (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                alt="profile-img"
                style={styles.imgStyle}
              />
            )}
            <p className="lead">
              {user.name ? `Welcome, ${user.name}` : 'Please Sign In.'}
            </p>
            <p className="clicktext">
              Please click{' '}
              <Link to="/phone">
                HERE
                <br />
              </Link>{' '}
              to answer a question.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
