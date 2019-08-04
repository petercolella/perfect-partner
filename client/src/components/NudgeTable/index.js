import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ActivateNudgeButton from '../ActivateNudgeButton';
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
    minWidth: 650
  }
}));

const NudgeTable = props => {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Nudge Name</TableCell>
              <TableCell align="right">Text Body</TableCell>
              <TableCell align="right">Frequency</TableCell>
              <TableCell align="right">Customize</TableCell>
              <TableCell align="right">Test</TableCell>
              <TableCell align="right">Activate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.nudges.map(nudge => (
              <TableRow key={nudge._id}>
                <TableCell component="th" scope="row">
                  {nudge.name}
                </TableCell>
                <TableCell align="right">{nudge.textMessage}</TableCell>
                <TableCell align="right">
                  Once Every {nudge.nudgeFrequency}{' '}
                  {fn.capitalizeFirstLetter(nudge.nudgeFrequencyUnit)}
                </TableCell>
                <TableCell align="right">
                  <button
                    className="btn btn-primary"
                    onClick={() => props.launchUpdateComp(nudge)}>
                    Edit Nudge
                  </button>
                </TableCell>
                <TableCell align="right">
                  <TestTextButton {...props} nudge={nudge} />
                </TableCell>
                <TableCell align="right">
                  <ActivateNudgeButton {...props} nudge={nudge} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <div aria-live="polite" aria-atomic="true">
        <div
          className="toast "
          id="phone-toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-delay="2000"
          style={{
            float: 'right',
            backgroundColor: '#0bb3e2',
            color: 'white'
          }}>
          <div className="toast-body">
            {props.user.phone
              ? `Text Sent to ${fn.formatPhoneNumber(props.user.phone)}.`
              : `Please log in to send a text.`}
          </div>
        </div>
      </div>
      <NudgeUpdate
        closeUpdateComp={props.closeUpdateComp}
        handleInputChange={props.handleInputChange}
        handleFormSubmit={props.handleFormSubmit}
        nudge={props.nudge}
      />
    </div>
  );
};

export default NudgeTable;
