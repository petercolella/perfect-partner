import React from 'react';

const NudgeUpdate = props => (
  <div className="modal-body">
    <form>
      <div className="form-group">
        <div className="col">
          <input
            type="text"
            className="form-control"
            onChange={props.handleInputChange}
            value={props.name}
            name="name"
            placeholder={props.name}
          />
          <input
            type="text"
            className="form-control"
            onChange={props.handleInputChange}
            value={props.nudgeFrequency}
            name="nudgeFrequency"
            placeholder={props.nudgeFrequency}
          />
          <input
            type="text"
            className="form-control"
            onChange={props.handleInputChange}
            value={props.textMessage}
            name="textMessage"
            placeholder={props.textMessage}
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
      <Link to={this.props.link}>
        <button type="button" className="btn btn-secondary">
          Next
        </button>
      </Link>
    </div>
  </div>
);

export default NudgeUpdate;
