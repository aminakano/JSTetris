document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("grid");
  for (let i = 0; i < 210; i++) {
    let div = document.createElement("div");
    if(i >= 200) div.className = "taken";
    grid.append(div);
  }
  let squares = Array.from(document.querySelectorAll(".grid div"));
  console.log(squares);
  
  const scoreDisplay = document.querySelector("#score");
  const startBtn = document.querySelector("#start-button");
  const GRID_WIDTH = 10;

  const lTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2],
    [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
  ];

  const zTetromino = [
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
  ];

  const tTetromino = [
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
  ];

  const oTetromino = [
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
  ];

  const iTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
  ];

  const theTetrominoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ];

  let currentPosition = 4;
  let currentRotation = 3;

  let random = Math.floor(Math.random() * theTetrominoes.length);
  
  let current = theTetrominoes[random][currentRotation];

  const draw = () => {
    current.forEach(i => {
      squares[currentPosition + i].classList.add("tetromino");
    })
  }

  const undraw = () => {
    current.forEach(i => {
      squares[currentPosition + i].classList.remove("tetromino");
    });
  }

  const moveDown = () => {
    undraw();
    currentPosition += GRID_WIDTH
    draw()
    freeze();
  }
  timerId = setInterval(moveDown, 1000);

  const freeze = () => {
    if(current.some(i => squares[currentPosition + i + GRID_WIDTH].classList.contains("taken"))) {
      current.forEach(i => squares[currentPosition + i].classList.add("taken"))

      random = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];

      currentPosition = 4;
      draw();
    }
  }
})