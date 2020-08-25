import React, { useContext, useState } from 'react';
import { Context as SnackbarContext } from '../../context/SnackbarContext';
import { Context as UserContext } from '../../context/UserContext';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';

import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import ActivateNudgeSwitch from '../ActivateNudgeSwitch';
import HorizontalScrollArrows from '../HorizontalScrollArrows';
import NudgeAdd from '../NudgeAdd';
import NudgeDelete from '../NudgeDelete';
import NudgeUpdate from '../NudgeUpdate';
import TestTextButton from '../TestTextButton';

import API from '../../utils/API';
import fn from '../../utils/fn';

const newNudgeObj = {
  name: '',
  nudgeFrequency: 7,
  nudgeFrequencyUnit: '',
  textMessage: ''
};

const noNudge = {
  name: '',
  nudgeFrequency: '',
  nudgeFrequencyUnit: '',
  textMessage: '',
  activated: false
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 650,
    paddingLeft: theme.spacing(2)
  },
  toolbar: {
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  },
  arrows: {
    color: 'white'
  }
}));

const StyledIconButton = withStyles(theme => ({
  root: {
    marginBottom: '-0.5em',
    marginRight: '-16px',
    marginTop: '-8px'
  }
}))(IconButton);

const StyledTableCell = withStyles(theme => ({
  body: {
    minWidth: '12em'
  }
}))(TableCell);

