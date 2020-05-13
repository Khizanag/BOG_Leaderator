import configPackage from "./config.js";

/**
 * This class is used for just pulling all of the gifs
 * which are linked to the 'input'
 */
class GiphyPuller {

    /**
     * pulls data from url
     * @param input -> string which represents label, that was searched
     * @returns pulled data, actually is array
     */
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