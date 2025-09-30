export function generateMediumFunctionQuestion() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  const types = [
    "complex_composition", // Komposisi tiga fungsi atau dengan fungsi kuadrat
    "function_inverse", // Invers fungsi linear atau kuadrat
    "complex_domain_range", // Domain dan range fungsi dengan pecahan atau akar
    "advanced_operations", // Operasi dengan fungsi kuadrat dan rasional
    "graph_analysis", // Analisis grafik fungsi kuadrat dan rasional
  ];

  const type = getRandomElement(types);
  let question, answer, steps, qType;

  switch (type) {
    case "complex_composition":
      // Komposisi tiga fungsi: f(g(h(x))) atau fungsi kuadrat dalam komposisi
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

        steps = `
Langkah penyelesaian:

1. Fungsi \\(h\\):  
   \\[
   h(x) = ${e1}x ${f1 >= 0 ? "+" : ""} ${f1}
   \\]  
   Substitusi \\(x = ${x1}\\):  
   \\[
   h(${x1}) = ${e1}(${x1}) ${f1 >= 0 ? "+" : ""} ${f1} 
   = ${e1 * x1} ${f1 >= 0 ? "+" : ""} ${f1} 
   = ${hx}
   \\]

2. Fungsi \\(g\\):  
   \\[
   g(x) = ${c1}x ${d1 >= 0 ? "+" : ""} ${d1}
   \\]  
   Substitusi \\(x = h(${x1}) = ${hx}\\):  
   \\[
   g(h(${x1})) = g(${hx}) = ${c1}(${hx}) ${d1 >= 0 ? "+" : ""} ${d1} 
   = ${c1 * hx} ${d1 >= 0 ? "+" : ""} ${d1} 
   = ${ghx}
   \\]

3. Fungsi \\(f\\):  
   \\[
   f(x) = ${a1}x ${b1 >= 0 ? "+" : ""} ${b1}
   \\]  
   Substitusi \\(x = g(h(${x1})) = ${ghx}\\):  
   \\[
   f(g(h(${x1}))) = f(${ghx}) = ${a1}(${ghx}) ${b1 >= 0 ? "+" : ""} ${b1} 
   = ${a1 * ghx} ${b1 >= 0 ? "+" : ""} ${b1} 
   = ${answer}
   \\]

4. Jadi:  
   \\[
   (f \\circ g \\circ h)(${x1}) = ${answer}
   \\]
`;

        qType = "Komposisi Tiga Fungsi";
      } else {
        // Komposisi dengan fungsi kuadrat: f(g(x)) dengan g(x) kuadrat
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

        steps = `
Langkah penyelesaian:

1. Fungsi \\(g\\):  
   \\[
   g(x) = ${c2}x^2 ${d2 >= 0 ? "+" : ""} ${d2}x ${e2 >= 0 ? "+" : ""} ${e2}
   \\]  
   Substitusi \\(x = ${x2}\\):  
   \\[
   g(${x2}) = ${c2}(${x2})^2 ${d2 >= 0 ? "+" : ""} ${d2}(${x2}) ${
          e2 >= 0 ? "+" : ""
        } ${e2}
   \\]  
   \\[
   g(${x2}) = ${c2}(${x2 * x2}) ${d2 >= 0 ? "+" : ""} ${d2 * x2} ${
          e2 >= 0 ? "+" : ""
        } ${e2}
   \\]  
   \\[
   g(${x2}) = ${c2 * x2 * x2} ${d2 >= 0 ? "+" : ""} ${d2 * x2} ${
          e2 >= 0 ? "+" : ""
        } ${e2} = ${gx}
   \\]

2. Fungsi \\(f\\):  
   \\[
   f(x) = ${a2}x ${b2 >= 0 ? "+" : ""} ${b2}
   \\]  
   Substitusi \\(x = g(${x2}) = ${gx}\\):  
   \\[
   f(g(${x2})) = f(${gx}) = ${a2}(${gx}) ${b2 >= 0 ? "+" : ""} ${b2} 
   = ${a2 * gx} ${b2 >= 0 ? "+" : ""} ${b2} 
   = ${answer}
   \\]

3. Jadi:  
   \\[
   (f \\circ g)(${x2}) = ${answer}
   \\]
`;

        qType = "Komposisi dengan Fungsi Kuadrat";
      }
      break;

    case "function_inverse":
      // Invers fungsi linear atau kuadrat
      const invType = getRandomElement(["linear_inverse", "quadratic_inverse"]);

      if (invType === "linear_inverse") {
        // Invers fungsi linear: f(x) = ax + b, cari f⁻¹(c)
        const a3 = getRandomInt(1, 10);
        const b3 = getRandomInt(-15, 15);
        const c3 = getRandomInt(-15, 15);

        question = `Diketahui \\(f(x) = ${a3}x ${
          b3 >= 0 ? "+" : ""
        } ${b3}\\). Tentukan nilai \\(f^{-1}(${c3})\\).`;

        // f⁻¹(c) = (c - b)/a
        answer = (c3 - b3) / a3;

        // Pastikan jawaban bilangan bulat
        if (!Number.isInteger(answer)) {
          // Jika tidak bulat, buat ulang soal
          return generateMediumFunctionQuestion();
        }

        steps = `
Langkah penyelesaian:

1. Fungsi asli:  
   \\[
   f(x) = ${a3}x ${b3 >= 0 ? "+" : ""} ${b3}
   \\]

2. Untuk mencari invers, selesaikan persamaan \\(y = ${a3}x ${
          b3 >= 0 ? "+" : ""
        } ${b3}\\) untuk \\(x\\):  
   \\[
   y ${b3 >= 0 ? "-" : "+"} ${Math.abs(b3)} = ${a3}x
   \\]  
   \\[
   x = \\frac{y ${b3 >= 0 ? "-" : "+"} ${Math.abs(b3)}}{${a3}}
   \\]

3. Jadi:  
   \\[
   f^{-1}(y) = \\frac{y ${b3 >= 0 ? "-" : "+"} ${Math.abs(b3)}}{${a3}}
   \\]

4. Untuk \\(y = ${c3}\\):  
   \\[
   f^{-1}(${c3}) = \\frac{${c3} ${b3 >= 0 ? "-" : "+"} ${Math.abs(b3)}}{${a3}} 
   = \\frac{${c3 - b3}}{${a3}} 
   = ${answer}
   \\]
`;

        qType = "Invers Fungsi Linear";
      } else {
        // Invers fungsi kuadrat dengan domain terbatas
        // Invers fungsi kuadrat dengan domain terbatas
        const a4 = getRandomInt(1, 5);
        const b4 = getRandomInt(-5, 5); // sekarang b boleh ≠ 0
        const c4 = getRandomInt(-10, 10);

        // Pilih x yang pasti bulat
        const xVal = getRandomInt(1, 5);
        const yVal = a4 * xVal * xVal + b4 * xVal + c4; // hitung nilai f(x) dari x bulat

        question = `Diketahui \\(f(x) = ${a4}x^2 ${b4 >= 0 ? "+" : ""} ${b4}x ${
          c4 >= 0 ? "+" : ""
        } ${c4}\\) untuk \\(x \\geq 0\\). Tentukan nilai \\(f^{-1}(${yVal})\\).`;

        answer = xVal;

        steps = `
Langkah penyelesaian:

1. Fungsi asli:  
   \\[
   f(x) = ${a4}x^2 ${b4 >= 0 ? "+" : ""} ${b4}x ${c4 >= 0 ? "+" : ""} ${c4}, 
   \\quad x \\geq 0
   \\]

2. Invers artinya mencari \\(x\\) ketika \\(f(x) = y\\):  
   \\[
   y = ${a4}x^2 ${b4 >= 0 ? "+" : ""} ${b4}x ${c4 >= 0 ? "+" : ""} ${c4}
   \\]  
   \\[
   ${a4}x^2 ${b4 >= 0 ? "+" : ""} ${b4}x + (${c4} - y) = 0
   \\]

3. Gunakan rumus kuadrat:  
   \\[
   x = \\frac{-(${b4}) \\pm \\sqrt{(${b4})^2 - 4(${a4})(${c4} - y)}}{2(${a4})}
   \\]

4. Substitusi \\(y = ${yVal}\\):  
   \\[
   x = ${xVal}
   \\]
   (dipilih akar dengan syarat \\(x \\geq 0\\))

5. Jadi:  
   \\[
   f^{-1}(${yVal}) = ${answer}
   \\]
`;

        qType = "Invers Fungsi Kuadrat";
      }
      break;

    case "complex_domain_range":
      // Domain dan range fungsi dengan pecahan atau akar
      const drType = getRandomElement(["rational_domain", "sqrt_range"]);

      if (drType === "rational_domain") {
        // Domain fungsi rasional: f(x) = 1/(ax + b)
        const a5 = getRandomInt(1, 10);
        const b5 = getRandomInt(-15, 15);
        // Pastikan b5 ≠ 0 agar tidak terlalu trivial
        if (b5 === 0) b5 = getRandomInt(1, 5);

        question = `Tentukan nilai x yang tidak termasuk domain dari fungsi \\(f(x) = \\frac{1}{${a5}x ${
          b5 >= 0 ? "+" : ""
        } ${b5}}\\).`;

        // Domain: semua x kecuali pembuat penyebut nol
        // Penyebut nol ketika x = -b/a
        const excludedValue = -b5 / a5;
        answer = excludedValue;

        // Pastikan jawaban bilangan bulat
        if (!Number.isInteger(answer)) {
          // Jika tidak bulat, buat ulang soal
          return generateMediumFunctionQuestion();
        }

        steps = `
Langkah penyelesaian:

1. Fungsi:  
   \\[
   f(x) = \\frac{1}{${a5}x ${b5 >= 0 ? "+" : ""} ${b5}}
   \\]

2. Domain fungsi rasional adalah semua nilai \\(x\\) yang tidak membuat penyebut nol.

3. Penyebut nol ketika:  
   \\[
   ${a5}x ${b5 >= 0 ? "+" : ""} ${b5} = 0
   \\]

4. Selesaikan:  
   \\[
   ${a5}x = ${-b5}
   \\]  
   \\[
   x = \\frac{${-b5}}{${a5}} = ${excludedValue}
   \\]

5. Jadi, domainnya adalah semua bilangan real kecuali:  
   \\[
   x = ${excludedValue}
   \\]
`;

        qType = "Domain Fungsi Rasional";
      } else {
        // Range fungsi akar: f(x) = √(ax + b) + c
        const a6 = getRandomInt(1, 50);
        const b6 = getRandomInt(9, 1000); // Pastikan positif agar ada nilai real
        const c6 = getRandomInt(-30, 20);
        const domainMin = 0; // Domain minimal untuk memastikan akar real

        question = `Diketahui \\(f(x) = \\sqrt{${a6}x + ${b6}} ${
          c6 >= 0 ? "+" : ""
        } ${c6}\\) untuk \\(x \\geq ${domainMin}\\). Tentukan nilai minimum dari fungsi tersebut.`;

        // Nilai minimum ketika x minimum (karena fungsi akar naik)
        answer = Math.sqrt(a6 * domainMin + b6) + c6;

        // Pastikan jawaban bilangan bulat
        if (!Number.isInteger(answer)) {
          // Jika tidak bulat, pilih parameter yang membuatnya bulat
          const sqrtVal = getRandomInt(1, 5);
          const newB6 = sqrtVal * sqrtVal; // Agar √b6 bulat
          answer = sqrtVal + c6;

          question = `Diketahui \\(f(x) = \\sqrt{${a6}x + ${newB6}} ${
            c6 >= 0 ? "+" : ""
          } ${c6}\\) untuk \\(x \\geq ${domainMin}\\). Tentukan nilai minimum dari fungsi tersebut.`;

          steps = `
Langkah penyelesaian:

1. Fungsi:  
   \\[
   f(x) = \\sqrt{${a6}x + ${newB6}} ${c6 >= 0 ? "+" : ""} ${c6}, 
   \\quad x \\geq ${domainMin}
   \\]

2. Fungsi akar kuadrat selalu naik, sehingga nilai minimum terjadi pada \\(x\\) minimum.

3. Untuk \\(x = ${domainMin}\\):  
   \\[
   f(${domainMin}) = \\sqrt{${a6}(${domainMin}) + ${newB6}} ${
            c6 >= 0 ? "+" : ""
          } ${c6}
   \\]  
   \\[
   f(${domainMin}) = \\sqrt{${newB6}} ${c6 >= 0 ? "+" : ""} ${c6}
   \\]  
   \\[
   f(${domainMin}) = ${sqrtVal} ${c6 >= 0 ? "+" : ""} ${c6} = ${answer}
   \\]

4. Jadi, nilai minimum fungsi adalah:  
   \\[
   ${answer}
   \\]
`;
        } else {
          steps = `
Langkah penyelesaian:

1. Fungsi:  
   \\[
   f(x) = \\sqrt{${a6}x + ${b6}} ${c6 >= 0 ? "+" : ""} ${c6}, 
   \\quad x \\geq ${domainMin}
   \\]

2. Fungsi akar kuadrat selalu naik, sehingga nilai minimum terjadi pada \\(x\\) minimum.

3. Untuk \\(x = ${domainMin}\\):  
   \\[
   f(${domainMin}) = \\sqrt{${a6}(${domainMin}) + ${b6}} ${
            c6 >= 0 ? "+" : ""
          } ${c6}
   \\]  
   \\[
   f(${domainMin}) = \\sqrt{${b6}} ${c6 >= 0 ? "+" : ""} ${c6}
   \\]  
   \\[
   f(${domainMin}) = ${Math.sqrt(b6)} ${c6 >= 0 ? "+" : ""} ${c6} = ${answer}
   \\]

4. Jadi, nilai minimum fungsi adalah:  
   \\[
   ${answer}
   \\]
`;
        }
        qType = "Range Fungsi Akar";
      }
      break;

    case "advanced_operations":
      // Operasi dengan fungsi kuadrat dan rasional
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

        question = `Diketahui \\(f(x) = ${a7}x^2 ${b7 >= 0 ? "+" : ""} ${b7}x ${
          c7 >= 0 ? "+" : ""
        } ${c7}\\) dan \\(g(x) = ${d7}x^2 ${e7 >= 0 ? "+" : ""} ${e7}x ${
          f7 >= 0 ? "+" : ""
        } ${f7}\\). Tentukan nilai \\((f ${opSymbol} g)(${x7})\\).`;

        steps = `
Langkah penyelesaian:

1. Fungsi \\(f\\):  
   \\[
   f(x) = ${a7}x^2 ${b7 >= 0 ? "+" : ""} ${b7}x ${c7 >= 0 ? "+" : ""} ${c7}
   \\]  
   Substitusi \\(x = ${x7}\\):  
   \\[
   f(${x7}) = ${a7}(${x7})^2 ${b7 >= 0 ? "+" : ""} ${b7}(${x7}) ${
          c7 >= 0 ? "+" : ""
        } ${c7}
   \\]  
   \\[
   f(${x7}) = ${a7}(${x7 * x7}) ${b7 >= 0 ? "+" : ""} ${b7 * x7} ${
          c7 >= 0 ? "+" : ""
        } ${c7}
   \\]  
   \\[
   f(${x7}) = ${a7 * x7 * x7} ${b7 >= 0 ? "+" : ""} ${b7 * x7} ${
          c7 >= 0 ? "+" : ""
        } ${c7} 
   = ${a7 * x7 * x7 + b7 * x7 + c7}
   \\]

2. Fungsi \\(g\\):  
   \\[
   g(x) = ${d7}x^2 ${e7 >= 0 ? "+" : ""} ${e7}x ${f7 >= 0 ? "+" : ""} ${f7}
   \\]  
   Substitusi \\(x = ${x7}\\):  
   \\[
   g(${x7}) = ${d7}(${x7})^2 ${e7 >= 0 ? "+" : ""} ${e7}(${x7}) ${
          f7 >= 0 ? "+" : ""
        } ${f7}
   \\]  
   \\[
   g(${x7}) = ${d7}(${x7 * x7}) ${e7 >= 0 ? "+" : ""} ${e7 * x7} ${
          f7 >= 0 ? "+" : ""
        } ${f7}
   \\]  
   \\[
   g(${x7}) = ${d7 * x7 * x7} ${e7 >= 0 ? "+" : ""} ${e7 * x7} ${
          f7 >= 0 ? "+" : ""
        } ${f7} 
   = ${d7 * x7 * x7 + e7 * x7 + f7}
   \\]

3. Operasi ${opName}:  
   \\[
   (f ${opSymbol} g)(${x7}) = f(${x7}) ${opSymbol} g(${x7})
   \\]

4. Hasil:  
   \\[
   ${a7 * x7 * x7 + b7 * x7 + c7} ${opSymbol} ${d7 * x7 * x7 + e7 * x7 + f7} 
   = ${answer}
   \\]
`;

        qType = "Operasi Fungsi Kuadrat";
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
        } ${b8}}{${c8}x ${d8 >= 0 ? "+" : ""} ${d8}}\\) dan \\(g(x) = ${c8}x ${
          d8 >= 0 ? "+" : ""
        } ${d8}\\). Tentukan nilai \\((f \\times g)(${x8})\\).`;

        // (f × g)(x) = f(x) × g(x) = (ax+b)/(cx+d) × (cx+d) = ax+b
        answer = a8 * x8 + b8;

        steps = `
