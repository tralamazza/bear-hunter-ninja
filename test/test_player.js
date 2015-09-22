"use strict";

const fs = require('fs');
const stream = require('stream');
const os = require('os');
const path = require('path');
const tap = require('tap');
const Player = require('../lib/player');


tap.test('create a RandomPlayer', function (t) {
	var player = new Player.RandomPlayer('r1');
	t.ok(player);
	t.equal(player.name, 'r1');
	t.end();
});

tap.test('player chooses a random value', function (t) {
	var player = new Player.RandomPlayer('r1');
	var values = new Map([['a', 'A']]);
	var promise = player.choose(values);
	t.ok(promise);
	promise.then((choice) => {
		t.equal(choice, 'A');
		t.end();
	});
});

tap.test('create stream player', function (t) {
	var player = new Player.StreamIOPlayer('p1');
	t.ok(player);
	t.equal(player.name, 'p1');
	t.end();
});

tap.test('stream player chooses values', function (t) {
	var input = new stream.Readable({ encoding: 'utf-8' });
	input._read = function noop() {}; 
	var output = fs.createWriteStream(path.join(os.tmpdir(), 'rps.fixture'));
	var player = new Player.StreamIOPlayer('p1', input, output);
	var values = new Map([['a', 'A']]);
	player.choose(values).then((choice) => {
		t.equal(choice, 'A');

		player.choose(values).then((choice) => {
			t.equal(choice, 'A');
			t.end();
		});
		input.push('b');
		input.push('a');
	});
	input.push('a');
});

