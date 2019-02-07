import React from 'react';
import TestTextButton from '../../TestTextButton';

const Dashboard = props => {
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nudges</th>
            <th>Frequency</th>
            <th>Send</th>
          </tr>
        </thead>
        <tbody>
          {props.nudges.map(nudge => {
            return (
              <tr key={nudge.name}>
                <td>{nudge.name}</td>
                <td>{nudge.frequency}</td>
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