Langkah penyelesaian:

1. Fungsi \\(f\\):  
   \\[
   f(x) = \\frac{${a8}x ${b8 >= 0 ? "+" : ""} ${b8}}{${c8}x ${
          d8 >= 0 ? "+" : ""
        } ${d8}}
   \\]  
   Substitusi \\(x = ${x8}\\):  
   \\[
   f(${x8}) = \\frac{${a8}(${x8}) ${b8 >= 0 ? "+" : ""} ${b8}}{${c8}(${x8}) ${
          d8 >= 0 ? "+" : ""
        } ${d8}}
   \\]  
   \\[
   f(${x8}) = \\frac{${a8 * x8} ${b8 >= 0 ? "+" : ""} ${b8}}{${c8 * x8} ${
          d8 >= 0 ? "+" : ""
        } ${d8}}
   \\]  
   \\[
   f(${x8}) = \\frac{${a8 * x8 + b8}}{${c8 * x8 + d8}}
   \\]

2. Fungsi \\(g\\):  
   \\[
   g(x) = ${c8}x ${d8 >= 0 ? "+" : ""} ${d8}
   \\]  
   Substitusi \\(x = ${x8}\\):  
   \\[
   g(${x8}) = ${c8}(${x8}) ${d8 >= 0 ? "+" : ""} ${d8} 
   = ${c8 * x8} ${d8 >= 0 ? "+" : ""} ${d8} 
   = ${c8 * x8 + d8}
   \\]

