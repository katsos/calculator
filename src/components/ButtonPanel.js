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

const ButtonPanel = ({ onClick }) => {
  function _onClick({ target }) {
    onClick(target.innerText);
    setTimeout(() => target.blur(), 40);
  }

  return (
    <div className='ButtonPanel'>
      <div className='ButtonPanel__left'>
        {TOP.map(b => <Button className='Button--dark' key={b} name={b} onClick={_onClick} />)}
        {[...NUMBERS, ...BOTTOM].map(b => <Button key={b} name={b} onClick={_onClick} />)}
      </div>
      <div className='ButtonPanel__right'>
        {SIDE.map(b => <Button key={b} name={b} onClick={_onClick} />)}
      </div>
    </div>
  );
}
ButtonPanel.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonPanel;