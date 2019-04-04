import React from 'react';
import TestTextButton from '../../TestTextButton';
import NudgeUpdate from '../NudgeUpdate';

const Dashboard = props => {
  function formatPhoneNumber(num) {
    const first3 = num.slice(0, 3);
    const second3 = num.slice(3, 6);
    const last4 = num.slice(6);

    return `(${first3}) ${second3}-${last4}`;
  }

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr style={{ textAlign: 'center' }}>
            <th>Nudge Name</th>
            <th>Text Body</th>
            <th>Frequency</th>
            <th>Customize</th>
            <th>Test Button</th>
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
                  <button
                    className="btn btn-primary"
                    onClick={() => props.launchUpdateComp(nudge)}>
                    Edit Nudge
                  </button>
                </td>
                <td>
                  <TestTextButton {...props} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
              ? `Text Sent to ${formatPhoneNumber(props.user.phone)}.`
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

export default Dashboard;
