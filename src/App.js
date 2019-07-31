import React from 'react';
import Display from './components/Display';
import ButtonPanel from './components/ButtonPanel';
import calculateExpression from './logic/calculate';
import { BUTTONS_LAYOUT, KEYBOARD_BUTTONS, SEPARATORS } from './buttons';
import { getLast, getAllButLast } from './helpers';
import './App.scss';

const INITIAL_STATE = {
  expressionFactors: [],
  result: null,
};

const flatButtonsLayout = Object.values(BUTTONS_LAYOUT)
  .reduce((acc, curr) => [...acc, ...curr] , []);
const BUTTONS = [...KEYBOARD_BUTTONS, ...flatButtonsLayout];

class App extends React.PureComponent {
  state = {...INITIAL_STATE};

  componentDidMount() {
    document.addEventListener('keydown', ({ key }) => {
      if (BUTTONS.includes(key)) return this.handleInput(key);
    });
  }

  handleInput = (char) => {
    switch (char) {
      case 'Backspace': {
        const expressionFactors = getAllButLast(this.state.expressionFactors);
        return this.updateDisplay(expressionFactors);
      }
      case 'C':
        return this.setState(INITIAL_STATE);
      case 'Enter':
      case '=':
        return this.updateDisplay([this.state.result], null);
      case 'Slash': // alias
        return this.onChar('÷');
      case ',':
      case '.': {
        if (!this.lastFactor || this.isLastFactorSeparator) {
          return this.updateDisplay([...this.state.expressionFactors, '0.']);
        }

        const isEligibleToDecimalized = !this.lastFactor.endsWith('.') && Number.isInteger(Number(this.lastFactor));
        if (!isEligibleToDecimalized) return;

        return this.lastFactor = this.lastFactor + '.';
      }
      case '%': {
        if (this.isLastFactorSeparator) return; // TODO: disable % in this case
        return this.lastFactor = this.lastFactor / 100;
      }
      case '+/-': {
        if (this.isLastFactorSeparator) return;
        return this.lastFactor = Number(this.lastFactor) * -1;
      }
      default:
        const expressionFactors = this.getNewExpression(char);
        this.updateDisplay(expressionFactors);
    }
  }

  getNewExpression(char) {
    const { expressionFactors } = this.state;
    const allFactorsButLast = getAllButLast(expressionFactors);

    if (SEPARATORS.includes(char)) {
      if (!expressionFactors.length) return []; // an operator must always come after a number
      if (this.isLastFactorSeparator) return [...allFactorsButLast, char]; // replace last separator
      return [...expressionFactors, char]; // add new separator
    }
    if (this.isLastFactorSeparator) return [...expressionFactors, char]; // add new number

    const lastFactor = getLast(expressionFactors);
    if (lastFactor === '0') return [...allFactorsButLast, char]; // replace zero number
    return [...allFactorsButLast, (lastFactor || '') + char]; // update last number
  }

  get lastFactor() {
    const { expressionFactors } = this.state;
    return getLast(expressionFactors);
  }

  get isLastFactorSeparator() {
    return SEPARATORS.includes(this.lastFactor);
  }

  set lastFactor(value) {
    return this.updateDisplay([...getAllButLast(this.state.expressionFactors), value]);
  }

  updateDisplay(expressionFactors, overwriteResult) {
    const newResult = overwriteResult || calculateExpression(expressionFactors);
    if (newResult > Number.MAX_SAFE_INTEGER || newResult < Number.MIN_SAFE_INTEGER) return; // TODO: show error
    this.setState({ expressionFactors, result: overwriteResult || newResult });
  }

  render() {
    const { expressionFactors, result } = this.state;

    return (
      <div className='App'>
        <Display {...{ expressionFactors, result }} />
        <ButtonPanel onClick={this.handleInput}/>
      </div>
    );
  }
}

export default App;
