import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe('App', () => {
  describe('handleInput', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallow(<App />);
    });

    beforeEach(() => {
      wrapper.state().expressionFactors = [];
    });

    it('should add the new number', () => {
      wrapper.instance().handleInput('5');
      const expressionFactors = wrapper.state().expressionFactors;
      expect(expressionFactors).toEqual(['5']);
    });

    it('should update the last number', () => {
      wrapper.instance().handleInput('5');
      wrapper.instance().handleInput('5');
      const expressionFactors = wrapper.state().expressionFactors;
      expect(expressionFactors).toEqual(['55']);
    });

    it('should add the new separator', () => {
      wrapper.instance().handleInput('5');
      wrapper.instance().handleInput('+');
      const expressionFactors = wrapper.state().expressionFactors;
      expect(expressionFactors).toEqual(['5', '+']);
    });

    it('should replace last separator', () => {
      wrapper.instance().handleInput('5');
      wrapper.instance().handleInput('+');
      wrapper.instance().handleInput('-');
      const expressionFactors = wrapper.state().expressionFactors;
      expect(expressionFactors).toEqual(['5', '-']);
    });

    it('should add the new number after last separator', () => {
      wrapper.instance().handleInput('5');
      wrapper.instance().handleInput('-');
      wrapper.instance().handleInput('2');
      const expressionFactors = wrapper.state().expressionFactors;
      expect(expressionFactors).toEqual(['5', '-', '2']);
    });

    describe('%', () => {
      it('should convert last number', () => {
        wrapper.instance().handleInput('5');
        wrapper.instance().handleInput('%');
        const expressionFactors = wrapper.state().expressionFactors;
        expect(expressionFactors).toEqual([0.05]);
      });

      it('should convert last number if there are more than one', () => {
        wrapper.instance().handleInput('5');
        wrapper.instance().handleInput('5');
        wrapper.instance().handleInput('-');
        wrapper.instance().handleInput('5');
        wrapper.instance().handleInput('%');
        const expressionFactors = wrapper.state().expressionFactors;
        expect(expressionFactors).toEqual(['55', '-', 0.05]);
      });

      it('should do nothing if last factor is a separator', () => {
        wrapper.instance().handleInput('5');
        wrapper.instance().handleInput('-');
        wrapper.instance().handleInput('%');
        const expressionFactors = wrapper.state().expressionFactors;
        expect(expressionFactors).toEqual(['5', '-']);
      });
    });
  });
});