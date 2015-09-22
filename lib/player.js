"use strict";

// Stream Input/Output driven player (i.e. process.stdin/process.stdout)
class StreamIOPlayer {
	constructor(name, istream, ostream) {
		this.name = name;
		this.istream = istream;
		this.ostream = ostream;
	}

	choose(values) {
		return new Promise((resolve, reject) => {
			var eh = (text) => {
				text = text.trim(); // trim ws and CRLF
				var choice = values.get(text);
				if (!choice) {
					this.ostream.write('Invalid choice: ' + text);
					this.ostream.write('\nTry again ' + this.name + ': ');
				} else {
					this.istream.removeListener('data', eh);
					resolve(choice);
				}
			}
			this.istream.on('data', eh);
			this.ostream.write(values.toString());
			this.ostream.write('\nChose a value ' + this.name + ': ');
		});
	}
}

// Always chooses a value at random
class RandomPlayer {
	constructor(name) {
		this.name = name;
	}

	choose(values) {
		return new Promise((resolve, reject) => {
			var i = Math.floor(Math.random() * values.size);
			var it = values.keys();
			while (i-- > 0) {
				it.next();
			}
			resolve(values.get(it.next().value));
		});
	}
}

module.exports = {
	StreamIOPlayer: StreamIOPlayer,
	RandomPlayer: RandomPlayer
};
