import React from 'react';
import PropTypes from 'prop-types';
import { numberWithCommas } from '../helpers';
import { SEPARATORS } from '../buttons';
import './Display.scss';

class Display extends React.PureComponent {
  expressionRef = React.createRef();
  // TODO: scroll expression on expression update

  scrollExpression() {
    const { scrollHeight, offsetHeight } = this.expressionRef.current;
    if (scrollHeight < offsetHeight) return;
    this.expressionRef.current.scroll(0, scrollHeight - offsetHeight);
  }

  expressionFactorsDisplayFormat() {
    return this.props.expressionFactors.map((v) => {
      if (SEPARATORS.includes(v)) return v;
      const numberCommas = numberWithCommas(v) + ((v.match(/(\d|,)*\.$/)) ? '.' : '');
      return (Number(v) < 0) ? `(-${Math.abs(numberCommas)})` : numberCommas;
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
