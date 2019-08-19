const SIDE_LENGTH = 640;

const Modes = Object.freeze({
  normal: "normal",
  colors: "colors",
  greyscale: "greyscale",
});

function EtchASketch() {
  const SIDE_LENGTH = 640;

  let cellsPerRow = 16;
  let mountedAt;
  let grid;
  let mode = Modes.normal;

  function getNormalModeListener(cell) {
    return function () {
      cell.style.backgroundColor = "black";
    }
  }

  function getColorsModeListener(cell) {
    function randomRGBVal() {
      return Math.floor(Math.random() * 256);
    }
    return function () {
      const red = randomRGBVal();
      const green = randomRGBVal();
      const blue = randomRGBVal();

      cell.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    }
  }

  function getGreyscaleModeListener(cell) {
    let opacity = 0;
    return function () {
      opacity += 0.1;
      cell.style.backgroundColor = "black";
      cell.style.opacity = opacity;
    }
  }

  function createDomGrid() {
    grid = document.createElement('div');
    grid.setAttribute('id', 'grid');

    for (let i = 0; i < cellsPerRow; i++) {
      const row = document.createElement('div');
      row.classList.add('row');
      for (let j = 0; j < cellsPerRow; j++) {
        const cell = document.createElement('div');
        const cellSideLength = `${(SIDE_LENGTH / cellsPerRow).toFixed(1)}px`;

        cell.classList.add('grid-cell');
        cell.style.width = cellSideLength;
        cell.style.height = cellSideLength;

        let listener = getNormalModeListener(cell);

        switch (mode) {
          case Modes.normal:
            listener = getNormalModeListener(cell);
            break;
          case Modes.colors:
            listener = getColorsModeListener(cell);
            break;
          case Modes.greyscale:
            listener = getGreyscaleModeListener(cell);
            break;
        }

        cell.addEventListener('mouseenter', listener);

        row.append(cell);
      }
      grid.append(row);
    }
  }

  const reset = (function () {
    grid.remove();
    createDomGrid();
    this.mount(mountedAt);
  }).bind(this);

  this.changeMode = function (newMode) {
    mode = newMode;
    reset();
  }

  this.mount = function (selector) {
    mountedAt = selector;
    document.querySelector(selector).append(grid);
  }

  this.shake = function () {
    cellsPerRow = prompt('How many cells per side?');
    reset();
  }

  createDomGrid();
}

let etchASketch = new EtchASketch();
etchASketch.mount('.grid-container');

document.querySelector('#shakeButton').addEventListener('click', () => {
  etchASketch.shake()
});

document.querySelector('#normalButton').addEventListener('click', () => {
  etchASketch.changeMode(Modes.normal);
})

document.querySelector('#colorsButton').addEventListener('click', () => {
  etchASketch.changeMode(Modes.colors);
})

document.querySelector('#greyscaleButton').addEventListener('click', () => {
  etchASketch.changeMode(Modes.greyscale);
})