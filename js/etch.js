$(document).ready(function() {
	var $container = $('<div id="container"></div>');
	var $cell = $('<div class="cell"></div>');
	var $firstCell = $cell.clone().addClass('firstCell');
	var $row = $('<div class="row"></div>')

	for (i = 0; i < 4; i++) {
		$currentRow = $row.clone();
		for (j = 0; j < 4; j++) {
			$currentRow.append($cell.clone());
			$container.append($currentRow);
		}
	}

	console.log($container);

	$('body').append($container);
});