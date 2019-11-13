const SOCIAL_URLS = {
	linkedin: 'https://www.linkedin.com/in/alvarovazquezgarcia',
	github: 'https://github.com/alvarovazquez'
};

const COMMAND_MAP_ERROR_KEY = '~error';
const COMMAND_MAP = {
	'help': {
		output: [
			'This is the \'help\' command',
			'Here is the list of available commands:',
			'help: You know this one :).',
			'contact: Shows the contact information in case you want to reach me.',
			'linkedin: Opens my Linkedin profile in a new tab',
			'github: Opens my GitHub profile in a new tab'
		]
	},
	'contact': {
		output: [
			'TBI'
		]
	},
	'linkedin': {
		output: [
			'Opening Linkedin profile...'
		],
		action: () => window.open(SOCIAL_URLS.linkedin, '_blank')
	},
	'github': {
		output: [
			'Opening GitHub profile...'
		],
		action: () => window.open(SOCIAL_URLS.github, '_blank')
	},
	'~error': {
		output: [
			'Command not found',
			'Use \'help\' for a list of available commands.'
		]
	}
};

export function interpret(command) {
	const commandInfo = COMMAND_MAP[command];

	if (command) {
		if (commandInfo) {
			if (commandInfo.action) {
				commandInfo.action();
			}
	
			return commandInfo.output;
		}
	
		return COMMAND_MAP[COMMAND_MAP_ERROR_KEY].output;
	}
}