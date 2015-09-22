"use strict";

const tap = require('tap');
const Game = require('../lib/game');
const Player = require('../lib/player');
const RPSValues = require('../lib/rps');

class TestPlayer {
	constructor(choice) {
		this.name = 'test';
		this.choice = choice;
	}

	choose(values) {
		return this.choice;
	}
}

tap.test('create a Game', function (t) {
	t.ok(new Game());
	t.end();
});

tap.test('win a round', function (t) {
	var winner = new TestPlayer('rock');
	var players = [winner, new TestPlayer('scissors')]
	var game = new Game(players, RPSValues);
	game.on('choice', (choice, player) => {
		t.pass();
	});
	game.on('result', (decision, player) => {
		t.equal(decision, 'win');
		t.equal(player, winner);
		t.end();
	});
	game.round();
});

tap.test('loose a round', function (t) {
	var looser = new TestPlayer('rock');
	var players = [looser, new TestPlayer('paper')]
	var game = new Game(players, RPSValues);
	game.on('result', (decision, player) => {
		t.equal(decision, 'win');
		t.notEqual(player, looser);
		t.end();
	});
	game.round();
});

tap.test('draw a round', function (t) {
	var looser = new TestPlayer('rock');
	var players = [looser, new TestPlayer('rock')]
	var game = new Game(players, RPSValues);
	game.on('result', (decision, player) => {
		t.equal(decision, 'draw');
		t.end();
	});
	game.round();
});
