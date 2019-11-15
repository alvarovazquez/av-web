import SOCIAL_URLS from './_shared/constants.js';

export default {
	description: 'Opens my Linkedin profile in a new tab.',
	output: () => [
		'Opening Linkedin profile...'
	],
	action: () => window.open(SOCIAL_URLS.linkedin, '_blank')
};