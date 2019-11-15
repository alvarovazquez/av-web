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
		arguments: [
			{
				name: '&lt;command name&gt;',
				description: 'The name of the command you need help with.'
			}
		],
		output: (args) => {
			const header = [
				'This is the \'help\' command',
				'Here is the list of available commands:'
			];
			const commandName = args && args[0];
			const errorOutput = [
				`Command <strong>${commandName}</strong> not found.`,
				'Use <strong>help</strong> to get a list of all available commands.'
			];
			let output;

			if (commandName) {
				let command = COMMAND_MAP[commandName];
				if (command) {
					let args;
					if (command.arguments && command.arguments.length) {
						args = [
							'Arguments:',
							`<table>
								<tbody>
									${command.arguments.map(arg =>
										`<tr><td><em>${arg.name}</em></td><td>${arg.description}</td></tr>`
									).join('')}
								</tbody>
							</table>`
						];
					}
					output = [
						command.description,
						...args
					];
				} else {
					output = errorOutput;
				}
			} else {
				output = header;
				output.push(
					`<table>
						<tbody>
							${
								Object.keys(COMMAND_MAP).reduce((acc, key) => {
									const command = COMMAND_MAP[key];
				
									if (!command.hidden) {
										acc += `<tr><td><em>${key}</em></td><td>${command.description}</td></tr>`;
									}
				
									return acc;
								}, '')
							}
						</tbody>
					</table>`
				);
			}

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