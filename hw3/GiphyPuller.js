import configPackage from "./config.js";

class GiphyPuller {
    static async pullData(input) {

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

export default GiphyPuller;