export function generateAdvancedLimitQuestion() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Fungsi untuk memilih elemen acak dari array
  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  const types = [
    "rational_multiple_derivatives", // Bentuk rasional yang memerlukan turunan berulang
    "exponential_rational", // Gabungan eksponensial dan rasional
    "trigonometric_rational", // Gabungan trigonometri dan rasional
    "logarithmic_indeterminate", // Bentuk logaritma dengan bentuk tak tentu
    "mixed_functions", // Gabungan berbagai fungsi
  ];

  const type = getRandomElement(types);
  let question, answer, steps, qType;

  switch (type) {
    case "rational_multiple_derivatives":
      // lim x→a (P(x))/(Q(x)) dengan P(a)=0, Q(a)=0, dan perlu turunan berulang
      const a1 = getRandomInt(1, 25);
      const m1 = getRandomInt(1, 25);
      const n1 = getRandomInt(2, 6); // Pangkat untuk membuat perlu turunan berulang

      // P(x) = m(x-a)^n, Q(x) = (x-a)^(n-1)
      // Setelah n-1 kali turunan, hasilnya m*n! / (n-1)! = m*n
      question = `\\[\\lim_{x \\to ${a1}} \\frac{${m1}(x-${a1})^{${n1}}}{(x-${a1})^{${
        n1 - 1
      }}}\\]`;
      answer = m1 * n1;
      steps = `Langkah penyelesaian:
1. Substitusi x = ${a1} menghasilkan: ${m1}(${a1}-${a1})^{${n1}} / (${a1}-${a1})^{${
        n1 - 1
      }} = 0/0 (bentuk tak tentu)
2. Terapkan Aturan L'Hôpital (turunan pembilang dan penyebut):
   \\[\\lim_{x \\to ${a1}} \\frac{${m1 * n1}(x-${a1})^{${n1 - 1}}}{${
        n1 - 1
      }(x-${a1})^{${n1 - 2}}}\\]
3. ${
        n1 > 2
          ? "Masih bentuk 0/0. Terapkan L'Hôpital lagi."
          : "Substitusi x = " +
            a1 +
            ": " +
            m1 * n1 +
            "(" +
            a1 +
            "-" +
            a1 +
            ")/" +
            (n1 - 1) +
            " = 0/0? Periksa: sebenarnya setelah penyederhanaan, limit dapat dihitung langsung."
      }
4. Setelah ${n1 - 1} kali penerapan L'Hôpital, diperoleh:
   \\[\\lim_{x \\to ${a1}} \\frac{${m1 * n1}!}{${n1 - 1}!} = ${m1 * n1}\\]
5. Jadi hasil limitnya adalah ${answer}`;
      qType = "Rasional - Turunan Berganda";
      break;

    case "exponential_rational":
      // lim x→0 (e^(ax) - e^(bx))/(cx)
      const a2 = getRandomInt(1, 25);
      const b2 = getRandomInt(1, 25);
      // Pastikan a2 ≠ b2 agar tidak selalu 0
      if (a2 === b2) {
        b2 = a2 + 1;
      }
      const c2 = a2 - b2; // Agar hasilnya 1

      question = `\\[\\lim_{x \\to 0} \\frac{e^{${a2}x} - e^{${b2}x}}{${c2}x}\\]`;
      answer = 1;
      steps = `Langkah penyelesaian:
1. Substitusi x = 0 menghasilkan: (e⁰ - e⁰)/(${c2}⋅0) = (1-1)/0 = 0/0 (bentuk tak tentu)
2. Terapkan Aturan L'Hôpital (turunan pembilang dan penyebut):
   \\[\\lim_{x \\to 0} \\frac{${a2}e^{${a2}x} - ${b2}e^{${b2}x}}{${c2}}\\]
3. Substitusi x = 0: \\[\\frac{${a2}e^0 - ${b2}e^0}{${c2}} = \\frac{${a2} - ${b2}}{${c2}} = \\frac{${
        a2 - b2
      }}{${c2}} = 1\\]`;
      qType = "Eksponensial-Rasional";
      break;

    case "trigonometric_rational":
      // lim x→0 (sin(ax) - ax)/(cx^3) - Diperbaiki untuk hasil bilangan bulat
      let a3, c3;
      let attempts = 0;

      // Cari kombinasi a dan c yang menghasilkan bilangan bulat
      do {
        a3 = getRandomInt(2, 25);
        c3 = getRandomInt(1, 25);
        // Hitung jawaban: -a^3/(6c)
        answer = -(a3 * a3 * a3) / (6 * c3);
        attempts++;

        // Batasi percobaan
        if (attempts > 20) {
          // Gunakan kombinasi yang dijamin menghasilkan bilangan bulat
          a3 = 6;
          c3 = 1;
          answer = -(a3 * a3 * a3) / (6 * c3); // -216/6 = -36
          break;
        }
      } while (!Number.isInteger(answer));

      question = `\\[\\lim_{x \\to 0} \\frac{\\sin(${a3}x) - ${a3}x}{${c3}x^3}\\]`;
      steps = `Langkah penyelesaian:
1. Substitusi x = 0 menghasilkan: (sin 0 - 0)/0 = 0/0 (bentuk tak tentu)
2. Terapkan Aturan L'Hôpital pertama:
   \\[\\lim_{x \\to 0} \\frac{${a3}\\cos(${a3}x) - ${a3}}{${
        3 * c3
      }x^2} = \\lim_{x \\to 0} \\frac{${a3}(\\cos(${a3}x) - 1)}{${3 * c3}x^2}\\]
3. Masih bentuk 0/0. Terapkan L'Hôpital kedua:
   \\[\\lim_{x \\to 0} \\frac{${a3}(-${a3}\\sin(${a3}x))}{${
        6 * c3
      }x} = \\lim_{x \\to 0} \\frac{-${a3 * a3}\\sin(${a3}x)}{${6 * c3}x}\\]
4. Gunakan limit trigonometri dasar: lim x→0 sin(kx)/x = k
5. Hasil: \\[\\frac{-${a3 * a3} \\cdot ${a3}}{${6 * c3}} = \\frac{-${
        a3 * a3 * a3
      }}{${6 * c3}} = ${answer}\\]`;
      qType = "Trigonometri-Rasional";
      break;

    case "logarithmic_indeterminate":
      // lim x→1 (ln(x))/(x-1)
      // pilih pangkat p untuk mempengaruhi integer hasil
      const p = getRandomInt(1, 15); // pangkat ln(x^p)
      // pilih titik limit a sebagai pembagi p agar p/a bulat
      const divisors = [];
      for (let i = 1; i <= p; i++) if (p % i === 0) divisors.push(i);
      const a = getRandomElement(divisors);

      question = `\\[\\lim_{x \\to ${a}} \\frac{\\ln(x^{${p}})}{x - ${a}}\\]`;
      answer = p / a;
      steps = `Langkah penyelesaian:
1. Substitusi x = ${a}: ln(${a}^${p})/(${a}-${a}) = 0/0 (bentuk tak tentu)
2. Terapkan Aturan L'Hôpital:
   Turunan pembilang = \\(\\frac{${p}}{x}\\), turunan penyebut = 1
3. Evaluasi di x=${a}:
   \\[\\frac{${p}}{${a}} = ${p / a}\\]`;

      qType = "Logaritma";
      break;

    case "mixed_functions":
      // lim x→0 (e^(ax) - 1 - ax)/(bx²) - Diperbaiki untuk hasil bilangan bulat
      let a5, b5;
      let attempts2 = 0;

      // Cari kombinasi a dan b yang menghasilkan bilangan bulat
      do {
        a5 = getRandomInt(1, 25);
        b5 = getRandomInt(1, 25);
        // Hitung jawaban: a^2/(2b)
        answer = (a5 * a5) / (2 * b5);
        attempts2++;

        // Batasi percobaan
        if (attempts2 > 20) {
          // Gunakan kombinasi yang dijamin menghasilkan bilangan bulat
          a5 = 2;
          b5 = 1;
          answer = (a5 * a5) / (2 * b5); // 4/2 = 2
          break;
        }
      } while (!Number.isInteger(answer));

      question = `\\[\\lim_{x \\to 0} \\frac{e^{${a5}x} - 1 - ${a5}x}{${b5}x^2}\\]`;
      steps = `Langkah penyelesaian:
1. Substitusi x = 0 menghasilkan: (e⁰ - 1 - 0)/0 = (1-1-0)/0 = 0/0 (bentuk tak tentu)
2. Terapkan Aturan L'Hôpital pertama:
   \\[\\lim_{x \\to 0} \\frac{${a5}e^{${a5}x} - ${a5}}{${
        2 * b5
      }x} = \\lim_{x \\to 0} \\frac{${a5}(e^{${a5}x} - 1)}{${2 * b5}x}\\]
3. Masih bentuk 0/0. Terapkan L'Hôpital kedua:
   \\[\\lim_{x \\to 0} \\frac{${a5} \\cdot ${a5}e^{${a5}x}}{${
        2 * b5
      }} = \\lim_{x \\to 0} \\frac{${a5 * a5}e^{${a5}x}}{${2 * b5}}\\]
4. Substitusi x = 0: \\[\\frac{${a5 * a5} \\cdot 1}{${2 * b5}} = \\frac{${
        a5 * a5
      }}{${2 * b5}} = ${answer}\\]`;
      qType = "Fungsi Campuran";
      break;
  }

  return { question, answer, steps, type: qType };
}
