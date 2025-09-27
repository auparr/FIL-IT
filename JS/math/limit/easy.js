function generateEasyLimitQuestion() {
  // Pilih jenis fungsi acak (0: polinomial, 1: rasional sederhana)
  const questionType = getRandomInt(0, 1);

  // Nilai x yang didekati (bilangan bulat kecil)
  const xValue = getRandomInt(-5, 5);

  let question, answer, steps, type;

  if (questionType === 0) {
    // Soal polinomial: ax^2 + bx + c atau ax + b
    const degree = getRandomInt(1, 2); // Derajat polinomial (1 atau 2)

    if (degree === 1) {
      // Fungsi linear: ax + b
      const a = getRandomInt(1, 5) * (Math.random() > 0.5 ? 1 : -1);
      const b = getRandomInt(-10, 10);

      question = `\\[\\lim_{x \\to ${xValue}} (${a}x ${
        b >= 0 ? "+" : ""
      } ${b})\\]`;
      answer = a * xValue + b;
      steps = `Langkah penyelesaian:
1. Karena ini adalah fungsi polinomial sederhana, kita dapat menggunakan substitusi langsung.
2. Ganti nilai x dengan ${xValue}: ${a}(${xValue}) ${b >= 0 ? "+" : ""} ${b}
3. Hitung: ${a * xValue} ${b >= 0 ? "+" : ""} ${b} = ${answer}`;
      type = "Polinomial Linear";
    } else {
      // Fungsi kuadrat: ax^2 + bx + c
      const a = getRandomInt(1, 3) * (Math.random() > 0.5 ? 1 : -1);
      const b = getRandomInt(-5, 5);
      const c = getRandomInt(-10, 10);

      question = `\\[\\lim_{x \\to ${xValue}} (${a}x^2 ${
        b >= 0 ? "+" : ""
      } ${b}x ${c >= 0 ? "+" : ""} ${c})\\]`;
      answer = a * xValue * xValue + b * xValue + c;
      steps = `Langkah penyelesaian:
1. Karena ini adalah fungsi polinomial sederhana, kita dapat menggunakan substitusi langsung.
2. Ganti nilai x dengan ${xValue}: ${a}(${xValue})² ${
        b >= 0 ? "+" : ""
      } ${b}(${xValue}) ${c >= 0 ? "+" : ""} ${c}
3. Hitung: ${a}(${xValue * xValue}) ${b >= 0 ? "+" : ""} ${b * xValue} ${
        c >= 0 ? "+" : ""
      } ${c}
4. Hitung: ${a * xValue * xValue} ${b >= 0 ? "+" : ""} ${b * xValue} ${
        c >= 0 ? "+" : ""
      } ${c} = ${answer}`;
      type = "Polinomial Kuadrat";
    }
  } else {
    // Soal rasional sederhana: (ax + b)/(cx + d) dengan cx + d ≠ 0 saat x = xValue
    let a, b, c, d;
    let attempts = 0;

    do {
      a = getRandomInt(1, 5) * (Math.random() > 0.5 ? 1 : -1);
      b = getRandomInt(-10, 10);
      c = getRandomInt(1, 5) * (Math.random() > 0.5 ? 1 : -1);
      d = getRandomInt(-10, 10);
      attempts++;

      // Batasi percobaan untuk menghindari infinite loop
      if (attempts > 10) {
        // Paksa nilai d agar penyebut tidak nol
        d = -c * xValue + 1;
      }
    } while (c * xValue + d === 0); // Pastikan penyebut tidak nol

    question = `\\[\\lim_{x \\to ${xValue}} \\frac{${a}x ${
      b >= 0 ? "+" : ""
    } ${b}}{${c}x ${d >= 0 ? "+" : ""} ${d}}\\]`;
    answer = (a * xValue + b) / (c * xValue + d);

    // Pastikan jawaban bilangan bulat
    // Jika tidak bulat, buat ulang soal
    if (!Number.isInteger(answer)) {
      return generateEasyLimitQuestion();
    }

    steps = `Langkah penyelesaian:
1. Karena ini adalah fungsi rasional dan penyebut tidak nol saat x = ${xValue}, kita dapat menggunakan substitusi langsung.
2. Ganti nilai x dengan ${xValue} pada pembilang: ${a}(${xValue}) ${
      b >= 0 ? "+" : ""
    } ${b} = ${a * xValue} ${b >= 0 ? "+" : ""} ${b} = ${a * xValue + b}
3. Ganti nilai x dengan ${xValue} pada penyebut: ${c}(${xValue}) ${
      d >= 0 ? "+" : ""
    } ${d} = ${c * xValue} ${d >= 0 ? "+" : ""} ${d} = ${c * xValue + d}
4. Hitung hasil bagi: ${a * xValue + b} / ${c * xValue + d} = ${answer}`;
    type = "Rasional Sederhana";
  }

  return { question, answer, steps, type };
}
