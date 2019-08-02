const PCT_BTN = '%';
const NEG_BTN = '+/-';

export const BUTTONS_LAYOUT = {
  TOP: ['C', PCT_BTN, '$'],
  NUMBERS: [
    '7', '8', '9',
    '4', '5', '6',
    '1', '2', '3',
  ],
  BOTTOM: [NEG_BTN, '0', '.'],
  SIDE: ['÷', '*', '-', '+', '='],
};

export const flatButtonsLayout = Object.values(BUTTONS_LAYOUT)
  .reduce((acc, curr) => [...acc, ...curr] , []);

export const KEYBOARD_BUTTONS = ['Backspace', 'Enter', 'Slash'];

export const SEPARATORS = ['+', '-', '*', '÷'];

export const NON_CURRENCY_CONV_BUTTONS = [...SEPARATORS, PCT_BTN, NEG_BTN];
