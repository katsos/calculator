import React from 'react';
import { getRates } from '../services/api';

const CURRENCIES = [
  'AUD', 'BGN', 'BRL', 'CAD',
  'CHF', 'CNY', 'CZK', 'DKK',
  'GBP', 'HKD', 'HRK', 'HUF',
  'IDR', 'ILS', 'INR', 'ISK',
  'JPY', 'KRW', 'MXN', 'MYR',
  'NOK', 'NZD', 'PHP', 'PLN',
  'RON', 'RUB', 'SEK', 'SGD',
  'THB', 'TRY', 'USD', 'ZAR',
];

const INITIAL_STATE = {
  rates: null,
  currencies: {
    base: 'EUR',
    target: 'GBP',
  },
  currencyValues: {
    base: null,
    target: null,
  },
};

class CurrencyDisplay extends React.PureComponent {
  constructor(props) {
    super(props);

    const baseValue = this.props.initialValue || INITIAL_STATE.currencyValues.target;
    this.state = {
      ...INITIAL_STATE,
      currencyValues: {
        base: baseValue,
        target: INITIAL_STATE.currencyValues.target,
      },
    };
  }

  componentDidMount() {
    this.fetchRates();
  }

  onChangeBase = ({ target: { value }}) =>
    this.setState({ currencies: { ...this.state.currencies, base: value }}, this.fetchRates)

  onChangeTarget = ({ target: { value }}) =>
    this.setState({ currencies: { ...this.state.currencies, target: value }})

  onChangeValue = ({ target: { name, value }}) => {
    const currencyValues = (name === 'base')
      ? { base: value, target: value * this.rate }
      : { base: value / this.rate, target: value };
    this.setState({ currencyValues });
  }

  async fetchRates() {
    this.setState({ rates: null });
    const { base } = this.state.currencies;
    const { rates } = await getRates(base);
    this.setState({ rates });
  }

  get rate() {
    const { rates, currencies: { base, target } }= this.state;
    if (!rates) return null;
    return rates[target];
  }

  render() {
    const { rates, currencies, currencyValues } = this.state;

    return (
      <div className='CurrencyDisplay'>
        <select name='base' value={currencies.base} onChange={this.onChangeBase}>
          {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input name='base' value={currencyValues.base} onChange={this.onChangeValue} />

        <p className='CurrencyDisplay__rate'>Rate: {this.rate}</p>

        <select name='target' value={currencies.target} onChange={this.onChangeTarget} disabled={!rates}>
          {CURRENCIES.filter(v => v !== currencies.base).map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input name='target' value={currencyValues.target} onChange={this.onChangeValue} />
      </div>
    );
  }
}

export default CurrencyDisplay;
