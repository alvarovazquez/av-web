const CURSOR_QUERY_SELECTOR = '.cursor';
const CURSOR_BLINK_FREQ = 650;

function showCursor($cursor) {
	$cursor.style = "display: inline-block";

	setTimeout(function () {
		hideCursor($cursor);
	}, CURSOR_BLINK_FREQ);
}

function hideCursor($cursor) {
	$cursor.style = "display: none";

	setTimeout(function () {
		showCursor($cursor);
	}, CURSOR_BLINK_FREQ);
}

export function getCursor($terminal) {
	return $terminal.querySelector(CURSOR_QUERY_SELECTOR);
}

export function initCursor($terminal) {
	let $cursor = $terminal.querySelector(CURSOR_QUERY_SELECTOR);

	showCursor($cursor);
}