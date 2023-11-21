const { game, PlayAgain, setScore, botChoice, lightUp, showMoves, handleMoveAndScore } = require('../../assets/scripts/simon.js');

jest.spyOn(window, 'alert').mockImplementation(() => {});

beforeAll(() => {
    let fs = require('fs');
    let fileContents = fs.readFileSync('index.html', 'utf8');
    document.open();
    document.write(fileContents);
    document.close();
});
    
describe('Game Object', () => {
    it('should be defined', () => {
        expect(game).toBeDefined();
    });

    describe('Game Object Properties', () => {
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
        describe('Check on turn property', () => {
            it('should have a property called turn', () => {
                expect(game.turn).toBeDefined();
            });
            it('should have a property called turn that is a number', () => {
                expect(typeof game.turn).toBe('number');
            });
            it('should have a property called turn that is equal to 0', () => {
                expect(game.turn).toBe(0);
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

describe('setScore function', () => {
    beforeAll(() => {
        game.score = 42;
        setScore();
    });
    it('should have a function called setScore', () => {
        expect(setScore).toBeDefined();
    });
    it('should set the score display to 42', () => {
        expect(document.querySelector('#score').textContent).toBe('42');
    });
});

describe('playAgain function', () => {
    beforeAll(() => {
        game.score = 42
        game.currentGame = ['button1', 'button2', 'button3', 'button4', 'button1', 'button2', 'button3', 'button4']
        game.moves = ['button1', 'button2', 'button3', 'button4', 'button1', 'button2', 'button3', 'button4'];
        document.querySelector('#score').textContent = '42';
        PlayAgain();
    });

    it('should have a function called PlayAgain', () => {
        expect(PlayAgain).toBeDefined();
    });
    it('should set game score to zero', () => {
        expect(game.score).toBe(0);
    });
    it('should find a single move in currentGame array', () => {
        expect(game.currentGame.length).toBe(1);
    });
    it('should empty the moves array', () => {
        expect(game.moves).toEqual([]);
    });
    it('should set the score display to zero', () => {
        expect(document.querySelector('#score').textContent).toBe('0');
    });

    describe('Test event listeners', () => {
        it('should add event listeners to the buttons', () => {
            let buttons = document.querySelectorAll('.circle');
            buttons.forEach(button => {
                expect(button.getAttribute('data-listener')).toBe('true');
            });
        });
    });
});

describe('Game play', () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.moves = [];
        botChoice();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.moves = [];
    });

    describe('Calls botChoice', () => {
        it('should add a new move to the game.currentGame array', () => {
            botChoice();
            expect(game.currentGame.length).toBe(2);
        });
        it('should add the light class to the buttons', () => {
            let button = document.querySelector(`#${game.currentGame[0]}`);
            lightUp(game.currentGame[0]);
            expect(button.classList).toContain('light');
        });
    });

    describe('Calls showMoves', () => {
        beforeEach(() => {
            game.score = 42;
        });
        it('should update game.turnNumber', () => {
            showMoves();
            expect(game.turn).toBe(0);
        });
    });

    describe('handleMoveAndScore function', () => {
        it('should have a function called handleMoveAndScore', () => {
            expect(handleMoveAndScore).toBeDefined();
        });
        it('should increment the game.score by 1', () => {
            game.moves.push(game.currentGame[0]);
            handleMoveAndScore();
            expect(game.score).toBe(1);
        });
        it ('should call an alert if the move is wrong', () => {
            game.moves.push('wrong');
            handleMoveAndScore();
            expect(window.alert).toHaveBeenCalledWith('Wrong move!');
        });
    });
});
