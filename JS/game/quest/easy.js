function easyQuestionGenerator() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function getIntegerFriendlyCoefficient(exponent) {
    const multiplier = getRandomInt(1, 5);
    return multiplier * (exponent + 1);
  }
  function generateEasyFunctionQuestion() {
    const types = [
      "function_evaluation_linear",
      "function_evaluation_quadratic",
      "domain_range_linear",
      "function_operations",
      "function_composition",
    ];

    const type = getRandomElement(types);
    let question, answer;

    switch (type) {
      case "function_evaluation_linear":
        const a1 = getRandomInt(1, 5) * (Math.random() > 0.5 ? 1 : -1);
        const b1 = getRandomInt(-10, 10);
        const c1 = getRandomInt(-5, 5);

        question = `Diketahui fungsi \\(f(x) = ${a1}x ${
          b1 >= 0 ? "+" : ""
        } ${b1}\\). Tentukan nilai \\(f(${c1})\\).`;
        answer = a1 * c1 + b1;
        break;

      case "function_evaluation_quadratic":
        const a2 = getRandomInt(1, 3) * (Math.random() > 0.5 ? 1 : -1);
        const b2 = getRandomInt(-5, 5);
        const c2 = getRandomInt(-10, 10);
        const d2 = getRandomInt(-3, 3);

        question = `Diketahui fungsi \\(f(x) = ${a2}x^2 ${
          b2 >= 0 ? "+" : ""
        } ${b2}x ${
          c2 >= 0 ? "+" : ""
        } ${c2}\\). Tentukan nilai \\(f(${d2})\\).`;
        answer = a2 * d2 * d2 + b2 * d2 + c2;
        break;

      case "domain_range_linear":
        const a3 = getRandomInt(1, 5) * (Math.random() > 0.5 ? 1 : -1);
        const b3 = getRandomInt(-10, 10);
        const domainMin = getRandomInt(-5, 0);
        const domainMax = getRandomInt(1, 5);

        question = `Diketahui fungsi \\(f(x) = ${a3}x ${
          b3 >= 0 ? "+" : ""
        } ${b3}\\) dengan domain \\(${domainMin} \\leq x \\leq ${domainMax}\\). Tentukan range minimum dari fungsi tersebut.`;

        const fMin = a3 * domainMin + b3;
        const fMax = a3 * domainMax + b3;
        answer = a3 > 0 ? fMin : fMax;
        break;

      case "function_operations":
        const opType = getRandomElement(["+", "-", "*"]);
        const a4 = getRandomInt(1, 5);
        const b4 = getRandomInt(-10, 10);
        const c4 = getRandomInt(1, 5);
        const d4 = getRandomInt(-10, 10);
        const x4 = getRandomInt(-3, 3);

        let opSymbol;
        switch (opType) {
          case "+":
            opSymbol = "+";
            answer = a4 * x4 + b4 + (c4 * x4 + d4);
            break;
          case "-":
            opSymbol = "-";
            answer = a4 * x4 + b4 - (c4 * x4 + d4);
            break;
          case "*":
            opSymbol = "\\times";
            answer = (a4 * x4 + b4) * (c4 * x4 + d4);
            break;
        }

        question = `Diketahui \\(f(x) = ${a4}x ${
          b4 >= 0 ? "+" : ""
        } ${b4}\\) dan \\(g(x) = ${c4}x ${
          d4 >= 0 ? "+" : ""
        } ${d4}\\). Tentukan nilai \\((f ${opSymbol} g)(${x4})\\).`;
        break;

      case "function_composition":
        const compType = getRandomElement(["fog", "gof"]);
        const a5 = getRandomInt(1, 5);
        const b5 = getRandomInt(-10, 10);
        const c5 = getRandomInt(1, 5);
        const d5 = getRandomInt(-10, 10);
        const x5 = getRandomInt(-3, 3);

        if (compType === "fog") {
          question = `Diketahui \\(f(x) = ${a5}x ${
            b5 >= 0 ? "+" : ""
          } ${b5}\\) dan \\(g(x) = ${c5}x ${
            d5 >= 0 ? "+" : ""
          } ${d5}\\). Tentukan nilai \\((f \\circ g)(${x5})\\).`;
          answer = a5 * (c5 * x5 + d5) + b5;
        } else {
          question = `Diketahui \\(f(x) = ${a5}x ${
            b5 >= 0 ? "+" : ""
          } ${b5}\\) dan \\(g(x) = ${c5}x ${
            d5 >= 0 ? "+" : ""
          } ${d5}\\). Tentukan nilai \\((g \\circ f)(${x5})\\).`;
          answer = c5 * (a5 * x5 + b5) + d5;
        }
        break;
    }
    return { question, answer };
  }

  function generateBasicIntegralQuestion() {
    const types = [
      "polynomial_single_term",
      //   "polynomial_multi_term",
      "basic_trigonometric_simplified",
    ];
    const type = getRandomElement(types);

    // Declare all variables that might be needed for the return object outside the switch statement.
    let question, answer;

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

        question = `Hitung integral tak tentu: $$\\int ${coefficient}x^{${exponent}}  dx$$`;

        // ∫kxⁿ dx = k/(n+1) * xⁿ⁺¹
        const resultCoefficient = coefficient / (exponent + 1);
        answer = resultCoefficient; // The question seems to want just the coefficient.

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
        break;

      case "basic_trigonometric_simplified":
        // FIX: Define the trigonometric function and coefficient
        trigFunction = getRandomElement(["sin", "cos"]);
        trigCoefficient = getRandomInt(2, 10);

        question = `Hitung integral tak tentu: $$\\int ${trigCoefficient}\\${trigFunction}(x)  dx$$`;

        if (trigFunction === "sin") {
          // ∫k sin(x) dx = -k cos(x) + C
          answer = -trigCoefficient; // Answer is the resulting
        } else {
          // trigFunction is "cos"
          // ∫k cos(x) dx = k sin(x) + C
          answer = trigCoefficient; // Answer is the resulting
        }
        break;
    }

    return {
      question,
      answer,
    };
  }

  function generateBasicLimitQuestion() {
    const questionType = getRandomInt(0, 1);

    // Nilai x yang didekati (bilangan bulat kecil)
    const xValue = getRandomInt(-5, 5);

    let question, answer;

    if (questionType === 0) {
      // Soal polinomial: ax^2 + bx + c atau ax + b
      const degree = getRandomInt(1, 2); // Derajat polinomial (1 atau 2)

      if (degree === 1) {
        // Fungsi linear: ax + b
        const a = getRandomInt(1, 5) * (Math.random() > 0.5 ? 1 : -1);
        const b = getRandomInt(-10, 10);

        question = `\\[\\lim_{x \\to ${xValue}} (${a}x ${
          b >= 0 ? "+" : ""
        } ${b})\\]`;
        answer = a * xValue + b;
      } else {
        // Fungsi kuadrat: ax^2 + bx + c
        const a = getRandomInt(1, 3) * (Math.random() > 0.5 ? 1 : -1);
        const b = getRandomInt(-5, 5);
        const c = getRandomInt(-10, 10);

        question = `\\[\\lim_{x \\to ${xValue}} (${a}x^2 ${
          b >= 0 ? "+" : ""
        } ${b}x ${c >= 0 ? "+" : ""} ${c})\\]`;
        answer = a * xValue * xValue + b * xValue + c;
      }
    } else {
      // Soal rasional sederhana: (ax + b)/(cx + d) dengan cx + d ≠ 0 saat x = xValue
      let a, b, c, d;
      let attempts = 0;

      do {
        a = getRandomInt(1, 5) * (Math.random() > 0.5 ? 1 : -1);
        b = getRandomInt(-10, 10);
        c = getRandomInt(1, 5) * (Math.random() > 0.5 ? 1 : -1);
        d = getRandomInt(-10, 10);
        attempts++;

        if (attempts > 10) {
          d = -c * xValue + 1;
        }
      } while (c * xValue + d === 0);

      question = `\\[\\lim_{x \\to ${xValue}} \\frac{${a}x ${
        b >= 0 ? "+" : ""
      } ${b}}{${c}x ${d >= 0 ? "+" : ""} ${d}}\\]`;
      answer = (a * xValue + b) / (c * xValue + d);

      if (!Number.isInteger(answer)) {
        return generateBasicLimitQuestion();
      }
    }

    return { question, answer };
  }
  const generators = [
    generateEasyFunctionQuestion,
    generateBasicIntegralQuestion,
    generateBasicLimitQuestion,
  ];
  const chosenGenerator =
    generators[Math.floor(Math.random() * generators.length)];

  // Return hasil dari generator terpilih
  return chosenGenerator();
}
