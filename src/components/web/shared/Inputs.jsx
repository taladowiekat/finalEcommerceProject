import React from 'react';

function Inputs({ id, type, value, placeholder, onChange, errors, onBlur, touched, name }) {
  return (
    <div className="input-container">
      <input
        placeholder={placeholder}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`input-field ${touched[name] && errors[name] ? 'error' : ''}`}
      />
      {touched[name] && errors[name] && <p className='error-message'>{errors[name]}</p>}
    </div>
  );
}

export default Inputs;
