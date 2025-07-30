let board = document.getElementById('board');
let turnText = document.getElementById('turn');
let diceText = document.getElementById('dice');
let diceImg = document.getElementById('diceImg');
let players = [
  { name: "Player 1", pos: 1, color: 'lime' },
  { name: "Player 2", pos: 1, color: 'aqua' }
];
let currentPlayer = 0;
let gameStarted = false;

const snakes = {
  99: 21,
  74: 55,
  52: 25,
  43: 5,
  62: 19,
  87: 24,
  40: 3,
  36: 6,
  5: 1,
  90: 1
};

function createBoard() {
  board.innerHTML = "";
  for (let i = 100; i >= 1; i--) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('id', 'cell-' + i);
    cell.innerText = i;
    board.appendChild(cell);
  }
}

function updatePlayers() {
  document.querySelectorAll('.token').forEach(e => e.remove());
  players.forEach((player, i) => {
    let cell = document.getElementById('cell-' + player.pos);
    let token = document.createElement('div');
    token.classList.add('token');
    token.style.background = player.color;
    token.style.top = (i * 18) + 'px';
    cell.appendChild(token);
  });
}

function showRIP(pos) {
  let cell = document.getElementById('cell-' + pos);
  let rip = document.createElement('div');
  rip.classList.add('rip');
  rip.innerText = "💀 RIP";
  cell.appendChild(rip);
  setTimeout(() => rip.remove(), 2000); // 2 seconds
}

function rollDice() {
  if (!gameStarted) return;

  let roll = Math.floor(Math.random() * 6) + 1;
  diceText.innerText = roll;
  diceImg.src = `https://upload.wikimedia.org/wikipedia/commons/${["2/2c/Alea_1.png", "b/b8/Alea_2.png", "2/2f/Alea_3.png", "8/8d/Alea_4.png", "5/55/Alea_5.png", "f/f4/Alea_6.png"][roll - 1]}`;

  let player = players[currentPlayer];
  player.pos += roll;
  if (player.pos > 100) player.pos = 100;

  if (snakes[player.pos]) {
    showRIP(player.pos);
    player.pos = snakes[player.pos];
  }

  updatePlayers();

  if (player.pos === 100) {
    alert(player.name + " wins!");
    collapseSnakes();
    gameStarted = false;
    document.getElementById("restartBtn").style.display = "inline-block";
    return;
  }

  currentPlayer = 1 - currentPlayer;
  turnText.innerText = players[currentPlayer].name;
}

function startGame() {
  players[0].name = document.getElementById("player1Name").value || "Player 1";
  players[1].name = document.getElementById("player2Name").value || "Player 2";
  players[0].pos = players[1].pos = 1;
  turnText.innerText = players[0].name;
  gameStarted = true;
  updatePlayers();
  document.getElementById("restartBtn").style.display = "none";
}

function restartGame() {
  players[0].pos = 1;
  players[1].pos = 1;
  currentPlayer = 0;
  turnText.innerText = players[0].name;
  createBoard();
  updatePlayers();
  gameStarted = false;
  document.getElementById("restartBtn").style.display = "none";
}

function collapseSnakes() {
  Object.keys(snakes).forEach(pos => {
    let cell = document.getElementById('cell-' + pos);
    cell.style.background = 'darkred';
  });
}
function playMusic() {
  const music = document.getElementById("bgMusic");
  music.play();
  document.getElementById("musicBtn").style.display = "none";
}


createBoard();
