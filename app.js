document.addEventListener("DOMContentLoaded", () => {
  domCreation();

  let squares = Array.from(document.querySelectorAll(".grid div"));
  
  const scoreDisplay = document.querySelector("#score");
  const startBtn = document.querySelector("#start-button");
  const GRID_WIDTH = 10;
  let score = 0;
  const colors = [
    "orange",
    "red",
    "purple",
    "green",
    "blue"
  ]

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
  let currentRotation = 0;
  let nextRandom = 0;
  let timerId;

  let random = Math.floor(Math.random() * theTetrominoes.length);
  
  let current = theTetrominoes[random][currentRotation];

  const draw = () => {
    current.forEach(i => {
      squares[currentPosition + i].classList.add("tetromino");
      squares[currentPosition + i].style.backgroundColor = colors[random];
    })
  }

  const undraw = () => {
    current.forEach(i => {
      squares[currentPosition + i].classList.remove("tetromino");
      squares[currentPosition + i].style.backgroundColor = "";
    });
  }

  const moveDown = () => {
    undraw();
    currentPosition += GRID_WIDTH
    draw()
    freeze();
  }

  // timerId = setInterval(moveDown, 1000);

  const control = e => {
    switch(e.keyCode) {
      case 37 : moveLeft();
      break;

      case 38 : rotate();
      break;

      case 39 : moveRight();
      break;

      case 40 : moveDown();
      default:
    }
  }

  document.addEventListener('keyup', control);

  const freeze = () => {
    if(current.some(i => squares[currentPosition + i + GRID_WIDTH].classList.contains("taken"))) {
      current.forEach(i => squares[currentPosition + i].classList.add("taken"))

      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];

      currentPosition = 4;
      draw();
      displayShape();
      addScore();
      gameOver();
    }
  }

  const moveLeft = () => {
    undraw();
    const isAtLeftEdge = current.some(
      (i) => (currentPosition + i) % GRID_WIDTH === 0
    );

    if(!isAtLeftEdge) currentPosition -= 1;

    if(current.some(i => squares[currentPosition + i].classList.contains("taken"))) {
      currentPosition += 1;
    }
    draw();
  }

  const moveRight = () => {
    undraw();
    const isAtRightEdge = current.some(i => (currentPosition + i) % GRID_WIDTH === GRID_WIDTH - 1);

    if(!isAtRightEdge) currentPosition += 1;

    if(current.some(i => squares[currentPosition + i].classList.contains("taken"))) {
      currentPosition -= 1;
    }
    draw();
  }

  const rotate = () => {
    undraw();
    currentRotation ++
    if(currentRotation == current.length) {
      currentRotation = 0;
    }
    current = theTetrominoes[random][currentRotation];
    draw();
  }

  // mini grid that shows the upcoming tetrominoes
  const displaySquares = document.querySelectorAll(".mini-grid div")
  const displayWidth = 4;
  let displayIndex = 0;

  const upNextTetrominoes = [
    [1, displayWidth +1, displayWidth*2+1, 2],
    [0, displayWidth, displayWidth+1, displayWidth*2+1],
    [1, displayWidth, displayWidth+1, displayWidth+2],
    [0, 1, displayWidth, displayWidth+1],
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]
  ]

  const displayShape = () => {
    displaySquares.forEach(square => {
      square.classList.remove("tetromino")
      square.style.backgroundColor = "";
    });

    upNextTetrominoes[nextRandom].forEach(i => {
      displaySquares[displayIndex + i].classList.add("tetromino");
      displaySquares[displayIndex + i].style.backgroundColor = colors[nextRandom];
    });
  }

  startBtn.addEventListener("click", () => {
    if(timerId) {
      clearInterval(timerId); // pause
      timerId = null;
    } else {
      draw(); // start
      timerId = setInterval(moveDown, 1000);
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      displayShape();
    }
  })

  const addScore = () => {
    for (let i = 0; i < 199; i += GRID_WIDTH) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ];

      if (row.every((i) => squares[i].classList.contains("taken"))) {
        score += 10;
        scoreDisplay.innerHTML = score;

        row.forEach((i) => {
          squares[i].classList.remove("taken");
          squares[i].classList.remove("tetromino");
          squares[i].style.backgroundColor = "";
        });

        const squaresRemoved = squares.splice(i, GRID_WIDTH);

        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }

  const gameOver = () => {
    if(current.some(i => squares[currentPosition + i].classList.contains("taken"))) {
      scoreDisplay.innerHTML = "end";
      clearInterval(timerId);
    }
  }

})

const domCreation = () => {
  const grid = document.getElementById("grid");
  for (let i = 0; i < 210; i++) {
    let div = document.createElement("div");
    if (i >= 200) div.className = "taken";
    grid.append(div);
  }

  const container = document.querySelector(".container");
  const minigrid = document.createElement("div");
  minigrid.className = "mini-grid";
  container.appendChild(minigrid);
  for (let i = 0; i < 16; i++) {
    let div = document.createElement("div");
    minigrid.append(div);
  }
}