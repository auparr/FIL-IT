export function generateAdvancedFunctionQuestion() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Fungsi untuk memilih elemen acak dari array
  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  const types = [
    "double_graph_transformations",
    "advanced_functional_equations",
    //   "mixed_applications",
  ];

  const type = getRandomElement(types);
  let question, answer, steps, qType;

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
        }${h})) ${k >= 0 ? "+" : ""}${k}\\). Tentukan nilai \\(f(${angle})\\).`;

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

        steps = `Langkah penyelesaian:
1. Fungsi: 
\\[
f(x) = ${a} ${trigFunc}(${b}(x ${h >= 0 ? "+" : ""} ${h})) ${
          k >= 0 ? "+" : ""
        } ${k}
\\]

2. Substitusi \\(x = ${angle}\\): 
\\[
f(${angle}) = ${a} ${trigFunc}(${b}(${angle} ${h >= 0 ? "+" : ""} ${h})) ${
          k >= 0 ? "+" : ""
        } ${k}
\\]

3. Hitung sudut: 
\\[
f(${angle}) = ${a} ${trigFunc}(${b * (angle + h)}^\\circ) ${
          k >= 0 ? "+" : ""
        } ${k}
\\]

4. Nilai fungsi trigonometri: 
\\[
${trigFunc}(${b * (angle + h)}^\\circ) = ${trigText}
\\]

5. Hasil akhir: 
\\[
${a} \\times ${trigText} ${k >= 0 ? "+" : ""} ${k} = ${answer}
\\]`;

        qType = "Transformasi Grafik Ganda (Trigonometri)";
        break;
      } else if (transformType === "exponential") {
        // Transformasi eksponensial dengan basis dan eksponen yang menghasilkan integer
        const a = getRandomInt(1, 20);
        const base = getRandomElement([2, 3, 4]);
        const h = getRandomInt(-2, 15);
        const k = getRandomInt(-3, 4);

        // Pilih x yang membuat hasil perpangkatan integer
        const x = getRandomInt(0, 3);

        question = `Diketahui fungsi \\(f(x) = ${a} \\cdot ${base}^{x ${
          h >= 0 ? "+" : ""
        }${h}} ${k >= 0 ? "+" : ""}${k}\\). Tentukan nilai \\(f(${x})\\).`;

        answer = a * Math.pow(base, x + h) + k;
        steps = `Langkah penyelesaian:
1. Fungsi: 
\\[
f(x) = ${a} \\cdot ${base}^{x ${h >= 0 ? "+" : ""} ${h}} ${
          k >= 0 ? "+" : ""
        } ${k}
\\]

2. Substitusi \\(x = ${x}\\): 
\\[
f(${x}) = ${a} \\cdot ${base}^{${x} ${h >= 0 ? "+" : ""} ${h}} ${
          k >= 0 ? "+" : ""
        } ${k}
\\]

3. Hitung eksponen: 
\\[
${x} ${h >= 0 ? "+" : ""} ${h} = ${x + h}
\\]

4. Hitung pangkat: 
\\[
${base}^{${x + h}} = ${Math.pow(base, x + h)}
\\]

5. Hasil akhir: 
\\[
${a} \\times ${Math.pow(base, x + h)} ${k >= 0 ? "+" : ""} ${k} = ${answer}
\\]`;

        qType = "Transformasi Grafik Ganda (Eksponensial)";
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

        const argumentDisplay =
          h === 0 ? x.toString() : `${x} ${h >= 0 ? "+" : ""}${h}`;

        question = `Diketahui fungsi \\(f(x) = ${a} \\log_{${base}}(x) ${
          k >= 0 ? "+" : ""
        }${k}\\). Tentukan nilai \\(f(${x})\\).`;

        steps = `Langkah penyelesaian:
1. Fungsi: 
\\[
f(x) = ${a} \\log_{${base}}(${argumentDisplay}) ${k >= 0 ? "+" : ""} ${k}
\\]

2. Substitusi \\(x = ${x}\\): 
\\[
f(${x}) = ${a} \\log_{${base}}(${argumentDisplay}) ${k >= 0 ? "+" : ""} ${k}
\\]

