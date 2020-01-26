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

import EditIcon from '@material-ui/icons/Edit';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

import ActivateNudgeSwitch from '../ActivateNudgeSwitch';
import TestTextButton from '../TestTextButton';
import NudgeUpdate from '../NudgeUpdate';
import fn from '../../utils/fn';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 650,
    paddingLeft: theme.spacing(2)
  },
  toolbar: {
    paddingLeft: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  },
  arrows: {
    color: 'white'
  }
}));

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
  const matches = useMediaQuery('(max-width:818px)');
  const classes = useStyles();

  const [arrowOneFade, setArrowOneFade] = useState(false);
  const [arrowTwoFade, setArrowTwoFade] = useState(false);
  const [arrowThreeFade, setArrowThreeFade] = useState(false);

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
      <Paper className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" align="left">
            Your Nudges
          </Typography>
        </Toolbar>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Nudge Name</TableCell>
              <TableCell align="center">Text Body</TableCell>
              <TableCell align="center">Frequency</TableCell>
              <TableCell align="center">Customize</TableCell>
              <TableCell align="center">Test</TableCell>
              <TableCell align="center">Activate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.user.nudges.map(nudge => (
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
                      onClick={() => props.launchUpdateComp(nudge)}>
                      <EditIcon />
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
        <NudgeUpdate
          closeUpdateComp={props.closeUpdateComp}
          handleInputChange={props.handleInputChange}
          handleFormSubmit={props.handleFormSubmit}
          nudge={props.nudge}
          dialogOpen={props.dialogOpen}
        />
      </Paper>
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
