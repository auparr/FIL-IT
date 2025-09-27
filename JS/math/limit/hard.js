function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fungsi untuk memilih elemen acak dari array
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Fungsi untuk menghasilkan soal limit trigonometri dengan jawaban bilangan bulat
function generateTrigonometricLimit() {
  const types = [
    "sin_simple", // lim sin(ax)/(bx) dengan a/b bulat
    "sin_composite", // lim sin(ax)/sin(bx) dengan a/b bulat
    "tan_simple", // lim tan(ax)/(bx) dengan a/b bulat
    "cos_special", // lim (1-cos(ax))/(bx^2) dengan a^2/(2b) bulat
    "trig_identity", // lim (sin(ax)-sin(bx))/(cx) dengan identitas trigonometri
  ];

  const type = getRandomElement(types);
  let question, answer, steps;

  switch (type) {
    case "sin_simple":
      const a1 = getRandomInt(1, 4);
      const b1 = getRandomInt(1, 4);
      // Pastikan a1/b1 bulat
      const multiplier1 = getRandomInt(1, 3);
      const a = multiplier1 * b1;

      question = `\\[\\lim_{x \\to 0} \\frac{\\sin(${a}x)}{${b1}x}\\]`;
      answer = a / b1;
      steps = `Langkah penyelesaian:
1. Gunakan limit trigonometri dasar: \\[\\lim_{x \\to 0} \\frac{\\sin(kx)}{x} = k\\]
2. Dalam soal ini, k = ${a}
3. Namun penyebut adalah ${b1}x, bukan x
4. Jadi kita tulis ulang: \\[\\frac{\\sin(${a}x)}{${b1}x} = \\frac{1}{${b1}} \\cdot \\frac{\\sin(${a}x)}{x}\\]
5. Maka limitnya adalah: \\[\\frac{1}{${b1}} \\cdot ${a} = ${a / b1}\\]`;
      break;

    case "sin_composite":
      const a2 = getRandomInt(1, 4);
      const b2 = getRandomInt(1, 4);
      // Pastikan a2/b2 bulat
      const multiplier2 = getRandomInt(1, 3);
      const a_val = multiplier2 * b2;

      question = `\\[\\lim_{x \\to 0} \\frac{\\sin(${a_val}x)}{\\sin(${b2}x)}\\]`;
      answer = a_val / b2;
      steps = `Langkah penyelesaian:
1. Gunakan limit trigonometri: \\[\\lim_{x \\to 0} \\frac{\\sin(kx)}{\\sin(mx)} = \\frac{k}{m}\\]
2. Dalam soal ini, k = ${a_val}, m = ${b2}
3. Jadi limitnya adalah: \\[\\frac{${a_val}}{${b2}} = ${a_val / b2}\\]`;
      break;

    case "tan_simple":
      const a3 = getRandomInt(1, 4);
      const b3 = getRandomInt(1, 4);
      // Pastikan a3/b3 bulat
      const multiplier3 = getRandomInt(1, 3);
      const a_tan = multiplier3 * b3;

      question = `\\[\\lim_{x \\to 0} \\frac{\\tan(${a_tan}x)}{${b3}x}\\]`;
      answer = a_tan / b3;
      steps = `Langkah penyelesaian:
1. Gunakan limit trigonometri: \\[\\lim_{x \\to 0} \\frac{\\tan(kx)}{x} = k\\]
2. Dalam soal ini, k = ${a_tan}
3. Namun penyebut adalah ${b3}x, bukan x
4. Jadi kita tulis ulang: \\[\\frac{\\tan(${a_tan}x)}{${b3}x} = \\frac{1}{${b3}} \\cdot \\frac{\\tan(${a_tan}x)}{x}\\]
5. Maka limitnya adalah: \\[\\frac{1}{${b3}} \\cdot ${a_tan} = ${
        a_tan / b3
      }\\]`;
      break;

    case "cos_special":
      const a4 = getRandomInt(1, 3);
      const b4 = getRandomInt(1, 3);
      // Pastikan a4^2/(2b4) bulat
      const multiplier4 = getRandomInt(1, 2);
      const a_cos = multiplier4;
      const b_cos = (a_cos * a_cos) / 2; // Agar hasilnya bulat

      question = `\\[\\lim_{x \\to 0} \\frac{1 - \\cos(${a_cos}x)}{${b_cos}x^2}\\]`;
      answer = (a_cos * a_cos) / (2 * b_cos);
      steps = `Langkah penyelesaian:
1. Gunakan identitas trigonometri: \\[1 - \\cos(kx) = 2\\sin^2\\left(\\frac{kx}{2}\\right)\\]
2. Juga gunakan limit: \\[\\lim_{x \\to 0} \\frac{\\sin(mx)}{x} = m\\]
3. Substitusi identitas: \\[\\frac{1 - \\cos(${a_cos}x)}{${b_cos}x^2} = \\frac{2\\sin^2\\left(\\frac{${a_cos}x}{2}\\right)}{${b_cos}x^2}\\]
4. Sederhanakan: \\[= \\frac{2}{${b_cos}} \\cdot \\left(\\frac{\\sin\\left(\\frac{${a_cos}x}{2}\\right)}{x}\\right)^2\\]
5. Gunakan limit: \\[= \\frac{2}{${b_cos}} \\cdot \\left(\\frac{${a_cos}}{2}\\right)^2 = \\frac{2}{${b_cos}} \\cdot \\frac{${
        a_cos * a_cos
      }}{4} = \\frac{${a_cos * a_cos}}{${2 * b_cos}}\\]`;
      break;

    case "trig_identity":
      const a5 = getRandomInt(2, 8);
      const b5 = getRandomInt(1, a5 - 1);

      // hitung selisih
      const diff = a5 - b5;

      // cari semua pembagi positif diff
      function divisors(n) {
        const list = [];
        for (let i = 1; i <= n; i++) {
          if (n % i === 0) list.push(i);
        }
        return list;
      }

      // pilih c5 secara acak dari daftar pembagi
      const c5 = getRandomElement(divisors(diff));

      question = `\\[\\lim_{x\\to 0} \\frac{\\sin(${a5}x) - \\sin(${b5}x)}{${c5}x}\\]`;
      answer = diff / c5; // dijamin bilangan bulat
      steps = `Langkah penyelesaian:
1. Gunakan identitas penjumlahan sinus: \\[\\sin A - \\sin B = 2\\cos\\left(\\frac{A+B}{2}\\right)\\sin\\left(\\frac{A-B}{2}\\right)\\]
2. Terapkan identitas: \\[\\sin(${a5}x) - \\sin(${b5}x) = 2\\cos\\left(\\frac{${a5}x+${b5}x}{2}\\right)\\sin\\left(\\frac{${a5}x-${b5}x}{2}\\right)\\]
3. Sederhanakan: \\[= 2\\cos\\left(\\frac{${
        a5 + b5
      }x}{2}\\right)\\sin\\left(\\frac{${a5 - b5}x}{2}\\right)\\]
4. Jadi limit menjadi: \\[\\lim_{x \\to 0} \\frac{2\\cos\\left(\\frac{${
        a5 + b5
      }x}{2}\\right)\\sin\\left(\\frac{${a5 - b5}x}{2}\\right)}{${c5}x}\\]
5. Pisahkan konstanta: \\[= \\frac{2}{${c5}} \\cdot \\lim_{x \\to 0} \\cos\\left(\\frac{${
        a5 + b5
      }x}{2}\\right) \\cdot \\frac{\\sin\\left(\\frac{${
        a5 - b5
      }x}{2}\\right)}{x}\\]
6. Evaluasi limit: \\[\\lim_{x \\to 0} \\cos\\left(\\frac{${
        a5 + b5
      }x}{2}\\right) = 1\\]
7. Dan: \\[\\lim_{x \\to 0} \\frac{\\sin\\left(\\frac{${
        a5 - b5
      }x}{2}\\right)}{x} = \\frac{${a5 - b5}}{2}\\]
8. Jadi hasil akhir: \\[\\frac{2}{${c5}} \\cdot 1 \\cdot \\frac{${
        a5 - b5
      }}{2} = \\frac{${a5 - b5}}{${c5}} = ${(a5 - b5) / c5}\\]`;
      break;
  }

  return { question, answer, steps, type: "trigonometric" };
}

