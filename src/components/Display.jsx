import React from 'react';
import { numberWithCommas } from '../helpers';
import './Display.scss';

class Display extends React.PureComponent {
  expressionRef = React.createRef();

  scrollExpression() {
    const { scrollHeight, offsetHeight } = this.expressionRef.current;
    if (scrollHeight < offsetHeight) return;
    this.expressionRef.current.scroll(0, scrollHeight - offsetHeight);
  }

  expressionFactorsDisplayFormat() {
    return this.props.expressionFactors.map((v) => {
      const number = Number(v);
      if (!number || v === '0.') return v;
      const numberCommas = numberWithCommas(v);
      return (number < 0) ? `(-${Math.abs(numberCommas)})` : numberCommas;
    }).join(' ');
  }

  render = () => (
    <div className='Display'>
      <p className='Display__result'>{this.props.result}</p>
      <p className='Display__expression' ref={this.expressionRef}>{this.expressionFactorsDisplayFormat()}</p>
    </div>
  )
}

export default Display;
