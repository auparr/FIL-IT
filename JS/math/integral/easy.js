export function generateBasicIntegralQuestion() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Fungsi untuk memilih elemen acak dari array
  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Fungsi untuk menghasilkan koefisien yang memastikan hasil integral bilangan bulat
  function getIntegerFriendlyCoefficient(exponent) {
    // Untuk memastikan hasil integral bilangan bulat, koefisien harus kelipatan dari (eksponen + 1)
    const multiplier = getRandomInt(1, 5);
    return multiplier * (exponent + 1);
  }
  const types = [
    "polynomial_single_term",
    "polynomial_multi_term",
    "basic_trigonometric_simplified",
  ];
  const type = getRandomElement(types);

  // Declare all variables that might be needed for the return object outside the switch statement.
  let question, answer, steps, qType, fullAnswer;

  // Variables for polynomial cases
  let exponent, exponent1, exponent2, coefficient, coefficient1, coefficient2;
  let answer1, answer2;
  let distinctExponents;

  // Variables for trigonometry case
  let trigCoefficient, trigFunction;

  switch (type) {
    case "polynomial_single_term":
      exponent = getRandomInt(0, 8);
      coefficient = getIntegerFriendlyCoefficient(exponent);
      qType = "Polinomial Satu Suku";

      question = `Hitung integral tak tentu: $$\\int ${coefficient}x^{${exponent}}  dx$$`;

      // ∫kxⁿ dx = k/(n+1) * xⁿ⁺¹
      const resultCoefficient = coefficient / (exponent + 1);
      answer = resultCoefficient; // The question seems to want just the coefficient.

      steps = `Langkah penyelesaian:
1. Gunakan aturan pangkat untuk integral: $$\\int x^n  dx = \\frac{1}{n+1} x^{n+1} + C$$
2. Terapkan aturan pada soal: $$\\int ${coefficient}x^{${exponent}}  dx = ${coefficient} \\cdot \\frac{1}{${exponent}+1} x^{${exponent}+1} + C$$
3. Sederhanakan: $$\\frac{${coefficient}}{${exponent + 1}} x^{${
        exponent + 1
      }} + C = ${resultCoefficient}x^{${exponent + 1}} + C$$
4. Jadi, hasil integralnya adalah $$${resultCoefficient}x^{${
        exponent + 1
      }} + C$$`;

      fullAnswer = `${resultCoefficient}x^${exponent + 1} + C`;
      break;

    case "polynomial_multi_term":
      exponent1 = getRandomInt(0, 6);
      // Ensure the second exponent is different
      do {
        exponent2 = getRandomInt(0, 6);
      } while (exponent1 === exponent2);

      distinctExponents = [exponent1, exponent2];

      coefficient1 = getIntegerFriendlyCoefficient(distinctExponents[0]);
      coefficient2 = getIntegerFriendlyCoefficient(distinctExponents[1]);
      qType = "Polinomial Beberapa Suku";

      question = `Hitung integral tak tentu: $$\\int (${coefficient1}x^{${distinctExponents[0]}} + ${coefficient2}x^{${distinctExponents[1]}})  dx$$`;

      // ∫(axᵐ + bxⁿ) dx = a/(m+1) xᵐ⁺¹ + b/(n+1) xⁿ⁺¹
      answer1 = coefficient1 / (distinctExponents[0] + 1);
      answer2 = coefficient2 / (distinctExponents[1] + 1);

      // FIX: Get the coefficient of the HIGHEST power term after integration
      if (distinctExponents[0] > distinctExponents[1]) {
        answer = answer1;
      } else {
        answer = answer2;
      }

      steps = `Langkah penyelesaian:
1. Integral dari penjumlahan adalah penjumlahan dari integral: $$\\int (f(x) + g(x))  dx = \\int f(x)  dx + \\int g(x)  dx$$
2. Terapkan aturan pangkat untuk setiap suku:
   - $$\\int ${coefficient1}x^{${
        distinctExponents[0]
      }}  dx = \\frac{${coefficient1}}{${distinctExponents[0]}+1} x^{${
        distinctExponents[0]
      }+1} = ${answer1}x^{${distinctExponents[0] + 1}}$$
   - $$\\int ${coefficient2}x^{${
        distinctExponents[1]
      }}  dx = \\frac{${coefficient2}}{${distinctExponents[1]}+1} x^{${
        distinctExponents[1]
      }+1} = ${answer2}x^{${distinctExponents[1] + 1}}$$
3. Gabungkan hasil: $$${answer1}x^{${
        distinctExponents[0] + 1
      }} + ${answer2}x^{${distinctExponents[1] + 1}} + C$$
4. Jadi, hasil integralnya adalah $$${answer1}x^{${
        distinctExponents[0] + 1
      }} + ${answer2}x^{${distinctExponents[1] + 1}} + C$$`;

      fullAnswer = `${answer1}x^${distinctExponents[0] + 1} + ${answer2}x^${
        distinctExponents[1] + 1
      } + C`;
      break;

    case "basic_trigonometric_simplified":
      // FIX: Define the trigonometric function and coefficient
      trigFunction = getRandomElement(["sin", "cos"]);
      trigCoefficient = getRandomInt(2, 10);
      qType = "Trigonometri Dasar";

      question = `Hitung integral tak tentu: $$\\int ${trigCoefficient}\\${trigFunction}(x)  dx$$`;

      if (trigFunction === "sin") {
        // ∫k sin(x) dx = -k cos(x) + C
        answer = -trigCoefficient; // Answer is the resulting coefficient
        steps = `Langkah penyelesaian:
1. Gunakan rumus integral trigonometri: $$\\int \\sin(x)  dx = -\\cos(x) + C$$
2. Terapkan pada soal: $$\\int ${trigCoefficient}\\sin(x)  dx = ${trigCoefficient} \\cdot (-\\cos(x)) + C$$
3. Sederhanakan: $$-${trigCoefficient}\\cos(x) + C$$
4. Jadi, hasil integralnya adalah $$-${trigCoefficient}\\cos(x) + C$$`;
        fullAnswer = `-${trigCoefficient}cos(x) + C`;
      } else {
        // trigFunction is "cos"
        // ∫k cos(x) dx = k sin(x) + C
        answer = trigCoefficient; // Answer is the resulting coefficient
        steps = `Langkah penyelesaian:
1. Gunakan rumus integral trigonometri: $$\\int \\cos(x)  dx = \\sin(x) + C$$
2. Terapkan pada soal: $$\\int ${trigCoefficient}\\cos(x)  dx = ${trigCoefficient} \\cdot \\sin(x) + C$$
3. Sederhanakan: $$${trigCoefficient}\\sin(x) + C$$
4. Jadi, hasil integralnya adalah $$${trigCoefficient}\\sin(x) + C$$`;
        fullAnswer = `${trigCoefficient}sin(x) + C`;
      }
      break;
  }

  return {
    question,
    answer, // This holds the single numerical answer based on the logic.
    steps,
    type: qType,
    fullAnswer, // This holds the complete expression string.
  };
}
