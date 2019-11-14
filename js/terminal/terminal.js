import { initCursor, getCursor } from './cursor.js';
import { interpret } from './interpreter.js';

const INPUT_QUERY_SELECTOR = '.user-input';
const CONTENT_QUERY_SELECTOR = '.content';

function setFocus($terminal) {
	$terminal.querySelector(INPUT_QUERY_SELECTOR).focus();
}


function resetInput($terminal) {
	let $input = $terminal.querySelector(INPUT_QUERY_SELECTOR);

	$input.value = '';
}

function autoScroll($terminal) {
	$terminal.scrollTo(0, $terminal.scrollHeight);
}


function addUserFeddback($terminal) {
	let $newUserInputFeedback = document.createElement('p'),
		$content = $terminal.querySelector(CONTENT_QUERY_SELECTOR),
		$cursor = getCursor($terminal);

		$newUserInputFeedback.appendChild($cursor);
		$content.appendChild($newUserInputFeedback);

		autoScroll($terminal);
}

function drawCommandOutput($terminal, output) {
	let $content = $terminal.querySelector(CONTENT_QUERY_SELECTOR),
		$line;

	output && output.length && output.forEach(function (textLine) {
		$line = document.createElement('p');
		$line.setAttribute('class', 'output');
		$line.innerHTML = textLine;

		$content.appendChild($line);
	});
}

function sendInput($terminal) {
	const command = $terminal.querySelector(INPUT_QUERY_SELECTOR).value;
	let commandOutput;

	resetInput($terminal);

	commandOutput = interpret(command);
	drawCommandOutput($terminal, commandOutput);

	addUserFeddback($terminal);
}

function updateUserInput($terminal, userInputText) {
	const $userInput = $terminal.querySelector(INPUT_QUERY_SELECTOR);
	const $cursor = getCursor($terminal);
	const $line = $cursor.parentNode;

	$userInput.value = userInputText;
	$line.innerHTML = userInputText
	$line.appendChild($cursor);
}

function initEvents($terminal) {
	document.addEventListener('click', function (event) {
		setFocus($terminal)
	});

	document.addEventListener('keyup', function (event) {
		const $userInput = $terminal.querySelector(INPUT_QUERY_SELECTOR);
		let userInputText;

		if (event.key === 'Enter') {
			sendInput($terminal);
			return;
		}
		if (event.key === 'Backspace') {
			userInputText = $userInput.value.substring(0, $userInput.value.length - 1);
			updateUserInput($terminal, userInputText);
			return;
		}
		if (event.key.length > 1) {
			return;
		}

		userInputText = $userInput.value + event.key;
		updateUserInput($terminal, userInputText);
	});
}

export default function init($terminal) {
	initCursor($terminal);
	initEvents($terminal);
	setFocus($terminal);
};
