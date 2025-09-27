function generateEasyFunctionQuestion() {
  const types = [
    "function_evaluation_linear", // Evaluasi fungsi linear
    "function_evaluation_quadratic", // Evaluasi fungsi kuadrat
    "domain_range_linear", // Domain dan range fungsi linear
    "function_operations", // Operasi fungsi
    "function_composition", // Komposisi fungsi
  ];

  const type = getRandomElement(types);
  let question, answer, steps, qType;

  switch (type) {
    case "function_evaluation_linear":
      // f(x) = ax + b, cari f(c)
      const a1 = getRandomInt(1, 5) * (Math.random() > 0.5 ? 1 : -1);
      const b1 = getRandomInt(-10, 10);
      const c1 = getRandomInt(-5, 5);

      question = `Diketahui fungsi \\(f(x) = ${a1}x ${
        b1 >= 0 ? "+" : ""
      } ${b1}\\). Tentukan nilai \\(f(${c1})\\).`;
      answer = a1 * c1 + b1;
      steps = `Langkah penyelesaian:
1. Fungsi yang diberikan: \\(f(x) = ${a1}x ${b1 >= 0 ? "+" : ""} ${b1}\\)
2. Ganti x dengan ${c1}: \\(f(${c1}) = ${a1}(${c1}) ${
        b1 >= 0 ? "+" : ""
      } ${b1}\\)
3. Hitung: \\(${a1 * c1} ${b1 >= 0 ? "+" : ""} ${b1} = ${answer}\\)`;
      qType = "Evaluasi Fungsi Linear";
      break;

    case "function_evaluation_quadratic":
      // f(x) = ax² + bx + c, cari f(d)
      const a2 = getRandomInt(1, 3) * (Math.random() > 0.5 ? 1 : -1);
      const b2 = getRandomInt(-5, 5);
      const c2 = getRandomInt(-10, 10);
      const d2 = getRandomInt(-3, 3);

      question = `Diketahui fungsi \\(f(x) = ${a2}x^2 ${
        b2 >= 0 ? "+" : ""
      } ${b2}x ${c2 >= 0 ? "+" : ""} ${c2}\\). Tentukan nilai \\(f(${d2})\\).`;
      answer = a2 * d2 * d2 + b2 * d2 + c2;
      steps = `Langkah penyelesaian:
1. Fungsi yang diberikan: \\(f(x) = ${a2}x^2 ${b2 >= 0 ? "+" : ""} ${b2}x ${
        c2 >= 0 ? "+" : ""
      } ${c2}\\)
2. Ganti x dengan ${d2}: \\(f(${d2}) = ${a2}(${d2})^2 ${
        b2 >= 0 ? "+" : ""
      } ${b2}(${d2}) ${c2 >= 0 ? "+" : ""} ${c2}\\)
3. Hitung: \\(${a2}(${d2 * d2}) ${b2 >= 0 ? "+" : ""} ${b2 * d2} ${
        c2 >= 0 ? "+" : ""
      } ${c2}\\)
4. Hitung: \\(${a2 * d2 * d2} ${b2 >= 0 ? "+" : ""} ${b2 * d2} ${
        c2 >= 0 ? "+" : ""
      } ${c2} = ${answer}\\)`;
      qType = "Evaluasi Fungsi Kuadrat";
      break;

    case "domain_range_linear":
      // Tentukan domain dan range fungsi linear
      const a3 = getRandomInt(1, 5) * (Math.random() > 0.5 ? 1 : -1);
      const b3 = getRandomInt(-10, 10);

      // Untuk fungsi linear, domainnya semua bilangan real, rangenya juga semua bilangan real
      // Tapi kita buat soal dengan domain terbatas untuk menghasilkan jawaban bilangan bulat
      const domainMin = getRandomInt(-5, 0);
      const domainMax = getRandomInt(1, 5);

      question = `Diketahui fungsi \\(f(x) = ${a3}x ${
        b3 >= 0 ? "+" : ""
      } ${b3}\\) dengan domain \\(${domainMin} \\leq x \\leq ${domainMax}\\). Tentukan range minimum dari fungsi tersebut.`;

      // Hitung nilai fungsi di ujung domain
      const fMin = a3 * domainMin + b3;
      const fMax = a3 * domainMax + b3;

      // Tentukan range berdasarkan apakah fungsi naik atau turun
      if (a3 > 0) {
        answer = fMin; // Fungsi naik, nilai minimum di x minimum
      } else {
        answer = fMax; // Fungsi turun, nilai minimum di x maksimum
      }

      steps = `Langkah penyelesaian:
1. Fungsi yang diberikan: \\(f(x) = ${a3}x ${b3 >= 0 ? "+" : ""} ${b3}\\)
2. Domain: \\(${domainMin} \\leq x \\leq ${domainMax}\\)
3. Karena ini fungsi linear, nilai minimum dan maksimum terjadi di ujung domain
4. Hitung \\(f(${domainMin}) = ${a3}(${domainMin}) ${
        b3 >= 0 ? "+" : ""
      } ${b3} = ${fMin}\\)
5. Hitung \\(f(${domainMax}) = ${a3}(${domainMax}) ${
        b3 >= 0 ? "+" : ""
      } ${b3} = ${fMax}\\)
6. Karena fungsi ${a3 > 0 ? "naik" : "turun"}, nilai minimum adalah ${Math.min(
        fMin,
        fMax
      )} dan nilai maksimum adalah ${Math.max(fMin, fMax)}
7. Jadi range-nya adalah \\(${Math.min(fMin, fMax)} \\leq f(x) \\leq ${Math.max(
        fMin,
        fMax
      )}\\)`;

      // Untuk soal ini, kita minta nilai minimum range sebagai jawaban
      qType = "Domain dan Range";
      break;

    case "function_operations":
      // Operasi fungsi: (f + g)(x), (f - g)(x), atau (f * g)(x)
      const opType = getRandomElement(["+", "-", "*"]);
      const a4 = getRandomInt(1, 5);
      const b4 = getRandomInt(-10, 10);
      const c4 = getRandomInt(1, 5);
      const d4 = getRandomInt(-10, 10);
      const x4 = getRandomInt(-3, 3);

      let opSymbol, opName;
      switch (opType) {
        case "+":
          opSymbol = "+";
          opName = "penjumlahan";
          answer = a4 * x4 + b4 + (c4 * x4 + d4);
          break;
        case "-":
          opSymbol = "-";
          opName = "pengurangan";
          answer = a4 * x4 + b4 - (c4 * x4 + d4);
          break;
        case "*":
          opSymbol = "\\times";
          opName = "perkalian";
          answer = (a4 * x4 + b4) * (c4 * x4 + d4);
          break;
      }

      question = `Diketahui \\(f(x) = ${a4}x ${
        b4 >= 0 ? "+" : ""
      } ${b4}\\) dan \\(g(x) = ${c4}x ${
        d4 >= 0 ? "+" : ""
      } ${d4}\\). Tentukan nilai \\((f ${opSymbol} g)(${x4})\\).`;

      steps = `Langkah penyelesaian:
1. Fungsi f: \\(f(x) = ${a4}x ${b4 >= 0 ? "+" : ""} ${b4}\\)
2. Fungsi g: \\(g(x) = ${c4}x ${d4 >= 0 ? "+" : ""} ${d4}\\)
3. Operasi ${opName}: \\((f ${opSymbol} g)(x) = f(x) ${opSymbol} g(x)\\)
4. Untuk x = ${x4}:
   - \\(f(${x4}) = ${a4}(${x4}) ${b4 >= 0 ? "+" : ""} ${b4} = ${a4 * x4} ${
        b4 >= 0 ? "+" : ""
      } ${b4} = ${a4 * x4 + b4}\\)
   - \\(g(${x4}) = ${c4}(${x4}) ${d4 >= 0 ? "+" : ""} ${d4} = ${c4 * x4} ${
        d4 >= 0 ? "+" : ""
      } ${d4} = ${c4 * x4 + d4}\\)
5. Hasil operasi: \\(${a4 * x4 + b4} ${opSymbol} ${
        c4 * x4 + d4
      } = ${answer}\\)`;
      qType = "Operasi Fungsi";
      break;

    case "function_composition":
      // Komposisi fungsi: f(g(x)) atau g(f(x))
      const compType = getRandomElement(["fog", "gof"]);
      const a5 = getRandomInt(1, 5);
      const b5 = getRandomInt(-10, 10);
      const c5 = getRandomInt(1, 5);
      const d5 = getRandomInt(-10, 10);
      const x5 = getRandomInt(-3, 3);

      if (compType === "fog") {
        // f(g(x))
        question = `Diketahui \\(f(x) = ${a5}x ${
          b5 >= 0 ? "+" : ""
        } ${b5}\\) dan \\(g(x) = ${c5}x ${
          d5 >= 0 ? "+" : ""
        } ${d5}\\). Tentukan nilai \\((f \\circ g)(${x5})\\).`;
        answer = a5 * (c5 * x5 + d5) + b5;
        steps = `Langkah penyelesaian:
1. Fungsi f: \\(f(x) = ${a5}x ${b5 >= 0 ? "+" : ""} ${b5}\\)
2. Fungsi g: \\(g(x) = ${c5}x ${d5 >= 0 ? "+" : ""} ${d5}\\)
3. Komposisi: \\((f \\circ g)(x) = f(g(x))\\)
4. Hitung \\(g(${x5}) = ${c5}(${x5}) ${d5 >= 0 ? "+" : ""} ${d5} = ${c5 * x5} ${
          d5 >= 0 ? "+" : ""
        } ${d5} = ${c5 * x5 + d5}\\)
5. Hitung \\(f(g(${x5})) = f(${c5 * x5 + d5}) = ${a5}(${c5 * x5 + d5}) ${
          b5 >= 0 ? "+" : ""
        } ${b5}\\)
6. Hitung: \\(${a5 * (c5 * x5 + d5)} ${
          b5 >= 0 ? "+" : ""
        } ${b5} = ${answer}\\)`;
      } else {
        // g(f(x))
        question = `Diketahui \\(f(x) = ${a5}x ${
          b5 >= 0 ? "+" : ""
        } ${b5}\\) dan \\(g(x) = ${c5}x ${
          d5 >= 0 ? "+" : ""
        } ${d5}\\). Tentukan nilai \\((g \\circ f)(${x5})\\).`;
        answer = c5 * (a5 * x5 + b5) + d5;
        steps = `Langkah penyelesaian:
1. Fungsi f: \\(f(x) = ${a5}x ${b5 >= 0 ? "+" : ""} ${b5}\\)
2. Fungsi g: \\(g(x) = ${c5}x ${d5 >= 0 ? "+" : ""} ${d5}\\)
3. Komposisi: \\((g \\circ f)(x) = g(f(x))\\)
4. Hitung \\(f(${x5}) = ${a5}(${x5}) ${b5 >= 0 ? "+" : ""} ${b5} = ${a5 * x5} ${
          b5 >= 0 ? "+" : ""
        } ${b5} = ${a5 * x5 + b5}\\)
5. Hitung \\(g(f(${x5})) = g(${a5 * x5 + b5}) = ${c5}(${a5 * x5 + b5}) ${
          d5 >= 0 ? "+" : ""
        } ${d5}\\)
6. Hitung: \\(${c5 * (a5 * x5 + b5)} ${
          d5 >= 0 ? "+" : ""
        } ${d5} = ${answer}\\)`;
      }
      qType = "Komposisi Fungsi";
      break;
  }

  return { question, answer, steps, type: qType };
}
