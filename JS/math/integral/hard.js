export function generateHardIntegralQuestion() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Fungsi untuk memilih elemen acak dari array
  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Fungsi untuk mencari GCD
  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }

  const types = [
    "integration_by_parts_polynomial_exp",
    "integration_by_parts_polynomial_trig",
    "partial_fraction_simple",
    "trig_substitution_basic_radical",
  ];
  const type = getRandomElement(types);

  let question, answer, steps, qType, fullAnswer;

  switch (type) {
    case "integration_by_parts_polynomial_exp":
      {
        // Generate x^n * e^(ax) with carefully chosen coefficients
        const n = getRandomInt(1, 3); // polynomial degree
        const a = getRandomInt(1, 3); // exponential coefficient
        const polyCoeff = getRandomInt(1, 4);

        qType = "Integral Parsial Polinomial-Eksponensial";

        if (n === 1) {
          question = `Hitung integral tak tentu: $$\\int ${polyCoeff}x e^{${a}x} dx$$`;

          // Using integration by parts: u = x, dv = e^(ax)dx
          // Result: (x/a - 1/a²)e^(ax)
          const mainCoeff = polyCoeff / a;
          const constCoeff = polyCoeff / (a * a);

          steps = `Langkah penyelesaian:
1. Gunakan integral parsial dengan u = ${polyCoeff}x dan dv = e^{${a}x}dx
2. Maka du = ${polyCoeff}dx dan v = \\frac{1}{${a}}e^{${a}x}
3. $$\\int ${polyCoeff}x e^{${a}x} dx = ${polyCoeff}x \\cdot \\frac{1}{${a}}e^{${a}x} - \\int \\frac{${polyCoeff}}{${a}}e^{${a}x} dx$$
4. $$= \\frac{${polyCoeff}x}{${a}}e^{${a}x} - \\frac{${polyCoeff}}{${a}} \\cdot \\frac{1}{${a}}e^{${a}x} + C$$
5. $$= \\frac{${polyCoeff}}{${a}}e^{${a}x}(x - \\frac{1}{${a}}) + C$$
6. Jadi, hasil integralnya adalah $$\\frac{${polyCoeff}}{${a}}e^{${a}x}(x - \\frac{1}{${a}}) + C$$`;

          answer = mainCoeff;
          fullAnswer = `(${polyCoeff}/${a})e^(${a}x)(x - 1/${a}) + C`;
        } else {
          // For higher powers, use simplified cases
          const simpleCoeff = getRandomInt(1, 3);
          question = `Hitung integral tak tentu: $$\\int ${simpleCoeff}x^2 e^x dx$$`;

          steps = `Langkah penyelesaian:
1. Gunakan integral parsial dua kali untuk $$\\int x^2 e^x dx$$
2. Pertama: u = x², dv = e^x dx → du = 2x dx, v = e^x
3. $$\\int x^2 e^x dx = x^2 e^x - \\int 2x e^x dx$$
4. Kedua: u = 2x, dv = e^x dx → du = 2 dx, v = e^x
5. $$\\int 2x e^x dx = 2x e^x - \\int 2 e^x dx = 2x e^x - 2e^x$$
6. Gabungkan: $$\\int x^2 e^x dx = x^2 e^x - (2x e^x - 2e^x) = e^x(x^2 - 2x + 2)$$
7. Jadi: $$\\int ${simpleCoeff}x^2 e^x dx = ${simpleCoeff}e^x(x^2 - 2x + 2) + C$$`;

          answer = simpleCoeff;
          fullAnswer = `${simpleCoeff}e^x(x^2 - 2x + 2) + C`;
        }
      }
      break;

    case "integration_by_parts_polynomial_trig":
      {
        const n = getRandomInt(1, 2);
        const trigFunc = getRandomElement(["sin", "cos"]);
        const polyCoeff = getRandomInt(1, 4);
        const trigCoeff = getRandomInt(1, 3);

        qType = "Integral Parsial Polinomial-Trigonometri";

        if (n === 1 && trigFunc === "sin") {
          question = `Hitung integral tak tentu: $$\\int ${polyCoeff}x \\sin(${trigCoeff}x) dx$$`;

          steps = `Langkah penyelesaian:
1. Gunakan integral parsial dengan u = ${polyCoeff}x dan dv = \\sin(${trigCoeff}x)dx
2. Maka du = ${polyCoeff}dx dan v = -\\frac{1}{${trigCoeff}}\\cos(${trigCoeff}x)
3. $$\\int ${polyCoeff}x \\sin(${trigCoeff}x) dx = -\\frac{${polyCoeff}x}{${trigCoeff}}\\cos(${trigCoeff}x) + \\frac{${polyCoeff}}{${trigCoeff}} \\int \\cos(${trigCoeff}x) dx$$
4. $$= -\\frac{${polyCoeff}x}{${trigCoeff}}\\cos(${trigCoeff}x) + \\frac{${polyCoeff}}{${trigCoeff}} \\cdot \\frac{1}{${trigCoeff}}\\sin(${trigCoeff}x) + C$$
5. $$= \\frac{${polyCoeff}}{${trigCoeff}}\\sin(${trigCoeff}x) - \\frac{${polyCoeff}x}{${trigCoeff}}\\cos(${trigCoeff}x) + C$$
6. Jadi, hasil integralnya adalah $$\\frac{${polyCoeff}}{${trigCoeff}}[\\sin(${trigCoeff}x) - ${trigCoeff}x\\cos(${trigCoeff}x)] + C$$`;

          answer = Math.floor(polyCoeff / trigCoeff);
          fullAnswer = `(${polyCoeff}/${trigCoeff})[sin(${trigCoeff}x) - ${trigCoeff}x*cos(${trigCoeff}x)] + C`;
        } else {
          question = `Hitung integral tak tentu: $$\\int ${polyCoeff}x \\cos(x) dx$$`;

          steps = `Langkah penyelesaian:
1. Gunakan integral parsial dengan u = ${polyCoeff}x dan dv = \\cos(x)dx
2. Maka du = ${polyCoeff}dx dan v = \\sin(x)
3. $$\\int ${polyCoeff}x \\cos(x) dx = ${polyCoeff}x \\sin(x) - \\int ${polyCoeff} \\sin(x) dx$$
4. $$= ${polyCoeff}x \\sin(x) - ${polyCoeff}(-\\cos(x)) + C$$
5. $$= ${polyCoeff}x \\sin(x) + ${polyCoeff}\\cos(x) + C$$
6. Jadi, hasil integralnya adalah $$${polyCoeff}[x \\sin(x) + \\cos(x)] + C$$`;

          answer = polyCoeff;
          fullAnswer = `${polyCoeff}[x*sin(x) + cos(x)] + C`;
        }
      }
      break;

    case "partial_fraction_simple":
      {
        // Generate (ax + b)/((x - p)(x - q)) with integer roots
        const p = getRandomInt(1, 4);
        const q = getRandomInt(1, 4);
        while (p === q) {
          q = getRandomInt(1, 4);
        }

        const a = getRandomInt(1, 3);
        const b = getRandomInt(1, 5);

        qType = "Pecahan Parsial Sederhana";

        // Calculate A and B for partial fraction decomposition
        // (ax + b)/((x - p)(x - q)) = A/(x - p) + B/(x - q)
        // ax + b = A(x - q) + B(x - p)
        const A = Math.floor((a * p + b) / (p - q));
        const B = Math.floor((a * q + b) / (q - p));

        question = `Hitung integral tak tentu: $$\\int \\frac{${a}x + ${b}}{(x - ${p})(x - ${q})} dx$$`;

        steps = `Langkah penyelesaian:
1. Dekomposisi pecahan parsial: $$\\frac{${a}x + ${b}}{(x - ${p})(x - ${q})} = \\frac{A}{x - ${p}} + \\frac{B}{x - ${q}}$$
2. Kalikan kedua ruas dengan $(x - ${p})(x - ${q})$: $$${a}x + ${b} = A(x - ${q}) + B(x - ${p})$$
3. Substitusi x = ${p}: $$${a} \\cdot ${p} + ${b} = A(${p} - ${q}) \\Rightarrow A = ${A}$$
4. Substitusi x = ${q}: $$${a} \\cdot ${q} + ${b} = B(${q} - ${p}) \\Rightarrow B = ${B}$$
5. $$\\int \\frac{${a}x + ${b}}{(x - ${p})(x - ${q})} dx = \\int \\left(\\frac{${A}}{x - ${p}} + \\frac{${B}}{x - ${q}}\\right) dx$$
6. $$= ${A}\\ln|x - ${p}| + ${B}\\ln|x - ${q}| + C$$
7. Jadi, hasil integralnya adalah $$${A}\\ln|x - ${p}| + ${B}\\ln|x - ${q}| + C$$`;

        answer = Math.abs(A) + Math.abs(B);
        fullAnswer = `${A}ln|x - ${p}| + ${B}ln|x - ${q}| + C`;
      }
      break;

    case "trig_substitution_basic_radical":
      {
        // Generate √(a² - x²) with carefully chosen a
        const a = getRandomInt(2, 4);
        const coeff = getRandomInt(1, 3);

        qType = "Substitusi Trigonometri Bentuk Akar";

        question = `Hitung integral tak tentu: $$\\int \\frac{${coeff}}{\\sqrt{${
          a * a
        } - x^2}} dx$$`;

        steps = `Langkah penyelesaian:
1. Gunakan substitusi trigonometri untuk bentuk $$\\sqrt{a^2 - x^2}$$ dengan $$a = ${a}$$
2. Substitusi: $$x = ${a}\\sin(\\theta)$$, maka $$dx = ${a}\\cos(\\theta)d\\theta$$
3. $$\\sqrt{${a * a} - x^2} = \\sqrt{${a * a} - ${
          a * a
        }\\sin^2(\\theta)} = ${a}\\sqrt{1 - \\sin^2(\\theta)} = ${a}\\cos(\\theta)$$
4. $$\\int \\frac{${coeff}}{\\sqrt{${
          a * a
        } - x^2}} dx = \\int \\frac{${coeff}}{${a}\\cos(\\theta)} \\cdot ${a}\\cos(\\theta) d\\theta$$
5. $$= \\int ${coeff} d\\theta = ${coeff}\\theta + C$$
6. Karena $$x = ${a}\\sin(\\theta)$$, maka $$\\theta = \\arcsin\\left(\\frac{x}{${a}}\\right)$$
7. Jadi, hasil integralnya adalah $$${coeff}\\arcsin\\left(\\frac{x}{${a}}\\right) + C$$`;

        answer = coeff;
        fullAnswer = `${coeff}arcsin(x/${a}) + C`;
      }
      break;
  }

  return {
    question,
    answer,
    steps,
    type: qType,
    fullAnswer,
  };
}
