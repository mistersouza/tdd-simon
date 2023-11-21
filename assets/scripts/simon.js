let game = {
    score: 0,
    turn: 0,
    currentGame: [],
    moves: [],
    choices: ['button1', 'button2', 'button3', 'button4'],
}

const setScore = () => {
    document.querySelector('#score').textContent = game.score;
}

const PlayAgain = () => {
    game.score = 0;
    game.currentGame = [];
    game.moves = [];
    document.querySelectorAll('.circle').forEach(button => {
        if (button.getAttribute('data-listener') === 'false') {
            button.addEventListener('click', event => {
                let move = event.target.getAttribute('id');
                lightUp(move);
                game.moves.push(move);
                handleMoveAndScore();
            });
            button.setAttribute('data-listener', true);
        }
    });
    setScore();
    botChoice();
}

const botChoice = () => {
    game.moves = [];
    game.currentGame.push(game.choices[Math.floor(Math.random() * 4)]);
    showMoves();
}

const lightUp = (circle) => {
    document.querySelector(`#${circle}`).classList.add('light');
    setTimeout(() => {
        document.querySelector(`#${circle}`).classList.remove('light');
    }, 400);
}

const showMoves = () => {
    game.turn = 0;
    let turns = setInterval(() => {
        lightUp(game.currentGame[game.turn]);
        game.turn++;
        if (game.turn >= game.currentGame.length) {
            clearInterval(turns);
        }
    }, 800);
}

const handleMoveAndScore = () => {
    let index = game.moves.length - 1;
    if (game.moves[index] === game.currentGame[index]) {
        if (game.moves.length === game.currentGame.length) {
            game.score++;
            setScore();
            botChoice();
        }
    } else {
        alert('Wrong move!');
        PlayAgain();
    }
}

module.exports = { game, PlayAgain, setScore, botChoice, lightUp, showMoves, handleMoveAndScore }