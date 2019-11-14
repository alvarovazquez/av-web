import { COMMAND_MAP,COMMAND_MAP_ERROR_KEY } from './commands.js';

export function interpret(command) {
	const commandInfo = COMMAND_MAP[command];

	if (command) {
		if (commandInfo) {
			if (commandInfo.action) {
				commandInfo.action();
			}
	
			return commandInfo.output();
		}
	
		return COMMAND_MAP[COMMAND_MAP_ERROR_KEY].output();
	}
}