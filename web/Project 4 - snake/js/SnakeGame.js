import configPackage from "./config.js";
import ScoreManager from "./ScoreManager.js";
import Food from "./Food.js";
import SnakeBody from "./SnakeBody.js";

class SnakeGame {

	constructor(){
		this.height = configPackage.numNodesInHeight;
		this.width = configPackage.numNodesInWidth;
		this.heightInPxs = this.height * (configPackage.nodeLen+1)-1;
		this.widthInPxs  = this.width  * (configPackage.nodeLen+1)-1;
		this.scoreManager = new ScoreManager();
		this.food = new Food();
		this.body = new SnakeBody();
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

	/**
	 * Let's user pause the game.
	 * Game can be continued by 'Continue' button
	 */
	pause(){
		if(this.gameIsOn){
			this.gameIsOn = false;
			clearInterval(this.interval);
		}
		
	}

	/**
	 * Continues game if and only if it was stopped by 'Pause'
	 * If game is over it does nothing.
	 */
	continue(){
		if(!this.gameIsOn && !this.gameOver){
			this.gameIsOn = true;
			this.interval = setInterval(() => {
				this._move()
			}, configPackage.defaultInterval);
			
		}
    }
    

    /************************* Below are private functions /*************************/


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

	/**
	 * Does all of the stuffs to start the game.
	 * Make all initializations.
	 */
	_initGame(){
		this.gameIsOn = true;
		this.gameOver = false;

		this.body.resetBody();
		this.food.resetFood();
		this.food.dropFood(this.body.getBody());

		this.scoreManager.resetScore();
		this._updateScore();

		this.dirKey = configPackage.rightKey;
		this.nextDirKey = this.dirKey;
	}

	/**
	 * Mostly use method.
	 * @used in @setInterval, so it is called all the time
	 * If it is necessarry changes directions and then moves.
	 */
	_move(){
		if( Math.abs(this.dirKey-this.nextDirKey) != -2){
			this.dirKey = this.nextDirKey;
		}

		const newHead = this.body.getNewHead(this.dirKey);
		if(this._moveIsWrong(newHead)){

			this._doWrongMoveWork();
		} else {
			this._doCorrectMoveWork(newHead);
		}
	}

	/**
	 * checks if snake was collided into itself or any wall
	 * @param newNode -> node which should be added as a part of the snake 
	 */
	_moveIsWrong(newNode){
		return newNode.offsetTop < 0
			|| newNode.offsetTop >= this.heightInPxs
			|| newNode.offsetLeft < 0
			|| newNode.offsetLeft >= this.widthInPxs
			|| this.body.isBodyPart(newNode);
	}

	/**
	 * Does all stuff to completely finish game.
	 * Writes final texts and resets canvas.
	 */
	_doWrongMoveWork(){
		this.gameIsOn = false;
		this.gameOver = true;
		
		clearInterval(this.interval);

		snake_body.innerHTML = '';
		food.style.background = 'transparent';
		
		alert(`Your snake is dead!\nYou have LOST!\n\nYour Score: ${this.scoreManager.getScore()}\nMax Score: ${this.scoreManager.getMaxScore()}\n\nTo restart game just press "Start" button`);
	}

	/**
	 * Does all stuff to completely finish correct move.
	 * Adds new note in the back. and moves whole body.
	 * @param {} newHead ->  node which should be added as a part of the snake 
	 */
	_doCorrectMoveWork(newHead){
		this.body.pushFront(newHead);
		if(this.food.shouldBeEaten(newHead)){
			this._eat(newHead);
		}
	}

	// Just converts pixcels into index
	_pxsToIndex(pxs){
		return pxs / (configPackage.nodeLen+1);
	}

	/**
	 * Allows snake eat the food.
	 * Updates score
	 * @param {} newHead -> node which should be added as a part of the snake 
	 */
	_eat(newHead){
		const savedCoors = this.body.getSavedTailCoors();
		const row = this._pxsToIndex(savedCoors[0]);
		const col = this._pxsToIndex(savedCoors[1]);
		this.body.pushBackNewNode(row, col);

		this.scoreManager.increaseScore();
		this._updateScore();
		this.food.dropFood(this.body);
	}

	/**
	 * Updates score on the canvas.
	 * Updates Historycal max score also.
	 * Score is in the left bottom of the board.
	 */
	_updateScore(){
		let scoreValue = this.scoreManager.getScore();
		let maxScore = this.scoreManager.getMaxScore();
		score.innerHTML = 'Score: ' + scoreValue;
		max_score.innerHTML = 'Max Score: ' + maxScore;
	}
}

export default SnakeGame;