import React, { PureComponent } from 'react';
import last from 'lodash/last';
import ButtonPanel from './components/ButtonPanel';
import './App.scss';

const INITIAL_STATE = {
  expressionFactors: [],
  result: null,
};
const SEPARATORS = ['÷', '*', '-', '+'];

class App extends PureComponent {
  state = {...INITIAL_STATE}

  onClick = (char) => {
    switch (char) {
      case 'C':
        return this.setState(INITIAL_STATE);
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
    const lastFactor = last(expressionFactors);
    const isLastFactorSeparator = SEPARATORS.includes(lastFactor);

    if (isNewCharSeparator) {
      if (isLastFactorSeparator) return [...expressionFactors.slice(0, -1), char]; // replace last separator
      return [...expressionFactors, char]; // add new separator
    }
    if (isLastFactorSeparator) return [...expressionFactors, char]; // add new number
    return [...expressionFactors.slice(0, -1), (lastFactor || '') + char]; // update last number
  }

  updateResult() {
    const { expressionFactors: expression } = this.state;
    const isLastFactorNumber = last(expression).match(/\d+/);
    if (!isLastFactorNumber) return;
    this.setState({ result: eval(expression.join('')) });
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
