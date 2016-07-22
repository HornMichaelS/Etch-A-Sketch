$(document).ready(function() {

	var $container = $('<div id="container"></div>');
	var $cell = $('<div class="cell"></div>');
	var $firstCell = $cell.clone().addClass('firstCell');
	var $row = $('<div class="row"></div>')

	var containerSize = 400;
	var numRows = 32;

	var cellSize = containerSize / numRows;

	$container.css('width', containerSize.toString());
	$container.css('height', containerSize.toString());

	$cell.css('width', cellSize.toString());
	$cell.css('height', cellSize.toString());
	$row.css('height', cellSize.toString());

	for (i = 0; i < numRows; i++) {
		$currentRow = $row.clone();
		for (j = 0; j < numRows; j++) {
			$currentRow.append($cell.clone());
			$container.append($currentRow);
		}
	}

	console.log($container);

	$('body').append($container);

	$(document).on('mouseenter', '.cell', function() {
		$(this).fadeTo('fast', 1);
	});
});
