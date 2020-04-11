import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Fade from '@material-ui/core/Fade';
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
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

import ActivateNudgeSwitch from '../ActivateNudgeSwitch';
import TestTextButton from '../TestTextButton';
import NudgeAdd from '../NudgeAdd';
import NudgeDelete from '../NudgeDelete';
import NudgeUpdate from '../NudgeUpdate';
import fn from '../../utils/fn';

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

const StyledKeyboardArrowLeft = withStyles(theme => ({
  root: {
    marginLeft: '-0.5em'
  }
}))(KeyboardArrowLeft);

let timeoutOne;
let timeoutTwo;
let timeoutThree;

const fade = (fnOne, fnTwo, fnThree, inBool, msStep) => {
  timeoutOne = setTimeout(
    () => {
      fnOne(inBool);
      timeoutTwo = setTimeout(() => {
        fnTwo(inBool);
      }, msStep);
      timeoutThree = setTimeout(() => {
        fnThree(inBool);
      }, msStep * 2);
    },
    inBool ? 0 : msStep * 3
  );
};

const NudgeTable = props => {
  const matches = useMediaQuery('(max-width:770px)');
  const classes = useStyles();

  const {
    deleted,
    handleNewNudgeInputChange,
    handleNudgeAddFormSubmit,
    handleNudgeDelete,
    handleNudgeFormSubmit,
    handleNudgeInputChange,
    launchNudgeUpdateComp,
    newNudge,
    nudge,
    nudgeAddDialogOpen,
    nudgeDialogOpen,
    setNudgeAddDialogOpen,
    setNudgeDialogOpen,
    user
  } = props;

  const [arrowOneFade, setArrowOneFade] = useState(false);
  const [arrowTwoFade, setArrowTwoFade] = useState(false);
  const [arrowThreeFade, setArrowThreeFade] = useState(false);
  const [nudgeDeleteDialogOpen, setNudgeDeleteDialogOpen] = useState(false);
  const [nudgeToDelete, setNudgeToDelete] = useState({ name: '' });

  const handleNudgeDeleteClick = nudge => {
    setNudgeDeleteDialogOpen(true);
    setNudgeToDelete(nudge);
  };

  const handleNudgeDeleteConfirm = nudge => {
    handleNudgeDelete(nudge);
    setNudgeDeleteDialogOpen(false);
  };

  useEffect(() => {
    fade(setArrowThreeFade, setArrowTwoFade, setArrowOneFade, true, 200);
    fade(setArrowThreeFade, setArrowTwoFade, setArrowOneFade, false, 200);

    const fadeInAndOut = setInterval(() => {
      if (!matches) clearInterval(fadeInAndOut);
      fade(setArrowThreeFade, setArrowTwoFade, setArrowOneFade, true, 200);
      fade(setArrowThreeFade, setArrowTwoFade, setArrowOneFade, false, 200);
    }, 2000);

    return () => {
      clearInterval(fadeInAndOut);
      clearTimeout(timeoutOne);
      clearTimeout(timeoutTwo);
      clearTimeout(timeoutThree);
      setArrowOneFade(false);
      setArrowTwoFade(false);
      setArrowThreeFade(false);
    };
  }, [matches]);

  return (
    <>
      <Zoom
        in={!deleted}
        timeout={{ enter: 0, exit: 2000 }}
        style={{ transitionDelay: !deleted ? '0ms' : '500ms' }}>
        <Paper className={classes.root}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h5" align="left">
              Nudges
            </Typography>
            <Tooltip title="Add Nudge" color="primary">
              <StyledIconButton
                aria-label="add a nudge"
                onClick={() => setNudgeAddDialogOpen(true)}>
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
                        onClick={() => launchNudgeUpdateComp(nudge)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Delete Nudge" color="primary">
                      <IconButton
                        aria-label="delete nudge"
                        onClick={() => handleNudgeDeleteClick(nudge)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <TestTextButton {...props} nudge={nudge} />
                  </TableCell>
                  <TableCell align="center">
                    <ActivateNudgeSwitch {...props} nudge={nudge} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <NudgeAdd
            setNudgeAddDialogOpen={setNudgeAddDialogOpen}
            handleNewNudgeInputChange={handleNewNudgeInputChange}
            handleNudgeAddFormSubmit={handleNudgeAddFormSubmit}
            newNudge={newNudge}
            nudgeAddDialogOpen={nudgeAddDialogOpen}
            user={user}
          />
          <NudgeDelete
            handleNudgeDeleteConfirm={handleNudgeDeleteConfirm}
            nudge={nudgeToDelete}
            nudgeDeleteDialogOpen={nudgeDeleteDialogOpen}
            setNudgeDeleteDialogOpen={setNudgeDeleteDialogOpen}
          />
          <NudgeUpdate
            setNudgeDialogOpen={setNudgeDialogOpen}
            handleNudgeInputChange={handleNudgeInputChange}
            handleNudgeFormSubmit={handleNudgeFormSubmit}
            nudge={nudge}
            nudgeDialogOpen={nudgeDialogOpen}
          />
        </Paper>
      </Zoom>
      {matches && (
        <Typography align="right" className={classes.arrows} variant="h4">
          <Fade in={arrowOneFade} timeout={1000}>
            <StyledKeyboardArrowLeft fontSize="inherit" />
          </Fade>
          <Fade in={arrowTwoFade} timeout={1000}>
            <StyledKeyboardArrowLeft fontSize="inherit" />
          </Fade>
          <Fade in={arrowThreeFade} timeout={1000}>
            <StyledKeyboardArrowLeft fontSize="inherit" />
          </Fade>
        </Typography>
      )}
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
