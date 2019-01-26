import React from 'react'

const FormStructure = (props) => (
    <div className='profile-widget'>
        {props.question}
        <button>{props.newButton}</button>
    </div>
);

export default FormStructure