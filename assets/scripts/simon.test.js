const add = require('./simon');

describe('Calculator', () => {
    describe('add', () => {
        it('should add two numbers', () => {
            expect(add(1, 2)).toBe(3);
        });
    });
});