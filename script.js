let playerScore = 0;
let aiScore = 0;
let roundsRemaining = 10;
let gameStarted = false;
let musicPlaying = false;

function startGame() {
  playerScore = 0;
  aiScore = 0;
  roundsRemaining = 10;
  document.getElementById("roundCount").innerText = roundsRemaining;

  document.getElementById("startButton").disabled = true;
  document.getElementById("game").style.visibility = "visible";

  document.querySelectorAll("#game button").forEach(button => {
    button.disabled = false;
  });

  countdown();
  gameStarted = true;
}

function countdown() {
  let counter = 3;
  const countdownElement = document.getElementById("countdown");

  const interval = setInterval(() => {
    countdownElement.innerText = counter;
    counter--;

    if (counter < 0) {
      clearInterval(interval);
      startRound();
    }
  }, 1000);
}

function startRound() {
  document.getElementById("countdown").innerText = "";
  document.getElementById("result").innerText = "";
  document.getElementById("aiChatBubble").innerText = "🤖 Waiting for your move...";

  document.querySelectorAll("#game button").forEach(button => {
    button.disabled = false;
  });
}

function play(playerChoice) {
  const choices = ["rock", "paper", "scissors"];
  const aiChoice = choices[Math.floor(Math.random() * 3)];

  let result = "";

  if (playerChoice === aiChoice) {
    result = "It's a draw!";
    playSound("draw");
  } else if (
    (playerChoice === "rock" && aiChoice === "scissors") ||
    (playerChoice === "paper" && aiChoice === "rock") ||
    (playerChoice === "scissors" && aiChoice === "paper")
  ) {
    result = "You win! 🎉";
    playerScore++;
    playSound("win");
  } else {
    result = "AI wins! 🤖";
    aiScore++;
    playSound("lose");
  }

  document.getElementById("playerScore").innerText = playerScore;
  document.getElementById("aiScore").innerText = aiScore;

  document.getElementById("result").innerText =
    `You chose ${playerChoice}. AI chose ${aiChoice}. ${result}`;

  fetch("https://some-random-api.ml/joke")
    .then(response => response.json())
    .then(data => {
      document.getElementById("aiChatBubble").innerText = `🤖 AI says: "${data.joke}"`;
    })
    .catch(() => {
      document.getElementById("aiChatBubble").innerText = "🤖 AI is speechless (API error)";
    });

  roundsRemaining--;
  document.getElementById("roundCount").innerText = roundsRemaining;

  if (roundsRemaining === 0) {
    setTimeout(() => {
      if (playerScore > aiScore) {
        alert("You win the match! 🏆");
      } else if (aiScore > playerScore) {
        alert("AI wins the match! 🤖");
      } else {
        alert("It's a tie! 🤝");
      }

      resetGame();
    }, 1000);
  } else {
    countdown();
  }
}

function playSound(outcome) {
  const sounds = {
    win: document.getElementById("winSound"),
    lose: document.getElementById("loseSound"),
    draw: document.getElementById("drawSound")
  };
  sounds[outcome].play();
}

function resetGame() {
  document.getElementById("startButton").disabled = false;
  document.getElementById("game").style.visibility = "hidden";

  document.querySelectorAll("#game button").forEach(button => {
    button.disabled = true;
  });
}

function toggleMusic() {
  const backgroundMusic = document.getElementById("backgroundMusic");

  if (musicPlaying) {
    backgroundMusic.pause();
    musicPlaying = false;
  } else {
    backgroundMusic.play();
    musicPlaying = true;
  }
}
