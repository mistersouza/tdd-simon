const { game } = require('../../assets/scripts/simon.js');

beforeAll(() => {
    let fs = require('fs');
    let fileContents = fs.readFileSync('/home/user/Desktop/simon/index.html', 'utf8');
    document.open();
    document.write(fileContents);
    document.close();
});
    
describe('Game Object', () => {
    it('should be defined', () => {
        expect(game).toBeDefined();
    });

    describe('Check Game Object Properties', () => {
        describe('Check on score property', () => {
            it('should have a property called score', () => {
            expect(game.score).toBeDefined();
            });
            it('should have a property called score that is a number', () => {
            expect(typeof game.score).toBe('number');
            });
            it('should have a property called score that is equal to 0', () => {
            expect(game.score).toBe(0);
            });
        });
        describe('Check on currentGame property', () => {
            it('should have a property called currentGame', () => {
            expect(game.currentGame).toBeDefined();
            });
            it('should have a property called currentGame that is an empty array', () => {
            expect(game.currentGame).toEqual([]);
            });
        });
        describe('Check on moves property', () => {
            it('should have a property called moves', () => {
                expect(game.moves).toBeDefined();
            });
            it('should have a property called moves that is an empty array', () => {
                expect(game.moves).toEqual([]);
            });
        });
        describe('Check on choices property', () => {
            it('should have a property called choices', () => {
                expect(game.choices).toBeDefined();
            });
            it('should have a property called choices that is an array', () => {
                expect(Array.isArray(game.choices)).toBe(true);
            });
            it('should have a property called choices that has four elements', () => {
                expect(game.choices.length).toBe(4);
            });
            it('should have a property called choices that contains correct ids', () => {
                expect(game.choices).toEqual(['button1', 'button2', 'button3', 'button4']);
            });
        });
    });
});