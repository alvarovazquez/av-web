import twitter from './implementation/command-twitter.js';
import about from './implementation/command-about.js';
import contact from './implementation/command-contact.js';
import linkedin from './implementation/command-linkedin.js';
import github from './implementation/command-github.js';
import error from './implementation/command-error.js';

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
	about,
	contact,
	linkedin,
	github,
	twitter,
	[COMMAND_MAP_ERROR_KEY]: error
};