# Over Engineered RPS

## definitions

+ a game is a series of rounds
+ a round is a single shot action, where each player must chose a value
+ a player wins a round by having the dominant value (draws are not counted)
+ the app ends when a player wins by single majority (2 out 3)

## install

	clone this repo
	npm install

## test

	npm test

## run

To start a game between 2 computer players

	npm start
	
	(or)
	
	node index

	
To start a game between a computer and a console player
	
	npm start Jose
	
	(or
	
	node index Bob


### notes

- The title 'Waste an hour having fund' I guess should read 'having fun'.
- The phrase 'Can I play a different game each time?' doesn't really make sense without first defining what a game is. I wrote my own definition.
- I chose Javascript (nodejs) because...
- ... I wanted to spend some time learning about ES6 ;)
- There are no runtime dependencies, only for testing (as specified).
