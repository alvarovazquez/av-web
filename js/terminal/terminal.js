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

function initEvents($terminal) {
	document.addEventListener('click', function (event) {
		setFocus($terminal)
	});

	document.addEventListener('keyup', function (event) {
		const $userInput = $terminal.querySelector(INPUT_QUERY_SELECTOR);
		const $cursor = getCursor($terminal);
		let userInputText;

		if (event.key === 'Enter') {
			sendInput($terminal);
			return;
		}
		if (event.key === 'Backspace') {
			$userInput.value = $userInput.value.substring(0, $userInput.value - 1)
			return;
		}
		if (event.key.length > 1) {
			return;
		}

		// TODO Doesn't work
		// if (event.key === 'Backspace') {
		// 	$userInput.value = $userInput.value.substring(0, $userInput.value - 1),
		// 	userInputText = document.createTextNode(event.key);
		// } else {
		// 	$userInput.value += event.key,
		// 	userInputText = document.createTextNode(event.key);
		// }

		$userInput.value += event.key,
		userInputText = document.createTextNode(event.key);
		$cursor.parentNode.insertBefore(userInputText, $cursor);
	});
}

export default function init($terminal) {
	initCursor($terminal);
	initEvents($terminal);
	setFocus($terminal);
};
