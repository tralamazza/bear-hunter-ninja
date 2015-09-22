/* global process */
"use strict";

const Game = require('./lib/game');
const Player = require('./lib/player');
const RPSValues = require('./lib/rps');

const best_of = 3;

process.stdin.resume(); // process.stdin is paused by default
process.stdin.setEncoding('utf8');

// configure players
var players = [new Player.RandomPlayer('player1')];
if (process.argv[2])
	players.push(new Player.StreamIOPlayer(process.argv[2], process.stdin, process.stdout));
else
	players.push(new Player.RandomPlayer('player2'));

// keep track of players victories
var wins = new Map(players.map((p) => [p, 0]));

// create the game
var game = new Game(players, RPSValues);
game.on('choice', function (choice, player) {
	console.log(player.name, 'chose', choice);
});
game.on('result', function (decision, player) {
	console.log('Round result:', decision, player ? player.name : '');
	if (decision !== 'win') {
		game.round(); // next round
		return;
	}
	wins.set(player,  wins.get(player) + 1);	
	if (wins.get(player) >= best_of / 2) {
		console.log('Winner!', player.name);
		process.exit(0); // we are done here
	} else {
		game.round(); // next round
	}
});
game.round(); // first round
