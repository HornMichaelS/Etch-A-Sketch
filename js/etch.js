var numRows = 4;
var mode = 'normal';
const CONTAINER_SIZE = 500;

$(document).ready(function() {
	var $container = $('<div id="container"></div>');
	$container.css('width', CONTAINER_SIZE.toString());
	$container.css('height', CONTAINER_SIZE.toString());
	$('body').append($container);

	constructGrid();

	console.log($container);

	$('body').append($container);

	$(document).on('mouseenter', '.cell', function() {
		switch(mode) {
			case 'normal':
				blacken($(this));
				break;
			case 'shade':
				darken($(this));
				break;
			case 'color':
				color($(this));
		}
	});
});

function clearGrid() {
	$('.cell').css('opacity', '0.1');
	$('.cell').css('background-color', '#111');
}

function constructGrid() {
	$('#container').empty();
	var $cell = $('<div class="cell"></div>');
	var $row = $('<div class="row"></div>');

	var cellSize = CONTAINER_SIZE / numRows;

	$cell.css('width', cellSize.toString());
	$cell.css('height', cellSize.toString());
	$row.css('height', cellSize.toString());

	for (i = 0; i < numRows; i++) {
		$currentRow = $row.clone();
		for (j = 0; j < numRows; j++) {
			$currentRow.append($cell.clone());
			$('#container').append($currentRow);
		}
	}
}

function darken($cell) {
	var currentOpacity = parseFloat($cell.css('opacity'));
	var newOpacity = 1;
	if (currentOpacity < 1) {
		newOpacity = currentOpacity + 0.1;
	}

	$cell.css('opacity', newOpacity.toString());
}

function blacken($cell) {
	$cell.css('opacity', '1');
}

function color($cell) {
	var red = Math.floor((Math.random() * 256)).toString();
	var green = Math.floor((Math.random() * 256)).toString();
	var blue = Math.floor((Math.random() * 256)).toString();

	var color = "rgb("+red+","+green+","+blue+")"

	$cell.css('background-color', color);
	blacken($cell);
}

function changeMode(newMode) {
	clearGrid();
	mode = newMode;
}

function resizeGrid() {
	numRows = prompt("Enter new grid size");
	constructGrid();
}
