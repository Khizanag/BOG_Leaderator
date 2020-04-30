import configPackage from "./config.js";

class ScoreManager{

	constructor(){
		this.score = 0;
		this.maxScore = this._getMaxScore();
		console.log("maxScore now is " + this.maxScore);
	}

	getScore(){
		return this.score;
	}

	getMaxScore(){
		return this.maxScore;
	}

	increaseScore(){
		this.score += configPackage.SCORE_STEP;
		this.tryMaxScoreUpdate();
	}

	tryMaxScoreUpdate() {
		if (this.maxScore < this.score) {
			this._updateMaxScore();
		}
	}

	resetScore(){
		this.score = 0;
	}

	/************************* Below are private functions /*************************/

	_getMaxScore(){
		const maxScore = JSON.parse(localStorage.getItem(configPackage.maxScoreKeyName));
		if(['', [], null].includes(maxScore)){
			this._setDefaultMaxScore();
			return configPackage.defaultScore;
		} else {
			return maxScore;
		}
	}

	_setDefaultMaxScore(){
		localStorage.setItem(configPackage.maxScoreKeyName, configPackage.defaultScore);
	}

	_updateMaxScore(){
		this.maxScore = this.score;
		localStorage.setItem(configPackage.maxScoreKeyName, this.score);
	}
}

export default ScoreManager;