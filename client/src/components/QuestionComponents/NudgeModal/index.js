import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const $ = window.$;

class NudgeModal extends Component {
  componentDidMount() {
    this.showModal();
  }

  showModal() {
    $('#exampleModalCenter').modal('show');
  }

  componentWillUnmount() {
    this.hideModal();
  }

  hideModal() {
    $('#exampleModalCenter').modal('hide');
  }

  render() {
    return (
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
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">
                  {this.props.title}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.props.user.name}, {this.props.question}
              </div>
              <form>
                <div className="form-group">
                  <div className="col">
                    {this.props.nudges.map(nudge => (
                      <div
                        key={nudge._id}
                        className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck1">
                          {nudge.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.props.handleFormSubmit}>
                  Submit
                </button>
                <Link to={this.props.link}>
                  <button type="button" className="btn btn-secondary">
                    Next
                  </button>
                </Link>
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
            style={{ backgroundColor: '#0bb3e2', color: 'white' }}>
            <div className="toast-body">Your nudges have been submitted.</div>
          </div>
        </div>
      </div>
    );
  }
}

export default NudgeModal;
