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
          <div
            className="modal-dialog modal-dialog-centered modal-dialog-centered-tony"
            role="document">
            <div className="modal-content modal-content-tony">
              <div className="modal-header modal-header-tony">
                <h5
                  className="modal-title modal-title-tony"
                  id="exampleModalCenterTitle">
                  {this.props.title}
                </h5>
                <button
                  type="button"
                  className="close close-tony"
                  data-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {this.props.user.name ? (
                <div className="modal-bkgrd">
                  <div
                    className="modal-body modal-body-tony"
                    style={{ padding: '0 0 0 1rem' }}>
                    {this.props.user.name}, {this.props.question}
                  </div>
                  <form>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <div className="col">
                        <div className="col">
                          {this.props.createCheckboxes()}
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="modal-footer modal-footer-tony">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={this.props.selectAll}>
                      &#10003; All
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={this.props.deselectAll}>
                      &#10003; None
                    </button>
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
              ) : (
                <div className="modal-bkgrd" style={{ top: 0, marginTop: 395 }}>
                  <div className="modal-body modal-body-tony">
                    <p>
                      Please click{' '}
                      <Link to="/" style={{ color: '#22b5e0' }}>
                        here
                      </Link>{' '}
                      to sign in before continuing.
                    </p>
                  </div>
                  <div
                    className="modal-footer modal-footer-tony"
                    style={{ bottom: 0, position: 'absolute', right: 0 }}>
                    <Link to={this.props.link}>
                      <button type="button" className="btn btn-secondary">
                        Next
                      </button>
                    </Link>
                  </div>
                </div>
              )}
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
            <div className="toast-body">
              You submitted these nudges:
              <ul>
                {this.props.nudges.map((nudge, i) => (
                  <li key={i}>{nudge}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NudgeModal;
