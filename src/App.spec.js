import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe('App', () => {
  describe('handleInput', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallow(<App />);
      wrapper.instance().scrollExpression = jest.fn().mockReturnValue();
    });

    beforeEach(() => {
      wrapper.state().expressionFactors = [];
    });

    describe('digits', () => {
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

      it('should replace the last number if it is exactly "0"', () => {
        wrapper.instance().handleInput('0');
        wrapper.instance().handleInput('1');
        const expressionFactors = wrapper.state().expressionFactors;
        expect(expressionFactors).toEqual(['1']);
      });

      it('should add the new number after last separator', () => {
        wrapper.instance().handleInput('5');
        wrapper.instance().handleInput('-');
        wrapper.instance().handleInput('2');
        const expressionFactors = wrapper.state().expressionFactors;
        expect(expressionFactors).toEqual(['5', '-', '2']);
      });
    });

    describe('separators', () => {
      it('should do nothing if there are no other factors', () => {
        wrapper.instance().handleInput('-');
        const expressionFactors = wrapper.state().expressionFactors;
        expect(expressionFactors).toEqual([]);
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

    describe('.', () => {
      it('should add a decimal dot after the last factor if it is an integer number', () => {
        wrapper.instance().handleInput('1');
        wrapper.instance().handleInput('.');
        const expressionFactors = wrapper.state().expressionFactors;
        expect(expressionFactors).toEqual(['1.']);
      });

      it('should update number after a dot', () => {
        wrapper.instance().handleInput('1');
        wrapper.instance().handleInput('.');
        wrapper.instance().handleInput('2');
        const expressionFactors = wrapper.state().expressionFactors;
        expect(expressionFactors).toEqual(['1.2']);
      });

      describe('should add a zero before the dot', () => {
        it('without a previous expression factor', () => {
          wrapper.instance().handleInput('.');
          const expressionFactors = wrapper.state().expressionFactors;
          expect(expressionFactors).toEqual(['0.']);
        });

        it('after a separator', () => {
          wrapper.instance().handleInput('5');
          wrapper.instance().handleInput('+');
          wrapper.instance().handleInput('.');
          const expressionFactors = wrapper.state().expressionFactors;
          expect(expressionFactors).toEqual(['5', '+', '0.']);
        });
      });

      describe('should do nothing', () => {
        it('if last factor ends with a dot', () => {
          wrapper.instance().handleInput('.');
          wrapper.instance().handleInput('.');
          const expressionFactors = wrapper.state().expressionFactors;
          expect(expressionFactors).toEqual(['0.']);
        });

        it('if last factor (number) is a decimal', () => {
          wrapper.instance().handleInput('1');
          wrapper.instance().handleInput('.');
          wrapper.instance().handleInput('.');
          const expressionFactors = wrapper.state().expressionFactors;
          expect(expressionFactors).toEqual(['1.']);
        });
      });
    });
  });
});