// Fungsi untuk menghasilkan soal limit tak hingga dengan jawaban bilangan bulat
function generateInfinityLimit() {
  const types = [
    "rational_same_degree", // Fungsi rasional dengan derajat sama
    "sqrt_rational", // Bentuk akar dengan fungsi rasional
    "rational_nested", // Fungsi rasional dalam akar
  ];

  const type = getRandomElement(types);
  let question, answer, steps;

  switch (type) {
    case "rational_same_degree":
      const a1 = getRandomInt(1, 5);
      const b1 = getRandomInt(1, 5);
      // Pastikan a1/b1 bulat
      const multiplier1 = getRandomInt(1, 3);
      const a = multiplier1 * b1;

      const c1 = getRandomInt(1, 5);
      const d1 = getRandomInt(1, 5);
      const e1 = getRandomInt(1, 5);
      const f1 = getRandomInt(1, 5);

      question = `\\[\\lim_{x \\to \\infty} \\frac{${a}x^2 + ${c1}x + ${e1}}{${b1}x^2 + ${d1}x + ${f1}}\\]`;
      answer = a / b1;
      steps = `Langkah penyelesaian:
1. Untuk limit tak hingga fungsi rasional dengan derajat pembilang dan penyebut sama, hasilnya adalah rasio koefisien tertinggi.
2. Koefisien tertinggi pembilang: ${a}
3. Koefisien tertinggi penyebut: ${b1}
4. Jadi limitnya adalah: \\[\\frac{${a}}{${b1}} = ${a / b1}\\]`;
      break;

    case "sqrt_rational":
      const a3 = getRandomInt(1, 3);
      const b3 = getRandomInt(1, 3);
      // Pastikan √a3 - √b3 bulat
      // Pilih a3 dan b3 yang merupakan kuadrat sempurna
      const sqrt_a = getRandomInt(2, 3);
      const sqrt_b = getRandomInt(1, 2);
      const a_sqrt = sqrt_a * sqrt_a;
      const b_sqrt = sqrt_b * sqrt_b;

      const c3 = getRandomInt(1, 5);
      const d3 = getRandomInt(1, 5);
      const e3 = getRandomInt(1, 5);
      const f3 = getRandomInt(1, 5);

      question = `\\[\\lim_{x \\to \\infty} \\left(\\sqrt{${a_sqrt}x^2 + ${c3}x + ${e3}} - \\sqrt{${b_sqrt}x^2 + ${d3}x + ${f3}}\\right)\\]`;
      answer = sqrt_a - sqrt_b;
      steps = `Langkah penyelesaian:
1. Kalikan dengan bentuk sekawan: \\[\\frac{(\\sqrt{A} - \\sqrt{B})(\\sqrt{A} + \\sqrt{B})}{\\sqrt{A} + \\sqrt{B}} = \\frac{A - B}{\\sqrt{A} + \\sqrt{B}}\\]
2. Di mana A = ${a_sqrt}x^2 + ${c3}x + ${e3} dan B = ${b_sqrt}x^2 + ${d3}x + ${f3}
3. Untuk x → ∞, suku dengan pangkat tertinggi dominan.
4. Jadi A - B ≈ (${a_sqrt} - ${b_sqrt})x^2
5. Dan √A + √B ≈ (√${a_sqrt} + √${b_sqrt})|x| = (${sqrt_a} + ${sqrt_b})x (karena x > 0)
6. Maka limitnya: \\[\\frac{${a_sqrt} - ${b_sqrt}}{${sqrt_a} + ${sqrt_b}} = \\frac{${
        a_sqrt - b_sqrt
      }}{${sqrt_a + sqrt_b}} = ${sqrt_a - sqrt_b}\\]`;
      break;

    case "rational_nested":
      const a4 = getRandomInt(1, 3);
      const b4 = getRandomInt(1, 3);
      // Pastikan √(a4/b4) bulat
      const multiplier4 = getRandomInt(1, 2);
      const a_nested = multiplier4 * multiplier4 * b4;

      const c4 = getRandomInt(1, 5);
      const d4 = getRandomInt(1, 5);
      const e4 = getRandomInt(1, 5);
      const f4 = getRandomInt(1, 5);

      question = `\\[\\lim_{x \\to \\infty} \\sqrt{\\frac{${a_nested}x^2 + ${c4}x + ${e4}}{${b4}x^2 + ${d4}x + ${f4}}}\\]`;
      answer = multiplier4;
      steps = `Langkah penyelesaian:
1. Untuk limit tak hingga fungsi dalam akar, kita dapat mengambil limit fungsi di dalam akar terlebih dahulu.
2. Limit fungsi rasional: \\[\\lim_{x \\to \\infty} \\frac{${a_nested}x^2 + ${c4}x + ${e4}}{${b4}x^2 + ${d4}x + ${f4}} = \\frac{${a_nested}}{${b4}} = ${
        a_nested / b4
      }\\]
3. Kemudian ambil akar kuadratnya: \\[\\sqrt{${
        a_nested / b4
      }} = ${multiplier4}\\]`;
      break;
  }

  return { question, answer, steps, type: "infinity" };
}

// Fungsi untuk menghasilkan soal limit tingkat hard
export function generateHardLimitQuestion() {
  // Pilih jenis soal: trigonometri atau tak hingga
  const questionCategory = Math.random() > 0.5 ? "trigonometric" : "infinity";

  if (questionCategory === "trigonometric") {
    return generateTrigonometricLimit();
  } else {
    return generateInfinityLimit();
  }
}
