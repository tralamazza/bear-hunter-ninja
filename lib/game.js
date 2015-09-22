"use strict";

const EventEmitter = require('events');

class Game extends EventEmitter {
	constructor(players, values) {
		super();
		this.players = players;
		this.values = values;
	}

	round() {
		// collect each player choice in a collection fo promises
		const choices_p = this.players.map((player) => player.choose(this.values));
		// wait for all promises
		Promise.all(choices_p).then((choices) => {
			// inform players of their choices
			for (let i = 0; i < choices.length; i++) {
				this.emit('choice', choices[i], this.players[i]);
			}
			const result = this.values.compare(choices[0], choices[1]);
			if (result > 0)
				this.emit('result', 'win', this.players[0]);
			else if (result < 0)
				this.emit('result', 'win', this.players[1]);
			else
				this.emit('result', 'draw');
		});
	}
}

module.exports = Game;
