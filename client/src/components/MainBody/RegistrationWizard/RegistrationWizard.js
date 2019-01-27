import React from 'react'

const RegistrationWizard = (props) => {
    // const handleClickYes =() => {
    //     props.history.push('/profile')
    // };
    // const handleClickNo =() => {
    //     props.history.push('/dashboard')
    // };
    return (

        <div className="container-fluid widget">
            {/*add name here from db*/}
            {/* <button onClick={handleClickYes}>Yes</button><button onClick={handleClickNo}>No</button> */}
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Email</label>
                <input type="text" onChange={this.handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                <label>Confirm Password</label>
                <input type="password"/>
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
};

export default RegistrationWizard