import configPackage from "./config.js";

class ScoreManager{

	constructor(){
		this.score = 0;
		this.maxScore = this._getMaxScore();
	}

	/**
	 * @returns current score
	 */
	getScore(){
		return this.score;
	}

	/**
	 * @returns historycal max score
	 */
	getMaxScore(){
		return this.maxScore;
	}


	/**
	 * Increases score by the SCORE_STEP
	 */
	increaseScore(){
		this.score += configPackage.SCORE_STEP;
		this._tryMaxScoreUpdate();
	}

	/**
	 * @sets score to default score
	 */
	resetScore(){
		this.score = 0;
	}


	/************************* Below are private functions /*************************/

	/**
	 * @checks if score should be updated 
	 * and if so does
	 */
	_tryMaxScoreUpdate() {
		if (this.maxScore < this.score) {
			this._updateMaxScore();
		}
	}

	/**
	 * @returns historycal max score from the local storage
	 */
	_getMaxScore(){
		const maxScore = JSON.parse(localStorage.getItem(configPackage.maxScoreKeyName));
		if(['', [], null].includes(maxScore)){
			this._setDefaultMaxScore();
			return configPackage.defaultScore;
		} else {
			return maxScore;
		}
	}

	/**
	 * @used on the first run
	 * @sets default value for the historycal score
	 */
	_setDefaultMaxScore(){
		localStorage.setItem(configPackage.maxScoreKeyName, configPackage.defaultScore);
	}

	/**
	 * @updates local storage max score
	 */
	_updateMaxScore(){
		this.maxScore = this.score;
		localStorage.setItem(configPackage.maxScoreKeyName, this.score);
	}
}

export default ScoreManager;