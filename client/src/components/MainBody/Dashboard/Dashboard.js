import React from 'react';
import TestTextButton from '../../TestTextButton';

const Dashboard = props => {
  let nudgeFrequencyUnit = 'Days';

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
                <td>{nudgeFrequencyUnit}</td>
                <td>
                  <TestTextButton phone={props.user.phone} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
