const HISTORY_LIMIT = 100;
const LOCAL_STORAGE_KEY = 'commandHistory';
const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);

// Prevention in case data is corrupt in localStorage
let commands;
try {
	commands = storedHistory ? JSON.parse(storedHistory) : [];
	if (!commands.length) {
		localStorage.removeItem(LOCAL_STORAGE_KEY);
		commands = [];
	}
} catch (e) {
	commands = [];
	localStorage.removeItem(LOCAL_STORAGE_KEY);
}

const commandHistory = {
	cursorPos: 0,
	commands
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
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(commandHistory.commands));
	}
}