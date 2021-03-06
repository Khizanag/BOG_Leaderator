import LocalStorage from "./LocalStorage.js";
import GiphyManager from "./script.js";

class GiphyDisplayer {
    /**
     * @param pulledData -> data which contains info for all of the gifs
     * @uses displayGif
     */
    static displayGifs(pulledData) {
        const giphyItemsElem = document.getElementsByClassName("giphy-items")[0];
        giphyItemsElem.innerHTML = '';
        pulledData.map((element) => {
            this.displayGif(giphyItemsElem, element);
        });
    }

    /**
     *
     * @param giphyItemsElem -> element where new item shiuld be added
     * @param element -> each element of pulledData(array)
     */
    static displayGif(giphyItemsElem, element) {
        giphyItemsElem.innerHTML += `<div class='giphy-item'>
											<img class='giphy-image' src='` + element.images.fixed_height.url + `'></img>
											<div class='giphy-rating'>Rating: ` + element.rating + `</div>
										</div>`;
    }

    /**
     * @param string name fo elem which should be added into saved items
     * @returns void
     */
    static addSavedLabel(elem) {
        let savedLabelItem = document.createElement('div');
        savedLabelItem.className = 'saved-label-item';
        let searchedLabel = GiphyDisplayer.getNewLabel(elem);
        let x = GiphyDisplayer.getXButton();

        searched_items.append(savedLabelItem);
        savedLabelItem.append(searchedLabel);
        savedLabelItem.append(x);
    }

    /**
     * @used for displaying new saved label
     * @returns new element for deleting saved label @type Element
     */
    static getNewLabel(elem) {
        let searchedLabel = document.createElement('input');
        searchedLabel.type = 'button';
        searchedLabel.className = 'btn saved-labels-button';
        searchedLabel.value = elem;
        searchedLabel.addEventListener('click', function () {
            GiphyManager.doSearch(this.value);
        });
        return searchedLabel;
    }

    /**
     * @used for displaying new saved label
     * @returns new element for deleting saved label @type Element
     */
    static getXButton() {
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

export default GiphyDisplayer;