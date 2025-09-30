function advancedQuestionGenerator() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function generateAdvancedFunctionQuestion() {
    const types = [
      "double_graph_transformations",
      "advanced_functional_equations",
    ];

    const type = getRandomElement(types);
    let question, answer;

    switch (type) {
      case "double_graph_transformations":
        const transformType = getRandomElement([
          "trigonometric",
          "exponential",
          "logarithmic",
        ]);

        if (transformType === "trigonometric") {
          // Transformasi trigonometri dengan sudut istimewa yang hasilnya integer
          const trigFunc = getRandomElement(["sin", "cos"]);
          const amplitudes = [1, 2, 3, 4, 5, 6];
          const a = getRandomElement(amplitudes);
          const b = getRandomElement([1, 2, 3]);

          // Sudut istimewa yang menghasilkan nilai trigonometri -1, 0, atau 1 (kelipatan 90 derajat)
          const specialAngles = [0, 90, 180, 270, 360];
          const angle = getRandomElement(specialAngles);

          // Shift horizontal dan vertical yang memastikan hasil integer
          const h = getRandomElement([0, 90, 180, 270, 360]);
          const k = getRandomInt(-5, 5);

          question = `Diketahui fungsi \\(f(x) = ${a}${trigFunc}(${b}(x ${
            h >= 0 ? "+" : ""
          }${h})) ${
            k >= 0 ? "+" : ""
          }${k}\\). Tentukan nilai \\(f(${angle})\\).`;

          // Hitung effective angle untuk memastikan kelipatan 90 derajat
          const effectiveAngle = (b * (angle + h)) % 360;
          let trigValue;

          if (trigFunc === "sin") {
            trigValue = Math.sin((effectiveAngle * Math.PI) / 180);
          } else {
            trigValue = Math.cos((effectiveAngle * Math.PI) / 180);
          }

          // Karena effectiveAngle selalu 0, 90, 180, 270 mod 360, trigValue akan exact -1, 0, atau 1
          // Round untuk menghindari floating point error kecil
          const exactTrig = Math.round(trigValue);
          answer = a * exactTrig + k;

          // Tentukan nilai trig exact berdasarkan effectiveAngle untuk steps
          let trigText;
          const modAngle = effectiveAngle % 360;
          if (modAngle === 0) {
            trigText = trigFunc === "sin" ? "0" : "1";
          } else if (modAngle === 90) {
            trigText = trigFunc === "sin" ? "1" : "0";
          } else if (modAngle === 180) {
            trigText = trigFunc === "sin" ? "0" : "-1";
          } else if (modAngle === 270) {
            trigText = trigFunc === "sin" ? "-1" : "0";
          } else {
            trigText = exactTrig.toString(); // Fallback jika ada error
          }

          break;
        } else if (transformType === "exponential") {
          // Transformasi eksponensial dengan basis dan eksponen yang menghasilkan integer
          const a = getRandomInt(1, 15);
          const base = getRandomElement([2, 3, 4]);
          const h = getRandomInt(-2, 3);
          const k = getRandomInt(0, 4);

          // Pilih x yang membuat hasil perpangkatan integer
          const x = getRandomInt(0, 3);

          question = `Diketahui fungsi \\(f(x) = ${a} \\cdot ${base}^{x ${
            h >= 0 ? "+" : ""
          }${h}} ${k >= 0 ? "+" : ""}${k}\\). Tentukan nilai \\(f(${x})\\).`;

          answer = a * Math.pow(base, x + h) + k;
          break;
        } else {
          // logarithmic - Pastikan argumen logaritma adalah pangkat dari basis
          const a = getRandomInt(1, 10);
          const base = getRandomElement([2, 3, 10]);
          const k = getRandomInt(-3, 5);
          const h = 0; // Simplifikasi untuk memastikan hasil integer

          // Pilih x yang membuat logaritma integer (exact power)
          const powers = [1, base, base * base, base * base * base];
          const x = getRandomElement(powers); // No subtraction to ensure x > 0 and exact power
          const argValue = x + h;

          let logValue = 0;
          let temp = 1;
          while (temp < argValue) {
            temp *= base;
            logValue++;
          }
          // Since x is exact power and h=0, temp === argValue always holds
          const exactMatch = temp === argValue;
          if (exactMatch) {
            answer = a * logValue + k;
          } else {
            // This branch should never be reached with current setup
            answer = (a * Math.log(argValue)) / Math.log(base) + k; // Fallback to real log if needed in future
          }

          question = `Diketahui fungsi \\(f(x) = ${a} \\log_{${base}}(x) ${
            k >= 0 ? "+" : ""
          }${k}\\). Tentukan nilai \\(f(${x})\\).`;

          break;
        }
      case "advanced_functional_equations":
        const equationType = getRandomElement(["parameter", "composition"]);

        if (equationType === "composition") {
          // Persamaan komposisi yang dijamin menghasilkan integer
          const a = getRandomInt(1, 3);
          const b = getRandomInt(1, 5);
          const c = getRandomInt(1, 3);
          const d = getRandomInt(1, 5);
          const x = getRandomInt(0, 5);

          question = `Diketahui \\(f(x) = ${a}x + ${b}\\) dan \\(g(x) = ${c}x + ${d}\\). Hitung nilai \\(f(g(${x}))\\).`;

          answer = a * (c * x + d) + b;
        } else {
          const p = getRandomInt(1, 3); // Koefisien x (1, 2, atau 3)
          const k_integer = getRandomInt(-5, 5); // Tentukan k sebagai bilangan bulat acak (-5 sampai 5)

          // Gunakan rumus balik untuk q: q = 2p² + k(p + 1)
          // Ini menjamin bahwa (q - 2p²) akan habis dibagi (p + 1), sehingga k_integer adalah jawaban bulat.
          const q = 2 * p * p + k_integer * (p + 1);

          question = `Diketahui \\(f(x) = ${p}x + k\\) dan \\(f(f(2)) = ${q}\\). Tentukan nilai \\(k\\).`;

          // Jawaban:
          // f(f(2)) = 2p² + k(p + 1)
          // q = 2p² + k(p + 1)
          // k = (q - 2p²) / (p + 1)
          answer = k_integer;
        }
        break;
    }

    // Pastikan answer adalah integer
    if (typeof answer === "number") {
      answer = Math.round(answer);
    }

    return { question, answer };
  }

  function generateAdvancedLimitQuestion() {
    const types = [
      "rational_multiple_derivatives",
      "exponential_rational",
      "trigonometric_rational",
      "logarithmic_indeterminate",
      "mixed_functions",
    ];

    const type = getRandomElement(types);
    let question, answer;

    switch (type) {
      case "rational_multiple_derivatives":
        const a1 = getRandomInt(1, 25);
        const m1 = getRandomInt(1, 25);
        const n1 = getRandomInt(2, 6); // Pangkat n1 >= 2 (sehingga memerlukan minimal 2 turunan)
        const m2 = 1; // Koefisien penyebut

        // Soal: Pangkat Pembilang (n1) dan Penyebut (n1) harus sama
        question = `\\[\\lim_{x \\to ${a1}} \\frac{${m1}(x-${a1})^{${n1}}}{${m2}(x-${a1})^{${n1}}}\\]`;

        // Jawaban: Rasio Koefisien karena pangkatnya sama, atau (m1*n1!)/(m2*n1!)
        answer = m1 / m2; // Karena m2=1, jawabannya adalah m1

        break;

      case "exponential_rational":
        const a2 = getRandomInt(1, 25);
        let b2 = getRandomInt(1, 25);
        if (a2 === b2) b2 = a2 + 1;
        const c2 = a2 - b2;

        question = `\\[\\lim_{x \\to 0} \\frac{e^{${a2}x} - e^{${b2}x}}{${c2}x}\\]`;
        answer = 1;
        break;

      case "trigonometric_rational":
        let a3, c3;
        let attempts = 0;
        do {
          a3 = getRandomInt(2, 25);
          c3 = getRandomInt(1, 25);
          answer = -(a3 ** 3) / (6 * c3);
          attempts++;
          if (attempts > 20) {
            a3 = 6;
            c3 = 1;
            answer = -36;
            break;
          }
        } while (!Number.isInteger(answer));

        question = `\\[\\lim_{x \\to 0} \\frac{\\sin(${a3}x) - ${a3}x}{${c3}x^3}\\]`;
        break;

      case "logarithmic_indeterminate":
        const p = getRandomInt(1, 15);
        const divisors = [];
        for (let i = 1; i <= p; i++) if (p % i === 0) divisors.push(i);
        const a = getRandomElement(divisors);

        question = `\\[\\lim_{x \\to ${a}} \\frac{\\ln(x^{${p}})}{x - ${a}}\\]`;
        answer = p / a;
        break;

      case "mixed_functions":
        let a5,
          b5,
          attempts2 = 0;
        do {
          a5 = getRandomInt(1, 25);
          b5 = getRandomInt(1, 25);
          answer = (a5 * a5) / (2 * b5);
          attempts2++;
          if (attempts2 > 20) {
            a5 = 2;
            b5 = 1;
            answer = 2;
            break;
          }
        } while (!Number.isInteger(answer));

        question = `\\[\\lim_{x \\to 0} \\frac{e^{${a5}x} - 1 - ${a5}x}{${b5}x^2}\\]`;

        break;
    }

    return { question, answer };
  }
  const generators = [
    generateAdvancedLimitQuestion,
    generateAdvancedFunctionQuestion,
  ];
  const chosenGenerator =
    generators[Math.floor(Math.random() * generators.length)];

  return chosenGenerator();
}
