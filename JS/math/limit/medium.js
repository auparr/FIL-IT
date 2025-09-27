function generateIndeterminateFormQuestion() {
  // Pilih jenis soal acak (0: faktorisasi, 1: rasionalisasi)
  const questionType = getRandomInt(0, 1);

  // Nilai x yang didekati (bilangan bulat kecil)
  const xValue = getRandomInt(1, 15);

  let question, answer, steps;

  if (questionType === 0) {
    // Soal faktorisasi: (x² - a²)/(x - a) atau variasi lainnya
    // Pastikan menghasilkan bentuk 0/0 saat x = xValue
    const a = xValue;
    const b = getRandomInt(1, 15) * (Math.random() > 0.5 ? 1 : -1);

    // Bentuk: (x² - a²)/(x - a) = x + a -> jawaban: 2a
    // Atau: (x² - (a+b)x + ab)/(x - a) = x - b -> jawaban: a - b
    const useSimpleForm = Math.random() > 0.5;

    if (useSimpleForm) {
      question = `\\[\\lim_{x \\to ${a}} \\frac{x^2 - ${a * a}}{x - ${a}}\\]`;
      answer = 2 * a;
      steps = `Langkah penyelesaian:
1. Substitusi x = ${a} menghasilkan: (${a}² - ${a * a})/(${a} - ${a}) = (${
        a * a
      } - ${a * a})/0 = 0/0 (bentuk tak tentu)
2. Faktorkan pembilang: x² - ${a * a} = (x - ${a})(x + ${a})
3. Sederhanakan: ((x - ${a})(x + ${a}))/(x - ${a}) = x + ${a}
4. Substitusi x = ${a}: ${a} + ${a} = ${2 * a}`;
    } else {
      const c = a + b;
      question = `\\[\\lim_{x \\to ${a}} \\frac{x^2 - ${a + c}x + ${
        a * c
      }}{x - ${a}}\\]`;
      answer = a - c;
      steps = `Langkah penyelesaian:
1. Substitusi x = ${a} menghasilkan: (${a}² - ${a + c}·${a} + ${
        a * c
      })/(${a} - ${a}) = (${a * a} - ${a * (a + c)} + ${
        a * c
      })/0 = 0/0 (bentuk tak tentu)
2. Faktorkan pembilang: x² - ${a + c}x + ${a * c} = (x - ${a})(x - ${c})
3. Sederhanakan: ((x - ${a})(x - ${c}))/(x - ${a}) = x - ${c}
4. Substitusi x = ${a}: ${a} - ${c} = ${a - c}`;
    }
  } else {
    // Soal rasionalisasi: (√(x+a) - √(a+b))/(x - b) atau variasi
    // Pastikan menghasilkan bentuk 0/0 saat x = xValue
    const a = getRandomInt(1, 15);
    const b = xValue;

    // Pastikan a + b adalah kuadrat sempurna agar hasilnya bilangan bulat
    const sqrtValue = getRandomInt(2, 16);
    const c = sqrtValue * sqrtValue - a;

    question = `\\[\\lim_{x \\to ${b}} \\frac{\\sqrt{x + ${a}} - \\sqrt{${
      b + a
    }}}{x - ${b}}\\]`;
    answer = 1 / (2 * Math.sqrt(b + a));

    // Untuk memastikan jawaban bilangan bulat, kita atur agar penyebut 1
    // Dengan membuat 2√(b+a) = 1 -> √(b+a) = 1/2 -> b+a = 1/4 (bukan bilangan bulat)
    // Jadi kita buat soal yang setelah dirasionalisasi menjadi bentuk lain

    // Ubah pendekatan: buat soal yang setelah dirasionalisasi menjadi bilangan bulat
    const numerator = getRandomInt(1, 15);
    const denominator = 1;

    // Bentuk: (√(x+a) - √(b+a))/(x-b) -> rasionalisasi
    // Kalikan dengan sekawan: (√(x+a) + √(b+a))
    // Hasil: (x+a - (b+a))/((x-b)(√(x+a) + √(b+a))) = (x-b)/((x-b)(√(x+a) + √(b+a))) = 1/(√(x+a) + √(b+a))
    // Limit saat x->b: 1/(2√(b+a))
    // Agar hasilnya bilangan bulat, kita butuh 2√(b+a) = 1 -> tidak mungkin bilangan bulat

    // Alternatif: buat soal dengan bentuk lain
    // (√(x+a) - k)/(x-b) dengan k dipilih agar saat x=b menghasilkan 0
    // Jadi k = √(b+a)
    // Rasionalisasi: kalikan dengan (√(x+a) + k)
    // Hasil: (x+a - k²)/((x-b)(√(x+a) + k))
    // Karena k² = b+a, maka x+a - k² = x-b
    // Sederhanakan: (x-b)/((x-b)(√(x+a) + k)) = 1/(√(x+a) + k)
    // Limit: 1/(2k) = 1/(2√(b+a)) -> sama dengan sebelumnya

    // Karena sulit mendapatkan hasil bilangan bulat dengan bentuk standar,
    // kita buat variasi dimana pembilang dan penyebut memiliki hubungan khusus
    const k = getRandomInt(1, 15);
    const m = k * k; // agar √m adalah bilangan bulat

    question = `\\[\\lim_{x \\to ${m}} \\frac{x - ${m}}{\\sqrt{x} - ${k}}\\]`;
    answer = 2 * k;

    steps = `Langkah penyelesaian:
1. Substitusi x = ${m} menghasilkan: (${m} - ${m})/(√${m} - ${k}) = 0/0 (bentuk tak tentu)
2. Rasionalisasi: kalikan pembilang dan penyebut dengan sekawan penyebut (√x + ${k})
3. Hasil: ((x - ${m})(√x + ${k}))/((√x - ${k})(√x + ${k})) = ((x - ${m})(√x + ${k}))/(x - ${m})
4. Sederhanakan: √x + ${k}
5. Substitusi x = ${m}: √${m} + ${k} = ${k} + ${k} = ${2 * k}`;
  }

  return { question, answer, steps };
}
