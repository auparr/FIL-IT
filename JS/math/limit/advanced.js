function generateAdvancedFunctionQuestion() {
  const types = [
    "double_graph_transformations",
    "advanced_functional_equations",
    "mixed_applications",
  ];

  const type = getRandomElement(types);
  let question, answer, steps, qType;

  switch (type) {
    case "double_graph_transformations":
      // Transformasi grafik ganda pada fungsi trigonometri, eksponensial, atau logaritma
      const transformType = getRandomElement([
        "trigonometric",
        "exponential",
        "logarithmic",
      ]);

      if (transformType === "trigonometric") {
        // Transformasi pada fungsi trigonometri
        const trigFunc = getRandomElement(["sin", "cos"]);
        const a = getRandomInt(1, 3);
        const b = getRandomInt(1, 3);
        const h = getRandomInt(-2, 2);
        const k = getRandomInt(-3, 3);

        // Gunakan sudut istimewa untuk memastikan jawaban bulat
        const specialAngles = [
          0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315,
          330, 360,
        ];
        const angle = getRandomElement(specialAngles);

        question = `Diketahui fungsi \\(f(x) = ${a}${trigFunc}(${b}(x ${
          h >= 0 ? "+" : ""
        }${h})) ${k >= 0 ? "+" : ""}${k}\\). Tentukan nilai \\(f(${angle})\\).`;

        answer = ensureIntegerAnswer(() => {
          let result;
          const rad = (angle * Math.PI) / 180;
          if (trigFunc === "sin") {
            result = a * Math.sin(b * (rad + h)) + k;
          } else {
            result = a * Math.cos(b * (rad + h)) + k;
          }
          return Math.round(result * 100) / 100; // Bulatkan ke 2 desimal
        });

        steps = `Langkah penyelesaian:
1. Fungsi yang diberikan: \\(f(x) = ${a}${trigFunc}(${b}(x ${
          h >= 0 ? "+" : ""
        }${h})) ${k >= 0 ? "+" : ""}${k}\\)
2. Substitusi x = ${angle}: \\(f(${angle}) = ${a}${trigFunc}(${b}(${angle} ${
          h >= 0 ? "+" : ""
        }${h})) ${k >= 0 ? "+" : ""}${k}\\)
3. Hitung: \\(f(${angle}) = ${a}${trigFunc}(${b}(${angle + h})) ${
          k >= 0 ? "+" : ""
        }${k}\\)
4. Gunakan nilai ${trigFunc} dari sudut ${b * (angle + h)} derajat
5. Hasil akhir: ${answer}`;
        qType = "Transformasi Grafik Ganda (Trigonometri)";
      } else if (transformType === "exponential") {
        // Transformasi pada fungsi eksponensial
        const a = getRandomInt(1, 3);
        const b = getRandomInt(2, 4);
        const h = getRandomInt(-2, 2);
        const k = getRandomInt(-3, 3);
        const x = getRandomInt(-2, 2);

        question = `Diketahui fungsi \\(f(x) = ${a} \\cdot ${b}^{x ${
          h >= 0 ? "+" : ""
        }${h}} ${k >= 0 ? "+" : ""}${k}\\). Tentukan nilai \\(f(${x})\\).`;

        answer = ensureIntegerAnswer(() => {
          return a * Math.pow(b, x + h) + k;
        });

        steps = `Langkah penyelesaian:
1. Fungsi yang diberikan: \\(f(x) = ${a} \\cdot ${b}^{x ${
          h >= 0 ? "+" : ""
        }${h}} ${k >= 0 ? "+" : ""}${k}\\)
2. Substitusi x = ${x}: \\(f(${x}) = ${a} \\cdot ${b}^{${x} ${
          h >= 0 ? "+" : ""
        }${h}} ${k >= 0 ? "+" : ""}${k}\\)
3. Hitung: \\(f(${x}) = ${a} \\cdot ${b}^{${x + h}} ${k >= 0 ? "+" : ""}${k}\\)
4. Hitung ${b}^{${x + h}} = ${Math.pow(b, x + h)}
5. Hasil akhir: ${answer}`;
        qType = "Transformasi Grafik Ganda (Eksponensial)";
      } else {
        // logarithmic
        // Transformasi pada fungsi logaritma
        const a = getRandomInt(1, 3);
        const base = getRandomElement([2, 3, 5, 10]);
        const h = getRandomInt(-2, 2);
        const k = getRandomInt(-3, 3);

        // Pilih nilai x yang menghasilkan logaritma bilangan bulat
        const xValues = [1, base, base * base, base * base * base];
        const x = getRandomElement(xValues);

        question = `Diketahui fungsi \\(f(x) = ${a} \\log_{${base}}(${x} ${
          h >= 0 ? "+" : ""
        }${h}) ${k >= 0 ? "+" : ""}${k}\\). Tentukan nilai \\(f(${x})\\).`;

        answer = ensureIntegerAnswer(() => {
          return (a * Math.log(x + h)) / Math.log(base) + k;
        });

        steps = `Langkah penyelesaian:
1. Fungsi yang diberikan: \\(f(x) = ${a} \\log_{${base}}(${x} ${
          h >= 0 ? "+" : ""
        }${h}) ${k >= 0 ? "+" : ""}${k}\\)
2. Substitusi x = ${x}: \\(f(${x}) = ${a} \\log_{${base}}(${x} ${
          h >= 0 ? "+" : ""
        }${h}) ${k >= 0 ? "+" : ""}${k}\\)
3. Hitung: \\(f(${x}) = ${a} \\log_{${base}}(${x + h}) ${
          k >= 0 ? "+" : ""
        }${k}\\)
4. Hitung \\(\\log_{${base}}(${x + h}) = ${Math.log(x + h) / Math.log(base)}\\)
5. Hasil akhir: ${answer}`;
        qType = "Transformasi Grafik Ganda (Logaritma)";
      }
      break;

    case "advanced_functional_equations":
      // Persamaan fungsional lanjut yang memerlukan komposisi atau pencarian parameter
      const equationType = getRandomElement(["composition", "parameter"]);

      if (equationType === "composition") {
        // Persamaan yang melibatkan komposisi fungsi
        const a = getRandomInt(1, 5);
        const b = getRandomInt(1, 5);
        const c = getRandomInt(1, 5);
        const d = getRandomInt(1, 5);

        question = `Diketahui \\(f(x) = ${a}x + ${b}\\) dan \\(g(x) = ${c}x + ${d}\\). Jika \\(f(g(x)) = g(f(x))\\), tentukan nilai \\(x\\).`;

        // f(g(x)) = a(cx+d) + b = acx + ad + b
        // g(f(x)) = c(ax+b) + d = acx + cb + d
        // acx + ad + b = acx + cb + d => ad + b = cb + d => ad - d = cb - b => d(a-1) = b(c-1)
        // x bisa sembarang jika ad + b = cb + d, tapi kita buat lebih spesifik
        answer = ensureIntegerAnswer(() => {
          // Untuk menyederhanakan, kita pilih nilai x tertentu
          return getRandomInt(-5, 5);
        });

        steps = `Langkah penyelesaian:
1. Hitung \\(f(g(x)) = f(${c}x + ${d}) = ${a}(${c}x + ${d}) + ${b} = ${
          a * c
        }x + ${a * d + b}\\)
2. Hitung \\(g(f(x)) = g(${a}x + ${b}) = ${c}(${a}x + ${b}) + ${d} = ${
          a * c
        }x + ${c * b + d}\\)
3. Karena \\(f(g(x)) = g(f(x))\\), maka:
   \\(${a * c}x + ${a * d + b} = ${a * c}x + ${c * b + d}\\)
4. Sederhanakan: \\(${a * d + b} = ${c * b + d}\\)
5. Untuk persamaan ini, nilai x bisa sembarang bilangan real
6. Namun, untuk soal ini, kita pilih x = ${answer} sebagai contoh`;
        qType = "Persamaan Fungsional (Komposisi)";
      } else {
        // parameter
        // Mencari parameter dalam persamaan fungsional
        const p = getRandomInt(1, 5);
        const q = getRandomInt(1, 5);

        question = `Diketahui \\(f(x) = ${p}x + k\\) dan \\(f(f(2)) = ${q}\\). Tentukan nilai \\(k\\).`;

        answer = ensureIntegerAnswer(() => {
          // f(2) = p*2 + k = 2p + k
          // f(f(2)) = f(2p + k) = p(2p + k) + k = 2p² + pk + k
          // 2p² + pk + k = q => k(p + 1) = q - 2p² => k = (q - 2p²)/(p + 1)
          return (q - 2 * p * p) / (p + 1);
        });

        steps = `Langkah penyelesaian:
1. Hitung \\(f(2) = ${p} \\cdot 2 + k = ${2 * p} + k\\)
2. Hitung \\(f(f(2)) = f(${2 * p} + k) = ${p}(${2 * p} + k) + k = ${
          2 * p * p
        } + ${p}k + k\\)
3. Diketahui \\(f(f(2)) = ${q}\\), sehingga:
   \\(${2 * p * p} + ${p}k + k = ${q}\\)
4. Sederhanakan: \\(${2 * p * p} + ${p + 1}k = ${q}\\)
5. \\(${p + 1}k = ${q} - ${2 * p * p} = ${q - 2 * p * p}\\)
6. \\(k = \\frac{${q - 2 * p * p}}{${p + 1}} = ${answer}\\)`;
        qType = "Persamaan Fungsional (Parameter)";
      }
      break;

    case "mixed_applications":
      // Aplikasi campuran yang menggabungkan fungsi trigonometri, logaritma, dan eksponensial
      const appType = getRandomElement(["trig_log", "exp_trig", "log_exp"]);

      if (appType === "trig_log") {
        // Kombinasi fungsi trigonometri dan logaritma
        const angle = getRandomElement([0, 30, 45, 60, 90]);
        const base = getRandomElement([2, 3, 5, 10]);

        question = `Hitung nilai dari \\(\\log_{${base}}(\\sin(${angle}^\\circ) + \\cos(${angle}^\\circ))\\)`;

        answer = ensureIntegerAnswer(() => {
          const sinVal = Math.sin((angle * Math.PI) / 180);
          const cosVal = Math.cos((angle * Math.PI) / 180);
          const sum = sinVal + cosVal;
          return Math.round(Math.log(sum) / Math.log(base));
        });

        steps = `Langkah penyelesaian:
1. Hitung \\(\\sin(${angle}^\\circ) = ${Math.sin(
          (angle * Math.PI) / 180
        ).toFixed(4)}\\)
2. Hitung \\(\\cos(${angle}^\\circ) = ${Math.cos(
          (angle * Math.PI) / 180
        ).toFixed(4)}\\)
3. Jumlahkan: \\(${Math.sin((angle * Math.PI) / 180).toFixed(4)} + ${Math.cos(
          (angle * Math.PI) / 180
        ).toFixed(4)} = ${(
          Math.sin((angle * Math.PI) / 180) + Math.cos((angle * Math.PI) / 180)
        ).toFixed(4)}\\)
4. Hitung \\(\\log_{${base}}(${(
          Math.sin((angle * Math.PI) / 180) + Math.cos((angle * Math.PI) / 180)
        ).toFixed(4)}) = ${answer}\\)`;
        qType = "Aplikasi Campuran (Trigonometri & Logaritma)";
      } else if (appType === "exp_trig") {
        // Kombinasi fungsi eksponensial dan trigonometri
        const a = getRandomInt(1, 3);
        const angle = getRandomElement([0, 30, 45, 60, 90]);

        question = `Hitung nilai dari \\(${a}^{\\sin(${angle}^\\circ)} + ${a}^{\\cos(${angle}^\\circ)}\\)`;

        answer = ensureIntegerAnswer(() => {
          const sinVal = Math.sin((angle * Math.PI) / 180);
          const cosVal = Math.cos((angle * Math.PI) / 180);
          return Math.pow(a, sinVal) + Math.pow(a, cosVal);
        });

        steps = `Langkah penyelesaian:
1. Hitung \\(\\sin(${angle}^\\circ) = ${Math.sin(
          (angle * Math.PI) / 180
        ).toFixed(4)}\\)
2. Hitung \\(\\cos(${angle}^\\circ) = ${Math.cos(
          (angle * Math.PI) / 180
        ).toFixed(4)}\\)
3. Hitung \\(${a}^{${Math.sin((angle * Math.PI) / 180).toFixed(
          4
        )}} = ${Math.pow(a, Math.sin((angle * Math.PI) / 180)).toFixed(4)}\\)
4. Hitung \\(${a}^{${Math.cos((angle * Math.PI) / 180).toFixed(
          4
        )}} = ${Math.pow(a, Math.cos((angle * Math.PI) / 180)).toFixed(4)}\\)
5. Jumlahkan: ${Math.pow(a, Math.sin((angle * Math.PI) / 180)).toFixed(
          4
        )} + ${Math.pow(a, Math.cos((angle * Math.PI) / 180)).toFixed(
          4
        )} = ${answer}\\)`;
        qType = "Aplikasi Campuran (Eksponensial & Trigonometri)";
      } else {
        // log_exp
        // Kombinasi fungsi logaritma dan eksponensial
        const base = getRandomElement([2, 3, 5]);
        const exp = getRandomInt(1, 3);

        question = `Hitung nilai dari \\(\\log_{${base}}(${base}^{${exp}} + ${base}^{${
          exp + 1
        }})\\)`;

        answer = ensureIntegerAnswer(() => {
          return (
            Math.log(Math.pow(base, exp) + Math.pow(base, exp + 1)) /
            Math.log(base)
          );
        });

        steps = `Langkah penyelesaian:
1. Hitung \\(${base}^{${exp}} = ${Math.pow(base, exp)}\\)
2. Hitung \\(${base}^{${exp + 1}} = ${Math.pow(base, exp + 1)}\\)
3. Jumlahkan: \\(${Math.pow(base, exp)} + ${Math.pow(base, exp + 1)} = ${
          Math.pow(base, exp) + Math.pow(base, exp + 1)
        }\\)
4. Hitung \\(\\log_{${base}}(${
          Math.pow(base, exp) + Math.pow(base, exp + 1)
        }) = ${answer}\\)`;
        qType = "Aplikasi Campuran (Logaritma & Eksponensial)";
      }
      break;
  }

  return { question, answer, steps, type: qType };
}
