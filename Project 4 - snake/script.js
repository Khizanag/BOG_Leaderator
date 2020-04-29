import configPackage from "./config.js";
import ScoreManager from "./ScoreManager.js";

class Snake {

	constructor(){
		// this._initCanvas();
		this.height = configPackage.numNodeInHeight;
		this.width = configPackage.numNodesInWidht;
		this.scoreManager = new ScoreManager();
		this.gameIsOn = true;
	}

	isGoodMoveKey(key){
		console.log("isGood -> key: " + key);
		return (key <= configPackage.downKey
			&& key >= configPackage.leftKey
			&& Math.abs(key - this.dirKey) != 2);
	}

	// _initCanvas(){
	//     let canvas = document.createElement('div');
	//     canvas.className = 'canvas';
	//     canvas.wid
	// }

	play(){
		this._playNewGame();
	}

	_playNewGame(){
		this.body = [
			[0, 3],
			[0, 2],
			[0, 1],
			[0, 0]
		];
		// this.play();
		this.dirKey = configPackage.rightKey;
		// while(this.gameIsOn){
			this.interval = setInterval(() => {
				this._move()
			}, configPackage.defaultInterval);

			// this.gameIsOn = this._getRestartResponse();
		// }
	}

	_move(){
		console.log("snake will be moved ->");

		const newHead = this._getNewHead();
		this.body.pop();
		if(this._moveIsWrong(newHead)){
			this._doWrongMoveWork();
		} else {
			this._doCorrectMoveWork(newHead);
		}

	}

	_getNewHead(){
		let newHead = Object.assign([], this.body[0]);
		const dPair = this._getDiffPair();
		console.log("down: " + dPair[0] + "   right: " + dPair[1]);
		newHead[0] += dPair[0];
		newHead[1] += dPair[1];
		return newHead;
	}

	_moveIsWrong(newNode){
		return newNode[0] < 0
			|| newNode[0] >= this.height
			|| newNode[1] < 0
			|| newNode[1] >= this.width
			|| this.body.includes(newNode);
	}

	_doWrongMoveWork(){
		console.log("move was wrong game is over");
		this._stopGame();
		this.gameIsOn = this._getRestartResponse();
		if (this.gameIsOn)
			this._playNewGame();
	}

	_doCorrectMoveWork(newHead){
		this.body.unshift(newHead);

		this.body.map((elem) => {
			console.log(elem)
		});
		console.log("body was moved");
	}

	_stopGame(){
		clearInterval(this.interval);
		this.gameIsOn = false;
		console.log("interval is over_____");
	}

	_updateCanvas(){
		console.log("canvas is going to be updated");


		console.log("canvas was updated");
	}

	/**
	 * @used for decomposition
	 * @uses this.dirKey
	 * @returns difference bewteen first and possible new node's coordinates
	 */
	_getDiffPair(){
		switch (this.dirKey) {
			case configPackage.leftKey	: return [0, -1];
			case configPackage.topKey 	: return [-1, 0];
			case configPackage.rightKey	: return [0, 1];
			case configPackage.downKey	: return [1, 0];

			default :
				console.log("Error occured in getDiffPair -> wrong direction");
				return null; // TODO წესით არაა საჭირო
		}
	}

	/**
	 * asks for user for new game and
	 * @returns boolean wants user new game or not
	 */
	_getRestartResponse() {
		console.log("-------------------------------------------------------------------------------------");
		return true; // TODO
	}
}

// const snake = new Snake(configPackage.canvasWidth, configPackage.canvasHeight);

const snake = new Snake();
document.onkeydown = function (event) {
	if (snake.isGoodMoveKey(event.keyCode)){
		snake.dirKey = event.keyCode;
		console.log("Key was changed to: "+ event.keyCode);
	}
}
snake.play();