const NudgeTable = ({ deleted }) => {
  const { handleSnackbarOpen } = useContext(SnackbarContext);
  const {
    state: { user },
    reloadCurrentUser
  } = useContext(UserContext);

  const [newNudge, setNewNudge] = useState(newNudgeObj);
  const [nudge, setNudge] = useState(noNudge);
  const [nudgeAddDialogOpen, setNudgeAddDialogOpen] = useState(false);
  const [nudgeDeleteDialogOpen, setNudgeDeleteDialogOpen] = useState(false);
  const [nudgeDialogOpen, setNudgeDialogOpen] = useState(false);
  const [nudgeToDelete, setNudgeToDelete] = useState({ name: '' });
  const [testNudge, setTestNudge] = useState(null);

  const handleNudgeDelete = nudge => {
    API.deleteNudge(nudge._id)
      .then(res => {
        reloadCurrentUser();
        handleSnackbarOpen(`The ${nudge.name} nudge has been deleted.`, 'info');
      })
      .catch(err => {
        const [errMsg] = err.response.data.match(/(?! )[^:]+$/);
        handleSnackbarOpen(errMsg, 'error');
      });
  };

  const handleNudgeDeleteClick = nudge => {
    setNudgeDeleteDialogOpen(true);
    setNudgeToDelete(nudge);
  };

  const handleNudgeDeleteConfirm = nudge => {
    handleNudgeDelete(nudge);
    setNudgeDeleteDialogOpen(false);
  };

  const handleNewNudgeInputChange = name => event => {
    setNewNudge({ ...newNudge, [name]: event.target.value });
  };

  const handleNudgeInputChange = name => event => {
    setNudge({ ...nudge, [name]: event.target.value });
  };

  const handleNudgeAddFormSubmit = () => {
    const body = {
      userId: user._id,
      nudge: newNudge
    };

    API.saveNudge(body)
      .then(res => {
        reloadCurrentUser();
        setNudgeAddDialogOpen(false);
        handleSnackbarOpen(
          `${res.data.name} has been successfully added.`,
          'success'
        );
        setNewNudge(newNudgeObj);
      })
      .catch(err => {
        // captures error message after last colon and space
        const [errMsg] = err.response.data.match(/(?! )[^:]+$/);
        handleSnackbarOpen(errMsg, 'error');
        return;
      });
  };

  const handleNudgeFormSubmit = () => {
    const testArray = Object.keys(testNudge).filter(
      key => testNudge[key] !== nudge[key]
    );

    if (!testArray.length) {
      handleSnackbarOpen(`Oops! You haven't changed anything yet.`, 'warning');
      return;
    }

    API.updateNudge(nudge._id, {
      ...nudge
    })
      .then(res => {
        reloadCurrentUser();
        handleSnackbarOpen(
          `${res.data.name} has been successfully updated.`,
          'success'
        );
        setNudgeDialogOpen(false);
      })
      .catch(err => {
        // captures error message after last colon and space
        const [errMsg] = err.response.data.match(/(?! )[^:]+$/);
        handleSnackbarOpen(errMsg, 'error');
        return;
      });
  };

  const launchNudgeUpdateComp = nudge => {
    setNudge(nudge);
    setTestNudge(nudge);
    setNudgeDialogOpen(true);
  };

  const classes = useStyles();

  return (
    <>
      <Zoom
        in={!deleted}
        timeout={{ enter: 0, exit: 2000 }}
        style={{ transitionDelay: !deleted ? '0ms' : '500ms' }}
      >
        <Paper className={classes.root}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h5" align="left">
              Nudges
            </Typography>
            <Tooltip title="Add Nudge" color="primary">
              <StyledIconButton
                aria-label="add a nudge"
                onClick={() => setNudgeAddDialogOpen(true)}
              >
                <AddBoxIcon color="primary" />
              </StyledIconButton>
            </Tooltip>
          </Toolbar>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Nudge Name</TableCell>
                <TableCell align="center">Text Body</TableCell>
                <TableCell align="center">Frequency</TableCell>
                <TableCell align="center">Customize</TableCell>
                <TableCell align="center">Delete</TableCell>
                <TableCell align="center">Test</TableCell>
                <TableCell align="center">Activate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.nudges.map(nudge => (
                <TableRow key={nudge._id}>
                  <TableCell component="th" scope="row">
                    {nudge.name}
                  </TableCell>
                  <StyledTableCell align="center">
                    {nudge.textMessage}
                  </StyledTableCell>
                  <TableCell align="center">
                    Once Every {nudge.nudgeFrequency}{' '}
                    {fn.capitalizeFirstLetter(nudge.nudgeFrequencyUnit)}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit Nudge" color="primary">
                      <IconButton
                        aria-label="edit nudge"
                        onClick={() => launchNudgeUpdateComp(nudge)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Delete Nudge" color="primary">
                      <IconButton
                        aria-label="delete nudge"
                        onClick={() => handleNudgeDeleteClick(nudge)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <TestTextButton nudge={nudge} user={user} />
                  </TableCell>
                  <TableCell align="center">
                    <ActivateNudgeSwitch
                      nudge={nudge}
                      reloadCurrentUser={reloadCurrentUser}
                      user={user}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <NudgeAdd
            handleNewNudgeInputChange={handleNewNudgeInputChange}
            handleNudgeAddFormSubmit={handleNudgeAddFormSubmit}
            newNudge={newNudge}
            nudgeAddDialogOpen={nudgeAddDialogOpen}
            setNudgeAddDialogOpen={setNudgeAddDialogOpen}
            user={user}
          />
          <NudgeDelete
            handleNudgeDeleteConfirm={handleNudgeDeleteConfirm}
            nudge={nudgeToDelete}
            nudgeDeleteDialogOpen={nudgeDeleteDialogOpen}
            setNudgeDeleteDialogOpen={setNudgeDeleteDialogOpen}
          />
          <NudgeUpdate
            handleNudgeFormSubmit={handleNudgeFormSubmit}
            handleNudgeInputChange={handleNudgeInputChange}
            nudge={nudge}
            nudgeDialogOpen={nudgeDialogOpen}
            setNudgeDialogOpen={setNudgeDialogOpen}
          />
        </Paper>
      </Zoom>
      <HorizontalScrollArrows />
      {/* <div>
        Icons made by{' '}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>{' '}
        is licensed by{' '}
        <a
          href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0"
          target="_blank">
          CC 3.0 BY
        </a>
      </div> */}
    </>
  );
};

export default NudgeTable;
