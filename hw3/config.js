/**
 * package that is used to the whole 'Giphy' project.
 * collects all constant values.
 */
const configPackage = {
	url: 'https://api.giphy.com/v1/gifs/search?',
	trendingUrl: 'https://api.giphy.com/v1/gifs/trending?',
	apiKey: 'aFFKTuSMjd6j0wwjpFCPXZipQbcnw3vB',
	defaultLabels: ["Internet Cats", "Meme's", "Typing", "Space", "Rick and Morty"],
	defaultLabelsName: 'nameForDefaultLabelsUsedInLocalStorage',
	maxNumLabels: 10
};

export default configPackage;