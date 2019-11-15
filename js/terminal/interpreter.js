import { COMMAND_MAP,COMMAND_MAP_ERROR_KEY } from './commands/commands.js';

export function interpret(command, args) {
	const commandInfo = COMMAND_MAP[command];

	if (command) {
		if (commandInfo) {
			if (commandInfo.action) {
				commandInfo.action(args);
			}
	
			return commandInfo.output(args);
		}
	
		return COMMAND_MAP[COMMAND_MAP_ERROR_KEY].output();
	}
}