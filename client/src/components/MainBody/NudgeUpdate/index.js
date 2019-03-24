import React from 'react';

const NudgeUpdate = props => (
  <div>
    <div
      className="modal fade"
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <form>
            <div className="form-group">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  onChange={props.handleInputChange}
                  value={props.nudge.name}
                  name="name"
                />
                <input
                  type="text"
                  className="form-control"
                  onChange={props.handleInputChange}
                  value={props.nudge.nudgeFrequency}
                  name="nudgeFrequency"
                />
                <input
                  type="text"
                  className="form-control"
                  onChange={props.handleInputChange}
                  value={props.nudge.textMessage}
                  name="textMessage"
                />
              </div>
            </div>
          </form>
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
    <div
      aria-live="polite"
      aria-atomic="true"
      className="d-flex justify-content-center align-items-center"
      style={{
        position: 'relative',
        minHeight: 200,
        zIndex: 1051,
        paddingTop: 200
      }}>
      <div
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-delay="2000"
        style={{ backgroundColor: '#22b5e0', color: 'white' }}>
        <div className="toast-body">
          {props.nudge.name} has been successfully updated.
        </div>
      </div>
    </div>
  </div>
);

export default NudgeUpdate;
