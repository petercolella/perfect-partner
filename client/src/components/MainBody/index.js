import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import API from '../../utils/API';
import UserUpdate from '../UserUpdate';
import NudgeTable from '../NudgeTable';
import fn from '../../utils/fn';
const $ = window.$;

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const MainBody = props => {
  const [user, setUser] = useState({
    anniversaryDate: '',
    birthDate: '',
    email: '',
    firstName: '',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    lastName: '',
    name: '',
    nudges: [],
    partnerName: '',
    phone: ''
  });

  const [nudge, setNudge] = useState({
    name: '',
    nudgeFrequency: '',
    nudgeFrequencyUnit: '',
    textMessage: '',
    activated: false
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const { location, setPreviousPath } = props;

  useEffect(() => {
    setPreviousPath(location.pathname);
  }, [location, setPreviousPath]);

  const idRef = useRef();

  const loadUserInfo = useCallback(() => {
    const id = sessionStorage.getItem('currentUserId');
    idRef.current = id;
    if (idRef.current) {
      API.getUser(id).then(res => {
        setUser(user => (res.data ? res.data : user));
      });
    }
  }, []);

  useEffect(() => {
    loadUserInfo();
  }, [loadUserInfo]);

  const launchUpdateComp = nudge => {
    setNudge(nudge);
    showModal();
  };

  const showModal = () => {
    // $('#editNudgeModalCenter').modal('show');
    handleDialogOpen();
  };

  const closeUpdateComp = () => {
    hideModal();
  };

  const hideModal = () => {
    // $('#editNudgeModalCenter').modal('hide');
    handleDialogClose();
  };

  function handleDialogOpen() {
    setDialogOpen(true);
  }

  function handleDialogClose() {
    setDialogOpen(false);
  }

  const launchUserUpdateComp = () => {
    showUserModal();
  };

  const showUserModal = () => {
    $('#editUserModalCenter').modal('show');
  };

  const closeUserUpdateComp = () => {
    hideUserModal();
  };

  const hideUserModal = () => {
    $('#editUserModalCenter').modal('hide');
  };

  const handleInputChange = name => event => {
    setNudge({ ...nudge, [name]: event.target.value });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    $('#nudge-toast').toast('show');
    API.updateNudge(nudge._id, {
      ...nudge
    }).then(() => {
      loadUserInfo();
    });
  };

  const handleUserInputChange = event => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleUserFormSubmit = event => {
    event.preventDefault();
    $('#user-toast').toast('show');
    API.updateUser(user._id, {
      ...user
    }).then(() => {
      loadUserInfo();
    });
  };

  const classes = useStyles();

  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-4 col-sm-12">
          <img id="header-img" alt="logo" src="/img/logo_p.png" />
        </div>
        <div className="col-md-4 offset-md-4 col-sm-12 d-flex justify-content-end">
          <h3 className="my-auto mr-2" id="avatar-text-header">
            {user.name ? user.name : <span>Please sign in.</span>}
          </h3>
          <img
            className="my-auto"
            id="avatar-image-header"
            alt="User"
            src={user.imageUrl}
          />
        </div>
      </div>
      <div className="row">
        {user.name ? (
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                <span>Phone Number: </span>
                {user.phone ? fn.formatPhoneNumber(user.phone) : null}
              </Typography>
              <Typography variant="h5" component="h2">
                <span>Partner's Name: </span>
                {user.partnerName}
              </Typography>
              <Typography variant="h5" component="h2">
                <span>Partner's Birthday: </span>
                {user.birthDate}
              </Typography>
              <Typography variant="h5" component="h2">
                <span>Your Anniversary: </span>
                {user.anniversaryDate}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={launchUserUpdateComp}>Edit Your Profile</Button>
            </CardActions>
          </Card>
        ) : (
          <Card className={classes.card}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom>
                Please click{' '}
                <Link to="/" style={{ color: '#22b5e0' }}>
                  here
                </Link>{' '}
                to sign in before continuing.
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
      <div className="row">
        <div className="col-md-12">
          <NudgeTable
            user={user}
            nudge={nudge}
            loadUserInfo={loadUserInfo}
            launchUpdateComp={launchUpdateComp}
            closeUpdateComp={closeUpdateComp}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            dialogOpen={dialogOpen}
          />
        </div>
      </div>
      <UserUpdate
        closeUserUpdateComp={closeUserUpdateComp}
        handleUserInputChange={handleUserInputChange}
        handleUserFormSubmit={handleUserFormSubmit}
        user={user}
      />
    </div>
  );
};

export default MainBody;
