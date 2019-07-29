import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe('App', () => {
  describe('onClick', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallow(<App />);
    });

    describe('should update expression factors', () => {
      beforeEach(() => {
        wrapper.state().expressionFactors = [];
      });

      it('should add the new number', () => {
        wrapper.instance().onClick('5');
        const expressionFactors = wrapper.state().expressionFactors;
        expect(expressionFactors).toEqual(['5']);
      });

      it ('should update the last number', () => {
        wrapper.instance().onClick('5');
        wrapper.instance().onClick('5');
        const expressionFactors = wrapper.state().expressionFactors;
        expect(expressionFactors).toEqual(['55']);
      });

      it ('should add the new separator', () => {
        wrapper.instance().onClick('5');
        wrapper.instance().onClick('+');
        const expressionFactors = wrapper.state().expressionFactors;
        expect(expressionFactors).toEqual(['5', '+']);
      });

      it ('should replace last separator', () => {
        wrapper.instance().onClick('5');
        wrapper.instance().onClick('+');
        wrapper.instance().onClick('-');
        const expressionFactors = wrapper.state().expressionFactors;
        expect(expressionFactors).toEqual(['5', '-']);
      });

      it ('should add the new number after last separator', () => {
        wrapper.instance().onClick('5');
        wrapper.instance().onClick('-');
        wrapper.instance().onClick('2');
        const expressionFactors = wrapper.state().expressionFactors;
        expect(expressionFactors).toEqual(['5', '-', '2']);
      });
    });
  });
});