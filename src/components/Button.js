import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ className, name, onClick }) => (
  <button className={'Button ' + className} onClick={onClick}>{name}</button>
);

Button.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  className: '',
};

export default Button;
