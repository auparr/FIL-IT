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

const questions = [
  generateEasyLimitQuestion(),
  generateIndeterminateFormQuestion(),
  generateHardLimitQuestion(),
  generateAdvancedLimitQuestion(),
];

function displayNewQuestion() {
  switch (key) {
    case "limit/easy.html":
      currentQuestion = generateEasyLimitQuestion();
      break;
    case "limit/medium.html":
      currentQuestion = generateIndeterminateFormQuestion();
      break;
    case "limit/hard.html":
      currentQuestion = generateHardLimitQuestion();
      break;
    case "limit/advanced.js":
      currentQuestion = generateAdvancedLimitQuestion();
      break;
    case "fungsi/easy.js":
      currentQuestion = generateEasyFunctionQuestion();
      break;
    case "fungsi/medium.js":
      currentQuestion = generateMediumFunctionQuestion();
      break;
    case "fungsi/hard.js":
      currentQuestion = generateHardFunctionQuestion();
      break;
    case "fungsi/advanced.js":
      currentQuestion = generateAdvancedFunctionQuestion();
      break;
    default:
      alert(`there is no ${key}.`);
      break;
  }

  questionText.innerHTML = currentQuestion.question;
  currentQuestionType = currentQuestion.type;

  questionTypeEl.textContent = currentQuestionType;
  //   TODO
}
