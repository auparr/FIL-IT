export function generateEasyDerivativeQuestion() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  const types = [
    "power_rule_simple",
    "polynomial_derivative",
    "constant_linear",
    "derivative_at_point",
  ];

  const type = getRandomElement(types);
  let question, answer, steps, qType;

  switch (type) {
    case "power_rule_simple":
      //  d/dx(ax^n) = n·a·x^(n-1)
      const a1 = getRandomInt(1, 8);
      const n1 = getRandomInt(2, 6);

      question = `Tentukan turunan dari fungsi \\(f(x) = ${a1}x^{${n1}}\\).`;

      answer = a1 * n1;

      steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${a1}x^{${n1}}\\]

2. Gunakan aturan pangkat: \\(\\frac{d}{dx}(x^n) = nx^{n-1}\\)

3. Terapkan aturan:
   \\[f'(x) = ${a1} \\cdot ${n1} \\cdot x^{${n1}-1}\\]

4. Sederhanakan:
   \\[f'(x) = ${a1 * n1}x^{${n1 - 1}}\\]

5. Jadi, turunannya adalah \\(${a1 * n1}x^{${n1 - 1}}\\)`;

      qType = "Aturan Pangkat Sederhana";
      break;

    case "polynomial_derivative":
      // Turunan polinomial dengan 2-3 suku
      const numTerms = getRandomInt(2, 3);
      const terms = [];
      const derivatives = [];

      for (let i = 0; i < numTerms; i++) {
        const coeff = getRandomInt(1, 8) * (Math.random() > 0.5 ? 1 : -1);
        const power = getRandomInt(1, 5);
        terms.push({ coeff, power });

        // Turunan: n·a·x^(n-1)
        if (power > 0) {
          derivatives.push({
            coeff: coeff * power,
            power: power - 1,
          });
        }
      }

      // Sort by power descending
      terms.sort((a, b) => b.power - a.power);
      derivatives.sort((a, b) => b.power - a.power);

      // Build question string
      let funcStr = terms
        .map((t, i) => {
          const sign =
            i === 0 ? (t.coeff >= 0 ? "" : "-") : t.coeff >= 0 ? "+" : "-";
          const absCoeff = Math.abs(t.coeff);
          return `${sign}${absCoeff}x^{${t.power}}`;
        })
        .join(" ");

      question = `Tentukan turunan dari fungsi \\(f(x) = ${funcStr}\\).`;

      // Answer is the coefficient of the highest power term
      answer = derivatives[0].coeff;

      // Build derivative string
      let derivStr = derivatives
        .map((d, i) => {
          const sign =
            i === 0 ? (d.coeff >= 0 ? "" : "-") : d.coeff >= 0 ? "+" : "-";
          const absCoeff = Math.abs(d.coeff);
          if (d.power === 0) {
            return `${sign}${absCoeff}`;
          }
          return `${sign}${absCoeff}x^{${d.power}}`;
        })
        .join(" ");

      steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${funcStr}\\]

2. Turunkan setiap suku menggunakan aturan pangkat:
${terms
  .map((t, i) => {
    const deriv = derivatives[i];
    return `   - \\(\\frac{d}{dx}(${t.coeff}x^{${t.power}}) = ${deriv.coeff}x^{${deriv.power}}\\)`;
  })
  .join("\n")}

3. Gabungkan semua hasil:
   \\[f'(x) = ${derivStr}\\]

4. Jadi, turunannya adalah \\(${derivStr}\\)`;

      qType = "Turunan Polinomial";
      break;

    case "constant_linear":
      const subtype = getRandomElement(["constant", "linear"]);

      if (subtype === "constant") {
        // Turunan konstanta = 0
        const c = getRandomInt(1, 20);

        question = `Tentukan turunan dari fungsi \\(f(x) = ${c}\\).`;
        answer = 0;

        steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${c}\\]

2. Turunan dari konstanta adalah 0:
   \\[\\frac{d}{dx}(c) = 0\\]

3. Jadi, turunannya adalah:
   \\[f'(x) = 0\\]`;

        qType = "Turunan Konstanta";
      } else {
        // Turunan linear: d/dx(ax + b) = a
        const a3 = getRandomInt(1, 10) * (Math.random() > 0.5 ? 1 : -1);
        const b3 = getRandomInt(1, 15);

        question = `Tentukan turunan dari fungsi \\(f(x) = ${a3}x ${
          b3 >= 0 ? "+" : ""
        }${b3}\\).`;
        answer = a3;

        steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${a3}x ${b3 >= 0 ? "+" : ""}${b3}\\]

2. Turunkan setiap suku:
   - \\(\\frac{d}{dx}(${a3}x) = ${a3}\\)
   - \\(\\frac{d}{dx}(${b3}) = 0\\)

3. Gabungkan hasil:
   \\[f'(x) = ${a3}\\]

4. Jadi, turunannya adalah \\(${a3}\\)`;

        qType = "Turunan Linear";
      }
      break;

    case "derivative_at_point":
      // Hitung nilai turunan di titik tertentu
      const a4 = getRandomInt(1, 5);
      const n4 = getRandomInt(2, 4);
      const b4 = getRandomInt(1, 8) * (Math.random() > 0.5 ? 1 : -1);
      const x4 = getRandomInt(1, 3);

      question = `Diketahui \\(f(x) = ${a4}x^{${n4}} ${
        b4 >= 0 ? "+" : ""
      }${b4}x\\). Tentukan nilai \\(f'(${x4})\\).`;

      // f'(x) = n·a·x^(n-1) + b
      // f'(x4) = n·a·x4^(n-1) + b
      answer = a4 * n4 * Math.pow(x4, n4 - 1) + b4;

      steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${a4}x^{${n4}} ${b4 >= 0 ? "+" : ""}${b4}x\\]

2. Cari turunan fungsi:
   - \\(\\frac{d}{dx}(${a4}x^{${n4}}) = ${a4 * n4}x^{${n4 - 1}}\\)
   - \\(\\frac{d}{dx}(${b4}x) = ${b4}\\)

3. Turunan fungsi:
   \\[f'(x) = ${a4 * n4}x^{${n4 - 1}} ${b4 >= 0 ? "+" : ""}${b4}\\]

4. Substitusi \\(x = ${x4}\\):
   \\[f'(${x4}) = ${a4 * n4}(${x4})^{${n4 - 1}} ${b4 >= 0 ? "+" : ""}${b4}\\]

5. Hitung:
   \\[f'(${x4}) = ${a4 * n4}(${Math.pow(x4, n4 - 1)}) ${
        b4 >= 0 ? "+" : ""
      }${b4}\\]
   \\[f'(${x4}) = ${a4 * n4 * Math.pow(x4, n4 - 1)} ${
        b4 >= 0 ? "+" : ""
      }${b4}\\]
   \\[f'(${x4}) = ${answer}\\]

6. Jadi, nilai turunan di \\(x = ${x4}\\) adalah \\(${answer}\\)`;

      qType = "Turunan di Titik Tertentu";
      break;
  }

  return { question, answer, steps, type: qType };
}
