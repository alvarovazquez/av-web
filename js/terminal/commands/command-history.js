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
	commandHistory.commands.push(command);
	commandHistory.cursorPos = 0;
}