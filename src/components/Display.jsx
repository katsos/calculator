import React from 'react';
import PropTypes from 'prop-types';
import { numberWithCommas } from '../services/helpers';
import { SEPARATORS } from '../buttons';
import './Display.scss';

class Display extends React.PureComponent {
  propTypes = {
    result: PropTypes.string,
    expressionFactors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }
  expressionRef = React.createRef();

  componentDidUpdate() {
    const { scrollHeight, offsetHeight } = this.expressionRef.current;
    if (scrollHeight < offsetHeight) return;
    this.expressionRef.current.scroll(0, scrollHeight - offsetHeight);
  }

  expressionFactorsDisplayFormat() {
    return this.props.expressionFactors.map((v) => {
      if (SEPARATORS.includes(v)) return v;
      const numberCommas = numberWithCommas(v) + ((v.match(/(\d|,)*\.$/)) ? '.' : '');
      return (Number(v) < 0) ? `(${numberCommas})` : numberCommas;
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
