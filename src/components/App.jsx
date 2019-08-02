import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import CurrencyDisplay from './CurrencyDisplay';
import calculateExpression from '../services/calculate';
import { KEYBOARD_BUTTONS, SEPARATORS, flatButtonsLayout } from '../buttons';
import { getNewExpression } from '../services/calculate';
import { getLast, getAllButLast } from '../services/helpers';
import './App.scss';

const INITIAL_STATE = {
  expressionFactors: ['0'],
  result: 0,
  isCurrencyConvOn: false,
};

const BUTTONS = [...KEYBOARD_BUTTONS, ...flatButtonsLayout];

class App extends React.PureComponent {
  state = {...INITIAL_STATE};
  currencyDisplayRef = React.createRef();

  componentDidMount() {
    document.addEventListener('keydown', ({ key }) => {
      if (BUTTONS.includes(key)) return this.handleInput(key);
    });
  }

  handleInput = (char) => {
    if (this.state.isCurrencyConvOn) return this.currencyDisplayRef.current.handleInput(char);

    switch (char) {
      case 'Backspace': {
        const expressionFactors = getAllButLast(this.state.expressionFactors);
        return this.updateDisplay(expressionFactors);
      }
      case 'C':
        return this.setState(INITIAL_STATE);
      case 'Enter':
      case '=':
        return this.updateDisplay([this.state.result.toString()]);
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
      case '$':
        return this.setState({ isCurrencyConvOn: true });
      default:
        const newExpressionFactors = getNewExpression(this.state.expressionFactors, char);
        this.updateDisplay(newExpressionFactors);
    }
  }

  onCloseCurrencyDisplay = (result = '0') =>
    this.setState({ isCurrencyConvOn: false, expressionFactors: [result.toString()], result });

  get lastFactor() {
    const { expressionFactors } = this.state;
    return getLast(expressionFactors);
  }

  get isLastFactorSeparator() {
    return SEPARATORS.includes(this.lastFactor);
  }

  set lastFactor(value) {
    return this.updateDisplay([...getAllButLast(this.state.expressionFactors), value.toString()]);
  }

  updateDisplay(expressionFactors) {
    const result = calculateExpression(expressionFactors);
    if (result > Number.MAX_SAFE_INTEGER || result < Number.MIN_SAFE_INTEGER) return; // TODO: show error
    this.setState({ expressionFactors, result });
  }

  render() {
    const { expressionFactors, result, isCurrencyConvOn } = this.state;

    return (
      <div className='App'>
        <div className='App__display'>
          {isCurrencyConvOn
            ? <CurrencyDisplay ref={this.currencyDisplayRef} onClose={this.onCloseCurrencyDisplay} />
            : <Display {...{ expressionFactors, result }} />
          }
        </div>
        <ButtonPanel  isCurrencyConvOn={isCurrencyConvOn} onClick={this.handleInput}/>
      </div>
    );
  }
}

export default App;
