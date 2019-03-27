import React from 'react';
import TestTextButton from '../../TestTextButton';
import NudgeUpdate from '../NudgeUpdate';

const Dashboard = props => {
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nudge Name</th>
            <th>Text Body</th>
            <th>Frequency</th>
            <th>Frequency Unit</th>
            <th>Test Button</th>
          </tr>
        </thead>
        <tbody>
          {props.nudges.map((nudge, i) => {
            return (
              <tr key={nudge._id}>
                <td>{nudge.name}</td>
                <td>{nudge.textMessage}</td>
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
                  <TestTextButton {...props} />
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => props.launchUpdateComp(nudge)}>
                    Edit Nudge
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <NudgeUpdate
        closeUpdateComp={props.closeUpdateComp}
        handleInputChange={props.handleInputChange}
        handleFormSubmit={props.handleFormSubmit}
        nudge={props.nudge}
      />
    </div>
  );
};

export default Dashboard;
