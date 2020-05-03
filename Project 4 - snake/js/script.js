import SnakeGame from "./SnakeGame.js";

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

/* Set 'onclick'-s on buttons */ 

restart_button.onclick = () => {
	game.play();
}

pause_button.onclick = () => {
	game.pause();
}

continue_button.onclick = () => {
	game.continue();
}

/* Run the game, Allow user to play */
game.play();