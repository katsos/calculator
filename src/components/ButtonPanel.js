import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import './ButtonPanel.scss';

const BUTTONS = {
  TOP: ['C', '%', '$'],
  NUMBERS: [
    '7', '8', '9',
    '4', '5', '6',
    '1', '2', '3',
  ],
  BOTTOM: ['+/-', '0', '.'],
  SIDE: ['÷', '*', '-', '+', '='],
};
const { TOP, NUMBERS, BOTTOM, SIDE } = BUTTONS;

const ButtonPanel = ({ onClick }) => (
  <div className='ButtonPanel'>
    <div className='ButtonPanel__left'>
      {[...TOP, ...NUMBERS, ...BOTTOM].map(b => <Button key={b} name={b} onClick={() => onClick(b)} />)}
    </div>
    <div className='ButtonPanel__right'>
      {SIDE.map(b => <Button key={b} name={b} onClick={() => onClick(b)} />)}
    </div>
  </div>
);

ButtonPanel.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonPanel;