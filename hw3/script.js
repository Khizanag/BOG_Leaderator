import configPackage from "./config.js";
import LocalStorage from "./LocalStorage.js";
import GiphyPuller from "./GiphyPuller.js";
import GiphyDisplayer from "./GiphyDisplayer.js";


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

export default GiphyManager;


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