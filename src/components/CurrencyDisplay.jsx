import React from 'react';
import { getRates } from '../services/api';

const INITIAL_STATE = {
  rates: null,
  currencies: ['EUR', 'GBP'],
  currencyValues: [null, null],
}

class CurrencyDisplay extends React.PureComponent {
  constructor() {
    super();
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.fetchRates();
  }

  async fetchRates() {
    this.setState({ rates: null });
    const base = this.state.currencies[0];
    const { rates } = await getRates(base);
    this.setState({ rates });
  }

  get rate() {
    const { rates, currencies: [base, target] }= this.state;
    return rates[target];
  }

  render() {
    const { rates, currencies } = this.state;
    if (!rates) return <p>Loading latest rates</p>;

    return (
      <div className='CurrencyDisplay'>
        <select>From</select>
        <input />

        <p>Rate: {this.rate}</p>

        <select>From</select>
        <input />
      </div>
    );
  }
}

export default CurrencyDisplay;
