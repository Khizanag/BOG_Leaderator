import configPackage from "./config.js";
import ScoreManager from "./ScoreManager.js";

class SnakeGame {

	constructor(){
		this.height = configPackage.numNodesInHeight;
		this.width = configPackage.numNodesInWidth;
		this.heightInPxs = this.height * (configPackage.nodeLen+1)-1;
		this.widthInPxs  = this.width  * (configPackage.nodeLen+1)-1;
		this.scoreManager = new ScoreManager();
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
		if(!this.gameIsOn)
			this._playNewGame();
	}

	pause(){
		if(this.gameIsOn){
			this.gameIsOn = false;
			clearInterval(this.interval);
		}
		
	}

	continue(){
		if(!this.gameIsOn && !this.gameOver){
			this.gameIsOn = true;
			this.interval = setInterval(() => {
				this._move()
			}, configPackage.defaultInterval);
			
		}
	}

	/**
	 * Starts new game.
	 * Resets all values and runs whole game.
	 */
	_playNewGame(){
		this._initGame();
	
		this.interval = setInterval(() => {
			this._move();
		}, configPackage.defaultInterval);
	}

	_initGame(){
		this.gameIsOn = true;
		this.gameOver = false;
		this._createBody();
		this._createFood();
		this.scoreManager.resetScore();
		this._updateScore();
		this.dirKey = configPackage.rightKey;
		this.nextDirKey = this.dirKey;
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
		let isFirstGame = false;
		if(this.food == undefined){
			isFirstGame = true;
			this._createFoodElement();
		}
		this.food.style.background = 'red';
		this._dropFood();

		if(isFirstGame)
			snake_canvas.append(this.food);
	}

	_createFoodElement(){
		this.food = document.createElement('div');
		this.food.style.width = configPackage.nodeLen+'px';
		this.food.style.height = configPackage.nodeLen+'px';
		this.food.id = 'food';
	}

	
	_dropFood(){
		const foodCoords = this._getNewFoodCoordinates();

		const top = foodCoords[0] * (1+configPackage.nodeLen);
		this.food.style.top = top +'px';

		const left = foodCoords[1] * (1+configPackage.nodeLen);
		this.food.style.left = left+'px';
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
		console.log('getNewNode: row: ' + row + '     col: ' + col);
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
		if( Math.abs(this.dirKey-this.nextDirKey) != -2){
			this.dirKey = this.nextDirKey;
		}
		const newHead = this._getNewHead();

		if(this._moveIsWrong(newHead)){
			this._doWrongMoveWork();
		} else {
			this._doCorrectMoveWork(newHead);
		}
	}

	_getNewHead(){
		const dPair = this._getDiffPair();
		const head = this.body[0];
		let tail = this.body.pop();

		this.savedTailCoors = Object.assign([], [tail.offsetTop, tail.offsetLeft]);

		let topOffset = head.offsetTop;
		topOffset += dPair[0] == 0 ? 0 : dPair[0]*(configPackage.nodeLen+1);

		let leftOffset = head.offsetLeft;
		leftOffset += dPair[1] == 0 ? 0 : dPair[1]*(configPackage.nodeLen+1);

		tail.style.top = topOffset + 'px';
		tail.style.left = leftOffset + 'px';
		return tail;
	}

	_moveIsWrong(newNode){
		return newNode.offsetTop < 0
			|| newNode.offsetTop >= this.heightInPxs
			|| newNode.offsetLeft < 0
			|| newNode.offsetLeft >= this.widthInPxs
			|| this._isBodyPart(newNode);
	}

	_isBodyPart(newHead){
		for(let i in this.body){
			let node = this.body[i];
			if(node.offsetLeft == newHead.offsetLeft
				&& node.offsetTop == newHead.offsetTop)
				return true;
		}
		return false;
	}

	_doWrongMoveWork(){
		this.gameIsOn = false;
		this.gameOver = true;
		
		clearInterval(this.interval);

		snake_body.innerHTML = '';
		this.food.style.background = 'transparent';
		
		alert(`Your snake is dead!\nYou have LOST!\n\nYour Score: ${this.scoreManager.getScore()}\nMax Score: ${this.scoreManager.getMaxScore()}\n\nTo restart game just press "Start" button`);
	}

	_doCorrectMoveWork(newHead){
		this.body.unshift(newHead);
		if(newHead.offsetLeft == this.food.offsetLeft
			&& newHead.offsetTop == this.food.offsetTop){
			this._eat(newHead);
		}
	}

	_pxsToIndex(pxs){
		return pxs / (configPackage.nodeLen+1);
	}

	_eat(newHead){
		
		const row = this._pxsToIndex(this.savedTailCoors[0]);
		const col = this._pxsToIndex(this.savedTailCoors[1]);
		const addedNode = this._getNewNode(row, col);
		this.body.push(addedNode);

		this.scoreManager.increaseScore();

		this._updateScore();

		this._dropFood();
	}

	_updateScore(){
		let scoreValue = this.scoreManager.getScore();
		let maxScore = this.scoreManager.getMaxScore();
		score.innerHTML = 'Score: ' + scoreValue;
		max_score.innerHTML = 'Max Score: ' + maxScore;
	}

	/**
	 * @used for decomposition
	 * @uses this.dirKey
	 * @returns difference bewteen first and possible new node's coordinates
	 */
	_getDiffPair(){
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
}


/**
 * Runable part of the code. 
 * Allows user to play 'Snake' game
 */

const game = new SnakeGame();
document.onkeydown = function (event) {
	if (game.isGoodMoveKey(event.keyCode)) {
		game.nextDirKey = event.keyCode;
	}
}

restart_button.onclick = () => {
	console.log("restart");
	game.play();
}

pause_button.onclick = () => {
	game.pause();
}

continue_button.onclick = () => {
	game.continue();
}
game.play();
