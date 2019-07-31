import React from 'react';
import './Display.scss';

class Display extends React.PureComponent {
  expressionRef = React.createRef();

  scrollExpression() {
    const { scrollHeight, offsetHeight } = this.expressionRef.current;
    if (scrollHeight < offsetHeight) return;
    this.expressionRef.current.scroll(0, scrollHeight - offsetHeight);
  }

  render() {
    const { result, expressionFactors } = this.props;
    return (
      <div className='Display'>
        <p className='Display__result'>{result}</p>
        <p className='Display__expression' ref={this.expressionRef}>{expressionFactors.join(' ')}</p>
      </div>
    )
  }
}

export default Display;
