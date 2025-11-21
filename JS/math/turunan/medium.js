export function generateMediumDerivativeQuestion() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

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
