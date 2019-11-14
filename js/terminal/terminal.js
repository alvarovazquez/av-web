import { initCursor, getCursor } from './cursor.js';
import { interpret } from './interpreter.js';

const INPUT_QUERY_SELECTOR = '.user-input';
const CONTENT_QUERY_SELECTOR = '.content';

let $terminal;

function setFocus() {
	$terminal.querySelector(INPUT_QUERY_SELECTOR).focus();
}

function resetInput() {
	const $input = $terminal.querySelector(INPUT_QUERY_SELECTOR);

	$input.value = '';
}

function autoScroll() {
	$terminal.scrollTo(0, $terminal.scrollHeight);
}

function addUserFeddback() {
	const $newUserInputFeedback = document.createElement('p');
	const $content = $terminal.querySelector(CONTENT_QUERY_SELECTOR);
	const $cursor = getCursor($terminal);

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
	const $cursor = getCursor($terminal);
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
		if (event.key.length > 1) {
			return;
		}

		userInputText = $userInput.value + event.key;
		updateUserInput(userInputText);
	});
}

export default function init($term) {
	$terminal = $term;

	initCursor($terminal);
	initEvents();
	setFocus();
};
