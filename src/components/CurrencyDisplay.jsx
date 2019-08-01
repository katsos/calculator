import React from 'react';
import { getRates } from '../services/api';
import './CurrencyDisplay.scss';

const CURRENCIES = [
  'AUD', 'BGN', 'BRL', 'CAD',
  'CHF', 'CNY', 'CZK', 'DKK', 'EUR',
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
    base: '',
    target: '',
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

    this.baseInputRef = React.createRef();
    this.targetInputRef = React.createRef();
  }

  componentDidMount() {
    this.fetchRates();
  }

  handleInput = (input) => {
    if (!input.match(/\d|\./)) return;
    const { currencyValues } = this.state;
    const inputName = (this.lastFocusedElement === this.targetInputRef.current) ? 'target' : 'base';
    const diff = { [inputName]: `${currencyValues[inputName]}${input}` };
    return this.setState({ currencyValues: { ...currencyValues, ...diff } });
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

  onFocus = ({ target }) => this.lastFocusedElement = target;

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
        <div>
          <select name='base' value={currencies.base} onChange={this.onChangeBase}>
            {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input
            name='base'
            autoFocus
            readOnly
            ref={this.baseInputRef}
            value={currencyValues.base}
            onFocus={this.onFocus}
            onChange={this.onChangeValue}
          />
        </div>
        <p className='CurrencyDisplay__rate'>Rate: {this.rate}</p>
        <div>
          <select name='target' value={currencies.target} onChange={this.onChangeTarget} disabled={!rates}>
            {CURRENCIES.filter(v => v !== currencies.base).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input
            name='target'
            readOnly
            ref={this.targetInputRef}
            value={currencyValues.target}
            onFocus={this.onFocus}
            onChange={this.onChangeValue}
          />
        </div>

      </div>
    );
  }
}

export default CurrencyDisplay;
