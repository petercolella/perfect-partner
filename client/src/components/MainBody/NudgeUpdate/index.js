import React from 'react';

const NudgeUpdate = props => (
  <div>
    <div
      className="modal fade"
      id="editNudgeModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="editNudgeModalCenterTitle"
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title"
              id="editNudgeModalCenterTitle"
              style={{ lineHeight: '2' }}>
              Edit Nudge
            </h5>
            <div aria-live="polite" aria-atomic="true">
              <div
                className="toast"
                id="nudge-toast"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                data-delay="2000"
                style={{
                  backgroundColor: '#22b5e0',
                  color: 'white',
                  margin: 'auto'
                }}>
                <div className="toast-body" style={{ padding: '0.5rem' }}>
                  {props.nudge.name} has been successfully updated.
                </div>
              </div>
            </div>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              style={{ margin: '-1rem -1rem -1rem 0' }}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <div className="col">
                  <label htmlFor="nudgeNameInput">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nudgeNameInput"
                    onChange={props.handleInputChange}
                    value={props.nudge.name}
                    name="name"
                  />
                  <label htmlFor="nudgeFrequencyInput">Frequency</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nudgeFrequencyInput"
                    onChange={props.handleInputChange}
                    value={props.nudge.nudgeFrequency}
                    name="nudgeFrequency"
                  />
                  <label htmlFor="nudgeFrequencyUnitInput">
                    Frequency Unit
                  </label>
                  <select
                    type="text"
                    className="form-control"
                    id="nudgeFrequencyUnitInput"
                    onChange={props.handleInputChange}
                    value={props.nudge.nudgeFrequencyUnit}
                    name="nudgeFrequencyUnit">
                    <option value="seconds">seconds</option>
                    <option value="minutes">minutes</option>
                    <option value="hours">hours</option>
                    <option value="days">days</option>
                    <option value="weeks">weeks</option>
                    <option value="months">months</option>
                    <option value="years">years</option>
                  </select>
                  <label htmlFor="nudgeTextInput">Text Body</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nudgeTextInput"
                    onChange={props.handleInputChange}
                    value={props.nudge.textMessage}
                    name="textMessage"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={props.handleFormSubmit}>
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={props.closeUpdateComp}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default NudgeUpdate;
