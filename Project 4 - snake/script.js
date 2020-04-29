import configPackage from "./config.js";
// import ScoreManager from "./ScoreManager.js";

class SnakeGame {

	constructor(){
		// this._initCanvas();
		this.height = configPackage.numNodeInHeight;
		this.width = configPackage.numNodesInWidht;
		// this.scoreManager = new ScoreManager();
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
		this.body = [];
		for(let i = 0; i < configPackage.numDefaultNodes; i++){
			const newNode = this._getNewNode(0, i);
			this.body.push(newNode);
		}

		this._createAndDisplayFood();

		this.dirKey = configPackage.rightKey;
		// while(this.gameIsOn){
			this.interval = setInterval(() => {
				this._move()
			}, configPackage.defaultInterval);


			// this.gameIsOn = this._getRestartResponse();
		// }
	}

	_createAndDisplayFood(){
		let foodElem = document.createElement('div');
		foodElem.style.width = configPackage.nodeLen+'px';
		foodElem.style.height = configPackage.nodeLen+'px';
		const foodCoords = this._getNewFoodCoordinates();
		// console.log("foodCoords[0] " + foodCoords[0]);
		const top = (foodCoords[0] + 1) * configPackage.nodeLen;
		foodElem.style.top = top+'px';
		// console.log("top: " + top);
		// console.log("foodElem.style.top: " + foodElem.style.top);
		const left = (foodCoords[1] + 1) * configPackage.nodeLen;
		foodElem.style.left = left+'px';
		// console.log("foodElem.style.left: " + foodElem.style.left);
		foodElem.id = 'food';

		snake_canvas.append(foodElem);

		this.food = foodElem;
	}


	_getNewFoodCoordinates(){
		let x, y;
		do{
			x = Math.floor(Math.random() * configPackage.numNodesInWidht);
			y = Math.floor(Math.random() * configPackage.numNodesInHeight);
		} while(this.body.includes([x,y]));
		const result = [x, y];
		return result;
	}

	_getNewNode(row, col){
		const newNode = document.createElement('div');
		newNode.className = 'node';
		newNode.style.width = configPackage.nodeLen + 'px';
		newNode.style.height = configPackage.nodeLen + 'px';
		newNode.style.top = row * (1+configPackage.nodeLen) + 'px';
		newNode.style.left = col * (1+configPackage.nodeLen) + 'px';

		snake_body.append(newNode);

		return newNode;
	}

	_move(){
		console.log("snake will be moved ->");

		const newHead = this._getNewHead();
		// this.body.pop();
		if(this._moveIsWrong(newHead)){
			this._doWrongMoveWork();
		} else {
			this._doCorrectMoveWork(newHead);
		}

	}

	_getNewHead(){
		const dPair = this._getDiffPair();
		console.log("down: " + dPair[0] + "   right: " + dPair[1]);

		let tail = this.body.pop();
		console.log(typeof(tail));
		let topOffset = tail.offsetTop;
		topOffset += dPair[0] == 0 ? 0 : configPackage.nodeLen+1;

		let leftOffset = tail.offsetLeft;
		leftOffset += dPair[1] == 0 ? 0 : configPackage.nodeLen+1;
		// console.log("yOff: " + yOffset);

		tail.style.top = topOffset + 'px';
		tail.style.left = leftOffset + 'px';

		return tail;
	}

	_getColumnOfElement(element){
		const yOffset = element.offsetTop();
		return yOffset / (configPackage.nodeLen + 1);
	}

	_getRowOfElement(element){
		const xOffset = element.offsetLeft();
		return xOffset / (configPackage.nodeLen + 1);
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

		// _displaySnake();
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


const game = new SnakeGame();
// document.onkeydown = function (event) {
// 	if (game.isGoodMoveKey(event.keyCode)) {
// 		game.dirKey = event.keyCode;
// 		console.log("Key was changed to: "+ event.keyCode);
// 	}
// }
game.play();
