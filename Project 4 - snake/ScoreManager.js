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

	tryMaxScoreUpdate() {
		if (this.maxScore < this.score) {
			this._updateMaxScore();
		}
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

	}
}

export default ScoreManager;