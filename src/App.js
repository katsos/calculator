import React, { PureComponent } from 'react';
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

class App extends PureComponent {
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
        const { expressionFactors } = this.state;
        if (!this.lastFactor || this.isLastFactorSeparator) return this.updateDisplay([...expressionFactors, '0.']);

        const isEligibleToDecimalized = !this.lastFactor.endsWith('.') && Number.isInteger(Number(this.lastFactor));
        if (!isEligibleToDecimalized) return;

        return this.updateDisplay([...getAllButLast(expressionFactors), this.lastFactor + '.']);
      }
      case '%': {
        if (this.isLastFactorSeparator) return; // TODO: disable % in this case
        const { expressionFactors } = this.state;
        return this.updateDisplay([...getAllButLast(expressionFactors), getLast(expressionFactors) / 100]);
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

  updateDisplay(expressionFactors, overwriteResult) {
    const newResult = overwriteResult || calculateExpression(expressionFactors);
    if (newResult > Number.MAX_SAFE_INTEGER) return; // TODO: show error
    this.setState({ expressionFactors, result: overwriteResult || newResult });
  }

  render() {
    const { expressionFactors, result } = this.state;

    return (
      <div className='App'>
        <div className='App__display'>
          <p className='App__display__result'>{result}</p>
          <p className='App__display__expression'>{expressionFactors.join(' ')}</p>
        </div>
        <ButtonPanel onClick={this.handleInput}/>
      </div>
    );
  }
}

export default App;
