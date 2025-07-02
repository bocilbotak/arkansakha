const characters = [
  { name: "Joy", img: "joy.jpg", hint: "Suka membuat bahagia" },
  { name: "Sadness", img: "sadness.jpg", hint: "Sering sedih" },
  { name: "Anger", img: "anger.jpg", hint: "Cepat marah" },
  { name: "Fear", img: "fear.jpg", hint: "Selalu takut" },
  { name: "Disgust", img: "disgust.jpg", hint: "Mudah jijik" }
];

let currentIndex = 0;
let score = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  const q = characters[currentIndex];
  document.getElementById("character-image").src = q.img;
  document.getElementById("question").textContent = `Siapakah ini? (${q.hint})`;
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  const choices = shuffle([
    q.name,
    ...shuffle(characters.filter(c => c.name !== q.name)).slice(0, 3).map(c => c.name)
  ]);

  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.className = "choice-btn";
    btn.onclick = () => checkAnswer(choice);
    choicesDiv.appendChild(btn);
  });

  document.getElementById("feedback").textContent = "";
  document.getElementById("next-button").style.display = "none";
}

function checkAnswer(ans) {
  const correct = characters[currentIndex].name;
  const feedback = document.getElementById("feedback");
  if (ans === correct) {
    feedback.textContent = "✅ Benar!";
    score++;
  } else {
    feedback.textContent = `❌ Salah! Jawaban benar: ${correct}`;
  }
  document.getElementById("score").textContent = `Skor: ${score}`;
  document.getElementById("next-button").style.display = "inline-block";
  Array.from(document.getElementsByClassName("choice-btn")).forEach(b => b.disabled = true);
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < characters.length) {
    loadQuestion();
  } else {
    document.querySelector(".game-container").innerHTML = `
      <h2>Game selesai!</h2>
      <p>Skormu: ${score} / ${characters.length}</p>
      <button onclick="location.reload()">Main Lagi</button>
    `;
  }
}

// Mulai game
loadQuestion();
