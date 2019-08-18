const SIDE_LENGTH = 640;

function createDomGrid(n) {
  const grid = document.createElement('div');
  grid.setAttribute('id', 'grid');

  for (let i = 0; i < n; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < n; j++) {
      const cell = document.createElement('div');
      const cellSideLength = `${(SIDE_LENGTH / n).toFixed(1)}px`;

      cell.classList.add('grid-cell');
      cell.style.width = cellSideLength;
      cell.style.height = cellSideLength;

      let opacity = 0;

      cell.addEventListener('mouseenter', (e) => {
        opacity += 0.1;

        cell.classList.add('hovered');
        cell.style.opacity = opacity;
        cell.style.backgroundColor = 'black';
      })

      row.append(cell);
    }
    grid.append(row);
  }

  return grid;
}

function insertGrid(grid) {
  document.querySelector('.container>.top-buttons-container').after(grid);
}

function clearGrid() {
  const grid = document.querySelector('#grid');
  grid.remove();
}

function shakeGrid() {
  const n = prompt('What should the new grid size be?');
  const newGrid = createDomGrid(n);

  clearGrid();
  insertGrid(newGrid);
}

insertGrid(createDomGrid(16));

document.querySelector('#shakeButton').addEventListener('click', () => {
  shakeGrid();
})