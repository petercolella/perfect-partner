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
  </div>
);

export default NudgeUpdate;
