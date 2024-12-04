import React from "react";
import "./Switch.css";

const Switch = ({ name, value, handleToggle, onColor }) => {
  return (
    <>
      <input
        checked={value}
        name={name}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: value && onColor }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;