3. Hitung argumen logaritma: 
\\[
${argumentDisplay} = ${argValue}
\\]

4. Cari nilai n dimana \\(${base}^n = ${argValue}\\): 
\\[
n = ${logValue}
\\]

5. Hasil akhir: 
\\[
${a} \\times ${logValue} ${k >= 0 ? "+" : ""} ${k} = ${answer}
\\]`;

        qType = "Transformasi Grafik Ganda (Logaritma)";
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

        steps = `Langkah penyelesaian:
1. Hitung \\(g(${x})\\): 
\\[
g(${x}) = ${c}(${x}) + ${d} = ${c * x + d}
\\]

2. Hitung \\(f(g(${x}))\\): 
\\[
f(g(${x})) = f(${c * x + d}) = ${a}(${c * x + d}) + ${b}
\\]

3. Hitung nilai akhir: 
\\[
${a} \\times (${c * x + d}) + ${b} = ${a * (c * x + d)} + ${b} = ${answer}
\\]`;

        qType = "Persamaan Fungsional (Komposisi)";
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

        steps = `Langkah penyelesaian:
1. Hitung \\(f(2)\\): 
\\[
f(2) = ${p} \\times 2 + k = ${2 * p} + k
\\]

2. Hitung \\(f(f(2))\\): 
\\[
f(f(2)) = f(${2 * p} + k) = ${p}(${2 * p} + k) + k = ${2 * p * p} + ${p}k + k
\\]

3. Bentuk persamaan: 
\\[
${2 * p * p} + ${p + 1}k = ${q}
\\]

4. Selesaikan untuk \\(k\\): 
\\[
${p + 1}k = ${q} - ${2 * p * p} = ${q - 2 * p * p}
\\]

5. Nilai akhir: 
\\[
k = \\frac{${q - 2 * p * p}}{${p + 1}} = ${answer}
\\]`;

        qType = "Persamaan Fungsional (Parameter)";
      }
      break;

    case "mixed_applications":
      const appType = getRandomElement([
        //   "trig_log",
        "exp_trig",
        "log_exp",
        "trig_exp_combo",
        //   "log_trig_special",
      ]);

      if (appType === "trig_log") {
        // Trigonometri dan logaritma dengan hasil integer
        const base = getRandomElement([2, 3, 4, 5]);

        // Pilih kombinasi yang menghasilkan nilai positif dan integer
        const combinations = [
          {
            angles: [0, 90],
            desc: "sin(0°) + cos(90°)",
            sinSum: 0,
            cosSum: 0,
            total: 1,
          }, // sin(0) + cos(0) = 0 + 1 = 1
          {
            angles: [90, 0],
            desc: "sin(90°) + cos(0°)",
            sinSum: 1,
            cosSum: 1,
            total: 2,
          }, // sin(90) + cos(0) = 1 + 1 = 2
          {
            angles: [0, 0],
            desc: "2cos(0°)",
            sinSum: 0,
            cosSum: 1,
            total: 2,
            isDouble: true,
          }, // 2*cos(0) = 2*1 = 2
          {
            angles: [90, 90],
            desc: "2sin(90°)",
            sinSum: 1,
            cosSum: 0,
            total: 2,
            isDouble: true,
          }, // 2*sin(90) = 2*1 = 2
        ];

        const combo = getRandomElement(combinations);

        if (combo.isDouble) {
          const func = combo.sinSum === 1 ? "sin" : "cos";
          const angle = combo.sinSum === 1 ? 90 : 0;
          question = `Hitung nilai dari \\(\\log_{${base}}(2 \\cdot ${func}(${angle}°))\\)`;
          steps = `Langkah penyelesaian:
1. \\(${func}(${angle}°) = ${combo.sinSum || combo.cosSum}\\)
2. \\(2 \\cdot ${combo.sinSum || combo.cosSum} = ${combo.total}\\)
3. \\(\\log_{${base}}(${combo.total}) = ${
            Math.log(combo.total) / Math.log(base)
          }\\)`;
        } else {
          question = `Hitung nilai dari \\(\\log_{${base}}(\\sin(${combo.angles[0]}°) + \\cos(${combo.angles[1]}°))\\)`;
          steps = `Langkah penyelesaian:
