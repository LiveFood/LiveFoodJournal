'use strict';

const expect = require('expect');


describe('mock test for travis', () => {
  it('should pass', () => {
    let sum = 4 + 4;

    expect(sum).toEqual(8);
  });
});