3. Operasi perkalian:  
   \\[
   (f \\times g)(${x8}) = f(${x8}) \\times g(${x8})
   \\]

4. Hasil:  
   \\[
   \\frac{${a8 * x8 + b8}}{${c8 * x8 + d8}} \\times (${c8 * x8 + d8}) 
   = ${a8 * x8 + b8}
   \\]

5. Jadi:  
   \\[
   (f \\times g)(${x8}) = ${answer}
   \\]
`;

        qType = "Operasi Fungsi Rasional";
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

        steps = `Langkah penyelesaian:
1. Fungsi kuadrat: \\[f(x) = ${a9}x^2 ${b9 >= 0 ? "+" : ""} ${b9}x ${
          c9 >= 0 ? "+" : ""
        } ${c9}\\]

2. Rumus titik puncak parabola:
   \\[x = -\\dfrac{b}{2a}\\]

3. Dengan \\(a = ${a9}\\), \\(b = ${b9}\\):
   - \\[x = -\\dfrac{${b9}}{2 \\times ${a9}} = -\\dfrac{${b9}}{${
          2 * a9
        }} = ${answer}\\]

4. Jadi, nilai \\(x\\) dari titik puncak adalah ${answer}`;

        qType = "Analisis Grafik Kuadrat";
      } else {
        // Titik potong sumbu x fungsi rasional
        const a10 = getRandomInt(1, 5);
        const b10 = getRandomInt(-10, 10);
        const c10 = getRandomInt(1, 5);
        const d10 = getRandomInt(-10, 10);

        // Pastikan pembilang dan penyebut tidak sama-sama nol
        if (a10 * (-d10 / c10) + b10 === 0 && c10 * (-d10 / c10) + d10 === 0) {
          // Jika terjadi, ubah parameter
          b10 = getRandomInt(-10, 10);
        }
        question = `Diketahui fungsi rasional \\( f(x) = \\frac{${a10}x ${
          b10 >= 0 ? "+" : ""
        } ${b10}}{${c10}x ${
          d10 >= 0 ? "+" : ""
        } ${d10}} \\). Tentukan nilai \\(x\\) sehingga \\( f(x) = 0 \\).`;

        // Titik potong sumbu x ketika f(x) = 0, yaitu ketika pembilang = 0
        // ax + b = 0 → x = -b/a
        answer = -b10 / a10;

        // Pastikan jawaban bilangan bulat
        if (!Number.isInteger(answer)) {
          // Jika tidak bulat, buat ulang soal
          return generateMediumFunctionQuestion();
        }

        steps = `Langkah penyelesaian:
1. Fungsi rasional: \\[
f(x) = \\frac{${a10}x ${b10 >= 0 ? "+" : ""} ${b10}}{${c10}x ${
          d10 >= 0 ? "+" : ""
        } ${d10}}
\\]

2. Titik potong dengan sumbu x terjadi ketika \\[
f(x) = 0
\\]

3. Fungsi rasional bernilai 0 ketika pembilang = 0 (dan penyebut ≠ 0)

4. Selesaikan: \\[
${a10}x ${b10 >= 0 ? "+" : ""} ${b10} = 0
\\]

5. \\[
${a10}x = ${-b10}
\\]

6. \\[
x = \\frac{${-b10}}{${a10}} = ${answer}
\\]

7. Periksa penyebut tidak nol: \\[
${c10}(${answer}) ${d10 >= 0 ? "+" : ""} ${d10} = ${c10 * answer + d10} \\neq 0
\\]

8. Jadi, titik potong dengan sumbu x adalah di \\[
x = ${answer}
\\]`;

        qType = "Analisis Grafik Rasional";
      }
      break;
  }

  return { question, answer, steps, type: qType };
}
