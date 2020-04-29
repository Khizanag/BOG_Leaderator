import configPackage from "./config.js";
// import ScoreManager from "./ScoreManager.js";

class SnakeGame {

	constructor(){
		this.height = configPackage.numNodesInHeight;
		this.width = configPackage.numNodesInWidth;
		this.heightInPxs = this.height * (configPackage.nodeLen+1)-1;
		this.widthInPxs  = this.width  * (configPackage.nodeLen+1)-1;
		// this.scoreManager = new ScoreManager();
		this.gameIsOn = true;
	}

	/**
	 * Checks if pressed button was arrow or not.
	 * @param key -> keyCode of pressed key
	 * @returns true if pressed button was arrow and it is not
	 * 				oppose of the current direction
	 * 			otherwise returns false
	 */
	isGoodMoveKey(key){
		return (key <= configPackage.downKey
			&& key >= configPackage.leftKey
			&& Math.abs(key - this.dirKey) != 2);
	}

	/**
	 * Comportable function for user to call.
	 * @uses _playNewGame
	 */
	play(){
		this._playNewGame();
	}

	/**
	 * Starts new game.
	 * Resets all values and runs whole game.
	 */
	_playNewGame(){
		this._createBody();
		this._createFood();

		this.dirKey = configPackage.rightKey;

		this.interval = setInterval(() => {
			this._move()
		}, configPackage.defaultInterval);

	}

	/**
	 * Creates snake body numDefauldNodes nodes 
	 */
	_createBody(){
		this._resetBody();
		for (let i = configPackage.numDefaultNodes-1; i >= 0; i--) {
			const newNode = this._getNewNode(0, i);
			this.body.push(newNode);
		}
	}

	/**
	 * If this is not the first game and snake has already had body
	 * this method deletes older nodes.
	 * Otherwise just sets empty array to body
	 */
	_resetBody(){
		this.body = [];
		snake_body.innerHTML = '';
	}

	_createFood(){
		if(this.food == undefined){
			this._createFoodElement();
		}
		
		const foodCoords = this._getNewFoodCoordinates();

		const top = foodCoords[0] * (1+configPackage.nodeLen);
		this.food.style.top = top +'px';

		const left = foodCoords[1] * (1+configPackage.nodeLen);
		this.food.style.left = left+'px';

		snake_canvas.append(this.food);
	}

	_createFoodElement(){
		this.food = document.createElement('div');
		this.food.style.width = configPackage.nodeLen+'px';
		this.food.style.height = configPackage.nodeLen+'px';
		this.food.id = 'food';
	}

	/**
	 * @returns array of two numbers, 0th corre
	 */
	_getNewFoodCoordinates(){
		let x, y;
		do{
			x = Math.floor(Math.random() * configPackage.numNodesInWidth);
			y = Math.floor(Math.random() * configPackage.numNodesInHeight);
		} while(this.body.includes([x,y]));
		return [y, x];
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
		// console.log("snake will be moved ->");

		const newHead = this._getNewHead();
		if(this._moveIsWrong(newHead)){
			console.log("___move was wrong!!!");
			this._doWrongMoveWork();
		} else {

			this._doCorrectMoveWork(newHead);
		}

	}

	_getNewHead(){
		const dPair = this._getDiffPair();
		// console.log("down: " + dPair[0] + "   right: " + dPair[1]);

		const head = this.body[0];
		let tail = this.body.pop();
		// console.log(typeof(tail));
		let topOffset = head.offsetTop;
		topOffset += dPair[0] == 0 ? 0 : dPair[0]*(configPackage.nodeLen+1);

		let leftOffset = head.offsetLeft;
		leftOffset += dPair[1] == 0 ? 0 : dPair[1]*(configPackage.nodeLen+1);
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
		console.log("newNode.offsetTop: " + newNode.offsetTop);
		console.log("this.heightInPxs : " + this.heightInPxs);
		return newNode.offsetTop < 0
			|| newNode.offsetTop >= this.heightInPxs
			|| newNode.offsetLeft < 0
			|| newNode.offsetLeft >= this.widthInPxs
			|| this._isBodyPart(newNode);
	}

	_isBodyPart(newHead){
		// console.log("nodeTop: " + node.offsetTop + '     nodeLeft: '+ node.offsetLeft);
		for(let i in this.body){
			console.log("i: "+i+ '	')
			let node = this.body[i];
			if(node.offsetLeft == newHead.offsetLeft
				&& node.offsetTop == newHead.offsetTop)
				return true;
		}
		return false;
	}

	_doWrongMoveWork(){
		// console.log("move was wrong game is over");
		this._stopGame();
		this.gameIsOn = this._getRestartResponse();
		if (this.gameIsOn)
			this._playNewGame();
	}

	_doCorrectMoveWork(newHead){
		this.body.unshift(newHead);

		// this.body.map((elem) => {
		// 	console.log(elem)
		// });

		// _displaySnake();
		// console.log("body was moved");
	}

	_stopGame(){
		clearInterval(this.interval);
		this.gameIsOn = false;
		// console.log("interval is over_____");
	}

	/**
	 * @used for decomposition
	 * @uses this.dirKey
	 * @returns difference bewteen first and possible new node's coordinates
	 */
	_getDiffPair(){
		// console.log("%%%%%_____this.diKey: "+this.dirKey);
		switch (this.dirKey) {
			case configPackage.leftKey	: return [0, -1];
			case configPackage.upKey 	: return [-1, 0];
			case configPackage.rightKey	: return [0, 1];
			case configPackage.downKey	: return [1, 0];

			default :
				console.log("Error occured in getDiffPair -> wrong direction");
				return [];
		}
	}

	/**
	 * asks for user for new game and
	 * @returns boolean wants user new game or not
	 */
	_getRestartResponse() {
		return true; // TODO
	}
}


/**
 * Runable part of the code. 
 * Allows user to play 'Snake' game
 */

const game = new SnakeGame();
document.onkeydown = function (event) {
	if (game.isGoodMoveKey(event.keyCode)) {
		game.dirKey = event.keyCode;
	}
}
game.play();
