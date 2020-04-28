import configPackage from "./config.js";

/**
 * @used for working with localStorage
 */
class LocalStorage {

    /**
     * @param labelToSave -> string that should be saved to the local storage
     */
    static saveLabel(labelToSave) {
        let labels = localStorage.getItem(configPackage.defaultLabelsName);
        labels = (labels) ? JSON.parse(labels) : [];
        if (!labels.includes(labelToSave)) {
            if (labels.length >= configPackage.maxNumLabels)
                labels.shift();
            labels.push(labelToSave);
            localStorage.setItem(configPackage.defaultLabelsName, JSON.stringify(labels));
        }
    }

    /**
     * @param label -> string that should be deleted from local storage
     */
    static removeLabel(label) {
        let labels = JSON.parse(localStorage.getItem(configPackage.defaultLabelsName));
        labels.splice(labels.indexOf(label), 1);
        localStorage.setItem(configPackage.defaultLabelsName, JSON.stringify(labels));
    }

}

export default LocalStorage; // is used in 'GiphyManager' and 'GiphyDisplayer'