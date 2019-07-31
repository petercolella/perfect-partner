import React from 'react';

const UserUpdate = props => {
  return (
    <div>
      <div
        className="modal fade"
        id="editUserModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editUserModalCenterTitle"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="editUserModalCenterTitle"
                style={{ lineHeight: '2' }}>
                Edit Profile
              </h5>
              <div aria-live="polite" aria-atomic="true">
                <div
                  className="toast"
                  id="user-toast"
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
                    {props.user.firstName}, your profile has been successfully
                    updated.
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
                    <label htmlFor="userNameInput">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userNameInput"
                      onChange={props.handleUserInputChange}
                      value={props.user.name}
                      name="name"
                    />
                    <label htmlFor="userFirstNameInput">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userFirstNameInput"
                      onChange={props.handleUserInputChange}
                      value={props.user.firstName}
                      name="firstName"
                    />
                    <label htmlFor="userLastNameInput">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userLastNameInput"
                      onChange={props.handleUserInputChange}
                      value={props.user.lastName}
                      name="lastName"
                    />
                    <label htmlFor="userEmailInput">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userEmailInput"
                      onChange={props.handleUserInputChange}
                      value={props.user.email}
                      name="email"
                    />
                    <label htmlFor="userPhoneInput">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userPhoneInput"
                      onChange={props.handleUserInputChange}
                      value={props.user.phone}
                      name="phone"
                    />
                    <label htmlFor="userPartnerNameInput">Partner Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userPartnerNameInput"
                      onChange={props.handleUserInputChange}
                      value={props.user.partnerName}
                      name="partnerName"
                    />
                    <label htmlFor="userAnniversaryDateInput">
                      Anniversary
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="userAnniversaryDateInput"
                      onChange={props.handleUserInputChange}
                      value={props.user.anniversaryDate}
                      name="anniversaryDate"
                    />
                    <label htmlFor="userBirthDateInput">
                      Partner's Birthday'
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="userBirthDateInput"
                      onChange={props.handleUserInputChange}
                      value={props.user.birthDate}
                      name="birthDate"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={props.handleUserFormSubmit}>
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={props.closeUserUpdateComp}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserUpdate;
