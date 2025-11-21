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

  function generateMediumDerivativeQuestion() {
    const types = [
      "chain_rule_simple",
      "product_rule",
      "quotient_rule",
      "chain_product_combo",
      "basic_trig_derivative",
    ];

    const type = getRandomElement(types);
    let question, answer, steps, qType;

    switch (type) {
      case "chain_rule_simple":
        // d/dx[(ax+b)^n] = n·a·(ax+b)^(n-1)
        const a1 = getRandomInt(2, 5);
        const b1 = getRandomInt(1, 8);
        const n1 = getRandomInt(2, 5);
        const x1 = getRandomInt(0, 3);

        question = `Diketahui \\(f(x) = (${a1}x + ${b1})^{${n1}}\\). Tentukan nilai \\(f'(${x1})\\).`;

        // f'(x) = n·a·(ax+b)^(n-1)
        // f'(x1) = n·a·(a·x1+b)^(n-1)
        const innerValue = a1 * x1 + b1;
        answer = n1 * a1 * Math.pow(innerValue, n1 - 1);

        steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = (${a1}x + ${b1})^{${n1}}\\]

2. Gunakan aturan rantai: \\(\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)\\)
   - Fungsi luar: \\(u^{${n1}}\\) dengan \\(u = ${a1}x + ${b1}\\)
   - Turunan fungsi luar: \\(${n1}u^{${n1 - 1}}\\)
   - Turunan fungsi dalam: \\(\\frac{d}{dx}(${a1}x + ${b1}) = ${a1}\\)

