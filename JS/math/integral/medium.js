export function generateMediumIntegralQuestion() {
  // Helper functions
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function getIntegerFriendlyCoefficient(denominator, min = 1, max = 8) {
    const multiplier = getRandomInt(
      // Ensure multiplier is at least 1
      Math.max(1, Math.ceil(min / denominator)),
      Math.floor(max / denominator)
    );
    return multiplier * denominator;
  }

  const types = [
    "polynomial_inside_linear",
    "simple_substitution",
    "basic_trig_squared",
    "rational_with_easy_denominator",
  ];
  const type = getRandomElement(types);

  // Declare all variables outside the switch statement for consistent structure
  let question, answer, steps, qType, fullAnswer;

  // Variables for different cases
  let n, a, b, k, resultCoeff;
  let trigType;

  switch (type) {
    case "polynomial_inside_linear":
      // ∫k(ax+b)ⁿ dx
      n = getRandomInt(2, 4);
      a = getRandomInt(2, 5);
      b = getRandomInt(1, 8);
      k = getIntegerFriendlyCoefficient(a * (n + 1), 10, 40); // Ensure integer result
      resultCoeff = k / (a * (n + 1));
      qType = "Polinomial Pangkat di Fungsi Linear";

      question = `Hitung integral tak tentu: $$\\int ${k}(${a}x + ${b})^{${n}} dx$$`;
      answer = resultCoeff; // The final coefficient is the single numerical answer
      fullAnswer = `${resultCoeff}(${a}x + ${b})^{${n + 1}} + C`;

      steps = `Langkah penyelesaian:
1. Gunakan substitusi, misal $$u = ${a}x + ${b}$$.
2. Turunkan u terhadap x: $$\\frac{du}{dx} = ${a}$$, sehingga $$dx = \\frac{du}{${a}}$$.
3. Substitusikan u dan dx ke dalam integral: $$\\int ${k}u^{${n}} \\cdot \\frac{du}{${a}} = \\frac{${k}}{${a}} \\int u^{${n}} du$$
4. Gunakan aturan pangkat integral: $$\\frac{${k}}{${a}} \\cdot \\frac{1}{${n}+1}u^{${n}+1} + C = \\frac{${k}}{${
        a * (n + 1)
      }}u^{${n}+1} + C$$
5. Sederhanakan dan substitusikan kembali u: $$${resultCoeff}(${a}x + ${b})^{${
        n + 1
      }} + C$$
6. Jadi, hasil integralnya adalah $$${fullAnswer}$$`;
      break;

    case "simple_substitution":
      // ∫kx(ax²+b)ⁿ dx
      n = getRandomInt(1, 3);
      a = getRandomInt(2, 4);
      b = getRandomInt(1, 6);
      k = getIntegerFriendlyCoefficient(2 * a * (n + 1), 10, 50);
      resultCoeff = k / (2 * a * (n + 1));
      qType = "Substitusi Sederhana";

      question = `Hitung integral tak tentu: $$\\int ${k}x(${a}x^2 + ${b})^{${n}} dx$$`;
      answer = resultCoeff; // The final coefficient
      fullAnswer = `${resultCoeff}(${a}x^2 + ${b})^{${n + 1}} + C`;

      steps = `Langkah penyelesaian:
1. Gunakan substitusi, misal $$u = ${a}x^2 + ${b}$$.
2. Turunkan u terhadap x: $$\\frac{du}{dx} = ${
        2 * a
      }x$$, sehingga $$x dx = \\frac{du}{${2 * a}}$$.
3. Substitusikan u dan x dx ke dalam integral: $$\\int ${k}u^{${n}} \\cdot \\frac{du}{${
        2 * a
      }} = \\frac{${k}}{${2 * a}} \\int u^{${n}} du$$
4. Gunakan aturan pangkat integral: $$\\frac{${k}}{${
        2 * a
      }} \\cdot \\frac{1}{${n}+1}u^{${n}+1} + C = \\frac{${k}}{${
        2 * a * (n + 1)
      }}u^{${n}+1} + C$$
5. Sederhanakan dan substitusikan kembali u: $$${resultCoeff}(${a}x^2 + ${b})^{${
        n + 1
      }} + C$$
6. Jadi, hasil integralnya adalah $$${fullAnswer}$$`;
      break;

    case "basic_trig_squared":
      // ∫ksin²(x) dx or ∫kcos²(x) dx
      trigType = getRandomElement(["sin", "cos"]);
      k = getIntegerFriendlyCoefficient(4, 4, 12); // Must be a multiple of 4
      qType = "Trigonometri Kuadrat";

      question = `Hitung integral tak tentu: $$\\int ${k}\\${trigType}^2(x) dx$$`;

      if (trigType === "sin") {
        answer = k / 2; // Coefficient of the x term
        fullAnswer = `${k / 2}x - ${k / 4}\\sin(2x) + C`;
        steps = `Langkah penyelesaian:
1. Gunakan identitas sudut ganda: $$\\sin^2(x) = \\frac{1 - \\cos(2x)}{2}$$
2. Substitusikan ke integral: $$\\int ${k} \\left( \\frac{1 - \\cos(2x)}{2} \\right) dx = \\frac{${k}}{2} \\int (1 - \\cos(2x)) dx$$
3. Integralkan setiap suku: $$\\frac{${k}}{2} \\left( x - \\frac{1}{2}\\sin(2x) \\right) + C$$
4. Sederhanakan: $$${k / 2}x - ${k / 4}\\sin(2x) + C$$
5. Jadi, hasil integralnya adalah $$${fullAnswer}$$`;
      } else {
        // cos
        answer = k / 2; // Coefficient of the x term
        fullAnswer = `${k / 2}x + ${k / 4}\\sin(2x) + C`;
        steps = `Langkah penyelesaian:
1. Gunakan identitas sudut ganda: $$\\cos^2(x) = \\frac{1 + \\cos(2x)}{2}$$
2. Substitusikan ke integral: $$\\int ${k} \\left( \\frac{1 + \\cos(2x)}{2} \\right) dx = \\frac{${k}}{2} \\int (1 + \\cos(2x)) dx$$
3. Integralkan setiap suku: $$\\frac{${k}}{2} \\left( x + \\frac{1}{2}\\sin(2x) \\right) + C$$
4. Sederhanakan: $$${k / 2}x + ${k / 4}\\sin(2x) + C$$
5. Jadi, hasil integralnya adalah $$${fullAnswer}$$`;
      }
      break;

    case "rational_with_easy_denominator":
      // ∫k/(ax+b)ⁿ dx for n=1 or n=2
      n = getRandomInt(1, 2);
      a = getRandomInt(2, 5);
      b = getRandomInt(1, 8);
      qType = "Fungsi Rasional Sederhana";

      if (n === 1) {
        k = getIntegerFriendlyCoefficient(a, 5, 20);
        resultCoeff = k / a;
        question = `Hitung integral tak tentu: $$\\int \\frac{${k}}{${a}x + ${b}} dx$$`;
        answer = resultCoeff; // Coefficient of the ln term
        fullAnswer = `${resultCoeff}\\ln|${a}x + ${b}| + C`;
        steps = `Langkah penyelesaian:
1. Gunakan substitusi, misal $$u = ${a}x + ${b}$$. Maka $$dx = du/${a}$$.
2. Substitusikan: $$\\int \\frac{${k}}{u} \\frac{du}{${a}} = \\frac{${k}}{${a}} \\int \\frac{1}{u} du$$
3. Integral dari 1/u adalah ln|u|: $$\\frac{${k}}{${a}} \\ln|u| + C$$
4. Sederhanakan dan substitusikan kembali u: $$${resultCoeff}\\ln|${a}x + ${b}| + C$$
5. Jadi, hasil integralnya adalah $$${fullAnswer}$$`;
      } else {
        // n = 2
        k = getIntegerFriendlyCoefficient(a, 5, 20); // No need for a² multiple, result can be rational
        resultCoeff = -k / a;
        question = `Hitung integral tak tentu: $$\\int \\frac{${k}}{(${a}x + ${b})^2} dx$$`;
        answer = resultCoeff; // The numerator of the resulting fraction
        fullAnswer = `\\frac{${resultCoeff}}{${a}x + ${b}} + C`;
        steps = `Langkah penyelesaian:
1. Gunakan substitusi, misal $$u = ${a}x + ${b}$$. Maka $$dx = du/${a}$$.
2. Substitusikan: $$\\int \\frac{${k}}{u^2} \\frac{du}{${a}} = \\frac{${k}}{${a}} \\int u^{-2} du$$
3. Gunakan aturan pangkat: $$\\frac{${k}}{${a}} \\cdot \\frac{u^{-1}}{-1} + C = -\\frac{${k}}{${a}u} + C$$
4. Substitusikan kembali u: $$-\\frac{${k}}{${a}(${a}x + ${b})} + C$$
5. Untuk jawaban yang disederhanakan, kita bisa tulis: $$${fullAnswer}$$ (catatan: -k/a disederhanakan menjadi ${resultCoeff})`;
      }
      break;
  }

  return {
    question,
    answer,
    steps,
    type: qType,
    fullAnswer,
    difficulty: "medium",
  };
}
