"use strict";

const tap = require('tap');
const RPSValues = require('../lib/rps');

tap.test('require RPS values', function (t) {
	t.ok(RPSValues);
	t.ok(RPSValues.toString());
	t.end();
});

tap.test('rock > scissors', function (t) {
	t.ok(RPSValues.compare('rock', 'scissors') > 0);
	t.ok(RPSValues.compare('scissors', 'rock') < 0);
	t.end();
});

tap.test('scissors > paper', function (t) {
	t.ok(RPSValues.compare('scissors', 'paper') > 0);
	t.ok(RPSValues.compare('paper', 'scissors') < 0);
	t.end();
});

tap.test('paper > rock', function (t) {
	t.ok(RPSValues.compare('paper', 'rock') > 0);
	t.ok(RPSValues.compare('rock', 'paper') < 0);
	t.end();
});

tap.test('rock, paper scissors draw', function (t) {
	t.ok(RPSValues.compare('rock', 'rock') == 0);
	t.ok(RPSValues.compare('paper', 'paper') == 0);
	t.ok(RPSValues.compare('scissors', 'scissors') == 0);
	t.end();
});
