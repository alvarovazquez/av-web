import SOCIAL_URLS from './_shared/constants.js';

export default {
	description: 'Opens my GitHub profile in a new tab.',
	output: () => [
		'Opening GitHub profile...'
	],
	action: () => window.open(SOCIAL_URLS.github, '_blank')
};