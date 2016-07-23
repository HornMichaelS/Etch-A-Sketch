var numRows = 4;
var mode = 'normal';
const CONTAINER_SIZE = 500;

$(document).ready(function() {

	// Setup the initial container div and append to the html body.
	var $container = $('<div id="container"></div>');
	$container.css('width', CONTAINER_SIZE.toString());
	$container.css('height', CONTAINER_SIZE.toString());
	$('body').append($container);

	// Create the grid within the container div
	constructGrid();

	console.log($container);

	$('body').append($container);

	$(document).on('mouseenter', '.cell', function() {
		// Determine which action to take, depending on current draw mode
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

	var $currentButton = $('.selected');

	$(document).on('click', 'button', function() {
		// For selectable buttons (mode buttons) toggle selected class
		// when clicked. Remove selected class from currently selected button.
		if ($(this).hasClass('selectable')) {
			$currentButton.toggleClass('selected');
			$(this).toggleClass('selected');
			$currentButton = $(this);
		}
	});
});

// Clear all current drawing from the sketch grid
function clearGrid() {
	// Reset css properties for all cells to default
	$('.cell').css('opacity', '0.1');
	$('.cell').css('background-color', '#111');
}

// Create a square grid of divs having class 'cell', numRows x numRows.
function constructGrid() {
	// Remove all child nodes from the grid container
	$('#container').empty();

	// Prototype row and cell elements
	var $cell = $('<div class="cell"></div>');
	var $row = $('<div class="row"></div>');

	var cellSize = CONTAINER_SIZE / numRows;

	$cell.css('width', cellSize.toString());
	$cell.css('height', cellSize.toString());
	$row.css('height', cellSize.toString());

	// Create numRow rows, each containing numRow cells to create a square grid
	for (i = 0; i < numRows; i++) {
		$currentRow = $row.clone();
		for (j = 0; j < numRows; j++) {
			$currentRow.append($cell.clone());
			$('#container').append($currentRow);
		}
	}
}

// Increase cell's opacity by 10%
function darken($cell) {
	var currentOpacity = parseFloat($cell.css('opacity'));
	var newOpacity = 1;
	if (currentOpacity < 1) {
		newOpacity = currentOpacity + 0.1;
	}

	$cell.css('opacity', newOpacity.toString());
}

// Set given cell opacity to 100%
function blacken($cell) {
	$cell.css('opacity', '1');
}

// Assign a random color to the given cell.
function color($cell) {
	// For each primary color, select a random value 1-256
	var red = Math.floor((Math.random() * 256)).toString();
	var green = Math.floor((Math.random() * 256)).toString();
	var blue = Math.floor((Math.random() * 256)).toString();

	// Create value string for color property
	var color = "rgb("+red+","+green+","+blue+")"

	$cell.css('background-color', color);
	// Set cell opacity to 100%
	blacken($cell);
}

// Set mode to given mode.
function changeMode(newMode) {
	// Only clear the grid if user selects a new mode
	if (newMode != mode) {
		clearGrid();
		mode = newMode;
	}
}

// A function which changes the number of cells within the container div.
function resizeGrid() {
	numRows = prompt("Enter new grid size");
	constructGrid();
}
