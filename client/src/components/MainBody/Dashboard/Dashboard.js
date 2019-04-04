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
            <th>Test Button</th>
            <th>Customize</th>
          </tr>
        </thead>
        <tbody>
          {props.nudges.map((nudge, i) => {
            const nudgeFrequencyUnitCapitalized = `${nudge.nudgeFrequencyUnit
              .charAt(0)
              .toUpperCase()}${nudge.nudgeFrequencyUnit.slice(1)}`;
            return (
              <tr key={nudge._id}>
                <td>{nudge.name}</td>
                <td>{nudge.textMessage}</td>
                <td>
                  Every {nudge.nudgeFrequency} {nudgeFrequencyUnitCapitalized}
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
