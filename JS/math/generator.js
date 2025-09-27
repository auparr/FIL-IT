import { generateEasyLimitQuestion } from "./limit/easy.js";
import { generateIndeterminateFormQuestion } from "./limit/medium.js";
import { generateHardLimitQuestion } from "./limit/hard.js";
import { generateAdvancedLimitQuestion } from "./limit/advanced.js";
// Variabel untuk menyimpan soal, jawaban dan statistik
let currentQuestion = null;
let currentAnswer = null;
let solutionSteps = "";
let totalQuestions = 0;
let correctAnswers = 0;
let currentQuestionType = "";

// path
const pathParts = window.location.pathname.split("/");
// misal: /learn/limit/easy.html → ["", "learn", "limit", "easy.html"]

const topic = pathParts[2]; // limit
const fileName = pathParts[3]; // easy.html

const key = `${topic}/${fileName}`;

// DOM elements
const questionText = document.getElementById("questionText");
const questionTypeEl = document.getElementById("questionType");
const answerInput = document.getElementById("answerInput");
const resultDiv = document.getElementById("result");
const solutionDiv = document.getElementById("solution");
const solutionStepsDiv = document.getElementById("solutionSteps");
const generateBtn = document.getElementById("generateBtn");
const checkBtn = document.getElementById("checkBtn");
const showSolutionBtn = document.getElementById("showSolutionBtn");
const totalQuestionsEl = document.getElementById("totalQuestions");
const correctAnswersEl = document.getElementById("correctAnswers");
const successRateEl = document.getElementById("successRate");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function displayNewQuestion() {
  switch (key) {
    case "limit/easy.html":
      currentQuestion = generateEasyLimitQuestion();
      questionText.innerHTML = currentQuestion.question;
      currentQuestionType = currentQuestion.type;

      // Update tampilan jenis soal
      questionTypeEl.textContent = currentQuestionType;
      questionTypeEl.className = "question-type";

      answerInput.value = "";
      resultDiv.style.display = "none";
      solutionDiv.style.display = "none";
      solutionSteps = currentQuestion.steps;

      solutionDiv.innerHTML = solutionSteps;

      // Render ulang MathJax
      if (MathJax.typeset && window.MathJax) {
        MathJax.typeset([questionText]);
        MathJax.typeset([solutionDiv]);
      }

      // Update statistik
      totalQuestions++;
      updateStats();
      break;
    case "limit/medium.html":
      currentQuestion = generateIndeterminateFormQuestion();
      questionText.innerHTML = currentQuestion.question;
      answerInput.value = "";
      resultDiv.style.display = "none";
      solutionDiv.style.display = "none";
      solutionSteps = currentQuestion.steps;

      solutionDiv.innerHTML = solutionSteps;

      // Render ulang MathJax
      if (MathJax.typeset) {
        MathJax.typeset([questionText]);
        MathJax.typeset([solutionDiv]);
      }

      // Update statistik
      totalQuestions++;
      updateStats();
      break;
    case "limit/hard.html":
      currentQuestion = generateHardLimitQuestion();
      questionText.innerHTML = currentQuestion.question;
      currentQuestionType = currentQuestion.type;

      // Update tampilan jenis soal
      questionTypeEl.textContent =
        currentQuestionType === "trigonometric"
          ? "Trigonometri"
          : "Limit Tak Hingga";
      questionTypeEl.className = `question-type ${currentQuestionType}`;

      answerInput.value = "";
      resultDiv.style.display = "none";
      solutionDiv.style.display = "none";
      solutionSteps = currentQuestion.steps;

      solutionDiv.innerHTML = solutionSteps;

      // Render ulang MathJax
      if (MathJax.typeset) {
        MathJax.typeset([questionText]);
        MathJax.typeset([solutionDiv]);
      }

      // Update statistik
      totalQuestions++;
      updateStats();
      break;
    case "limit/advanced.html":
      currentQuestion = generateAdvancedLimitQuestion();
      questionText.innerHTML = currentQuestion.question;
      currentQuestionType = currentQuestion.type;

      // Update tampilan jenis soal
      questionTypeEl.textContent = currentQuestionType;
      questionTypeEl.className = "question-type advanced";

      answerInput.value = "";
      resultDiv.style.display = "none";
      solutionDiv.style.display = "none";
      solutionSteps = currentQuestion.steps;

      solutionDiv.innerHTML = solutionSteps;

      // Render ulang MathJax
      if (MathJax.typeset && window.MathJax) {
        MathJax.typeset([questionText]);
        MathJax.typeset([solutionDiv]);
      }

      // Update statistik
      totalQuestions++;
      updateStats();
      break;
    case "fungsi/easy.html":
      currentQuestion = generateEasyFunctionQuestion();
      break;
    case "fungsi/medium.html":
      currentQuestion = generateMediumFunctionQuestion();
      break;
    case "fungsi/hard.html":
      currentQuestion = generateHardFunctionQuestion();
      break;
    case "fungsi/advanced.html":
      currentQuestion = generateAdvancedFunctionQuestion();
      break;
    default:
      alert(`there is no ${key}.`);
      break;
  }
}

function checkAnswer() {
  if (!currentQuestion) {
    alert("Silakan generate soal terlebih dahulu!");
    return;
  }

  const userAnswer = parseFloat(answerInput.value);

  if (isNaN(userAnswer)) {
    alert("Masukkan jawaban yang valid (bilangan bulat)!");
    return;
  }

  // Periksa apakah jawaban user adalah bilangan bulat
  if (!Number.isInteger(userAnswer)) {
    alert("Jawaban harus bilangan bulat!");
    return;
  }

  // Periksa kebenaran jawaban
  const isCorrect = Math.abs(userAnswer - currentQuestion.answer) < 0.001;

  if (isCorrect) {
    correctAnswers++;
  }

  resultDiv.innerHTML = `
                <strong>${isCorrect ? "Benar! 🎉" : "Salah! ❌"}</strong>
                <div class="explanation">
                    Jawaban yang benar adalah: <strong>${
                      currentQuestion.answer
                    }</strong><br>
                    ${
                      isCorrect
                        ? "Bagus! Anda telah menguasai materinya."
                        : "Coba lagi! Teliti lagi sebelum memberi jawaban."
                    }
                </div>
            `;

  resultDiv.className = `result ${isCorrect ? "correct" : "incorrect"}`;
  resultDiv.style.display = "block";

  updateStats();
}

function showSolution() {
  if (!currentQuestion) {
    alert("Silakan generate soal terlebih dahulu!");
    return;
  }

  solutionStepsDiv.textContent = solutionSteps;
  solutionDiv.style.display = "block";
}

function updateStats() {
  totalQuestionsEl.textContent = totalQuestions;
  correctAnswersEl.textContent = correctAnswers;

  const successRate =
    totalQuestions > 0
      ? ((correctAnswers / totalQuestions) * 100).toFixed(1)
      : 0;
  successRateEl.textContent = `${successRate}%`;
}

generateBtn.addEventListener("click", displayNewQuestion);
checkBtn.addEventListener("click", checkAnswer);
showSolutionBtn.addEventListener("click", showSolution);

answerInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    checkAnswer();
  }
});

// Validasi input: hanya memperbolehkan bilangan bulat
answerInput.addEventListener("input", function () {
  // Hapus karakter non-digit dan tanda minus (kecuali minus di awal)
  this.value = this.value.replace(/[^\d-]/g, "").replace(/(?!^)-/g, "");
});

// Generate soal pertama saat halaman dimuat
displayNewQuestion();
