const SOCIAL_URLS = {
	linkedin: 'https://www.linkedin.com/in/alvarovazquezgarcia',
	github: 'https://github.com/alvarovazquez'
};

export const COMMAND_MAP_ERROR_KEY = '~error';
export const COMMAND_MAP = {
	'help': {
		description: 'You know this one :).',
		output: () => {
			const header = [
				'This is the \'help\' command',
				'Here is the list of available commands:'
			];

			let output = header.concat(
				Object.keys(COMMAND_MAP).reduce((acc, commandName) => {
					const command = COMMAND_MAP[commandName];

					if (!command.hidden) {
						acc.push(`${commandName}: ${command.description}`);
					}

					return acc;
				}, [])
			);

			return output;
		}
	},
	'contact': {
		description: 'Shows the contact information in case you want to reach me.',
		output: () => [
			'TBI'
		]
	},
	'linkedin': {
		description: 'Opens my Linkedin profile in a new tab.',
		output: () => [
			'Opening Linkedin profile...'
		],
		action: () => window.open(SOCIAL_URLS.linkedin, '_blank')
	},
	'github': {
		description: 'Opens my GitHub profile in a new tab.',
		output: () => [
			'Opening GitHub profile...'
		],
		action: () => window.open(SOCIAL_URLS.github, '_blank')
	},
	'~error': {
		hidden: true,
		output: () => [
			'Command not found',
			'Use \'help\' for a list of available commands.'
		]
	}
};