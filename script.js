let playerScore = 0;
let aiScore = 0;
let roundsRemaining = 10;
let gameStarted = false;
let musicPlaying = false;

function startGame() {
  // Reset the game
  playerScore = 0;
  aiScore = 0;
  roundsRemaining = 10;
  document.getElementById("roundCount").innerText = roundsRemaining;

  document.getElementById("startButton").disabled = true;
  document.getElementById("game").style.visibility = "visible";

  // Enable game buttons
  document.querySelectorAll("#game button").forEach(button => {
    button.disabled = false;
  });

  // Start the countdown for the first round
  countdown();
  gameStarted = true;
}

function countdown() {
  let counter = 3;
  const countdownElement = document.getElementById("countdown");

  // Display countdown
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

  // Enable player buttons
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

  // Update score display
  document.getElementById("playerScore").innerText = playerScore;
  document.getElementById("aiScore").innerText = aiScore;

  // Show result
  document.getElementById("result").innerText =
    `You chose ${playerChoice}. AI chose ${aiChoice}. ${result}`;

  // Fetch joke from AI API
  fetch("https://some-random-api.ml/joke")
    .then(response => response.json())
    .then(data => {
      document.getElementById("aiChatBubble").innerText = `🤖 AI says: "${data.joke}"`;
    })
    .catch(() => {
      document.getElementById("aiChatBubble").innerText = "🤖 AI is speechless (API error)";
    });

  // Decrease remaining rounds
  roundsRemaining--;
  document.getElementById("roundCount").innerText = roundsRemaining;

  // If rounds are over, declare winner
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

  // Disable game buttons after match
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
