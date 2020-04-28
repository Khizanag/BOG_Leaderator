import configPackage from "./config.js";
import LocalStorage from "./LocalStorage.js";
import GiphyPuller from "./GiphyPuller.js";
import GiphyDisplayer from "./GiphyDisplayer.js";


/**
 *  This is the base class for 'Giphy Search' assignment.
 *  This class connects GiphyPuller, GiphyDisplayer and LocalStorage classes.
 */
class GiphyManager{
	// does default work once
	constructor(){
		GiphyManager.loadDefaultLabels();
		GiphyManager.manageSavedLabelsDisplay();
	}

	/**
	 * @called after clicking on 'Submit' or 'Trendings'
	 * @param toSearch -> string, wchich should be searched
	 */
	static async doSearch(toSearch){
		GiphyManager.manageSearchDraw(toSearch);
		GiphyManager.saveLabel(toSearch);
	}

	/**
	 * Is called once - at the beginning.
	 * saves all default string values into local storage
	 */
	static loadDefaultLabels(){
		for(const index in configPackage.defaultLabels){
			const label = configPackage.defaultLabels[index];
			LocalStorage.saveLabel(label);
		}
	}

	/**
	 * Does all work to do search and then display it
	 * @param toSearch - > string, wchich should be searched
	 */
	static async manageSearchDraw(toSearch){
		const pulledData = await GiphyPuller.pullData(toSearch);
		GiphyDisplayer.displayGifs(pulledData);
	}

	/**
	 * Updates saved labels row
	 */
	static manageSavedLabelsDisplay(){
		const savedLabels = JSON.parse(localStorage.getItem(configPackage.defaultLabelsName));
		if(savedLabels == null)
			return; // TODO
		searched_items.innerHTML = '';
		savedLabels.map( (elem) => {
			GiphyDisplayer.addSavedLabel(elem);
		});
	}

	static saveLabel(elem){
		const labels = JSON.parse(localStorage.getItem(configPackage.defaultLabelsName));
		if(!labels.includes(elem) && elem != ''){
			LocalStorage.saveLabel(elem);
			GiphyManager.manageSavedLabelsDisplay();
		}
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