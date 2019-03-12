import React from 'react';
import TestTextButton from '../../TestTextButton';
import NudgeUpdate from '../NudgeUpdate';

const Dashboard = props => {
  //   let nudgeFrequencyUnit = 'Days';

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nudges</th>
            <th>Frequency</th>
            <th>Frequency Unit</th>
            <th>Test Button</th>
          </tr>
        </thead>
        <tbody>
          {props.nudges.map(nudge => {
            return (
              <tr key={nudge.name}>
                <td>{nudge.name}</td>
                <td>{nudge.nudgeFrequency}</td>
                <td>
                  <select className="custom-select" id="nudgeFrequencyUnit">
                    <option value="seconds">seconds</option>
                    <option value="minutes">minutes</option>
                    <option value="hours">hours</option>
                    <option value="days">days</option>
                    <option value="weeks">weeks</option>
                    <option value="months">months</option>
                    <option value="years">years</option>
                  </select>
                </td>
                <td>
                  <TestTextButton phone={props.user.phone} />
                </td>
                <td>
                  <button onClick={props.launchUpdateComp}>Edit Nudge</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <NudgeUpdate />
    </div>
  );
};

export default Dashboard;
