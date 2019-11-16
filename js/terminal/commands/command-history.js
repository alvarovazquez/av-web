const HISTORY_LIMIT = 100;
const commandHistory = {
	cursorPos: 0,
	commands: []
};

export function getPreviousCommandInHistory() {
	if (commandHistory.commands.length - (commandHistory.cursorPos - 1) <= commandHistory.commands.length - 1) {
		commandHistory.cursorPos--;
		return commandHistory.commands[commandHistory.commands.length - commandHistory.cursorPos];
	}
}

export function getNextCommandInHistory() {
	if (commandHistory.commands.length - (commandHistory.cursorPos + 1) >= 0) {
		commandHistory.cursorPos++;
		return commandHistory.commands[commandHistory.commands.length - commandHistory.cursorPos];
	}
}

export function resetCommandHistory() {
	commandHistory.cursorPos = 0;
}

export function addCommandToHistory(command) {
	if (command && command.length) {
		if (commandHistory.commands.length === HISTORY_LIMIT) {
			commandHistory.commands.shift();
		}
		commandHistory.commands.push(command);
	}
}