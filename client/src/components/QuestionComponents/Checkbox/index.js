import React from 'react';

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <div className="form-check">
    <input
      type="checkbox"
      name={label}
      checked={isSelected}
      onChange={onCheckboxChange}
      className="form-check-input"
    />
    <label className="form-label">{label}</label>
    {/* Code from previous checkbox list
    <div key={i} className="custom-control custom-checkbox">
      <input
        type="checkbox"
        className="custom-control-input"
        id="customCheck1"
      />
      <label className="custom-control-label" htmlFor="customCheck1">
        {nudge.name}
      </label>
    </div> */}
  </div>
);

export default Checkbox;
