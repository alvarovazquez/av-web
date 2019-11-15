import SOCIAL_URLS from './_shared/constants.js';

export default {
	description: 'Opens my Twitter profile in a new tab.',
	output: () => [
		'Opening Twitter profile...'
	],
	action: () => window.open(SOCIAL_URLS.twitter, '_blank')
};
