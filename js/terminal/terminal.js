import { interpret } from './interpreter.js';
import {
	addCommandToHistory,
	resetCommandHistory,
	getNextCommandInHistory,
	getPreviousCommandInHistory
} from './commands/command-history.js';

const INPUT_QUERY_SELECTOR = '.user-input';
const FEEDBACK_QUERY_SELECTOR = '.user-feedback';
const CURSOR_QUERY_SELECTOR = '.cursor';
const CONTENT_QUERY_SELECTOR = '.content';
const FEEDBACK_CLASS = 'user-feedback';
const INPUT_MODE_COMMAND = 'INPUT_MODE_COMMAND';
const INPUT_MODE_REVERSE = 'INPUT_MODE_REVERSE';
const INPUT_MODE_REVERSE_FAILED = 'INPUT_MODE_REVERSE_FAILED';
const INPUT_MODES_CLASSNAMES_MAP = {
	[INPUT_MODE_COMMAND]: 'command',
	[INPUT_MODE_REVERSE]: 'reverse-search',
	[INPUT_MODE_REVERSE_FAILED]: 'reverse-search-failed'
};

let $terminal;
let $cursor;
let currentCursorPos = 0;
let currentMode = INPUT_MODE_COMMAND;

function setFocus() {
	$terminal.querySelector(INPUT_QUERY_SELECTOR).focus();
}

function updateUserInputHtml() {
	const userInputText = $terminal.querySelector(INPUT_QUERY_SELECTOR).value;
	if (currentCursorPos === 0) {
		$cursor.parentNode.innerHTML = `${userInputText}<span class="cursor"></span>`;
	} else {
		const beforeCursorText = userInputText.substring(0, userInputText.length + currentCursorPos);
		const cursorChar = userInputText.substring(userInputText.length + currentCursorPos, userInputText.length + currentCursorPos + 1);
		const afterCursorText = userInputText.substring(userInputText.length + currentCursorPos + 1, userInputText.length);

		$cursor.parentNode.innerHTML = `${beforeCursorText}<span class="cursor">${cursorChar}</span>${afterCursorText}`;
	}

	$cursor = $terminal.querySelector(CURSOR_QUERY_SELECTOR);
}

function moveCursorLeft() {
	const $userInput = $terminal.querySelector(INPUT_QUERY_SELECTOR);
	const userInputText = $userInput.value;

	if (-1 * currentCursorPos < userInputText.length) {
		currentCursorPos--;
		updateUserInputHtml();
	}
}

function moveCursorRight() {
	if (currentCursorPos < 0) {
		currentCursorPos++;
		updateUserInputHtml();
	}
}

function changeMode(mode) {
	let $userInput = document.querySelector(FEEDBACK_QUERY_SELECTOR);

	currentMode = mode;
	$userInput.setAttribute('class', `${FEEDBACK_CLASS} ${INPUT_MODES_CLASSNAMES_MAP[mode]}`);
}

function resetInput() {
	const $input = $terminal.querySelector(INPUT_QUERY_SELECTOR);

	currentCursorPos = 0;
	updateUserInputHtml();
	$input.value = '';
	changeMode(INPUT_MODE_COMMAND);
}

function emptyInput() {
	const $input = $terminal.querySelector(INPUT_QUERY_SELECTOR);

	$input.value = '';
	resetInput();
}

function autoScroll() {
	$terminal.scrollTo(0, $terminal.scrollHeight);
}

function addUserFeddback() {
	const $newUserInputFeedback = document.createElement('p');
	const $currentUserInputFeedback = document.querySelector(FEEDBACK_QUERY_SELECTOR);
	const $content = $terminal.querySelector(CONTENT_QUERY_SELECTOR);

	$newUserInputFeedback.appendChild($cursor);
	$newUserInputFeedback.setAttribute('class', `${FEEDBACK_CLASS} ${INPUT_MODES_CLASSNAMES_MAP[currentMode]}`);
	$currentUserInputFeedback.setAttribute('class', INPUT_MODES_CLASSNAMES_MAP[INPUT_MODE_COMMAND]);
	$content.appendChild($newUserInputFeedback);

	autoScroll();
}

function drawCommandOutput(output) {
	const $content = $terminal.querySelector(CONTENT_QUERY_SELECTOR);
	let $line;

	output && output.length && output.forEach(function (textLine) {
		$line = document.createElement('p');
		$line.setAttribute('class', 'output');
		$line.innerHTML = textLine;

		$content.appendChild($line);
	});
}

function sendInput() {
	const userInput = $terminal.querySelector(INPUT_QUERY_SELECTOR).value;
	const input = userInput.split(' ');
	const command = input[0];
	const args = input.slice(1, input.length);
	const commandOutput = interpret(command, args);

	addCommandToHistory(userInput);
	resetCommandHistory();
	resetInput();
	drawCommandOutput(commandOutput);
	addUserFeddback();
}

function initEvents() {
	document.addEventListener('click', event => {
		setFocus()
	});

	document.addEventListener('keydown', event => {
		const $userInput = $terminal.querySelector(INPUT_QUERY_SELECTOR);
		let textBeforeCursor;
		let textAfterCursor;
		let commandInHistory;

		if (event.isComposing || event.keyCode === 229) {
			return;
		} else if (event.key === 'r' && event.ctrlKey) {
			event.preventDefault();
			changeMode(INPUT_MODE_REVERSE);
			return;
		} else if (event.key === 'Enter') {
			resetCommandHistory();
			sendInput();
			return;
		} else if (event.key === 'Backspace') {
			textBeforeCursor = $userInput.value.substring(0, $userInput.value.length + currentCursorPos - 1);
			textAfterCursor = $userInput.value.substring($userInput.value.length + currentCursorPos, $userInput.value.length);
			$userInput.value = `${textBeforeCursor}${textAfterCursor}`;
			updateUserInputHtml();

			return;
		} else if (event.key === 'Delete') {
			textBeforeCursor = $userInput.value.substring(0, $userInput.value.length + currentCursorPos);
			textAfterCursor = $userInput.value.substring($userInput.value.length + currentCursorPos + 1, $userInput.value.length);
			$userInput.value = `${textBeforeCursor}${textAfterCursor}`;
			moveCursorRight();
			updateUserInputHtml();

			return;
		} else if (event.key === 'Escape') {
			if (currentMode === INPUT_MODE_COMMAND) {
				resetCommandHistory();
				emptyInput();
			} else if (currentMode === INPUT_MODE_REVERSE) {
				resetInput();
			}
			return;
		} else if (event.key === 'ArrowLeft') {
			moveCursorLeft();
			return;
		} else if (event.key === 'ArrowRight') {
			moveCursorRight();
			return;
		} else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
			event.preventDefault();
			commandInHistory =
				event.key === 'ArrowUp' ?
					getNextCommandInHistory() :
					getPreviousCommandInHistory();

			if (commandInHistory) {
				$userInput.value = commandInHistory;
				updateUserInputHtml();
			}
			return;
		} else if (event.ctrlKey || event.altKey) {
			return;
		}

		if (event.key.length > 1) {
			return;
		}

		textBeforeCursor = $userInput.value.substring(0, $userInput.value.length + currentCursorPos);
		textAfterCursor = $userInput.value.substring($userInput.value.length + currentCursorPos, $userInput.value.length);
		$userInput.value = $userInput.value = `${textBeforeCursor}${event.key}${textAfterCursor}`;
		updateUserInputHtml();
	});
}

export default function init($term) {
	$terminal = $term;
	$cursor = $terminal.querySelector(CURSOR_QUERY_SELECTOR);

	initEvents();
	setFocus();
};
