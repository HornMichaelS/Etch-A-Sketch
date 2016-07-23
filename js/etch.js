var numRows = 50;
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
		$(this).css('opacity', '1');
	});
});

function clearGrid() {
	$('.cell').css('opacity', '0.1');
	numRows = prompt("Enter new grid size");

	constructGrid();
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
