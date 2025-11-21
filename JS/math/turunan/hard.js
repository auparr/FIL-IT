export function generateHardDerivativeQuestion() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  const types = [
    "implicit_differentiation", // Turunan implisit
    "exponential_derivative", // Turunan eksponensial
    "logarithmic_derivative", // Turunan logaritma
    "advanced_trig", // Turunan tan, sec, csc, cot
    "higher_order_derivative", // Turunan tingkat tinggi
  ];

  const type = getRandomElement(types);
  let question, answer, steps, qType;

  switch (type) {
    case "implicit_differentiation":
      // Turunan implisit: x^2 + y^2 = r^2 atau x^2 + xy + y^2 = k
      const subtype = getRandomElement(["circle", "ellipse", "mixed"]);

      if (subtype === "circle") {
        // x^2 + y^2 = r^2, cari dy/dx di titik (x0, y0)
        const r = getRandomInt(3, 7);
        const rSquared = r * r;

        // Pilih titik (x0, y0) pada lingkaran
        const x0 = getRandomInt(1, r - 1);
        const y0Squared = rSquared - x0 * x0;
        const y0 = Math.sqrt(y0Squared);

        // Pastikan y0 adalah bilangan bulat
        if (!Number.isInteger(y0)) {
          return generateHardDerivativeQuestion();
        }

        question = `Diketahui persamaan implisit \\(x^2 + y^2 = ${rSquared}\\). Tentukan nilai \\(\\frac{dy}{dx}\\) di titik \\((${x0}, ${y0})\\).`;

        // dy/dx = -x/y
        answer = -x0 / y0;

        if (!Number.isInteger(answer)) {
          return generateHardDerivativeQuestion();
        }

        steps = `Langkah penyelesaian:
1. Persamaan yang diberikan:
   \\[x^2 + y^2 = ${rSquared}\\]

2. Turunkan kedua ruas terhadap \\(x\\) (gunakan turunan implisit):
   \\[\\frac{d}{dx}(x^2) + \\frac{d}{dx}(y^2) = \\frac{d}{dx}(${rSquared})\\]

3. Terapkan aturan rantai pada \\(y^2\\):
   \\[2x + 2y\\frac{dy}{dx} = 0\\]

4. Selesaikan untuk \\(\\frac{dy}{dx}\\):
   \\[2y\\frac{dy}{dx} = -2x\\]
   \\[\\frac{dy}{dx} = -\\frac{x}{y}\\]

5. Substitusi titik \\((${x0}, ${y0})\\):
   \\[\\frac{dy}{dx}\\bigg|_{(${x0},${y0})} = -\\frac{${x0}}{${y0}}\\]

6. Hitung:
   \\[\\frac{dy}{dx} = ${answer}\\]

7. Jadi, nilai turunan di titik \\((${x0}, ${y0})\\) adalah \\(${answer}\\)`;

        qType = "Turunan Implisit (Lingkaran)";
      } else if (subtype === "ellipse") {
        // ax^2 + by^2 = c
        const a1 = getRandomInt(1, 4);
        const b1 = getRandomInt(1, 4);
        const x1 = getRandomInt(1, 3);
        const y1 = getRandomInt(1, 3);
        const c1 = a1 * x1 * x1 + b1 * y1 * y1;

        question = `Diketahui persamaan implisit \\(${a1}x^2 + ${b1}y^2 = ${c1}\\). Tentukan nilai \\(\\frac{dy}{dx}\\) di titik \\((${x1}, ${y1})\\).`;

        // 2ax + 2by(dy/dx) = 0
        // dy/dx = -ax/(by)
        answer = -(a1 * x1) / (b1 * y1);

        if (!Number.isInteger(answer)) {
          return generateHardDerivativeQuestion();
        }

        steps = `Langkah penyelesaian:
1. Persamaan yang diberikan:
   \\[${a1}x^2 + ${b1}y^2 = ${c1}\\]

2. Turunkan kedua ruas terhadap \\(x\\):
   \\[${a1} \\cdot 2x + ${b1} \\cdot 2y\\frac{dy}{dx} = 0\\]

3. Sederhanakan:
   \\[${2 * a1}x + ${2 * b1}y\\frac{dy}{dx} = 0\\]

4. Selesaikan untuk \\(\\frac{dy}{dx}\\):
   \\[${2 * b1}y\\frac{dy}{dx} = -${2 * a1}x\\]
   \\[\\frac{dy}{dx} = -\\frac{${2 * a1}x}{${
          2 * b1
        }y} = -\\frac{${a1}x}{${b1}y}\\]

5. Substitusi titik \\((${x1}, ${y1})\\):
   \\[\\frac{dy}{dx}\\bigg|_{(${x1},${y1})} = -\\frac{${a1} \\cdot ${x1}}{${b1} \\cdot ${y1}}\\]

6. Hitung:
   \\[\\frac{dy}{dx} = -\\frac{${a1 * x1}}{${b1 * y1}} = ${answer}\\]

7. Jadi, nilai turunan di titik \\((${x1}, ${y1})\\) adalah \\(${answer}\\)`;

        qType = "Turunan Implisit (Elips)";
      } else {
        // x^2 + axy + y^2 = c
        const a2 = getRandomInt(1, 3);
        const x2 = getRandomInt(1, 2);
        const y2 = getRandomInt(1, 2);
        const c2 = x2 * x2 + a2 * x2 * y2 + y2 * y2;

        question = `Diketahui persamaan implisit \\(x^2 + ${a2}xy + y^2 = ${c2}\\). Tentukan nilai \\(\\frac{dy}{dx}\\) di titik \\((${x2}, ${y2})\\).`;

        // 2x + a(y + x·dy/dx) + 2y·dy/dx = 0
        // 2x + ay + ax·dy/dx + 2y·dy/dx = 0
        // (ax + 2y)·dy/dx = -2x - ay
        // dy/dx = -(2x + ay)/(ax + 2y)
        const numerator = -(2 * x2 + a2 * y2);
        const denominator = a2 * x2 + 2 * y2;
        answer = numerator / denominator;

        if (!Number.isInteger(answer)) {
          return generateHardDerivativeQuestion();
        }

        steps = `Langkah penyelesaian:
1. Persamaan yang diberikan:
   \\[x^2 + ${a2}xy + y^2 = ${c2}\\]

2. Turunkan kedua ruas terhadap \\(x\\):
   \\[2x + ${a2}\\left(y + x\\frac{dy}{dx}\\right) + 2y\\frac{dy}{dx} = 0\\]

3. Distribusikan dan kelompokkan:
   \\[2x + ${a2}y + ${a2}x\\frac{dy}{dx} + 2y\\frac{dy}{dx} = 0\\]

4. Kelompokkan suku \\(\\frac{dy}{dx}\\):
   \\[(${a2}x + 2y)\\frac{dy}{dx} = -2x - ${a2}y\\]

5. Selesaikan untuk \\(\\frac{dy}{dx}\\):
   \\[\\frac{dy}{dx} = -\\frac{2x + ${a2}y}{${a2}x + 2y}\\]

6. Substitusi titik \\((${x2}, ${y2})\\):
   \\[\\frac{dy}{dx}\\bigg|_{(${x2},${y2})} = -\\frac{2(${x2}) + ${a2}(${y2})}{${a2}(${x2}) + 2(${y2})}\\]

7. Hitung:
   \\[\\frac{dy}{dx} = -\\frac{${2 * x2 + a2 * y2}}{${
          a2 * x2 + 2 * y2
        }} = ${answer}\\]

8. Jadi, nilai turunan di titik \\((${x2}, ${y2})\\) adalah \\(${answer}\\)`;

        qType = "Turunan Implisit (Campuran)";
      }
      break;

    case "exponential_derivative":
      // Turunan eksponensial
      const expType = getRandomElement(["e_simple", "e_chain", "a_power"]);

      if (expType === "e_simple") {
        // d/dx[a·e^(bx)] = ab·e^(bx)
        const a3 = getRandomInt(1, 5);
        const b3 = getRandomInt(1, 3);
        const x3 = getRandomInt(0, 2);

        question = `Diketahui \\(f(x) = ${a3}e^{${b3}x}\\). Tentukan nilai \\(f'(${x3})\\).`;

        // f'(x) = a·b·e^(bx)
        // f'(x3) = a·b·e^(b·x3)
        answer = a3 * b3 * Math.round(Math.exp(b3 * x3));

        steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${a3}e^{${b3}x}\\]

2. Turunan eksponensial dengan aturan rantai:
   \\[\\frac{d}{dx}[e^{u}] = e^{u} \\cdot u'\\]

3. Di sini, \\(u = ${b3}x\\), maka \\(u' = ${b3}\\)

4. Terapkan aturan:
   \\[f'(x) = ${a3} \\cdot e^{${b3}x} \\cdot ${b3}\\]
   \\[f'(x) = ${a3 * b3}e^{${b3}x}\\]

5. Substitusi \\(x = ${x3}\\):
   \\[f'(${x3}) = ${a3 * b3}e^{${b3 * x3}}\\]

6. Hitung \\(e^{${b3 * x3}} \\approx ${Math.round(Math.exp(b3 * x3))}\\):
   \\[f'(${x3}) = ${a3 * b3} \\times ${Math.round(Math.exp(b3 * x3))}\\]
   \\[f'(${x3}) = ${answer}\\]

7. Jadi, nilai turunan di \\(x = ${x3}\\) adalah \\(${answer}\\)`;

        qType = "Turunan Eksponensial (e^x)";
      } else if (expType === "e_chain") {
        // d/dx[e^(ax+b)] di titik yang membuat eksponen = 0
        const a4 = getRandomInt(1, 4);
        const b4 = getRandomInt(1, 5);

        // Pilih x sehingga ax + b = 0, maka e^0 = 1
        const x4 = -b4 / a4;

        if (!Number.isInteger(x4)) {
          return generateHardDerivativeQuestion();
        }

        question = `Diketahui \\(f(x) = e^{${a4}x + ${b4}}\\). Tentukan nilai \\(f'(${x4})\\).`;

        // f'(x) = a·e^(ax+b)
        // At x4: a·e^0 = a·1 = a
        answer = a4;

        steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = e^{${a4}x + ${b4}}\\]

2. Gunakan aturan rantai:
   \\[\\frac{d}{dx}[e^{u}] = e^{u} \\cdot u'\\]

3. Di sini, \\(u = ${a4}x + ${b4}\\), maka \\(u' = ${a4}\\)

4. Terapkan aturan:
   \\[f'(x) = e^{${a4}x + ${b4}} \\cdot ${a4}\\]
   \\[f'(x) = ${a4}e^{${a4}x + ${b4}}\\]

5. Substitusi \\(x = ${x4}\\):
   \\[f'(${x4}) = ${a4}e^{${a4}(${x4}) + ${b4}}\\]
   \\[f'(${x4}) = ${a4}e^{0}\\]
   \\[f'(${x4}) = ${a4} \\times 1\\]

6. Jadi, nilai turunan di \\(x = ${x4}\\) adalah \\(${answer}\\)`;

        qType = "Turunan Eksponensial (Rantai)";
      } else {
        // d/dx[a^x] = a^x · ln(a), evaluasi di x=0 atau x=1
        const base = getRandomElement([2, 3, 5]);
        const coeff = getRandomInt(1, 4);
        const x5 = getRandomElement([0, 1]);

        question = `Diketahui \\(f(x) = ${coeff} \\cdot ${base}^x\\). Tentukan nilai \\(f'(${x5})\\).`;

        // f'(x) = coeff · a^x · ln(a)
        // f'(x5) = coeff · a^x5 · ln(a)
        const lnValue = Math.round(Math.log(base));
        answer = coeff * Math.pow(base, x5) * lnValue;

        steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${coeff} \\cdot ${base}^x\\]

2. Turunan fungsi eksponensial basis \\(a\\):
   \\[\\frac{d}{dx}[a^x] = a^x \\cdot \\ln(a)\\]

3. Terapkan aturan:
   \\[f'(x) = ${coeff} \\cdot ${base}^x \\cdot \\ln(${base})\\]

4. Substitusi \\(x = ${x5}\\):
   \\[f'(${x5}) = ${coeff} \\cdot ${base}^{${x5}} \\cdot \\ln(${base})\\]
   \\[f'(${x5}) = ${coeff} \\cdot ${Math.pow(base, x5)} \\cdot ${lnValue}\\]

5. Hitung:
   \\[f'(${x5}) = ${answer}\\]

6. Jadi, nilai turunan di \\(x = ${x5}\\) adalah \\(${answer}\\)`;

        qType = "Turunan Eksponensial (a^x)";
      }
      break;

    case "logarithmic_derivative":
      // Turunan logaritma
      const logType = getRandomElement(["ln_simple", "ln_chain", "log_base"]);

      if (logType === "ln_simple") {
        // d/dx[a·ln(x)] = a/x
        const a6 = getRandomInt(1, 10);
        const x6 = getRandomInt(1, 5);

        question = `Diketahui \\(f(x) = ${a6}\\ln(x)\\). Tentukan nilai \\(f'(${x6})\\).`;

        // f'(x) = a/x
        answer = a6 / x6;

        if (!Number.isInteger(answer)) {
          return generateHardDerivativeQuestion();
        }

        steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${a6}\\ln(x)\\]

2. Turunan logaritma natural:
   \\[\\frac{d}{dx}[\\ln(x)] = \\frac{1}{x}\\]

3. Terapkan aturan:
   \\[f'(x) = ${a6} \\cdot \\frac{1}{x} = \\frac{${a6}}{x}\\]

4. Substitusi \\(x = ${x6}\\):
   \\[f'(${x6}) = \\frac{${a6}}{${x6}}\\]

5. Hitung:
   \\[f'(${x6}) = ${answer}\\]

6. Jadi, nilai turunan di \\(x = ${x6}\\) adalah \\(${answer}\\)`;

        qType = "Turunan Logaritma Natural";
      } else if (logType === "ln_chain") {
        // d/dx[ln(ax+b)] = a/(ax+b)
        const a7 = getRandomInt(1, 5);
        const b7 = getRandomInt(1, 8);
        const x7 = getRandomInt(1, 3);

        question = `Diketahui \\(f(x) = \\ln(${a7}x + ${b7})\\). Tentukan nilai \\(f'(${x7})\\).`;

        // f'(x) = a/(ax+b)
        const denominator = a7 * x7 + b7;
        answer = a7 / denominator;

        if (!Number.isInteger(answer)) {
          return generateHardDerivativeQuestion();
        }

        steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = \\ln(${a7}x + ${b7})\\]

2. Gunakan aturan rantai:
   \\[\\frac{d}{dx}[\\ln(u)] = \\frac{1}{u} \\cdot u'\\]

3. Di sini, \\(u = ${a7}x + ${b7}\\), maka \\(u' = ${a7}\\)

4. Terapkan aturan:
   \\[f'(x) = \\frac{1}{${a7}x + ${b7}} \\cdot ${a7}\\]
   \\[f'(x) = \\frac{${a7}}{${a7}x + ${b7}}\\]

5. Substitusi \\(x = ${x7}\\):
   \\[f'(${x7}) = \\frac{${a7}}{${a7}(${x7}) + ${b7}}\\]
   \\[f'(${x7}) = \\frac{${a7}}{${denominator}}\\]

6. Hitung:
   \\[f'(${x7}) = ${answer}\\]

7. Jadi, nilai turunan di \\(x = ${x7}\\) adalah \\(${answer}\\)`;

        qType = "Turunan Logaritma (Rantai)";
      } else {
        // d/dx[log_a(x)] = 1/(x·ln(a))
        const base = getRandomElement([2, 10]);
        const x8 = getRandomInt(1, 5);
        const lnBase = Math.round(Math.log(base));

        // Cari koefisien yang membuat hasil integer
        const coeff = x8 * lnBase;

        question = `Diketahui \\(f(x) = ${coeff}\\log_{${base}}(x)\\). Tentukan nilai \\(f'(${x8})\\).`;

        // f'(x) = coeff / (x·ln(base))
        answer = coeff / (x8 * lnBase);

        if (!Number.isInteger(answer)) {
          return generateHardDerivativeQuestion();
        }

        steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${coeff}\\log_{${base}}(x)\\]

2. Turunan logaritma basis \\(a\\):
   \\[\\frac{d}{dx}[\\log_a(x)] = \\frac{1}{x \\cdot \\ln(a)}\\]

3. Terapkan aturan:
   \\[f'(x) = ${coeff} \\cdot \\frac{1}{x \\cdot \\ln(${base})}\\]
   \\[f'(x) = \\frac{${coeff}}{x \\cdot ${lnBase}}\\]

4. Substitusi \\(x = ${x8}\\):
   \\[f'(${x8}) = \\frac{${coeff}}{${x8} \\cdot ${lnBase}}\\]
   \\[f'(${x8}) = \\frac{${coeff}}{${x8 * lnBase}}\\]

5. Hitung:
   \\[f'(${x8}) = ${answer}\\]

6. Jadi, nilai turunan di \\(x = ${x8}\\) adalah \\(${answer}\\)`;

        qType = "Turunan Logaritma Basis a";
      }
      break;

    case "advanced_trig":
      // Turunan trigonometri lanjutan: tan, sec, csc, cot
      const trigType = getRandomElement(["tan", "sec"]);

      if (trigType === "tan") {
        // d/dx[tan(x)] = sec²(x)
        const a9 = getRandomInt(1, 4);
        const angle = getRandomElement([0, 45]); // tan(0)=0, tan(45)=1, sec²(0)=1, sec²(45)=2

        question = `Diketahui \\(f(x) = ${a9}\\tan(x^\\circ)\\). Tentukan nilai \\(f'(${angle}^\\circ)\\).`;

        // f'(x) = a·sec²(x)
        const secSquaredValues = {
          0: 1, // sec²(0°) = 1
          45: 2, // sec²(45°) = (√2)² = 2
        };

        answer = a9 * secSquaredValues[angle];

        steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${a9}\\tan(x^\\circ)\\]

2. Turunan tangen:
   \\[\\frac{d}{dx}[\\tan(x)] = \\sec^2(x)\\]

3. Terapkan aturan:
   \\[f'(x) = ${a9}\\sec^2(x^\\circ)\\]

4. Substitusi \\(x = ${angle}^\\circ\\):
   \\[f'(${angle}^\\circ) = ${a9}\\sec^2(${angle}^\\circ)\\]

5. Nilai \\(\\sec^2(${angle}^\\circ) = ${secSquaredValues[angle]}\\)

6. Hitung:
   \\[f'(${angle}^\\circ) = ${a9} \\times ${secSquaredValues[angle]} = ${answer}\\]

7. Jadi, nilai turunan di \\(x = ${angle}^\\circ\\) adalah \\(${answer}\\)`;

        qType = "Turunan Trigonometri (Tangen)";
      } else {
        // d/dx[sec(x)] = sec(x)·tan(x)
        const a10 = getRandomInt(1, 4);
        const angle = getRandomElement([0, 45]); // sec(0)=1, tan(0)=0 → 0; sec(45)=√2, tan(45)=1 → √2

        question = `Diketahui \\(f(x) = ${a10}\\sec(x^\\circ)\\). Tentukan nilai \\(f'(${angle}^\\circ)\\).`;

        // f'(x) = a·sec(x)·tan(x)
        const productValues = {
          0: 0, // sec(0)·tan(0) = 1·0 = 0
          45: 1, // sec(45)·tan(45) = √2·1/√2 = 1 (simplified)
        };

        answer = a10 * productValues[angle];

        steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${a10}\\sec(x^\\circ)\\]

2. Turunan sekan:
   \\[\\frac{d}{dx}[\\sec(x)] = \\sec(x) \\cdot \\tan(x)\\]

3. Terapkan aturan:
   \\[f'(x) = ${a10}\\sec(x^\\circ) \\cdot \\tan(x^\\circ)\\]

4. Substitusi \\(x = ${angle}^\\circ\\):
   \\[f'(${angle}^\\circ) = ${a10}\\sec(${angle}^\\circ) \\cdot \\tan(${angle}^\\circ)\\]

5. Nilai \\(\\sec(${angle}^\\circ) \\cdot \\tan(${angle}^\\circ) = ${productValues[angle]}\\)

6. Hitung:
   \\[f'(${angle}^\\circ) = ${a10} \\times ${productValues[angle]} = ${answer}\\]

7. Jadi, nilai turunan di \\(x = ${angle}^\\circ\\) adalah \\(${answer}\\)`;

        qType = "Turunan Trigonometri (Sekan)";
      }
      break;

    case "higher_order_derivative":
      // Turunan tingkat tinggi
      const orderType = getRandomElement([
        "second_poly",
        "second_trig",
        "third_poly",
      ]);

      if (orderType === "second_poly") {
        // f''(x) untuk polinomial
        const a11 = getRandomInt(1, 4);
        const b11 = getRandomInt(1, 6);
        const c11 = getRandomInt(1, 8);
        const x11 = getRandomInt(1, 3);

        question = `Diketahui \\(f(x) = ${a11}x^3 + ${b11}x^2 + ${c11}x\\). Tentukan nilai \\(f''(${x11})\\).`;

        // f'(x) = 3ax^2 + 2bx + c
        // f''(x) = 6ax + 2b
        answer = 6 * a11 * x11 + 2 * b11;

        steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${a11}x^3 + ${b11}x^2 + ${c11}x\\]

2. Cari turunan pertama:
   \\[f'(x) = 3 \\cdot ${a11}x^2 + 2 \\cdot ${b11}x + ${c11}\\]
   \\[f'(x) = ${3 * a11}x^2 + ${2 * b11}x + ${c11}\\]

3. Cari turunan kedua:
   \\[f''(x) = 2 \\cdot ${3 * a11}x + ${2 * b11}\\]
   \\[f''(x) = ${6 * a11}x + ${2 * b11}\\]

4. Substitusi \\(x = ${x11}\\):
   \\[f''(${x11}) = ${6 * a11}(${x11}) + ${2 * b11}\\]

5. Hitung:
   \\[f''(${x11}) = ${6 * a11 * x11} + ${2 * b11}\\]
   \\[f''(${x11}) = ${answer}\\]

6. Jadi, turunan kedua di \\(x = ${x11}\\) adalah \\(${answer}\\)`;

        qType = "Turunan Kedua (Polinomial)";
      } else if (orderType === "second_trig") {
        // f''(x) untuk trigonometri
        const a12 = getRandomInt(1, 4);
        const angle = getRandomElement([0, 90, 180, 270]);

        question = `Diketahui \\(f(x) = ${a12}\\sin(x^\\circ)\\). Tentukan nilai \\(f''(${angle}^\\circ)\\).`;

        // f'(x) = a·cos(x)
        // f''(x) = -a·sin(x)
        const sinValues = {
          0: 0,
          90: 1,
          180: 0,
          270: -1,
        };

        answer = -a12 * sinValues[angle];

        steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${a12}\\sin(x^\\circ)\\]

2. Cari turunan pertama:
   \\[f'(x) = ${a12}\\cos(x^\\circ)\\]

3. Cari turunan kedua:
   \\[f''(x) = -${a12}\\sin(x^\\circ)\\]

4. Substitusi \\(x = ${angle}^\\circ\\):
   \\[f''(${angle}^\\circ) = -${a12}\\sin(${angle}^\\circ)\\]

5. Nilai \\(\\sin(${angle}^\\circ) = ${sinValues[angle]}\\)

6. Hitung:
   \\[f''(${angle}^\\circ) = -${a12} \\times ${sinValues[angle]} = ${answer}\\]

7. Jadi, turunan kedua di \\(x = ${angle}^\\circ\\) adalah \\(${answer}\\)`;

        qType = "Turunan Kedua (Trigonometri)";
      } else {
        // f'''(x) untuk polinomial
        const a13 = getRandomInt(1, 3);
        const b13 = getRandomInt(1, 5);
        const c13 = getRandomInt(1, 7);
        const d13 = getRandomInt(1, 9);
        const x13 = getRandomInt(1, 2);

        question = `Diketahui \\(f(x) = ${a13}x^4 + ${b13}x^3 + ${c13}x^2 + ${d13}x\\). Tentukan nilai \\(f'''(${x13})\\).`;

        // f'(x) = 4ax^3 + 3bx^2 + 2cx + d
        // f''(x) = 12ax^2 + 6bx + 2c
        // f'''(x) = 24ax + 6b
        answer = 24 * a13 * x13 + 6 * b13;

        steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${a13}x^4 + ${b13}x^3 + ${c13}x^2 + ${d13}x\\]

2. Cari turunan pertama:
   \\[f'(x) = ${4 * a13}x^3 + ${3 * b13}x^2 + ${2 * c13}x + ${d13}\\]

3. Cari turunan kedua:
   \\[f''(x) = ${12 * a13}x^2 + ${6 * b13}x + ${2 * c13}\\]

4. Cari turunan ketiga:
   \\[f'''(x) = ${24 * a13}x + ${6 * b13}\\]

5. Substitusi \\(x = ${x13}\\):
   \\[f'''(${x13}) = ${24 * a13}(${x13}) + ${6 * b13}\\]

6. Hitung:
   \\[f'''(${x13}) = ${24 * a13 * x13} + ${6 * b13}\\]
   \\[f'''(${x13}) = ${answer}\\]

7. Jadi, turunan ketiga di \\(x = ${x13}\\) adalah \\(${answer}\\)`;

        qType = "Turunan Ketiga (Polinomial)";
      }
      break;
  }

  return { question, answer, steps, type: qType };
}
