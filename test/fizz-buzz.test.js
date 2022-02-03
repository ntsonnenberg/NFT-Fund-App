/**
 * Write a function that if the input is...
 * - a multiple of 3 returns "Fizz"
 * - a multiple of 5 returns "Buzz"
 * - a multiple of 3 and 5 returns "FizzBuzz"
 * - anything else returns the number that was passed in
 */

const expect = require('chai').expect;
const { fizzbuzz } = require('../api/fizz-buzz.js');
//this works as well
//const fizzbuzz = require('../fizz-buzz.js').fizzbuzz;

describe('fizz buzz', () => {
    it('returns "Fizz" if the input is 3', () => {
        expect(fizzbuzz(3)).to.equal('Fizz');
    })
    it('returns "Buzz" if the input is 5', () => {
        expect(fizzbuzz(5)).to.equal('Buzz');
    })
    it('returns "FizzBuzz" if the input is 15', () => {
        expect(fizzbuzz(15)).to.equal('FizzBuzz');
    })
    it('returns the number if the input is NOT a multiple of 3 or 5', () => {
        expect(fizzbuzz(2)).to.equal(2);
    })
    it('will throw an error if you don\'t input a number', () => {
        expect(() => fizzbuzz()).to.throw(/You need to provide a number/i);
    })
});