3. Terapkan aturan rantai:
   \\[f'(x) = ${n1}(${a1}x + ${b1})^{${n1 - 1}} \\cdot ${a1}\\]
   \\[f'(x) = ${n1 * a1}(${a1}x + ${b1})^{${n1 - 1}}\\]

4. Substitusi \\(x = ${x1}\\):
   \\[f'(${x1}) = ${n1 * a1}(${a1}(${x1}) + ${b1})^{${n1 - 1}}\\]
   \\[f'(${x1}) = ${n1 * a1}(${innerValue})^{${n1 - 1}}\\]

5. Hitung:
   \\[f'(${x1}) = ${n1 * a1} \\times ${Math.pow(innerValue, n1 - 1)}\\]
   \\[f'(${x1}) = ${answer}\\]

6. Jadi, nilai turunan di \\(x = ${x1}\\) adalah \\(${answer}\\)`;

        qType = "Aturan Rantai";
        break;

      case "product_rule":
        // d/dx[f·g] = f'·g + f·g'
        // Gunakan (ax+b)(cx+d) atau x^n·(mx+p)
        const subtype = getRandomElement(["linear_linear", "power_linear"]);

        if (subtype === "linear_linear") {
          const a2 = getRandomInt(1, 5);
          const b2 = getRandomInt(1, 8);
          const c2 = getRandomInt(1, 5);
          const d2 = getRandomInt(1, 8);
          const x2 = getRandomInt(1, 3);

          question = `Diketahui \\(f(x) = (${a2}x + ${b2})(${c2}x + ${d2})\\). Tentukan nilai \\(f'(${x2})\\).`;

          // f = (ax+b), g = (cx+d)
          // f' = a, g' = c
          // f'g + fg' = a(cx+d) + (ax+b)c
          // At x2: a(c·x2+d) + (a·x2+b)c
          const fValue = a2 * x2 + b2;
          const gValue = c2 * x2 + d2;
          const fPrime = a2;
          const gPrime = c2;
          answer = fPrime * gValue + fValue * gPrime;

          steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = (${a2}x + ${b2})(${c2}x + ${d2})\\]

2. Gunakan aturan produk: \\(\\frac{d}{dx}[u \\cdot v] = u' \\cdot v + u \\cdot v'\\)
   - \\(u = ${a2}x + ${b2}\\), maka \\(u' = ${a2}\\)
   - \\(v = ${c2}x + ${d2}\\), maka \\(v' = ${c2}\\)

3. Terapkan aturan produk:
   \\[f'(x) = ${a2} \\cdot (${c2}x + ${d2}) + (${a2}x + ${b2}) \\cdot ${c2}\\]

4. Substitusi \\(x = ${x2}\\):
   - \\(u(${x2}) = ${a2}(${x2}) + ${b2} = ${fValue}\\)
   - \\(v(${x2}) = ${c2}(${x2}) + ${d2} = ${gValue}\\)

5. Hitung:
   \\[f'(${x2}) = ${a2} \\times ${gValue} + ${fValue} \\times ${c2}\\]
   \\[f'(${x2}) = ${a2 * gValue} + ${fValue * c2}\\]
   \\[f'(${x2}) = ${answer}\\]

6. Jadi, nilai turunan di \\(x = ${x2}\\) adalah \\(${answer}\\)`;

          qType = "Aturan Produk (Linear × Linear)";
        } else {
          // power_linear: x^n · (mx+p)
          const n3 = getRandomInt(2, 4);
          const m3 = getRandomInt(1, 5);
          const p3 = getRandomInt(1, 8);
          const x3 = getRandomInt(1, 2);

          question = `Diketahui \\(f(x) = x^{${n3}}(${m3}x + ${p3})\\). Tentukan nilai \\(f'(${x3})\\).`;

          // f = x^n, g = mx+p
          // f' = n·x^(n-1), g' = m
          // f'g + fg' = n·x^(n-1)·(mx+p) + x^n·m
          const fValue = Math.pow(x3, n3);
          const gValue = m3 * x3 + p3;
          const fPrimeValue = n3 * Math.pow(x3, n3 - 1);
          const gPrime = m3;
          answer = fPrimeValue * gValue + fValue * gPrime;

          steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = x^{${n3}}(${m3}x + ${p3})\\]

2. Gunakan aturan produk: \\(\\frac{d}{dx}[u \\cdot v] = u' \\cdot v + u \\cdot v'\\)
   - \\(u = x^{${n3}}\\), maka \\(u' = ${n3}x^{${n3 - 1}}\\)
   - \\(v = ${m3}x + ${p3}\\), maka \\(v' = ${m3}\\)

3. Terapkan aturan produk:
   \\[f'(x) = ${n3}x^{${n3 - 1}}(${m3}x + ${p3}) + x^{${n3}} \\cdot ${m3}\\]

4. Substitusi \\(x = ${x3}\\):
   - \\(u(${x3}) = (${x3})^{${n3}} = ${fValue}\\)
   - \\(u'(${x3}) = ${n3}(${x3})^{${n3 - 1}} = ${fPrimeValue}\\)
   - \\(v(${x3}) = ${m3}(${x3}) + ${p3} = ${gValue}\\)

5. Hitung:
   \\[f'(${x3}) = ${fPrimeValue} \\times ${gValue} + ${fValue} \\times ${m3}\\]
   \\[f'(${x3}) = ${fPrimeValue * gValue} + ${fValue * m3}\\]
   \\[f'(${x3}) = ${answer}\\]

6. Jadi, nilai turunan di \\(x = ${x3}\\) adalah \\(${answer}\\)`;

          qType = "Aturan Produk (Pangkat × Linear)";
        }
        break;

      case "quotient_rule":
        // d/dx[f/g] = (f'·g - f·g')/g²
        // Gunakan (ax+b)/(cx+d)
        const a4 = getRandomInt(1, 5);
        const b4 = getRandomInt(1, 10);
        const c4 = getRandomInt(1, 5);
        const d4 = getRandomInt(1, 10);

        // Pilih x yang membuat penyebut tidak nol dan hasil integer
        let x4 = getRandomInt(1, 3);
        const gValue4 = c4 * x4 + d4;

        // Pastikan penyebut tidak nol
        while (gValue4 === 0) {
          x4 = getRandomInt(1, 5);
          gValue4 = c4 * x4 + d4;
        }

        question = `Diketahui \\(f(x) = \\frac{${a4}x + ${b4}}{${c4}x + ${d4}}\\). Tentukan nilai \\(f'(${x4})\\).`;

        // f = ax+b, f' = a
        // g = cx+d, g' = c
        // f'g - fg' = a(cx+d) - (ax+b)c = acx + ad - acx - bc = ad - bc
        // (f'g - fg')/g² = (ad - bc)/(cx+d)²
        const numerator = a4 * d4 - b4 * c4;
        const denominator = gValue4 * gValue4;

        // Cari pembagi persekutuan terbesar untuk menyederhanakan
        function gcd(a, b) {
          a = Math.abs(a);
          b = Math.abs(b);
          while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
          }
          return a;
        }

        const divisor = gcd(numerator, denominator);
        answer = numerator / denominator;

        // Jika tidak integer, regenerate
        if (!Number.isInteger(answer)) {
          return generateMediumDerivativeQuestion();
        }

        steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = \\frac{${a4}x + ${b4}}{${c4}x + ${d4}}\\]

2. Gunakan aturan hasil bagi: \\(\\frac{d}{dx}\\left[\\frac{u}{v}\\right] = \\frac{u' \\cdot v - u \\cdot v'}{v^2}\\)
   - \\(u = ${a4}x + ${b4}\\), maka \\(u' = ${a4}\\)
   - \\(v = ${c4}x + ${d4}\\), maka \\(v' = ${c4}\\)

3. Terapkan aturan hasil bagi:
   \\[f'(x) = \\frac{${a4}(${c4}x + ${d4}) - (${a4}x + ${b4})(${c4})}{(${c4}x + ${d4})^2}\\]

4. Sederhanakan pembilang:
   \\[= \\frac{${a4 * c4}x + ${a4 * d4} - ${a4 * c4}x - ${
          b4 * c4
        }}{(${c4}x + ${d4})^2}\\]
   \\[= \\frac{${numerator}}{(${c4}x + ${d4})^2}\\]

5. Substitusi \\(x = ${x4}\\):
   \\[f'(${x4}) = \\frac{${numerator}}{(${c4}(${x4}) + ${d4})^2}\\]
   \\[f'(${x4}) = \\frac{${numerator}}{(${gValue4})^2}\\]
   \\[f'(${x4}) = \\frac{${numerator}}{${denominator}}\\]

6. Sederhanakan:
   \\[f'(${x4}) = ${answer}\\]

7. Jadi, nilai turunan di \\(x = ${x4}\\) adalah \\(${answer}\\)`;

        qType = "Aturan Hasil Bagi";
        break;

      case "chain_product_combo":
        // Kombinasi: d/dx[x^n·(ax+b)^m]
        const n5 = getRandomInt(1, 3);
        const a5 = getRandomInt(2, 4);
        const b5 = getRandomInt(1, 5);
        const m5 = getRandomInt(2, 3);
        const x5 = getRandomInt(1, 2);

        question = `Diketahui \\(f(x) = x^{${n5}}(${a5}x + ${b5})^{${m5}}\\). Tentukan nilai \\(f'(${x5})\\).`;

        // Gunakan product rule + chain rule
        // f = x^n, g = (ax+b)^m
        // f' = n·x^(n-1)
        // g' = m·a·(ax+b)^(m-1) (chain rule)
        // f'g + fg'

        const fVal = Math.pow(x5, n5);
        const gVal = Math.pow(a5 * x5 + b5, m5);
        const fPrimeVal = n5 * Math.pow(x5, n5 - 1);
        const innerVal = a5 * x5 + b5;
        const gPrimeVal = m5 * a5 * Math.pow(innerVal, m5 - 1);

        answer = fPrimeVal * gVal + fVal * gPrimeVal;

        steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = x^{${n5}}(${a5}x + ${b5})^{${m5}}\\]

2. Gunakan aturan produk: \\(\\frac{d}{dx}[u \\cdot v] = u' \\cdot v + u \\cdot v'\\)
   - \\(u = x^{${n5}}\\), maka \\(u' = ${n5}x^{${n5 - 1}}\\)
   - \\(v = (${a5}x + ${b5})^{${m5}}\\)

3. Untuk \\(v'\\), gunakan aturan rantai:
   \\[v' = ${m5}(${a5}x + ${b5})^{${m5 - 1}} \\cdot ${a5}\\]
   \\[v' = ${m5 * a5}(${a5}x + ${b5})^{${m5 - 1}}\\]

4. Terapkan aturan produk:
   \\[f'(x) = ${n5}x^{${n5 - 1}}(${a5}x + ${b5})^{${m5}} + x^{${n5}} \\cdot ${
          m5 * a5
        }(${a5}x + ${b5})^{${m5 - 1}}\\]

5. Substitusi \\(x = ${x5}\\):
   - \\(u(${x5}) = (${x5})^{${n5}} = ${fVal}\\)
   - \\(v(${x5}) = (${a5 * x5 + b5})^{${m5}} = ${gVal}\\)
   - \\(u'(${x5}) = ${n5}(${x5})^{${n5 - 1}} = ${fPrimeVal}\\)
   - \\(v'(${x5}) = ${m5 * a5}(${innerVal})^{${m5 - 1}} = ${gPrimeVal}\\)

6. Hitung:
   \\[f'(${x5}) = ${fPrimeVal} \\times ${gVal} + ${fVal} \\times ${gPrimeVal}\\]
   \\[f'(${x5}) = ${fPrimeVal * gVal} + ${fVal * gPrimeVal}\\]
   \\[f'(${x5}) = ${answer}\\]

7. Jadi, nilai turunan di \\(x = ${x5}\\) adalah \\(${answer}\\)`;

        qType = "Kombinasi Aturan (Produk + Rantai)";
        break;

      case "basic_trig_derivative":
        // Turunan trigonometri dasar
        const trigType = getRandomElement([
          "sin",
          "cos",
          "sin_linear",
          "cos_linear",
        ]);

        if (trigType === "sin") {
          // d/dx[a·sin(x)] = a·cos(x)
          const a6 = getRandomInt(1, 5);
          const x6 = getRandomElement([0, 90, 180, 270]); // Dalam derajat untuk nilai integer

          question = `Diketahui \\(f(x) = ${a6}\\sin(x^\\circ)\\). Tentukan nilai \\(f'(${x6}^\\circ)\\) (dalam satuan radian/derajat).`;

          // f'(x) = a·cos(x)
          // Nilai cos di sudut istimewa
          const cosValues = {
            0: 1,
            90: 0,
            180: -1,
            270: 0,
          };

          answer = a6 * cosValues[x6];

          steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${a6}\\sin(x^\\circ)\\]

2. Turunan sinus: \\(\\frac{d}{dx}[\\sin(x)] = \\cos(x)\\)

3. Terapkan aturan:
   \\[f'(x) = ${a6}\\cos(x^\\circ)\\]

4. Substitusi \\(x = ${x6}^\\circ\\):
   \\[f'(${x6}^\\circ) = ${a6}\\cos(${x6}^\\circ)\\]

5. Nilai \\(\\cos(${x6}^\\circ) = ${cosValues[x6]}\\)

6. Hitung:
   \\[f'(${x6}^\\circ) = ${a6} \\times ${cosValues[x6]} = ${answer}\\]

7. Jadi, nilai turunan di \\(x = ${x6}^\\circ\\) adalah \\(${answer}\\)`;

          qType = "Turunan Trigonometri (Sinus)";
        } else if (trigType === "cos") {
          // d/dx[a·cos(x)] = -a·sin(x)
          const a7 = getRandomInt(1, 5);
          const x7 = getRandomElement([0, 90, 180, 270]);

          question = `Diketahui \\(f(x) = ${a7}\\cos(x^\\circ)\\). Tentukan nilai \\(f'(${x7}^\\circ)\\).`;

          // f'(x) = -a·sin(x)
          const sinValues = {
            0: 0,
            90: 1,
            180: 0,
            270: -1,
          };

          answer = -a7 * sinValues[x7];

          steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${a7}\\cos(x^\\circ)\\]

2. Turunan kosinus: \\(\\frac{d}{dx}[\\cos(x)] = -\\sin(x)\\)

3. Terapkan aturan:
   \\[f'(x) = -${a7}\\sin(x^\\circ)\\]

4. Substitusi \\(x = ${x7}^\\circ\\):
   \\[f'(${x7}^\\circ) = -${a7}\\sin(${x7}^\\circ)\\]

5. Nilai \\(\\sin(${x7}^\\circ) = ${sinValues[x7]}\\)

6. Hitung:
   \\[f'(${x7}^\\circ) = -${a7} \\times ${sinValues[x7]} = ${answer}\\]

7. Jadi, nilai turunan di \\(x = ${x7}^\\circ\\) adalah \\(${answer}\\)`;

          qType = "Turunan Trigonometri (Kosinus)";
        } else if (trigType === "sin_linear") {
          // d/dx[a·sin(bx+c)] = a·b·cos(bx+c)
          const a8 = getRandomInt(1, 4);
          const b8 = getRandomInt(2, 4);
          const x8 = getRandomElement([0, 30, 45, 60, 90]);

          // Pilih c sehingga bx+c adalah sudut istimewa
          const specialAngles = [0, 30, 45, 60, 90, 180, 270];
          const targetAngle = getRandomElement(specialAngles);
          const c8 = targetAngle - b8 * x8;

          question = `Diketahui \\(f(x) = ${a8}\\sin(${b8}x^\\circ ${
            c8 >= 0 ? "+" : ""
          }${c8}^\\circ)\\). Tentukan nilai \\(f'(${x8}^\\circ)\\).`;

          // f'(x) = a·b·cos(bx+c)
          const angle = b8 * x8 + c8;
          const cosValue = Math.round(Math.cos((angle * Math.PI) / 180));
          answer = a8 * b8 * cosValue;

          steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${a8}\\sin(${b8}x^\\circ ${c8 >= 0 ? "+" : ""}${c8}^\\circ)\\]

2. Gunakan aturan rantai:
   \\[\\frac{d}{dx}[\\sin(u)] = \\cos(u) \\cdot u'\\]

3. Di sini, \\(u = ${b8}x^\\circ ${c8 >= 0 ? "+" : ""}${c8}^\\circ\\)
   \\[u' = ${b8}\\]

4. Terapkan aturan:
   \\[f'(x) = ${a8}\\cos(${b8}x^\\circ ${
            c8 >= 0 ? "+" : ""
          }${c8}^\\circ) \\cdot ${b8}\\]
   \\[f'(x) = ${a8 * b8}\\cos(${b8}x^\\circ ${
            c8 >= 0 ? "+" : ""
          }${c8}^\\circ)\\]

5. Substitusi \\(x = ${x8}^\\circ\\):
   \\[f'(${x8}^\\circ) = ${a8 * b8}\\cos(${b8}(${x8})^\\circ ${
            c8 >= 0 ? "+" : ""
          }${c8}^\\circ)\\]
   \\[f'(${x8}^\\circ) = ${a8 * b8}\\cos(${angle}^\\circ)\\]

6. Nilai \\(\\cos(${angle}^\\circ) = ${cosValue}\\)

7. Hitung:
   \\[f'(${x8}^\\circ) = ${a8 * b8} \\times ${cosValue} = ${answer}\\]

8. Jadi, nilai turunan di \\(x = ${x8}^\\circ\\) adalah \\(${answer}\\)`;

          qType = "Turunan Trigonometri (Sinus dengan Rantai)";
        } else {
          // cos_linear: d/dx[a·cos(bx+c)] = -a·b·sin(bx+c)
          const a9 = getRandomInt(1, 4);
          const b9 = getRandomInt(2, 4);
          const x9 = getRandomElement([0, 30, 45, 60, 90]);

          const specialAngles = [0, 30, 45, 60, 90, 180, 270];
          const targetAngle = getRandomElement(specialAngles);
          const c9 = targetAngle - b9 * x9;

          question = `Diketahui \\(f(x) = ${a9}\\cos(${b9}x^\\circ ${
            c9 >= 0 ? "+" : ""
          }${c9}^\\circ)\\). Tentukan nilai \\(f'(${x9}^\\circ)\\).`;

          const angle = b9 * x9 + c9;
          const sinValue = Math.round(Math.sin((angle * Math.PI) / 180));
          answer = -a9 * b9 * sinValue;

          steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${a9}\\cos(${b9}x^\\circ ${c9 >= 0 ? "+" : ""}${c9}^\\circ)\\]

2. Gunakan aturan rantai:
   \\[\\frac{d}{dx}[\\cos(u)] = -\\sin(u) \\cdot u'\\]

3. Di sini, \\(u = ${b9}x^\\circ ${c9 >= 0 ? "+" : ""}${c9}^\\circ\\)
   \\[u' = ${b9}\\]

4. Terapkan aturan:
   \\[f'(x) = -${a9}\\sin(${b9}x^\\circ ${
            c9 >= 0 ? "+" : ""
          }${c9}^\\circ) \\cdot ${b9}\\]
   \\[f'(x) = -${a9 * b9}\\sin(${b9}x^\\circ ${
            c9 >= 0 ? "+" : ""
          }${c9}^\\circ)\\]

5. Substitusi \\(x = ${x9}^\\circ\\):
   \\[f'(${x9}^\\circ) = -${a9 * b9}\\sin(${b9}(${x9})^\\circ ${
            c9 >= 0 ? "+" : ""
          }${c9}^\\circ)\\]
   \\[f'(${x9}^\\circ) = -${a9 * b9}\\sin(${angle}^\\circ)\\]

6. Nilai \\(\\sin(${angle}^\\circ) = ${sinValue}\\)

7. Hitung:
   \\[f'(${x9}^\\circ) = -${a9 * b9} \\times ${sinValue} = ${answer}\\]

8. Jadi, nilai turunan di \\(x = ${x9}^\\circ\\) adalah \\(${answer}\\)`;

          qType = "Turunan Trigonometri (Kosinus dengan Rantai)";
        }
        break;
    }

    return { question, answer, steps, type: qType };
  }

  const generators = [
    generateMediumFunctionQuestion,
    generateMediumLimitQuestion,
    generateMediumIntegralQuestion,
    generateMediumDerivativeQuestion,
  ];
  const chosenGenerator =
    generators[Math.floor(Math.random() * generators.length)];

  // Return hasil dari generator terpilih
  return chosenGenerator();
}
