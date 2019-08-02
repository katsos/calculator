import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { BUTTONS_LAYOUT, NON_CURRENCY_CONV_BUTTONS } from '../buttons';
import './ButtonPanel.scss';

const { TOP, NUMBERS, BOTTOM, SIDE } = BUTTONS_LAYOUT;

const ButtonPanel = ({ isCurrencyConvOn, onClick }) => {
  function _onClick({ target }) {
    onClick(target.innerText);
    setTimeout(() => target.blur(), 40);
  }

  const _getProps = (b) => ({
    key: b,
    name: b,
    onClick: _onClick,
    disabled: isCurrencyConvOn && NON_CURRENCY_CONV_BUTTONS.includes(b),
  })

  return (
    <div className='ButtonPanel'>
      <div className='ButtonPanel__left'>
        {TOP.map(b => <Button dark {..._getProps(b)} />)}
        {[...NUMBERS, ...BOTTOM].map(b => <Button {..._getProps(b)} />)}
      </div>
      <div className='ButtonPanel__right'>
        {SIDE.map(b => <Button {..._getProps(b)} />)}
      </div>
    </div>
  );
}

ButtonPanel.propTypes = {
  isCurrencyConvOn: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
ButtonPanel.defaultProps = {
  isCurrencyConvOn: false,
};

export default ButtonPanel;