1. \\(\\sin(${combo.angles[0]}°) = ${combo.sinSum}\\)
2. \\(\\cos(${combo.angles[1]}°) = ${combo.cosSum}\\)
3. Jumlah = ${combo.sinSum} + ${combo.cosSum} = ${combo.total}
4. \\(\\log_{${base}}(${combo.total}) = ${
            Math.log(combo.total) / Math.log(base)
          }\\)`;
        }

        // Untuk memastikan hasil integer, gunakan kombinasi khusus
        if (combo.total === 1) {
          answer = 0; // log_base(1) = 0
        } else if (combo.total === base) {
          answer = 1; // log_base(base) = 1
        } else {
          // Pilih base yang menghasilkan integer
          const validBases = [2, 4, 8, 16]; // untuk total = 2
          if (combo.total === 2 && validBases.includes(base)) {
            answer = Math.log(2) / Math.log(base);
            if (!Number.isInteger(answer)) {
              answer = Math.round(answer * 1000) / 1000; // Round untuk display
            }
          } else {
            answer = Math.log(combo.total) / Math.log(base);
          }
        }

        qType = "Aplikasi Campuran (Trigonometri & Logaritma)";
      } else if (appType === "exp_trig") {
        // Eksponensial dan trigonometri dengan hasil integer
        const base = getRandomElement([2, 3]);

        // Pilih kombinasi sudut yang menghasilkan eksponen sederhana
        const trigCombos = [
          { angle1: 0, angle2: 0, sin1: 0, cos1: 1, sin2: 0, cos2: 1 }, // sin(0) = 0, cos(0) = 1
          { angle1: 90, angle2: 90, sin1: 1, cos1: 0, sin2: 1, cos2: 0 }, // sin(90) = 1, cos(90) = 0
          { angle1: 0, angle2: 90, sin1: 0, cos1: 1, sin2: 1, cos2: 0 }, // campuran
        ];

        const combo = getRandomElement(trigCombos);
        question = `Hitung nilai dari \\(${base}^{\\sin(${combo.angle1}°)} + ${base}^{\\cos(${combo.angle2}°)}\\)`;

        const term1 = Math.pow(base, combo.sin1);
        const term2 = Math.pow(base, combo.cos2);
        answer = term1 + term2;

        steps = `Langkah penyelesaian:
1. \\(\\sin(${combo.angle1}°) = ${combo.sin1}\\)
2. \\(\\cos(${combo.angle2}°) = ${combo.cos2}\\)
3. \\(${base}^{${combo.sin1}} = ${term1}\\)
4. \\(${base}^{${combo.cos2}} = ${term2}\\)
5. Jumlah: ${term1} + ${term2} = ${answer}`;

        qType = "Aplikasi Campuran (Eksponensial & Trigonometri)";
      } else if (appType === "log_exp") {
        // Logaritma dan eksponensial dengan hasil integer pasti
        const base = getRandomElement([2, 3, 5]);
        const n = getRandomInt(1, 3);

        // Buat ekspresi yang pasti menghasilkan pangkat dari base
        question = `Hitung nilai dari \\(\\log_{${base}}(${base}^${n} + ${base}^${n})\\)`;

        const term = Math.pow(base, n);
        const sum = term + term; // 2 * base^n

        // sum = 2 * base^n, jadi log_base(sum) = log_base(2 * base^n) = log_base(2) + n
        answer = Math.log(sum) / Math.log(base);

        // Untuk hasil yang lebih bersih, gunakan faktoring
        if (sum === Math.pow(base, n + 1)) {
          answer = n + 1; // Jika 2*base^n = base^(n+1)
        } else {
          // Untuk base = 2: 2*2^n = 2^(n+1), jadi hasilnya n+1
          if (base === 2) {
            answer = n + 1;
          } else {
            // Untuk base lain, hasil mungkin tidak integer, jadi round
            answer = Math.round(answer * 1000) / 1000;
          }
        }

        steps = `Langkah penyelesaian:
