"use strict";

class RPS extends Map {
	constructor() {
		super([
			['r', 'rock'], ['p', 'paper'], ['s', 'scissors']
		]);
		this.values['rock'] = 0;
		this.values['paper'] = 1;
		this.values['scissors'] = 2;
	}

	toString() {
		return 'r => rock, p => paper, s => scissors';
	}

	// returns 0 if v1 equals v2
	// returns > 0 if v1 beats v2
	// returns < 0 if v2 beats v1
	compare(v1, v2) {
		const d = this.values[v1] - this.values[v2];
		if (Math.abs(d) === 2) {
			return -d;
		} else
			return d;
	}
}

module.exports = new RPS();
