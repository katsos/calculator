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

const BUTTONS = [KEYBOARD_BUTTONS, Object.values(BUTTONS_LAYOUT).flat()].flat();

class App extends PureComponent {
  state = {...INITIAL_STATE};

  componentDidMount() {
    document.addEventListener('keydown', ({ key }) => {
      if (BUTTONS.includes(key)) return this.onClick(key);
    });
  }

  onClick = (char) => {
    switch (char) {
      case 'Backspace': {
        const expressionFactors = getAllButLast(this.state.expressionFactors);
        return this.setState({ expressionFactors });
      }
      case 'C':
        return this.setState(INITIAL_STATE);
      case 'Enter':
      case '=':
        return this.setState({ expressionFactors: [this.state.result], result: null });
      default:
        const expressionFactors = this.getNewExpression(char);
        this.setState({ expressionFactors }, this.updateResult);
    }
  }

  getNewExpression(char) {
    const { expressionFactors } = this.state;
    const isNewCharSeparator = SEPARATORS.includes(char);
    const lastFactor = getLast(expressionFactors);
    const isLastFactorSeparator = SEPARATORS.includes(lastFactor);
    const allFactorsButLast = getAllButLast(expressionFactors);

    if (isNewCharSeparator) {
      if (isLastFactorSeparator) return [...allFactorsButLast, char]; // replace last separator
      return [...expressionFactors, char]; // add new separator
    }
    if (isLastFactorSeparator) return [...expressionFactors, char]; // add new number
    return [...allFactorsButLast, (lastFactor || '') + char]; // update last number
  }

  updateResult() {
    const { expressionFactors } = this.state;
    this.setState({ result: calculateExpression(expressionFactors) });
  }

  render() {
    const { expressionFactors, result } = this.state;

    return (
      <div className='App'>
        <div className='App__display'>
          <p className='App__display__expression'>{expressionFactors.join(' ')}</p>
          <p className='App__display__result'>{result}</p>
        </div>
        <ButtonPanel onClick={this.onClick}/>
      </div>
    );
  }
}

export default App;
