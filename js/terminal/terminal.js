import { interpret } from './interpreter.js';

const INPUT_QUERY_SELECTOR = '.user-input';
const CURSOR_QUERY_SELECTOR = '.cursor';
const CONTENT_QUERY_SELECTOR = '.content';
const DIRECTION_LEFT = 'LEFT';
const DIRECTION_RIGHT = 'RIGHT';

let $terminal;
let $cursor;
let currentCursorPos = 0;

function setFocus() {
	$terminal.querySelector(INPUT_QUERY_SELECTOR).focus();
}

function moveCursor(direction) {
	const $line = $cursor.parentNode;
	const $userInput = $terminal.querySelector(INPUT_QUERY_SELECTOR);
	const userInputText = $userInput.value;
	let $cursorPlaceholder;
	let newHtml;
	let beforeCursorText;
	let cursorChar;
	let afterCursorText;

	if (direction === DIRECTION_RIGHT) {
		currentCursorPos++;
	} else if (direction === DIRECTION_LEFT) {
		currentCursorPos--;
	} else {
		return;
	}

	beforeCursorText = userInputText.substring(0, userInputText.length + currentCursorPos);
	cursorChar = userInputText.substring(userInputText.length + currentCursorPos, userInputText.length + currentCursorPos + 1);
	afterCursorText = userInputText.substring(userInputText.length + currentCursorPos + 1, userInputText.length);

	newHtml = `${beforeCursorText}<span class="cursor-placeholder"></span>${afterCursorText}`;
	$line.innerHTML = newHtml;
	$cursorPlaceholder = $line.querySelector('.cursor-placeholder');
	$cursor.innerHTML = cursorChar;
	$line.replaceChild($cursor, $cursorPlaceholder);
}

function moveCursorLeft() {
	const $userInput = $terminal.querySelector(INPUT_QUERY_SELECTOR);
	const userInputText = $userInput.value;

	if (-1 * currentCursorPos < userInputText.length) {
		moveCursor(DIRECTION_LEFT);
	}
}

function moveCursorRight() {
	if (currentCursorPos < 0) {
		moveCursor(DIRECTION_RIGHT);
	}
}

function resetInput() {
	const $input = $terminal.querySelector(INPUT_QUERY_SELECTOR);

	$input.value = '';
	currentCursorPos = 0;
}

function autoScroll() {
	$terminal.scrollTo(0, $terminal.scrollHeight);
}

function addUserFeddback() {
	const $newUserInputFeedback = document.createElement('p');
	const $content = $terminal.querySelector(CONTENT_QUERY_SELECTOR);

	$newUserInputFeedback.appendChild($cursor);
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
	const command = $terminal.querySelector(INPUT_QUERY_SELECTOR).value;
	const commandOutput = interpret(command);

	resetInput();
	drawCommandOutput(commandOutput);
	addUserFeddback();
}

function updateUserInput(userInputText) {
	const $userInput = $terminal.querySelector(INPUT_QUERY_SELECTOR);
	const $line = $cursor.parentNode;

	$userInput.value = userInputText;
	$line.innerHTML = userInputText
	$line.appendChild($cursor);
}

function initEvents() {
	document.addEventListener('click', function (event) {
		setFocus()
	});

	document.addEventListener('keyup', function (event) {
		const $userInput = $terminal.querySelector(INPUT_QUERY_SELECTOR);
		let userInputText;

		if (event.key === 'Enter') {
			sendInput();
			return;
		}
		if (event.key === 'Backspace') {
			userInputText = $userInput.value.substring(0, $userInput.value.length - 1);
			updateUserInput(userInputText);
			return;
		}
		if (event.key === 'ArrowLeft') {
			moveCursorLeft();
			return;
		} else if (event.key === 'ArrowRight') {
			moveCursorRight();
			return;
		}
		if (event.key.length > 1) {
			return;
		}

		userInputText = $userInput.value + event.key;
		updateUserInput(userInputText);
	});
}

export default function init($term) {
	$terminal = $term;
	$cursor = $terminal.querySelector(CURSOR_QUERY_SELECTOR)

	initEvents();
	setFocus();
};
