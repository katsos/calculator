import React from 'react';
import { shallow } from 'enzyme';
import Display from './Display';

describe('Display', () => {
  describe('expressionFactorsDisplayFormat', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallow(<Display expressionFactors={[]} />);
    });

    it('should return numbers and operators spaced', () => {
      wrapper.setProps({ expressionFactors: ['1', '+', '2'] });
      expect(wrapper.instance().expressionFactorsDisplayFormat())
        .toBe('1 + 2');
    });

    it('should return negative numbers in the format (-X)', () => {
      wrapper.setProps({ expressionFactors: ['-3'] });
      expect(wrapper.instance().expressionFactorsDisplayFormat())
        .toBe('(-3)');
    });

    it('should let numbers ending with a dot as is', () => {
      wrapper.setProps({ expressionFactors: ['45.'] });
      expect(wrapper.instance().expressionFactorsDisplayFormat())
        .toBe('45.');
    });

    it('should comma-separate integer numbers at every third number', () => {
      wrapper.setProps({ expressionFactors: ['5678'] });
      expect(wrapper.instance().expressionFactorsDisplayFormat())
        .toBe('5,678');
    });

    it('should not comma-separate the decimal part of the number', () => {
      wrapper.setProps({ expressionFactors: ['1234.1234'] });
      expect(wrapper.instance().expressionFactorsDisplayFormat())
        .toBe('1,234.1234');
    });
  });
});