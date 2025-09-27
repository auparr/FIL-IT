import { generateEasyLimitQuestion } from "./limit/easy.js";
import { generateIndeterminateFormQuestion } from "./limit/medium.js";
import { generateHardLimitQuestion } from "./limit/hard.js";
import { generateAdvancedLimitQuestion } from "./limit/advanced.js";

import { generateEasyFunctionQuestion } from "./fungsi/easy.js";
import { generateMediumFunctionQuestion } from "./fungsi/medium.js";
import { generateHardFunctionQuestion } from "./fungsi/hard.js";
import { generateAdvancedFunctionQuestion } from "./fungsi/advanced.js";

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
      questionText.innerHTML = currentQuestion.question;
      currentQuestionType = currentQuestion.type;

      // Update tampilan jenis soal
      questionTypeEl.textContent = currentQuestionType;

      // Beri warna berbeda berdasarkan jenis soal
      if (currentQuestionType.includes("Evaluasi")) {
        questionTypeEl.className = "question-type function-eval";
      } else if (currentQuestionType.includes("Domain")) {
        questionTypeEl.className = "question-type domain-range";
      } else if (currentQuestionType.includes("Operasi")) {
        questionTypeEl.className = "question-type function-operations";
      } else {
        questionTypeEl.className = "question-type function-composition";
      }

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
    case "fungsi/medium.html":
      currentQuestion = generateMediumFunctionQuestion();
      questionText.innerHTML = currentQuestion.question;
      currentQuestionType = currentQuestion.type;

      // Update tampilan jenis soal
      questionTypeEl.textContent = currentQuestionType;

      // Beri warna berbeda berdasarkan jenis soal
      if (currentQuestionType.includes("Komposisi")) {
        questionTypeEl.className = "question-type function-composition";
      } else if (currentQuestionType.includes("Invers")) {
        questionTypeEl.className = "question-type function-inverse";
      } else if (
        currentQuestionType.includes("Domain") ||
        currentQuestionType.includes("Range")
      ) {
        questionTypeEl.className = "question-type domain-range";
      } else if (currentQuestionType.includes("Operasi")) {
        questionTypeEl.className = "question-type function-operations";
      } else {
        questionTypeEl.className = "question-type graph-analysis";
      }

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
    case "fungsi/hard.html":
      currentQuestion = generateHardFunctionQuestion();
      questionText.innerHTML = currentQuestion.question;
      currentQuestionType = currentQuestion.type;

      // Update tampilan jenis soal
      questionTypeEl.textContent = currentQuestionType;

      // Beri warna berbeda berdasarkan jenis soal
      if (currentQuestionType.includes("Eksponen")) {
        questionTypeEl.className = "question-type exponential";
      } else if (currentQuestionType.includes("Logaritma")) {
        questionTypeEl.className = "question-type logarithmic";
      } else if (currentQuestionType.includes("Trigonometri")) {
        questionTypeEl.className = "question-type trigonometric";
      } else if (currentQuestionType.includes("Sifat")) {
        questionTypeEl.className = "question-type functional-properties";
      } else if (currentQuestionType.includes("Transformasi")) {
        questionTypeEl.className = "question-type transformations";
      } else {
        questionTypeEl.className = "question-type functional-equations";
      }

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
    case "fungsi/advanced.html":
      currentQuestion = generateAdvancedFunctionQuestion();
      questionText.innerHTML = currentQuestion.question;
      currentQuestionType = currentQuestion.type;

      // Update tampilan jenis soal
      questionTypeEl.textContent = currentQuestionType;

      // Beri warna berbeda berdasarkan jenis soal
      if (currentQuestionType.includes("Komposisi Multi-Lapis")) {
        questionTypeEl.className = "question-type multi-layer-composition";
      } else if (currentQuestionType.includes("Fungsi Invers")) {
        questionTypeEl.className = "question-type complex-inverse";
      } else if (currentQuestionType.includes("Transformasi Grafis")) {
        questionTypeEl.className = "question-type graph-transformations";
      } else if (currentQuestionType.includes("Limit Fungsi")) {
        questionTypeEl.className = "question-type piecewise-limit";
      } else if (currentQuestionType.includes("Penentuan Parameter")) {
        questionTypeEl.className = "question-type parametric-conditions";
      } else if (currentQuestionType.includes("Persamaan Fungsional")) {
        questionTypeEl.className = "question-type functional-equations";
      } else {
        questionTypeEl.className = "question-type mixed-applications";
      }

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
