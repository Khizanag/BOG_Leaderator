import configPackage from "./config.js";


class GiphyManager{
    constructor(){
        this.url = configPackage.url + '/search' + '?api_key=' + configPackage.apiKey;
        this.trendingUrl = configPackage.url + '/trending' + '?api_key=' + configPackage.apiKey;
        this._loadDefaultLabels();
    }

    async doSearch(){
        const searchData = Puller.pullData();
    }

    /* Private methods of GiphyManager class */
    _loadDefaultLabels(){
        for(const index in configPackage.defaultLabels){
            const label = configPackage.defaultLabels[index];
            LocalStorage.saveLabel(label);
        }
    }
}
class Puller {
    // static
}
class GiphyDisplayer{
    // static async drawGifs(){

    // }

}

class LocalStorage{

    static saveLabel(labelToSave){
        let labels = localStorage.getItem(configPackage.defaultLabelsName);
        if(labels == null)
            labels = [];// ? JSON.parse(localStorage.getItem(configPackage.defaultLabelsName)) : [];
        else
            labels = JSON.parse(labels);
            alert(labels.length);
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

/* ---------- Code to run ---------- */

const manager = new GiphyManager();