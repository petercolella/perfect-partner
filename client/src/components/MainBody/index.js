import React, { useState, useEffect } from 'react';
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
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const MainBody = props => {
  const [state, setState] = useState({
    User: {
      name: '',
      firstName: '',
      lastName: '',
      phone: '',
      partnerName: '',
      email: '',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
      anniversaryDate: '',
      birthDate: ''
    },
    nudges: [],
    nudge: {
      name: '',
      nudgeFrequency: '',
      nudgeFrequencyUnit: '',
      textMessage: '',
      activated: false
    },
    nudgeFrequencyUnit: ''
  });

  console.log('props', props);
  console.log('state', state);

  //   componentDidMount() {
  //     const path = this.props.location.pathname;
  //     this.props.setPreviousPath(path);
  //     this.loadUserInfo();
  //   }

  useEffect(() => {
    const path = props.location.pathname;
    props.setPreviousPath(path);
    loadUserInfo();
  }, []);

  const loadUserInfo = () => {
    const id = sessionStorage.getItem('currentUserId');
    console.log('id', id);
    API.getUser(id).then(res => {
      console.log('res.data', res.data);
      setState(
        res.data
          ? {
              User: res.data,
              nudges: res.data.nudges,
              nudge: state.nudge,
              nudgeFrequencyUnit: state.nudgeFrequencyUnit
            }
          : { state: state }
      );
    });
  };

  const launchUpdateComp = nudge => {
    setState({ nudge });
    showModal();
  };

  const showModal = () => {
    $('#editNudgeModalCenter').modal('show');
  };

  const closeUpdateComp = () => {
    hideModal();
  };

  const hideModal = () => {
    $('#editNudgeModalCenter').modal('hide');
  };

  const launchUserUpdateComp = User => {
    setState({ User });
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

  const handleInputChange = event => {
    const { name, value } = event.target;
    setState({
      nudge: {
        ...state.nudge,
        [name]: value
      }
    });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    $('#nudge-toast').toast('show');
    API.updateNudge(state.nudge._id, {
      ...state.nudge
    }).then(() => {
      loadUserInfo();
    });
  };

  const handleUserInputChange = event => {
    const { name, value } = event.target;
    setState({
      User: {
        ...state.User,
        [name]: value
      }
    });
  };

  const handleUserFormSubmit = event => {
    event.preventDefault();
    $('#user-toast').toast('show');
    API.updateUser(state.User._id, {
      ...state.User
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
            {state.User.name ? state.User.name : <span>Please sign in.</span>}
          </h3>
          <img
            className="my-auto"
            id="avatar-image-header"
            alt="User"
            src={state.User.imageUrl}
          />
        </div>
      </div>
      <div className="row">
        {state.User.name ? (
          <Card className={classes.card}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom>
                <span>Phone Number: </span>
                {state.User.phone
                  ? fn.formatPhoneNumber(state.User.phone)
                  : null}
              </Typography>
              <Typography variant="h5" component="h2">
                <span>Partner's Name: </span>
                {state.User.partnerName}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                <span>Partner's Birthday: </span>
                {state.User.birthDate}
              </Typography>
              <Typography variant="body2" component="p">
                <span>Your Anniversary: </span>
                {state.User.anniversaryDate}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => launchUserUpdateComp(state.User)}>
                Edit Your Profile
              </Button>
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
        <div className="col-md-12 dashboard-rght">
          <div className="row" style={{ padding: '1em' }}>
            <div
              className="col-md-6 col-sm-12 d-flex align-items-center justify-content-center p-1"
              style={{ border: 'white solid 0.25rem' }}>
              {state.User.name ? (
                <div>
                  <p>
                    <span>Phone Number: </span>
                    {state.User.phone
                      ? fn.formatPhoneNumber(state.User.phone)
                      : null}
                  </p>
                  <p>
                    <span>Partner's Name: </span>
                    {state.User.partnerName}
                  </p>
                  <p>
                    <span>Partner's Birthday: </span>
                    {state.User.birthDate}
                  </p>
                  <p>
                    <span>Your Anniversary: </span>
                    {state.User.anniversaryDate}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => launchUserUpdateComp(state.User)}>
                    Edit Your Profile
                  </button>
                </div>
              ) : (
                <p>
                  Please click{' '}
                  <Link to="/" style={{ color: '#22b5e0' }}>
                    here
                  </Link>{' '}
                  to sign in before continuing.
                </p>
              )}
            </div>
            <div className="col-md-6 col-sm-12 p-1">
              {/* <span className="helper" />
                <img alt="love-hearts" src="./img/love-hearts.jpg" /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <NudgeTable
            user={state.User}
            nudges={state.nudges}
            nudge={state.nudge}
            loadUserInfo={loadUserInfo}
            launchUpdateComp={launchUpdateComp}
            closeUpdateComp={closeUpdateComp}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
          />
        </div>
      </div>
      <UserUpdate
        closeUserUpdateComp={closeUserUpdateComp}
        handleUserInputChange={handleUserInputChange}
        handleUserFormSubmit={handleUserFormSubmit}
        user={state.User}
      />
    </div>
  );
};

export default MainBody;