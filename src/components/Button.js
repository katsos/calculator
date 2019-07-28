import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ name, onClick }) => (
  <div className='Button'>
    <button onClick={onClick}>{name}</button>
  </div>
);

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
