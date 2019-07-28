import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ name, onClick }) => (
  <button className='Button' onClick={onClick}>{name}</button>
);

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
