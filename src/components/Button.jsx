import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ name, dark, disabled, onClick }) => {
  const className = ['Button', dark ? 'Button--dark' : ''].join(' ');
  return <button {...{ className, name, onClick, disabled }}>{!disabled && name}</button>
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  dark: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  dark: false,
  disabled: false,
};

export default Button;
