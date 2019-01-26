import React from 'react'

const RegistrationWizard =(props) => {
    const handleClickYes =() => {
        props.history.push('/profile')
    };
    const handleClickNo =() => {
        props.history.push('/dashboard')
    };
        return(

            <div className="container-fluid">
                <h1>First, let's learn a little about you...</h1>
                <h2>Would you like to set up a profile now?</h2>
                {/*add name here from db*/}
                <button onClick={handleClickYes}>Yes</button><button onClick={handleClickNo}>No</button>
            </div>
        )
};

export default RegistrationWizard