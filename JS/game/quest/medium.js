function mediumQuestionGenerator() {
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

  function generateMediumFunctionQuestion() {
    const types = [
      "complex_composition", // Komposisi tiga fungsi atau dengan fungsi kuadrat
      "function_inverse", // Invers fungsi linear atau kuadrat
      "complex_domain_range", // Domain dan range fungsi dengan pecahan atau akar
      "advanced_operations", // Operasi dengan fungsi kuadrat dan rasional
      "graph_analysis", // Analisis grafik fungsi kuadrat dan rasional
    ];

    const type = getRandomElement(types);
    let question, answer;

    switch (type) {
      case "complex_composition":
        const compType = getRandomElement([
          "three_functions",
          "quadratic_composition",
        ]);
        if (compType === "three_functions") {
          // f(g(h(x)))
          const a1 = getRandomInt(1, 10);
          const b1 = getRandomInt(-15, 15);
          const c1 = getRandomInt(1, 10);
          const d1 = getRandomInt(-15, 15);
          const e1 = getRandomInt(1, 10);
          const f1 = getRandomInt(-15, 15);
          const x1 = getRandomInt(-6, 6);

          question = `Diketahui \\(f(x) = ${a1}x ${
            b1 >= 0 ? "+" : ""
          } ${b1}\\), \\(g(x) = ${c1}x ${
            d1 >= 0 ? "+" : ""
          } ${d1}\\), dan \\(h(x) = ${e1}x ${
            f1 >= 0 ? "+" : ""
          } ${f1}\\). Tentukan nilai \\((f \\circ g \\circ h)(${x1})\\).`;

          // Hitung: f(g(h(x)))
          const hx = e1 * x1 + f1;
          const ghx = c1 * hx + d1;
          answer = a1 * ghx + b1;
        } else {
          const a2 = getRandomInt(1, 10);
          const b2 = getRandomInt(-15, 15);
          const c2 = getRandomInt(1, 10);
          const d2 = getRandomInt(-10, 10);
          const e2 = getRandomInt(-15, 15);
          const x2 = getRandomInt(-6, 6);

          question = `Diketahui \\(f(x) = ${a2}x ${
            b2 >= 0 ? "+" : ""
          } ${b2}\\) dan \\(g(x) = ${c2}x^2 ${d2 >= 0 ? "+" : ""} ${d2}x ${
            e2 >= 0 ? "+" : ""
          } ${e2}\\). Tentukan nilai \\((f \\circ g)(${x2})\\).`;

          // Hitung: f(g(x))
          const gx = c2 * x2 * x2 + d2 * x2 + e2;
          answer = a2 * gx + b2;
        }
        break;
      case "function_inverse":
        const invType = getRandomElement([
          "linear_inverse",
          "quadratic_inverse",
        ]);

        if (invType === "linear_inverse") {
          const a3 = getRandomInt(1, 10);
          const b3 = getRandomInt(-15, 15);
          const c3 = getRandomInt(-15, 15);

          question = `Diketahui \\(f(x) = ${a3}x ${
            b3 >= 0 ? "+" : ""
          } ${b3}\\). Tentukan nilai \\(f^{-1}(${c3})\\).`;

          answer = (c3 - b3) / a3;

          if (!Number.isInteger(answer)) {
            return generateMediumFunctionQuestion();
          }
        } else {
          const a4 = getRandomInt(1, 5);
          const b4 = getRandomInt(-5, 5); // sekarang b boleh ≠ 0
          const c4 = getRandomInt(-10, 10);

          // Pilih x yang pasti bulat
          const xVal = getRandomInt(1, 5);
          const yVal = a4 * xVal * xVal + b4 * xVal + c4; // hitung nilai f(x) dari x bulat

          question = `Diketahui \\(f(x) = ${a4}x^2 ${
            b4 >= 0 ? "+" : ""
          } ${b4}x ${
            c4 >= 0 ? "+" : ""
          } ${c4}\\) untuk \\(x \\geq 0\\). Tentukan nilai \\(f^{-1}(${yVal})\\).`;

          answer = xVal;
        }
        break;
      case "complex_domain_range":
        const drType = getRandomElement(["rational_domain", "sqrt_range"]);

        if (drType === "rational_domain") {
          const a5 = getRandomInt(1, 10);
          const b5 = getRandomInt(-15, 15);

          if (b5 === 0) b5 = getRandomInt(1, 5);

          question = `Tentukan nilai x yang tidak termasuk domain dari fungsi \\(f(x) = \\frac{1}{${a5}x ${
            b5 >= 0 ? "+" : ""
          } ${b5}}\\).`;

          const excludedValue = -b5 / a5;
          answer = excludedValue;

          if (!Number.isInteger(answer)) {
            return generateMediumFunctionQuestion();
          }
        } else {
          const a6 = getRandomInt(1, 50);
          const b6 = getRandomInt(9, 1000); // Pastikan positif agar ada nilai real
          const c6 = getRandomInt(-30, 20);
          const domainMin = 0; // Domain minimal untuk memastikan akar real

          question = `Diketahui \\(f(x) = \\sqrt{${a6}x + ${b6}} ${
            c6 >= 0 ? "+" : ""
          } ${c6}\\) untuk \\(x \\geq ${domainMin}\\). Tentukan nilai minimum dari fungsi tersebut.`;

          answer = Math.sqrt(a6 * domainMin + b6) + c6;

          if (!Number.isInteger(answer)) {
            const sqrtVal = getRandomInt(1, 5);
            const newB6 = sqrtVal * sqrtVal;
            answer = sqrtVal + c6;

            question = `Diketahui \\(f(x) = \\sqrt{${a6}x + ${newB6}} ${
              c6 >= 0 ? "+" : ""
            } ${c6}\\) untuk \\(x \\geq ${domainMin}\\). Tentukan nilai minimum dari fungsi tersebut.`;
          }
        }
        break;
      case "advanced_operations":
        const opType = getRandomElement([
          "quadratic_operation",
          "rational_operation",
        ]);

        if (opType === "quadratic_operation") {
          // Operasi dengan fungsi kuadrat: (f ± g)(x) atau (f * g)(x)
          const op = getRandomElement(["+", "-", "*"]);
          const a7 = getRandomInt(1, 5);
          const b7 = getRandomInt(-8, 8);
          const c7 = getRandomInt(-14, 14);
          const d7 = getRandomInt(1, 5);
          const e7 = getRandomInt(-8, 8);
          const f7 = getRandomInt(-14, 14);
          const x7 = getRandomInt(-5, 5);

          let opSymbol, opName;
          switch (op) {
            case "+":
              opSymbol = "+";
              opName = "penjumlahan";
              answer =
                a7 * x7 * x7 + b7 * x7 + c7 + (d7 * x7 * x7 + e7 * x7 + f7);
              break;
            case "-":
              opSymbol = "-";
              opName = "pengurangan";
              answer =
                a7 * x7 * x7 + b7 * x7 + c7 - (d7 * x7 * x7 + e7 * x7 + f7);
              break;
            case "*":
              opSymbol = "\\times";
              opName = "perkalian";
              answer =
                (a7 * x7 * x7 + b7 * x7 + c7) * (d7 * x7 * x7 + e7 * x7 + f7);
              break;
          }

          question = `Diketahui \\(f(x) = ${a7}x^2 ${
            b7 >= 0 ? "+" : ""
          } ${b7}x ${c7 >= 0 ? "+" : ""} ${c7}\\) dan \\(g(x) = ${d7}x^2 ${
            e7 >= 0 ? "+" : ""
          } ${e7}x ${
            f7 >= 0 ? "+" : ""
          } ${f7}\\). Tentukan nilai \\((f ${opSymbol} g)(${x7})\\).`;
        } else {
          // Operasi dengan fungsi rasional
          const a8 = getRandomInt(1, 8);
          const b8 = getRandomInt(-15, 15);
          const c8 = getRandomInt(1, 8);
          const d8 = getRandomInt(-14, 14);
          const x8 = getRandomInt(-5, 5);

          // Pastikan penyebut tidak nol
          if (c8 * x8 + d8 === 0) {
            x8 = getRandomInt(-10, 10);
          }

          question = `Diketahui \\(f(x) = \\frac{${a8}x ${
            b8 >= 0 ? "+" : ""
          } ${b8}}{${c8}x ${
            d8 >= 0 ? "+" : ""
          } ${d8}}\\) dan \\(g(x) = ${c8}x ${
            d8 >= 0 ? "+" : ""
          } ${d8}\\). Tentukan nilai \\((f \\times g)(${x8})\\).`;

          // (f × g)(x) = f(x) × g(x) = (ax+b)/(cx+d) × (cx+d) = ax+b
          answer = a8 * x8 + b8;
        }
        break;

      case "graph_analysis":
        // Analisis grafik fungsi kuadrat atau rasional
        const graphType = getRandomElement([
          "quadratic_vertex",
          "rational_intercept",
        ]);

        if (graphType === "quadratic_vertex") {
          // Titik puncak parabola
          const a9 = getRandomInt(1, 5);
          const b9 = getRandomInt(-5, 5);
          const c9 = getRandomInt(-10, 10);

          question = `Diketahui fungsi kuadrat \\(f(x) = ${a9}x^2 ${
            b9 >= 0 ? "+" : ""
          } ${b9}x ${
            c9 >= 0 ? "+" : ""
          } ${c9}\\). Tentukan nilai \\(x\\) dari titik puncak parabola.`;

          // x vertex = -b/(2a)
          answer = -b9 / (2 * a9);

          // Pastikan jawaban bilangan bulat
          if (!Number.isInteger(answer)) {
            // Jika tidak bulat, buat ulang soal
            return generateMediumFunctionQuestion();
          }
        } else {
          // Titik potong sumbu x fungsi rasional
          const a10 = getRandomInt(1, 5);
          const b10 = getRandomInt(-10, 10);
          const c10 = getRandomInt(1, 5);
          const d10 = getRandomInt(-10, 10);

          // Pastikan pembilang dan penyebut tidak sama-sama nol
          if (
            a10 * (-d10 / c10) + b10 === 0 &&
            c10 * (-d10 / c10) + d10 === 0
          ) {
            // Jika terjadi, ubah parameter
            b10 = getRandomInt(-10, 10);
          }
          question = `Diketahui fungsi rasional \\( f(x) = \\frac{${a10}x ${
            b10 >= 0 ? "+" : ""
          } ${b10}}{${c10}x ${
            d10 >= 0 ? "+" : ""
          } ${d10}} \\). Tentukan nilai \\(x\\) sehingga \\( f(x) = 0 \\).`;

          answer = -b10 / a10;

          if (!Number.isInteger(answer)) {
            return generateMediumFunctionQuestion();
          }
        }
        break;
    }
    return { question, answer };
  }

  function generateMediumLimitQuestion() {
    const questionType = getRandomInt(0, 1);
    const xValue = getRandomInt(1, 15);

    let question, answer;

    if (questionType === 0) {
      // Faktorisasi
      const a = xValue;
      const b = getRandomInt(1, 15) * (Math.random() > 0.5 ? 1 : -1);
      const useSimpleForm = Math.random() > 0.5;

      if (useSimpleForm) {
        question = `\\[\\lim_{x \\to ${a}} \\frac{x^2 - ${a * a}}{x - ${a}}\\]`;
        answer = 2 * a;
      } else {
        const c = a + b;
        question = `\\[\\lim_{x \\to ${a}} \\frac{x^2 - ${a + c}x + ${
          a * c
        }}{x - ${a}}\\]`;
        answer = a - c;
      }
    } else {
      // Rasionalisasi
      const k = getRandomInt(1, 15);
      const m = k * k;

      question = `\\[\\lim_{x \\to ${m}} \\frac{x - ${m}}{\\sqrt{x} - ${k}}\\]`;
      answer = 2 * k;
    }

    return { question, answer };
  }

  function generateMediumIntegralQuestion() {
    const types = [
      "polynomial_inside_linear",
      "simple_substitution",
      "basic_trig_squared",
      "rational_with_easy_denominator",
    ];
    const type = getRandomElement(types);

    // Declare all variables outside the switch statement for consistent structure
    let question, answer;

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

        question = `Hitung integral tak tentu: $$\\int ${k}(${a}x + ${b})^{${n}} dx$$`;
        answer = resultCoeff; // The final coefficient is the single numerical answer
        break;

      case "simple_substitution":
        // ∫kx(ax²+b)ⁿ dx
        n = getRandomInt(1, 3);
        a = getRandomInt(2, 4);
        b = getRandomInt(1, 6);
        k = getIntegerFriendlyCoefficient(2 * a * (n + 1), 10, 50);
        resultCoeff = k / (2 * a * (n + 1));

        question = `Hitung integral tak tentu: $$\\int ${k}x(${a}x^2 + ${b})^{${n}} dx$$`;
        answer = resultCoeff; // The final coefficient
        break;

      case "basic_trig_squared":
        // ∫ksin²(x) dx or ∫kcos²(x) dx
        trigType = getRandomElement(["sin", "cos"]);
        k = getIntegerFriendlyCoefficient(4, 4, 12); // Must be a multiple of 4

        question = `Hitung integral tak tentu: $$\\int ${k}\\${trigType}^2(x) dx$$`;

        if (trigType === "sin") {
          answer = k / 2; // Coefficient of the x term
        } else {
          // cos
          answer = k / 2; // Coefficient of the x term
        }
        break;

      case "rational_with_easy_denominator":
        // ∫k/(ax+b)ⁿ dx for n=1 or n=2
        n = getRandomInt(1, 2);
        a = getRandomInt(2, 5);
        b = getRandomInt(1, 8);

        if (n === 1) {
          k = getIntegerFriendlyCoefficient(a, 5, 20);
          resultCoeff = k / a;
          question = `Hitung integral tak tentu: $$\\int \\frac{${k}}{${a}x + ${b}} dx$$`;
          answer = resultCoeff; // Coefficient of the ln term
        } else {
          // n = 2
          k = getIntegerFriendlyCoefficient(a, 5, 20); // No need for a² multiple, result can be rational
          resultCoeff = -k / a;
          question = `Hitung integral tak tentu: $$\\int \\frac{${k}}{(${a}x + ${b})^2} dx$$`;
          answer = resultCoeff; // The numerator of the resulting fraction
        }
        break;
    }

    return { question, answer };
  }
  const generators = [
    generateMediumFunctionQuestion,
    generateMediumLimitQuestion,
    generateMediumIntegralQuestion,
  ];
  const chosenGenerator =
    generators[Math.floor(Math.random() * generators.length)];

  // Return hasil dari generator terpilih
  return chosenGenerator();
}
