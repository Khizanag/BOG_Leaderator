import configPackage from "./config.js";


/**
 *  This is the base class for 'Giphy Search' assignment.
 *  This class connects GiphyPuller, GiphyDisplayer and LocalStorage classes.
 */
class GiphyManager{
	constructor(){
		GiphyManager._loadDefaultLabels();
		GiphyManager.manageSavedLabelsDisplay();
	}

	static async doSearch(toSearch){
		GiphyManager._manageSearchDraw(toSearch);
		GiphyManager._saveLabel(toSearch);
	}

	/* Private methods of GiphyManager class */
	static _loadDefaultLabels(){
		for(const index in configPackage.defaultLabels){
			const label = configPackage.defaultLabels[index];
			LocalStorage.saveLabel(label);
		}
	}

	static async _manageSearchDraw(toSearch){
		const pulledData = await GiphyPuller.pullData(toSearch);
		GiphyDisplayer.displayGifs(pulledData);
	}

	static manageSavedLabelsDisplay(){
		const savedLabels = JSON.parse(localStorage.getItem(configPackage.defaultLabelsName));
		if(savedLabels == null)
			return; // TODO
		searched_items.innerHTML = '';
		savedLabels.map( (elem) => {
			GiphyDisplayer.addSavedLabel(elem);
		});
	}

	static _saveLabel(elem){
		const labels = JSON.parse(localStorage.getItem(configPackage.defaultLabelsName));
		if(!labels.includes(elem)){
			LocalStorage.saveLabel(elem);
		}

		GiphyManager.manageSavedLabelsDisplay();
	}
}

class GiphyPuller {
	static async pullData(input){

		 const params = new URLSearchParams();
		 params.append('method', 'GET');
		 params.append('api_key', configPackage.apiKey);
		 params.append('format', 'json');

		 if (input != '') params.append('q', input);
		 const response = await fetch((input == '' ? configPackage.trendingUrl : configPackage.url) + params);
		 const result = await response.json();
		 return result.data;

	}
}

class GiphyDisplayer{
	static displayGifs(pulledData){
		const giphyItemsElem = document.getElementsByClassName("giphy-items")[0];
		giphyItemsElem.innerHTML = '';
		pulledData.map((element) => { // TODO
			this.displayGif(giphyItemsElem, element);
		});
	}

	static displayGif(giphyItemsElem, element){
		giphyItemsElem.innerHTML += `<div class='giphy-item'>
											<img class='giphy-image' src='` + element.images.fixed_height.url + `'></img>
											<div class='giphy-rating'>Rating: ` + element.rating + `</div>
										</div>`;
	}

	static addSavedLabel(elem){
		let savedLabelItem = document.createElement('div');
		savedLabelItem.className = 'saved-label-item';
		let searchedLabel = GiphyDisplayer.getNewLabel(elem);
		let x = GiphyDisplayer.getXButton();

		searched_items.append(savedLabelItem);
		savedLabelItem.append(searchedLabel);
		savedLabelItem.append(x);
	}

	static getNewLabel(elem){
		let searchedLabel = document.createElement('input');
		searchedLabel.type = 'button';
		searchedLabel.className = 'btn saved-labels-button';
		searchedLabel.value = elem;
		searchedLabel.addEventListener('click', function () {
			GiphyManager.doSearch(this.value);
		});
		return searchedLabel;
	}

	static getXButton(){
		let x = document.createElement('input');
		x.type = 'button';
		x.className = 'x';
		x.value = '✘';
		x.addEventListener('click', function () {
			console.log(this.value);
			const label = this.parentElement.children[0].value;
			LocalStorage.removeLabel(label);
			GiphyManager.manageSavedLabelsDisplay();
		});
		return x;
	}

}

class LocalStorage{

	static saveLabel(labelToSave){
		let labels = localStorage.getItem(configPackage.defaultLabelsName);
		labels = (labels) ? JSON.parse(labels) : [];
		if(!labels.includes(labelToSave)){
			if(labels.length >= configPackage.maxNumLabels)
				labels.shift();
			labels.push(labelToSave);
			localStorage.setItem(configPackage.defaultLabelsName, JSON.stringify(labels));
		}
	}

	static removeLabel(label){
		let labels = JSON.parse(localStorage.getItem(configPackage.defaultLabelsName));
		labels.splice(labels.indexOf(label), 1);
		localStorage.setItem(configPackage.defaultLabelsName, JSON.stringify(labels));
	}

}

/* ---------- Code which runs the code ---------- */

const manager = new GiphyManager();

/* set button click actions */

search_button.onclick = () => {
	const toSearch = search_text_field.value;
	if(toSearch != '')
		GiphyManager.doSearch(toSearch);
};

trending_button.onclick = () => {
	GiphyManager.doSearch('');
};