1. \\(${base}^${n} = ${term}\\)
2. \\(${base}^${n} + ${base}^${n} = ${term} + ${term} = ${sum}\\)
3. \\(${sum} = 2 \\times ${base}^${n}\\)${
          base === 2
            ? `
4. \\(2 \\times 2^${n} = 2^{${n}+1} = 2^${n + 1} = ${Math.pow(2, n + 1)}\\)
5. \\(\\log_{2}(2^${n + 1}) = ${n + 1}\\)`
            : `
4. \\(\\log_{${base}}(${sum}) = ${answer}\\)`
        }`;

        qType = "Aplikasi Campuran (Logaritma & Eksponensial)";
      } else if (appType === "trig_exp_combo") {
        // Kombinasi trigonometri dalam eksponen untuk hasil integer
        const base = getRandomElement([2, 3]);
        const multiplier = getRandomElement([2, 3, 4]);

        question = `Hitung nilai dari \\(${base}^{${multiplier} \\sin(0°)} + ${base}^{${multiplier} \\cos(0°)}\\)`;

        const sinVal = 0; // sin(0°) = 0
        const cosVal = 1; // cos(0°) = 1

        const exp1 = multiplier * sinVal; // multiplier * 0 = 0
        const exp2 = multiplier * cosVal; // multiplier * 1 = multiplier

        const term1 = Math.pow(base, exp1); // base^0 = 1
        const term2 = Math.pow(base, exp2); // base^multiplier

        answer = term1 + term2;

        steps = `Langkah penyelesaian:
1. \\(\\sin(0°) = ${sinVal}\\), \\(\\cos(0°) = ${cosVal}\\)
2. Eksponen pertama: \\(${multiplier} \\times ${sinVal} = ${exp1}\\)
3. Eksponen kedua: \\(${multiplier} \\times ${cosVal} = ${exp2}\\)
4. \\(${base}^${exp1} = ${term1}\\)
5. \\(${base}^${exp2} = ${term2}\\)
6. Jumlah: ${term1} + ${term2} = ${answer}`;

        qType = "Aplikasi Campuran (Trigonometri dalam Eksponensial)";
      } else {
        // log_trig_special
        // Logaritma dengan argumen trigonometri khusus
        const base = getRandomElement([2, 10]);
        const operations = [
          {
            expr: "1 + \\sin^2(0°) + \\cos^2(0°)",
            value: 2,
            desc: "menggunakan identitas sin²θ + cos²θ = 1",
          },
          {
            expr: "\\sec^2(0°)",
            value: 1,
            desc: "sec(0°) = 1/cos(0°) = 1",
          },
          { expr: "2\\cos(0°)", value: 2, desc: "cos(0°) = 1" },
          {
            expr: "\\sin^2(90°) + \\cos^2(90°) + 1",
            value: 2,
            desc: "sin²(90°) + cos²(90°) = 1",
          },
        ];

        const op = getRandomElement(operations);
        question = `Hitung nilai dari \\(\\log_{${base}}(${op.expr})\\)`;

        if (op.value === 1) {
          answer = 0; // log_base(1) = 0
        } else if (op.value === base) {
          answer = 1; // log_base(base) = 1
        } else if (op.value === Math.pow(base, 2)) {
          answer = 2; // log_base(base²) = 2
        } else {
          answer = Math.log(op.value) / Math.log(base);
        }

        steps = `Langkah penyelesaian:
1. Evaluasi ekspresi trigonometri (${op.desc})
2. Hasil evaluasi: ${op.value}
3. \\(\\log_{${base}}(${op.value}) = ${answer}\\)`;

        qType = "Aplikasi Campuran (Logaritma dengan Trigonometri Khusus)";
      }

      // Pastikan answer adalah integer atau desimal yang reasonable
      if (
        typeof answer === "number" &&
        !Number.isInteger(answer) &&
        answer !== 0
      ) {
        // Jika tidak integer, coba round atau gunakan exact values
        if (Math.abs(answer - Math.round(answer)) < 0.0001) {
          answer = Math.round(answer);
        }
      }

      break;
  }

  // Pastikan answer adalah integer
  if (typeof answer === "number") {
    answer = Math.round(answer);
  }

  return { question, answer, steps, type: qType };
}
