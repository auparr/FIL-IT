export function generateAdvancedLimitQuestion() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Fungsi untuk memilih elemen acak dari array
  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  const types = [
    "rational_multiple_derivatives",
    "exponential_rational",
    "trigonometric_rational",
    "logarithmic_indeterminate",
    "mixed_functions",
  ];

  const type = getRandomElement(types);
  let question, answer, steps, qType;

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

      // Kita gunakan pendekatan L'Hôpital bertingkat untuk langkah-langkah
      steps = `Langkah penyelesaian (Menggunakan Aturan L'Hôpital Bertingkat):
1. Substitusi \\(x = ${a1}\\) menghasilkan: 
   \\[\\frac{${m1}(${a1}-${a1})^{${n1}}}{${m2}(${a1}-${a1})^{${n1}}} = \\frac{0}{0}\\] 
   → bentuk tak tentu.
2. Karena pangkat tertinggi di pembilang dan penyebut sama-sama ${n1}, kita harus menerapkan Aturan L'Hôpital sebanyak ${n1} kali hingga bentuk tak tentu hilang.
3. Setelah diterapkan sebanyak ${n1} kali, turunan ke-${n1} dari pembilang dan penyebut akan menjadi konstanta, dan kita dapat menggunakan <b>rasio dari koefisien turunan tertinggi</b> (atau koefisien awal):
   \\[\\lim_{x \\to ${a1}} \\frac{\\text{Turunan ke-}${n1}\\text{ dari Pembilang}}{\\text{Turunan ke-}${n1}\\text{ dari Penyebut}}\\]
   \\[= \\lim_{x \\to ${a1}} \\frac{${m1} \\cdot ${n1}!}{{${m2}} \\cdot ${n1}!} = \\frac{${m1}}{${m2}}\\]
4. Hitung hasilnya:
   \\[\\frac{${m1}}{${m2}} = ${answer}\\]
5. Jadi hasil limit adalah ${answer}.`;

      qType = "Rasional - Aturan L'Hôpital Bertingkat (Pangkat Sama)";
      break;

    case "exponential_rational":
      const a2 = getRandomInt(1, 25);
      let b2 = getRandomInt(1, 25);
      if (a2 === b2) b2 = a2 + 1;
      const c2 = a2 - b2;

      question = `\\[\\lim_{x \\to 0} \\frac{e^{${a2}x} - e^{${b2}x}}{${c2}x}\\]`;
      answer = 1;
      steps = `Langkah penyelesaian:
1. Substitusi \\(x = 0\\): 
   \\[\\frac{e^0 - e^0}{${c2} \\cdot 0} = \\frac{0}{0}\\] → bentuk tak tentu.
2. Terapkan L'Hôpital:
   \\[\\lim_{x \\to 0} \\frac{${a2}e^{${a2}x} - ${b2}e^{${b2}x}}{${c2}}\\]
3. Substitusi \\(x=0\\):
   \\[\\frac{${a2}- ${b2}}{${c2}} = 1\\]`;
      qType = "Eksponensial-Rasional";
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
      steps = `Langkah penyelesaian:
1. Substitusi \\(x=0\\): 
   \\[\\frac{\\sin 0 - 0}{0} = \\frac{0}{0}\\] → bentuk tak tentu.
2. Terapkan L'Hôpital:
   \\[\\lim_{x \\to 0} \\frac{${a3}\\cos(${a3}x) - ${a3}}{${3 * c3}x^2}\\]
3. Masih \\(0/0\\). Terapkan L'Hôpital lagi:
   \\[\\lim_{x \\to 0} \\frac{-${a3 ** 2}\\sin(${a3}x)}{${6 * c3}x}\\]
4. Gunakan limit dasar \\(\\lim_{x \\to 0} \\frac{\\sin(kx)}{x} = k\\).
5. Hasil:
   \\[\\frac{-${a3 ** 3}}{6(${c3})} = ${answer}\\]`;
      qType = "Trigonometri-Rasional";
      break;

    case "logarithmic_indeterminate":
      const p = getRandomInt(1, 15);
      const divisors = [];
      for (let i = 1; i <= p; i++) if (p % i === 0) divisors.push(i);
      const a = getRandomElement(divisors);

      question = `\\[\\lim_{x \\to ${a}} \\frac{\\ln(x^{${p}})}{x - ${a}}\\]`;
      answer = p / a;
      steps = `Langkah penyelesaian:
1. Substitusi \\(x=${a}\\): 
   \\[\\frac{\\ln(${a}^{${p}})}{${a}-${a}} = \\frac{0}{0}\\] → bentuk tak tentu.
2. Terapkan L'Hôpital:
   turunan pembilang = \\(\\tfrac{${p}}{x}\\), turunan penyebut = 1.
3. Substitusi \\(x=${a}\\):
   \\[\\frac{${p}}{${a}} = ${answer}\\]`;
      qType = "Logaritma";
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
      steps = `Langkah penyelesaian:
1. Substitusi \\(x=0\\):
   \\[\\frac{e^0 - 1 - 0}{0} = \\frac{0}{0}\\] → bentuk tak tentu.
2. Terapkan L'Hôpital:
   \\[\\lim_{x \\to 0} \\frac{${a5}e^{${a5}x} - ${a5}}{2${b5}x}\\]
3. Masih \\(0/0\\). Terapkan L'Hôpital lagi:
   \\[\\lim_{x \\to 0} \\frac{${a5 ** 2}e^{${a5}x}}{2${b5}}\\]
4. Substitusi \\(x=0\\):
   \\[\\frac{${a5 ** 2}}{2${b5}} = ${answer}\\]`;
      qType = "Fungsi Campuran";
      break;
  }

  return { question, answer, steps, type: qType };
}
