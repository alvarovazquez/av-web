import SOCIAL_URLS from './_shared/constants.js';

export default {
	description: 'Shows the contact information in case you want to reach me.',
	output: () => [
		`You can reach me through email at <strong><a href="${SOCIAL_URLS.email}" title="Send me an email" target="_blank">${SOCIAL_URLS.email}</strong>.`,
		`You can also find me on the following sites:
		<ul>
			<li><strong>Linkedin:</strong> <a href="${SOCIAL_URLS.linkedin}" title="Go to my Linkedin profile" target="_blank">${SOCIAL_URLS.linkedin}</a></li>
			<li><strong>GitHub:</strong> <a href="${SOCIAL_URLS.github}" title="Go to my GitHub profile" target="_blank">${SOCIAL_URLS.github}</a></li>
			<li><strong>Twitter:</strong> <a href="${SOCIAL_URLS.twitter}" title="Go to my Twitter profile" target="_blank">${SOCIAL_URLS.twitter}</a></li>
		</ul>`
	]
};