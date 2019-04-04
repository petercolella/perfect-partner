import React from 'react';
import TestTextButton from '../../TestTextButton';
import NudgeUpdate from '../NudgeUpdate';
import fn from '../../../utils/fn';

const Dashboard = props => {
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
            return (
              <tr key={nudge._id}>
                <td>{nudge.name}</td>
                <td>{nudge.textMessage}</td>
                <td>
                  Every {nudge.nudgeFrequency}{' '}
                  {fn.capitalizeFirstLetter(nudge.nudgeFrequencyUnit)}
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

export default Dashboard;
